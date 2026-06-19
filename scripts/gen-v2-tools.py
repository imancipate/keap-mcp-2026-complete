import yaml, re, json, hashlib
spec = yaml.safe_load(open('scripts/keap_v2_openapi.yml'))
paths = spec['paths']
comp = spec.get('components', {}).get('schemas', {})

# Generate EVERY v2 operation. Earlier this skipped any tag already present in v1
# (COVERED_PARTIAL), which dropped the v2 versions of Contact/Tags/Orders/
# Opportunity/Task/Subscriptions/Email — i.e. exactly the advanced-filtering
# endpoints the v1 tools lack. Full coverage instead; v2 names are keap_v2_*-
# prefixed so they never collide with the v1 keap_* tools.
COVERED_PARTIAL = set()

# MCP / Anthropic / OpenAI cap tool names at 64 chars (^[a-zA-Z0-9_-]{1,64}$).
# Clamp deterministically so regeneration can never reintroduce an over-length
# name: keep a readable prefix + a stable 6-char hash of the full name.
def clamp_name(name):
    if len(name) <= 64:
        return name
    h = hashlib.md5(name.encode()).hexdigest()[:6]
    return name[:57] + '_' + h

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
        name = clamp_name('keap_v2_' + snake(opid))
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

# dedupe by name, keeping every name <= 64 chars
seen=set(); uniq=[]
for o in ops:
    base = o['name']
    if base in seen:
        base = clamp_name(o['name'] + '_' + o['method'].lower())
    while base in seen:
        base = clamp_name(o['name'] + '_' + hashlib.md5((o['url']+o['method']).encode()).hexdigest()[:6])
    o['name'] = base
    seen.add(base); uniq.append(o)
ops = uniq
print(f"generated {len(ops)} ops; unique names: {len(set(o['name'] for o in ops))}")

# emit TS
descriptors = []
for o in ops:
    descriptors.append({
        'name':o['name'],'description':o['description'],'method':o['method'],'url':o['url'],
        'pathParams':o['pathParams'],'query':o['query'],'body':o['body'],'inputSchema':o['inputSchema']
    })
ts = ("""// AUTO-GENERATED from Keap v2 OpenAPI (scripts/keap_v2_openapi.yml). Do not hand-edit.
// Full v2 coverage: """ + str(len(ops)) + """ operations. Regenerate via: python3 scripts/gen-v2-tools.py
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

// Some v2 endpoints 500 on legacy rows the v2 serializer can't map (e.g. merchants
// row id=23 "NetworkMerchants"). The v1 path serializes the full list correctly,
// so fall back to it. Verified: GET /crm/rest/v1/merchants -> 200 full list.
const V1_FALLBACK: Record<string, { method: string; url: string }> = {
  keap_v2_list_merchants: { method: 'GET', url: '/merchants' },
};

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
  const fb = V1_FALLBACK[name];
  if (fb) {
    const r = await client.get<any>(fb.url);
    return { content: [{ type: 'text', text: JSON.stringify(r, null, 2) }] };
  }
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
""")
open('src/tools/v2-generated-tools.ts','w').write(ts)
print("WROTE src/tools/v2-generated-tools.ts")
print("sample names:", [o['name'] for o in ops[:6]])
