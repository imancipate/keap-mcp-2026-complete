import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createFilesTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_upload_file',
      description: 'Upload a file to Keap',
      inputSchema: {
        type: 'object',
        properties: {
          file_name: { type: 'string', description: 'Name of the file' },
          file_data: { type: 'string', description: 'Base64 encoded file data' },
          contact_id: { type: 'number', description: 'Associate with contact ID' },
          is_public: { type: 'boolean', description: 'Make file publicly accessible', default: false },
        },
        required: ['file_name', 'file_data'],
      },
    },
    {
      name: 'keap_get_file',
      description: 'Retrieve file metadata by ID',
      inputSchema: {
        type: 'object',
        properties: {
          file_id: { type: 'number', description: 'File ID' },
        },
        required: ['file_id'],
      },
    },
    {
      name: 'keap_delete_file',
      description: 'Delete a file from Keap',
      inputSchema: {
        type: 'object',
        properties: {
          file_id: { type: 'number', description: 'File ID to delete' },
        },
        required: ['file_id'],
      },
    },
    {
      name: 'keap_list_files',
      description: 'List files with filtering',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Filter by contact' },
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
        },
      },
    },
  ];
}

export async function handleFilesTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_upload_file':
        result = await client.post('/files', {
          file_name: args.file_name,
          file_data: args.file_data,
          contact_id: args.contact_id,
          is_public: args.is_public || false,
        });
        break;

      case 'keap_get_file':
        result = await client.get(`/files/${args.file_id}`);
        break;

      case 'keap_delete_file':
        await client.delete(`/files/${args.file_id}`);
        result = { success: true, message: 'File deleted successfully' };
        break;

      case 'keap_list_files':
        result = await client.get('/files', args);
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
