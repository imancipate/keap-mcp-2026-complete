import yaml, re, json
spec = yaml.safe_load(open('scripts/keap_v2_openapi.yml'))
paths = spec['paths']
comp = spec.get('components', {}).get('schemas', {})

# 28 net-new resources (zero coverage in v1 MCP)
COVERED_PARTIAL = {'Contact','Company','Opportunity','Task','Tags','Note','Email','Files',
 'Campaign','Orders','Products','Subscriptions','Affiliate','Users','Settings','Email Address'}

def snake(s):
    s = re.sub(r'(?<!^)(?=[A-Z])', '_', s)        # camelCase -> camel_Case
    s = re.sub(r'[^a-zA-Z0-9]+', '_', s)
    return re.sub(r'_+', '_', s).strip('_').lower()

def map_type(sch):
    if not isinstance(sch, dict): return 'string'
    t = sch.get('type')
    if t in ('integer','number'): return 'number'
    if t == 'boolean': return 'boolean'
    if t == 'array': return 'array'
    if t == 'object': return 'object'
    return 'string'

def resolve_ref(ref):
    name = ref.split('/')[-1]
    return comp.get(name, {})

def body_props(op):
    rb = op.get('requestBody', {})
    sch = (rb.get('content', {}).get('application/json', {}) or {}).get('schema', {})
    if '$ref' in sch:
        sch = resolve_ref(sch['$ref'])
    props = sch.get('properties', {})
    req = set(sch.get('required', []))
    out = []
    for pname, pdef in props.items():
        d = pdef.get('description','') if isinstance(pdef, dict) else ''
        out.append((pname, map_type(pdef), d, pname in req))
    # fallback: if body exists but no resolvable props, expose generic 'body'
    if not out and rb:
        out.append(('body','object','Request body payload', True))
    return out

ops = []
for path, methods in paths.items():
    for m, op in methods.items():
        if m.lower() not in ('get','post','put','patch','delete'): continue
        tag = (op.get('tags') or ['?'])[0]
        if tag in COVERED_PARTIAL: continue   # only net-new
        opid = op.get('operationId','')
        name = 'keap_v2_' + snake(opid)
        url = path.replace('/rest/v2','')      # client.requestV2 baseURL already includes /crm/rest/v2
        path_params = re.findall(r'\{([^}]+)\}', url)
        params = op.get('parameters', [])
        query = [(p['name'], map_type(p.get('schema',{})), p.get('description',''), p.get('required',False))
                 for p in params if p.get('in')=='query']
        bprops = body_props(op) if m.lower() in ('post','put','patch') else []

        # build inputSchema
        properties = {}
        required = []
        for pp in path_params:
            properties[pp] = {'type':'string','description':f'Path parameter: {pp}'}
            required.append(pp)
        for (qn,qt,qd,qr) in query:
            properties[qn] = {'type':qt}
            if qd: properties[qn]['description']=qd
            if qr: required.append(qn)
        for (bn,bt,bd,br) in bprops:
            properties[bn] = {'type':bt}
            if bd: properties[bn]['description']=bd
            if br: required.append(bn)

        ops.append({
            'name': name,
            'description': (op.get('summary') or opid)[:300],
            'method': m.upper(),
            'url': url,
            'pathParams': path_params,
            'query': [q[0] for q in query],
            'body': [b[0] for b in bprops],
            'inputSchema': {'type':'object','properties':properties, **({'required':required} if required else {})},
            'tag': tag,
        })

# dedupe by name
seen=set(); uniq=[]
for o in ops:
    if o['name'] in seen:
        o['name'] = o['name'] + '_' + o['method'].lower()
    seen.add(o['name']); uniq.append(o)
ops = uniq
print(f"generated {len(ops)} ops; unique names: {len(set(o['name'] for o in ops))}")

# emit TS
descriptors = []
for o in ops:
    descriptors.append({
        'name':o['name'],'description':o['description'],'method':o['method'],'url':o['url'],
        'pathParams':o['pathParams'],'query':o['query'],'body':o['body'],'inputSchema':o['inputSchema']
    })
ts = """// AUTO-GENERATED from Keap v2 OpenAPI (keap_v2.yml). Do not hand-edit.
// 113 net-new v2 operations the v1 MCP lacks. Regenerate via /tmp/gen_v2_tools.py.
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

interface V2Op {
  name: string;
  description: string;
  method: string;
  url: string;
  pathParams: string[];
  query: string[];
  body: string[];
  inputSchema: any;
}

const V2_OPS: V2Op[] = """ + json.dumps(descriptors, indent=2) + """;

const BY_NAME = new Map<string, V2Op>(V2_OPS.map((o) => [o.name, o]));

export function createV2Tools(_client: KeapClient): Tool[] {
  return V2_OPS.map((o) => ({
    name: o.name,
    description: o.description,
    inputSchema: o.inputSchema as any,
  }));
}

export function v2ToolNames(): string[] {
  return V2_OPS.map((o) => o.name);
}

// Generic executor: fills path params, splits query vs body, calls the v2 client.
export async function handleV2Tool(name: string, args: any, client: KeapClient): Promise<any> {
  const op = BY_NAME.get(name);
  if (!op) throw new Error(`Unknown v2 tool: ${name}`);
  args = args || {};
  let url = op.url;
  for (const p of op.pathParams) {
    url = url.replace(`{${p}}`, encodeURIComponent(String(args[p])));
  }
  const params: any = {};
  for (const q of op.query) if (args[q] !== undefined) params[q] = args[q];
  // Keap 500s on some list endpoints (e.g. leadSources) when page_size is absent;
  // default it whenever the operation supports it.
  if (op.query.includes('page_size') && params.page_size === undefined) params.page_size = 200;
  const data: any = {};
  for (const b of op.body) if (args[b] !== undefined) data[b] = args[b];

  const cfg: any = { method: op.method, url };
  if (Object.keys(params).length) cfg.params = params;
  if (op.body.length && Object.keys(data).length) cfg.data = ('body' in data ? data.body : data);

  const result = await client.requestV2<any>(cfg);
  return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
"""
open('src/tools/v2-generated-tools.ts','w').write(ts)
print("WROTE src/tools/v2-generated-tools.ts")
print("sample names:", [o['name'] for o in ops[:6]])
