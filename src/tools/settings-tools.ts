import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createSettingsTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_get_account_profile',
      description: 'Get the account profile information',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    {
      name: 'keap_update_account_profile',
      description: 'Update account profile settings',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Business name' },
          email: { type: 'string', description: 'Business email' },
          phone: { type: 'string', description: 'Business phone' },
          address: { type: 'string', description: 'Business address' },
          website: { type: 'string', description: 'Business website' },
          time_zone: { type: 'string', description: 'Time zone' },
          currency_code: { type: 'string', description: 'Currency code (e.g., USD)' },
          language_tag: { type: 'string', description: 'Language tag (e.g., en-US)' },
        },
      },
    },
    {
      name: 'keap_list_users',
      description: 'List all users in the account',
      inputSchema: {
        type: 'object',
        properties: {
          include_inactive: { type: 'boolean', description: 'Include inactive users', default: false },
          limit: { type: 'number', description: 'Results per page', default: 50 },
        },
      },
    },
    {
      name: 'keap_get_application_configuration',
      description: 'Get application configuration settings',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    {
      name: 'keap_list_custom_fields',
      description: 'List all custom fields for a given entity type',
      inputSchema: {
        type: 'object',
        properties: {
          entity_type: { type: 'string', description: 'Entity type (Contact, Company, Opportunity, etc.)' },
        },
        required: ['entity_type'],
      },
    },
  ];
}

export async function handleSettingsTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_get_account_profile':
        result = await client.get('/account/profile');
        break;

      case 'keap_update_account_profile':
        result = await client.patch('/account/profile', args);
        break;

      case 'keap_list_users':
        result = await client.get('/users', args);
        break;

      case 'keap_get_application_configuration':
        result = await client.get('/setting/application/configuration');
        break;

      case 'keap_list_custom_fields':
        result = await client.get(`/customFields/${args.entity_type}`);
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
