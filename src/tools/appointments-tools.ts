import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createAppointmentsTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_create_appointment',
      description: 'Create a new appointment in Keap',
      inputSchema: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Appointment title' },
          start_date: { type: 'string', description: 'Start date/time (ISO format)' },
          end_date: { type: 'string', description: 'End date/time (ISO format)' },
          description: { type: 'string', description: 'Appointment description' },
          location: { type: 'string', description: 'Location' },
          contact_id: { type: 'number', description: 'Associated contact ID' },
          user_id: { type: 'number', description: 'Assigned user ID' },
          remind_time: { type: 'number', description: 'Reminder time in minutes before appointment' },
          all_day: { type: 'boolean', description: 'Is this an all-day event?', default: false },
        },
        required: ['title', 'start_date', 'end_date'],
      },
    },
    {
      name: 'keap_get_appointment',
      description: 'Retrieve an appointment by ID',
      inputSchema: {
        type: 'object',
        properties: {
          appointment_id: { type: 'number', description: 'Appointment ID' },
        },
        required: ['appointment_id'],
      },
    },
    {
      name: 'keap_update_appointment',
      description: 'Update an existing appointment',
      inputSchema: {
        type: 'object',
        properties: {
          appointment_id: { type: 'number', description: 'Appointment ID' },
          title: { type: 'string', description: 'Appointment title' },
          start_date: { type: 'string', description: 'Start date/time' },
          end_date: { type: 'string', description: 'End date/time' },
          description: { type: 'string', description: 'Description' },
          location: { type: 'string', description: 'Location' },
        },
        required: ['appointment_id'],
      },
    },
    {
      name: 'keap_delete_appointment',
      description: 'Delete an appointment',
      inputSchema: {
        type: 'object',
        properties: {
          appointment_id: { type: 'number', description: 'Appointment ID to delete' },
        },
        required: ['appointment_id'],
      },
    },
    {
      name: 'keap_list_appointments',
      description: 'List appointments with filtering and pagination',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
          user_id: { type: 'number', description: 'Filter by user' },
          contact_id: { type: 'number', description: 'Filter by contact' },
          since: { type: 'string', description: 'Appointments after this date' },
          until: { type: 'string', description: 'Appointments before this date' },
        },
      },
    },
    {
      name: 'keap_get_appointment_model',
      description: 'Get the appointment model schema',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
  ];
}

export async function handleAppointmentsTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_create_appointment':
        result = await client.post('/appointments', {
          title: args.title,
          start_date: args.start_date,
          end_date: args.end_date,
          description: args.description,
          location: args.location,
          contact: args.contact_id ? { id: args.contact_id } : undefined,
          user: args.user_id,
          remind_time: args.remind_time,
          all_day: args.all_day || false,
        });
        break;

      case 'keap_get_appointment':
        result = await client.get(`/appointments/${args.appointment_id}`);
        break;

      case 'keap_update_appointment': {
        const { appointment_id, ...updateData } = args;
        result = await client.patch(`/appointments/${appointment_id}`, updateData);
        break;
      }

      case 'keap_delete_appointment':
        await client.delete(`/appointments/${args.appointment_id}`);
        result = { success: true, message: 'Appointment deleted successfully' };
        break;

      case 'keap_list_appointments':
        result = await client.get('/appointments', args);
        break;

      case 'keap_get_appointment_model':
        result = await client.get('/appointments/model');
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
