import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createTagsTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_create_tag',
      description: 'Create a new tag in Keap',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Tag name' },
          description: { type: 'string', description: 'Tag description' },
          category_id: { type: 'number', description: 'Tag category ID' },
        },
        required: ['name'],
      },
    },
    {
      name: 'keap_get_tag',
      description: 'Retrieve a tag by ID',
      inputSchema: {
        type: 'object',
        properties: {
          tag_id: { type: 'number', description: 'Tag ID' },
        },
        required: ['tag_id'],
      },
    },
    {
      name: 'keap_list_tags',
      description: 'List all tags with pagination',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
          category: { type: 'string', description: 'Filter by category name' },
        },
      },
    },
    {
      name: 'keap_create_tag_category',
      description: 'Create a tag category',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Category name' },
          description: { type: 'string', description: 'Category description' },
        },
        required: ['name'],
      },
    },
    {
      name: 'keap_list_tag_categories',
      description: 'List all tag categories',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    {
      name: 'keap_list_tag_contacts',
      description: 'List all contacts that have a given tag (Keap GET /tags/{tagId}/contacts). Returns a `count` total plus a page of contacts; paginate with limit/offset to pull the full audience for a tag. This is the supported way to filter contacts by tag.',
      inputSchema: {
        type: 'object',
        properties: {
          tag_id: { type: 'number', description: 'Tag ID to list contacts for' },
          limit: { type: 'number', description: 'Results per page (max 1000)', default: 200 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
        },
        required: ['tag_id'],
      },
    },
  ];
}

export async function handleTagsTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_create_tag':
        result = await client.post('/tags', {
          name: args.name,
          description: args.description,
          category: args.category_id ? { id: args.category_id } : undefined,
        });
        break;

      case 'keap_get_tag':
        result = await client.get(`/tags/${args.tag_id}`);
        break;

      case 'keap_list_tags':
        result = await client.get('/tags', args);
        break;

      case 'keap_create_tag_category':
        result = await client.post('/tags/categories', {
          name: args.name,
          description: args.description,
        });
        break;

      case 'keap_list_tag_categories':
        result = await client.get('/tags/categories');
        break;

      case 'keap_list_tag_contacts':
        result = await client.get(`/tags/${args.tag_id}/contacts`, {
          limit: args.limit ?? 200,
          offset: args.offset ?? 0,
        });
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
