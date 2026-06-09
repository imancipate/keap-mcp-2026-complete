import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createEmailsTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_send_email',
      description: 'Send an email to one or more contacts',
      inputSchema: {
        type: 'object',
        properties: {
          contacts: { type: 'array', items: { type: 'number' }, description: 'Array of contact IDs' },
          subject: { type: 'string', description: 'Email subject' },
          html_content: { type: 'string', description: 'HTML content of email' },
          text_content: { type: 'string', description: 'Plain text content of email' },
          from_address: { type: 'string', description: 'From email address' },
          reply_to_address: { type: 'string', description: 'Reply-to email address' },
          attachments: { type: 'array', items: { type: 'object' }, description: 'Email attachments' },
        },
        required: ['contacts', 'subject'],
      },
    },
    {
      name: 'keap_get_email',
      description: 'Retrieve an email by ID',
      inputSchema: {
        type: 'object',
        properties: {
          email_id: { type: 'number', description: 'Email ID' },
        },
        required: ['email_id'],
      },
    },
    {
      name: 'keap_list_emails',
      description: 'List emails with filtering',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Filter by contact' },
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
          since: { type: 'string', description: 'Emails sent after this date' },
          until: { type: 'string', description: 'Emails sent before this date' },
        },
      },
    },
    {
      name: 'keap_create_email_template',
      description: 'Create an email template',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Template name' },
          subject: { type: 'string', description: 'Email subject' },
          html_content: { type: 'string', description: 'HTML content' },
          text_content: { type: 'string', description: 'Plain text content' },
        },
        required: ['name', 'subject'],
      },
    },
    {
      name: 'keap_list_email_templates',
      description: 'List all email templates',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Results per page', default: 50 },
        },
      },
    },
    {
      name: 'keap_opt_in_contact',
      description: 'Opt in a contact to email communications',
      inputSchema: {
        type: 'object',
        properties: {
          email: { type: 'string', description: 'Email address' },
          opt_in_reason: { type: 'string', description: 'Reason for opt-in' },
        },
        required: ['email', 'opt_in_reason'],
      },
    },
    {
      name: 'keap_opt_out_contact',
      description: 'Opt out a contact from email communications',
      inputSchema: {
        type: 'object',
        properties: {
          email: { type: 'string', description: 'Email address' },
        },
        required: ['email'],
      },
    },
  ];
}

export async function handleEmailsTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_send_email':
        result = await client.post('/emails', {
          contacts: args.contacts,
          subject: args.subject,
          html_content: args.html_content,
          text_content: args.text_content,
          sent_from_address: args.from_address,
          sent_from_reply_address: args.reply_to_address,
          attachments: args.attachments,
        });
        break;

      case 'keap_get_email':
        result = await client.get(`/emails/${args.email_id}`);
        break;

      case 'keap_list_emails':
        result = await client.get('/emails', args);
        break;

      case 'keap_create_email_template':
        result = await client.post('/emails/templates', {
          name: args.name,
          subject: args.subject,
          html_content: args.html_content,
          text_content: args.text_content,
        });
        break;

      case 'keap_list_email_templates':
        result = await client.get('/emails/templates', { limit: args.limit });
        break;

      case 'keap_opt_in_contact':
        result = await client.post('/emails/optIn', {
          email: args.email,
          opt_in_reason: args.opt_in_reason,
        });
        break;

      case 'keap_opt_out_contact':
        result = await client.post('/emails/optOut', {
          email: args.email,
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
