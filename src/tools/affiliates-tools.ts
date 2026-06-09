import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createAffiliatesTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_create_affiliate',
      description: 'Create a new affiliate',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID for this affiliate' },
          code: { type: 'string', description: 'Affiliate code' },
          name: { type: 'string', description: 'Affiliate name' },
          parent_id: { type: 'number', description: 'Parent affiliate ID' },
          track_leads_for: { type: 'number', description: 'Number of days to track leads' },
        },
        required: ['contact_id', 'code', 'name'],
      },
    },
    {
      name: 'keap_get_affiliate',
      description: 'Retrieve an affiliate by ID',
      inputSchema: {
        type: 'object',
        properties: {
          affiliate_id: { type: 'number', description: 'Affiliate ID' },
        },
        required: ['affiliate_id'],
      },
    },
    {
      name: 'keap_list_affiliates',
      description: 'List all affiliates with filtering',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
          status: { type: 'number', description: 'Filter by status (0=inactive, 1=active)' },
        },
      },
    },
    {
      name: 'keap_get_affiliate_clawbacks',
      description: 'Get all clawbacks for an affiliate',
      inputSchema: {
        type: 'object',
        properties: {
          affiliate_id: { type: 'number', description: 'Affiliate ID' },
        },
        required: ['affiliate_id'],
      },
    },
    {
      name: 'keap_get_affiliate_commissions',
      description: 'Get all commissions for an affiliate',
      inputSchema: {
        type: 'object',
        properties: {
          affiliate_id: { type: 'number', description: 'Affiliate ID' },
          since: { type: 'string', description: 'Commissions after this date' },
          until: { type: 'string', description: 'Commissions before this date' },
          limit: { type: 'number', description: 'Results per page', default: 50 },
        },
        required: ['affiliate_id'],
      },
    },
    {
      name: 'keap_get_affiliate_payments',
      description: 'Get all payments for an affiliate',
      inputSchema: {
        type: 'object',
        properties: {
          affiliate_id: { type: 'number', description: 'Affiliate ID' },
        },
        required: ['affiliate_id'],
      },
    },
    {
      name: 'keap_get_affiliate_redirect_links',
      description: 'Get redirect links for an affiliate',
      inputSchema: {
        type: 'object',
        properties: {
          affiliate_id: { type: 'number', description: 'Affiliate ID' },
        },
        required: ['affiliate_id'],
      },
    },
    {
      name: 'keap_get_affiliate_summary',
      description: 'Get summary stats for an affiliate',
      inputSchema: {
        type: 'object',
        properties: {
          affiliate_id: { type: 'number', description: 'Affiliate ID' },
        },
        required: ['affiliate_id'],
      },
    },
    {
      name: 'keap_list_commissions',
      description: 'List all commissions with filtering',
      inputSchema: {
        type: 'object',
        properties: {
          affiliate_id: { type: 'number', description: 'Filter by affiliate' },
          contact_id: { type: 'number', description: 'Filter by contact' },
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
          since: { type: 'string', description: 'Commissions after this date' },
          until: { type: 'string', description: 'Commissions before this date' },
        },
      },
    },
  ];
}

export async function handleAffiliatesTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_create_affiliate':
        result = await client.post('/affiliates', {
          contact_id: args.contact_id,
          code: args.code,
          name: args.name,
          parent_id: args.parent_id,
          track_leads_for: args.track_leads_for,
        });
        break;

      case 'keap_get_affiliate':
        result = await client.get(`/affiliates/${args.affiliate_id}`);
        break;

      case 'keap_list_affiliates':
        result = await client.get('/affiliates', args);
        break;

      case 'keap_get_affiliate_clawbacks':
        result = await client.get(`/affiliates/${args.affiliate_id}/clawbacks`);
        break;

      case 'keap_get_affiliate_commissions':
        result = await client.get(`/affiliates/${args.affiliate_id}/commissions`, {
          since: args.since,
          until: args.until,
          limit: args.limit,
        });
        break;

      case 'keap_get_affiliate_payments':
        result = await client.get(`/affiliates/${args.affiliate_id}/payments`);
        break;

      case 'keap_get_affiliate_redirect_links':
        result = await client.get(`/affiliates/${args.affiliate_id}/redirectLinks`);
        break;

      case 'keap_get_affiliate_summary':
        result = await client.get(`/affiliates/${args.affiliate_id}/summaries`);
        break;

      case 'keap_list_commissions':
        result = await client.get('/commissions', args);
        break;

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  } catch (error: any) {
    return {
      content: [{ type: 'text', text: `Error: ${error.message}` }],
    };
  }
}
