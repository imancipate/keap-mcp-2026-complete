import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createNotesTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_create_note',
      description: 'Create a note for a contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          title: { type: 'string', description: 'Note title' },
          body: { type: 'string', description: 'Note content' },
          type: { type: 'string', description: 'Note type (Appointment, Call, Email, etc.)' },
          user_id: { type: 'number', description: 'User ID who created the note' },
        },
        required: ['contact_id', 'body'],
      },
    },
    {
      name: 'keap_get_note',
      description: 'Retrieve a note by ID',
      inputSchema: {
        type: 'object',
        properties: {
          note_id: { type: 'number', description: 'Note ID' },
        },
        required: ['note_id'],
      },
    },
    {
      name: 'keap_update_note',
      description: 'Update an existing note',
      inputSchema: {
        type: 'object',
        properties: {
          note_id: { type: 'number', description: 'Note ID' },
          title: { type: 'string', description: 'Note title' },
          body: { type: 'string', description: 'Note content' },
          type: { type: 'string', description: 'Note type' },
        },
        required: ['note_id'],
      },
    },
    {
      name: 'keap_delete_note',
      description: 'Delete a note',
      inputSchema: {
        type: 'object',
        properties: {
          note_id: { type: 'number', description: 'Note ID to delete' },
        },
        required: ['note_id'],
      },
    },
    {
      name: 'keap_list_notes',
      description: 'List notes for a contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          user_id: { type: 'number', description: 'Filter by user who created notes' },
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
        },
      },
    },
    {
      name: 'keap_get_note_model',
      description: 'Get the note model schema',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
  ];
}

export async function handleNotesTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_create_note':
        result = await client.post('/notes', {
          contact_id: args.contact_id,
          title: args.title,
          body: args.body,
          type: args.type,
          user_id: args.user_id,
        });
        break;

      case 'keap_get_note':
        result = await client.get(`/notes/${args.note_id}`);
        break;

      case 'keap_update_note': {
        const { note_id, ...updateData } = args;
        result = await client.patch(`/notes/${note_id}`, updateData);
        break;
      }

      case 'keap_delete_note':
        await client.delete(`/notes/${args.note_id}`);
        result = { success: true, message: 'Note deleted successfully' };
        break;

      case 'keap_list_notes':
        result = await client.get('/notes', args);
        break;

      case 'keap_get_note_model':
        result = await client.get('/notes/model');
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
