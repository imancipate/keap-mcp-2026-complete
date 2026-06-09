import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createCampaignsTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_list_campaigns',
      description: 'List all campaigns with pagination',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
          order: { type: 'string', description: 'Order by field' },
          search_text: { type: 'string', description: 'Search in campaign name/description' },
        },
      },
    },
    {
      name: 'keap_get_campaign',
      description: 'Get campaign details by ID',
      inputSchema: {
        type: 'object',
        properties: {
          campaign_id: { type: 'number', description: 'Campaign ID' },
        },
        required: ['campaign_id'],
      },
    },
    {
      name: 'keap_add_contact_to_campaign',
      description: 'Add a contact to a campaign sequence',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          campaign_id: { type: 'number', description: 'Campaign ID' },
        },
        required: ['contact_id', 'campaign_id'],
      },
    },
    {
      name: 'keap_remove_contact_from_campaign',
      description: 'Remove a contact from a campaign sequence',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          campaign_id: { type: 'number', description: 'Campaign ID' },
        },
        required: ['contact_id', 'campaign_id'],
      },
    },
    {
      name: 'keap_get_campaign_sequences',
      description: 'Get all sequences for a specific campaign',
      inputSchema: {
        type: 'object',
        properties: {
          campaign_id: { type: 'number', description: 'Campaign ID' },
        },
        required: ['campaign_id'],
      },
    },
    {
      name: 'keap_add_contact_to_sequence',
      description: 'Add a contact to a specific campaign sequence',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          sequence_id: { type: 'number', description: 'Sequence ID' },
        },
        required: ['contact_id', 'sequence_id'],
      },
    },
    {
      name: 'keap_remove_contact_from_sequence',
      description: 'Remove a contact from a campaign sequence',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          sequence_id: { type: 'number', description: 'Sequence ID' },
        },
        required: ['contact_id', 'sequence_id'],
      },
    },
  ];
}

export async function handleCampaignsTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_list_campaigns':
        result = await client.get('/campaigns', args);
        break;

      case 'keap_get_campaign':
        result = await client.get(`/campaigns/${args.campaign_id}`);
        break;

      case 'keap_add_contact_to_campaign':
        result = await client.post(`/contacts/${args.contact_id}/campaigns/${args.campaign_id}`, {});
        break;

      case 'keap_remove_contact_from_campaign':
        await client.delete(`/contacts/${args.contact_id}/campaigns/${args.campaign_id}`);
        result = { success: true, message: 'Contact removed from campaign' };
        break;

      case 'keap_get_campaign_sequences':
        result = await client.get(`/campaigns/${args.campaign_id}/sequences`);
        break;

      case 'keap_add_contact_to_sequence':
        result = await client.post(`/contacts/${args.contact_id}/sequences/${args.sequence_id}`, {});
        break;

      case 'keap_remove_contact_from_sequence':
        await client.delete(`/contacts/${args.contact_id}/sequences/${args.sequence_id}`);
        result = { success: true, message: 'Contact removed from sequence' };
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
