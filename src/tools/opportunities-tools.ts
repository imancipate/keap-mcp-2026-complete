import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createOpportunitiesTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_create_opportunity',
      description: 'Create a new sales opportunity/deal in Keap',
      inputSchema: {
        type: 'object',
        properties: {
          opportunity_title: { type: 'string', description: 'Deal/opportunity title' },
          contact_id: { type: 'number', description: 'Contact ID associated with this opportunity' },
          stage_id: { type: 'number', description: 'Pipeline stage ID' },
          user_id: { type: 'number', description: 'User ID (owner of opportunity)' },
          estimated_close_date: { type: 'string', description: 'Estimated close date (ISO format)' },
          projected_revenue_low: { type: 'number', description: 'Low revenue estimate' },
          projected_revenue_high: { type: 'number', description: 'High revenue estimate' },
          opportunity_notes: { type: 'string', description: 'Notes about this opportunity' },
          next_action_notes: { type: 'string', description: 'Next action notes' },
          next_action_date: { type: 'string', description: 'Next action date (ISO format)' },
          custom_fields: { type: 'array', items: { type: 'object' }, description: 'Custom fields' },
        },
        required: ['opportunity_title', 'contact_id', 'stage_id'],
      },
    },
    {
      name: 'keap_get_opportunity',
      description: 'Retrieve an opportunity by ID',
      inputSchema: {
        type: 'object',
        properties: {
          opportunity_id: { type: 'number', description: 'Opportunity ID' },
          optional_properties: { type: 'array', items: { type: 'string' }, description: 'Additional fields to include' },
        },
        required: ['opportunity_id'],
      },
    },
    {
      name: 'keap_update_opportunity',
      description: 'Update an existing opportunity',
      inputSchema: {
        type: 'object',
        properties: {
          opportunity_id: { type: 'number', description: 'Opportunity ID' },
          opportunity_title: { type: 'string', description: 'Deal title' },
          stage_id: { type: 'number', description: 'Pipeline stage ID' },
          user_id: { type: 'number', description: 'User ID (owner)' },
          estimated_close_date: { type: 'string', description: 'Estimated close date' },
          projected_revenue_low: { type: 'number', description: 'Low revenue estimate' },
          projected_revenue_high: { type: 'number', description: 'High revenue estimate' },
          opportunity_notes: { type: 'string', description: 'Notes' },
          next_action_notes: { type: 'string', description: 'Next action notes' },
          next_action_date: { type: 'string', description: 'Next action date' },
        },
        required: ['opportunity_id'],
      },
    },
    {
      name: 'keap_delete_opportunity',
      description: 'Delete an opportunity',
      inputSchema: {
        type: 'object',
        properties: {
          opportunity_id: { type: 'number', description: 'Opportunity ID to delete' },
        },
        required: ['opportunity_id'],
      },
    },
    {
      name: 'keap_list_opportunities',
      description: 'List opportunities with filtering and pagination',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
          user_id: { type: 'number', description: 'Filter by user ID' },
          stage_id: { type: 'number', description: 'Filter by pipeline stage' },
          contact_id: { type: 'number', description: 'Filter by contact ID' },
          search_term: { type: 'string', description: 'Search in title/notes' },
          order: { type: 'string', description: 'Order by field' },
        },
      },
    },
    {
      name: 'keap_list_opportunity_stage_pipeline',
      description: 'List all pipeline stages for opportunities',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    {
      name: 'keap_get_opportunity_stage_pipeline',
      description: 'Get details of a specific pipeline stage',
      inputSchema: {
        type: 'object',
        properties: {
          stage_id: { type: 'number', description: 'Stage ID' },
        },
        required: ['stage_id'],
      },
    },
    {
      name: 'keap_update_opportunity_stage',
      description: 'Move an opportunity to a different pipeline stage',
      inputSchema: {
        type: 'object',
        properties: {
          opportunity_id: { type: 'number', description: 'Opportunity ID' },
          stage_id: { type: 'number', description: 'New stage ID' },
          move_to_stage_reason: { type: 'string', description: 'Reason for stage change' },
        },
        required: ['opportunity_id', 'stage_id'],
      },
    },
    {
      name: 'keap_get_opportunity_model',
      description: 'Get the opportunity model schema with custom fields',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
  ];
}

export async function handleOpportunitiesTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_create_opportunity':
        result = await client.post('/opportunities', {
          opportunity_title: args.opportunity_title,
          contact: { id: args.contact_id },
          stage: { id: args.stage_id },
          user: args.user_id,
          estimated_close_date: args.estimated_close_date,
          projected_revenue_low: args.projected_revenue_low,
          projected_revenue_high: args.projected_revenue_high,
          opportunity_notes: args.opportunity_notes,
          next_action_notes: args.next_action_notes,
          next_action_date: args.next_action_date,
          custom_fields: args.custom_fields,
        });
        break;

      case 'keap_get_opportunity':
        result = await client.get(`/opportunities/${args.opportunity_id}`, {
          optional_properties: args.optional_properties?.join(','),
        });
        break;

      case 'keap_update_opportunity': {
        const { opportunity_id, ...updateData } = args;
        result = await client.patch(`/opportunities/${opportunity_id}`, updateData);
        break;
      }

      case 'keap_delete_opportunity':
        await client.delete(`/opportunities/${args.opportunity_id}`);
        result = { success: true, message: 'Opportunity deleted successfully' };
        break;

      case 'keap_list_opportunities':
        result = await client.get('/opportunities', args);
        break;

      case 'keap_list_opportunity_stage_pipeline':
        result = await client.get('/opportunity/stage_pipeline');
        break;

      case 'keap_get_opportunity_stage_pipeline':
        result = await client.get(`/opportunity/stage_pipeline/${args.stage_id}`);
        break;

      case 'keap_update_opportunity_stage':
        result = await client.patch(`/opportunities/${args.opportunity_id}`, {
          stage: { id: args.stage_id },
          move_to_stage_reason: args.move_to_stage_reason,
        });
        break;

      case 'keap_get_opportunity_model':
        result = await client.get('/opportunities/model');
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
