import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createTasksTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_create_task',
      description: 'Create a new task in Keap',
      inputSchema: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Task title' },
          description: { type: 'string', description: 'Task description' },
          contact_id: { type: 'number', description: 'Associated contact ID' },
          due_date: { type: 'string', description: 'Due date (ISO format)' },
          remind_time: { type: 'number', description: 'Reminder time in minutes before due date' },
          user_id: { type: 'number', description: 'Assigned user ID' },
          priority: { type: 'number', description: 'Priority (1-5)', default: 3 },
          type: { type: 'string', description: 'Task type' },
        },
        required: ['title'],
      },
    },
    {
      name: 'keap_get_task',
      description: 'Retrieve a task by ID',
      inputSchema: {
        type: 'object',
        properties: {
          task_id: { type: 'number', description: 'Task ID' },
        },
        required: ['task_id'],
      },
    },
    {
      name: 'keap_update_task',
      description: 'Update an existing task',
      inputSchema: {
        type: 'object',
        properties: {
          task_id: { type: 'number', description: 'Task ID' },
          title: { type: 'string', description: 'Task title' },
          description: { type: 'string', description: 'Task description' },
          due_date: { type: 'string', description: 'Due date' },
          completed: { type: 'boolean', description: 'Mark as completed' },
          priority: { type: 'number', description: 'Priority' },
        },
        required: ['task_id'],
      },
    },
    {
      name: 'keap_delete_task',
      description: 'Delete a task',
      inputSchema: {
        type: 'object',
        properties: {
          task_id: { type: 'number', description: 'Task ID to delete' },
        },
        required: ['task_id'],
      },
    },
    {
      name: 'keap_list_tasks',
      description: 'List tasks with filtering and pagination',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
          user_id: { type: 'number', description: 'Filter by assigned user' },
          contact_id: { type: 'number', description: 'Filter by contact' },
          completed: { type: 'boolean', description: 'Filter by completion status' },
          since: { type: 'string', description: 'Tasks created after this date' },
          until: { type: 'string', description: 'Tasks created before this date' },
        },
      },
    },
    {
      name: 'keap_search_tasks',
      description: 'Search tasks by title, description, or other criteria',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search query' },
          limit: { type: 'number', description: 'Max results', default: 50 },
        },
      },
    },
    {
      name: 'keap_complete_task',
      description: 'Mark a task as completed',
      inputSchema: {
        type: 'object',
        properties: {
          task_id: { type: 'number', description: 'Task ID' },
          completion_date: { type: 'string', description: 'Completion date (ISO format)' },
        },
        required: ['task_id'],
      },
    },
    {
      name: 'keap_get_task_model',
      description: 'Get the task model schema',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
  ];
}

export async function handleTasksTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_create_task':
        result = await client.post('/tasks', {
          title: args.title,
          description: args.description,
          contact: args.contact_id ? { id: args.contact_id } : undefined,
          due_date: args.due_date,
          remind_time: args.remind_time,
          user_id: args.user_id,
          priority: args.priority || 3,
          type: args.type,
        });
        break;

      case 'keap_get_task':
        result = await client.get(`/tasks/${args.task_id}`);
        break;

      case 'keap_update_task': {
        const { task_id, ...updateData } = args;
        result = await client.patch(`/tasks/${task_id}`, updateData);
        break;
      }

      case 'keap_delete_task':
        await client.delete(`/tasks/${args.task_id}`);
        result = { success: true, message: 'Task deleted successfully' };
        break;

      case 'keap_list_tasks':
        result = await client.get('/tasks', args);
        break;

      case 'keap_search_tasks':
        result = await client.get('/tasks/search', args);
        break;

      case 'keap_complete_task':
        result = await client.patch(`/tasks/${args.task_id}`, {
          completed: true,
          completion_date: args.completion_date || new Date().toISOString(),
        });
        break;

      case 'keap_get_task_model':
        result = await client.get('/tasks/model');
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
