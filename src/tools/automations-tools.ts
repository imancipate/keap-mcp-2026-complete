import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createAutomationsTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_create_hook',
      description: 'Create a REST hook for automation (webhook)',
      inputSchema: {
        type: 'object',
        properties: {
          eventKey: { type: 'string', description: 'Event key (e.g., contact.add, opportunity.add)' },
          hookUrl: { type: 'string', description: 'Webhook URL to call' },
        },
        required: ['eventKey', 'hookUrl'],
      },
    },
    {
      name: 'keap_list_hooks',
      description: 'List all REST hooks',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    {
      name: 'keap_delete_hook',
      description: 'Delete a REST hook',
      inputSchema: {
        type: 'object',
        properties: {
          hook_key: { type: 'string', description: 'Hook key to delete' },
        },
        required: ['hook_key'],
      },
    },
    {
      name: 'keap_verify_hook',
      description: 'Verify a REST hook',
      inputSchema: {
        type: 'object',
        properties: {
          hook_key: { type: 'string', description: 'Hook key to verify' },
        },
        required: ['hook_key'],
      },
    },
    {
      name: 'keap_update_hook',
      description: 'Update a REST hook',
      inputSchema: {
        type: 'object',
        properties: {
          hook_key: { type: 'string', description: 'Hook key to update' },
          hookUrl: { type: 'string', description: 'New webhook URL' },
          status: { type: 'string', description: 'Hook status (Active, Inactive)' },
        },
        required: ['hook_key'],
      },
    },
    {
      name: 'keap_list_hook_event_types',
      description: 'List all available hook event types',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
  ];
}

export async function handleAutomationsTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_create_hook':
        result = await client.post('/hooks', {
          eventKey: args.eventKey,
          hookUrl: args.hookUrl,
        });
        break;

      case 'keap_list_hooks':
        result = await client.get('/hooks');
        break;

      case 'keap_delete_hook':
        await client.delete(`/hooks/${args.hook_key}`);
        result = { success: true, message: 'Hook deleted successfully' };
        break;

      case 'keap_verify_hook':
        result = await client.post(`/hooks/${args.hook_key}/verify`, {});
        break;

      case 'keap_update_hook': {
        const { hook_key, ...updateData } = args;
        result = await client.patch(`/hooks/${hook_key}`, updateData);
        break;
      }

      case 'keap_list_hook_event_types':
        result = await client.get('/hooks/event_keys');
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
