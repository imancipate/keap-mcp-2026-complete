import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';
import { KeapContact, ApiResponse } from '../types/index.js';

export function createContactsTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_create_contact',
      description: 'Create a new contact in Keap with email, name, phone, address, tags, and custom fields',
      inputSchema: {
        type: 'object',
        properties: {
          given_name: { type: 'string', description: 'First name' },
          family_name: { type: 'string', description: 'Last name' },
          email: { type: 'string', description: 'Primary email address' },
          phone: { type: 'string', description: 'Primary phone number' },
          company_name: { type: 'string', description: 'Company name' },
          job_title: { type: 'string', description: 'Job title' },
          tag_ids: { type: 'array', items: { type: 'number' }, description: 'Array of tag IDs to apply' },
          custom_fields: { type: 'array', items: { type: 'object' }, description: 'Custom field values [{id, content}]' },
          address_line1: { type: 'string', description: 'Street address line 1' },
          address_line2: { type: 'string', description: 'Street address line 2' },
          city: { type: 'string', description: 'City' },
          state: { type: 'string', description: 'State/Region' },
          postal_code: { type: 'string', description: 'Postal/ZIP code' },
          country: { type: 'string', description: 'Country code (e.g., US)' },
          opt_in_reason: { type: 'string', description: 'Reason for opt-in (required for GDPR)' },
          owner_id: { type: 'number', description: 'User ID of contact owner' },
        },
      },
    },
    {
      name: 'keap_get_contact',
      description: 'Retrieve a contact by ID with all details including tags, custom fields, and company',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          optional_properties: { type: 'array', items: { type: 'string' }, description: 'Additional fields to include' },
        },
        required: ['contact_id'],
      },
    },
    {
      name: 'keap_update_contact',
      description: 'Update an existing contact with new information',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          given_name: { type: 'string', description: 'First name' },
          family_name: { type: 'string', description: 'Last name' },
          email: { type: 'string', description: 'Primary email address' },
          phone: { type: 'string', description: 'Primary phone number' },
          company_name: { type: 'string', description: 'Company name' },
          job_title: { type: 'string', description: 'Job title' },
          tag_ids: { type: 'array', items: { type: 'number' }, description: 'Array of tag IDs' },
          custom_fields: { type: 'array', items: { type: 'object' }, description: 'Custom field values' },
          owner_id: { type: 'number', description: 'User ID of contact owner' },
        },
        required: ['contact_id'],
      },
    },
    {
      name: 'keap_delete_contact',
      description: 'Permanently delete a contact from Keap',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID to delete' },
        },
        required: ['contact_id'],
      },
    },
    {
      name: 'keap_list_contacts',
      description: 'List contacts with pagination, filtering, and sorting options',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Number of results per page (max 200)', default: 50 },
          offset: { type: 'number', description: 'Offset for pagination', default: 0 },
          email: { type: 'string', description: 'Filter by email address' },
          given_name: { type: 'string', description: 'Filter by first name' },
          family_name: { type: 'string', description: 'Filter by last name' },
          order: { type: 'string', description: 'Field to order by (e.g., date_created, email)', default: 'date_created' },
          order_direction: { type: 'string', enum: ['ascending', 'descending'], description: 'Sort direction' },
          since: { type: 'string', description: 'Filter contacts created/updated after this ISO date' },
          until: { type: 'string', description: 'Filter contacts created/updated before this ISO date' },
        },
      },
    },
    {
      name: 'keap_search_contacts',
      description: 'Search contacts by email, name, phone, or other criteria',
      inputSchema: {
        type: 'object',
        properties: {
          email: { type: 'string', description: 'Search by email address' },
          given_name: { type: 'string', description: 'Search by first name' },
          family_name: { type: 'string', description: 'Search by last name' },
          limit: { type: 'number', description: 'Max results', default: 50 },
        },
      },
    },
    {
      name: 'keap_merge_contacts',
      description: 'Merge two contacts together, combining all data into one contact',
      inputSchema: {
        type: 'object',
        properties: {
          source_contact_id: { type: 'number', description: 'Contact ID to merge from (will be deleted)' },
          target_contact_id: { type: 'number', description: 'Contact ID to merge into (will be kept)' },
        },
        required: ['source_contact_id', 'target_contact_id'],
      },
    },
    {
      name: 'keap_apply_tag_to_contact',
      description: 'Apply one or more tags to a contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          tag_ids: { type: 'array', items: { type: 'number' }, description: 'Array of tag IDs to apply' },
        },
        required: ['contact_id', 'tag_ids'],
      },
    },
    {
      name: 'keap_remove_tag_from_contact',
      description: 'Remove one or more tags from a contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          tag_ids: { type: 'array', items: { type: 'number' }, description: 'Array of tag IDs to remove' },
        },
        required: ['contact_id', 'tag_ids'],
      },
    },
    {
      name: 'keap_get_contact_tags',
      description: 'Get all tags applied to a specific contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
        },
        required: ['contact_id'],
      },
    },
    {
      name: 'keap_get_contact_emails',
      description: 'Get all email addresses associated with a contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
        },
        required: ['contact_id'],
      },
    },
    {
      name: 'keap_create_contact_email',
      description: 'Add a new email address to a contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          email: { type: 'string', description: 'Email address' },
          field: { type: 'string', description: 'Field type (EMAIL1, EMAIL2, EMAIL3)', default: 'EMAIL1' },
        },
        required: ['contact_id', 'email'],
      },
    },
    {
      name: 'keap_delete_contact_email',
      description: 'Remove an email address from a contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          email_id: { type: 'number', description: 'Email ID to remove' },
        },
        required: ['contact_id', 'email_id'],
      },
    },
    {
      name: 'keap_get_contact_credit_cards',
      description: 'Get all credit cards on file for a contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
        },
        required: ['contact_id'],
      },
    },
    {
      name: 'keap_create_contact_credit_card',
      description: 'Add a new credit card to a contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          card_number: { type: 'string', description: 'Credit card number' },
          expiration_month: { type: 'string', description: 'Expiration month (MM)' },
          expiration_year: { type: 'string', description: 'Expiration year (YYYY)' },
          card_type: { type: 'string', description: 'Card type (Visa, Mastercard, etc.)' },
          name_on_card: { type: 'string', description: 'Name as shown on card' },
        },
        required: ['contact_id', 'card_number', 'expiration_month', 'expiration_year'],
      },
    },
    {
      name: 'keap_get_contact_custom_fields',
      description: 'Retrieve custom field values for a contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
        },
        required: ['contact_id'],
      },
    },
    {
      name: 'keap_update_contact_custom_field',
      description: 'Update a specific custom field value for a contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          custom_field_id: { type: 'number', description: 'Custom field ID' },
          content: { type: 'string', description: 'New value for the custom field' },
        },
        required: ['contact_id', 'custom_field_id', 'content'],
      },
    },
    {
      name: 'keap_list_contact_notes',
      description: 'Get all notes for a specific contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          limit: { type: 'number', description: 'Max results', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
        },
        required: ['contact_id'],
      },
    },
    {
      name: 'keap_get_contact_model',
      description: 'Retrieve the contact model schema including all available custom fields',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
  ];
}

export async function handleContactsTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_create_contact': {
        const contactData: any = {
          given_name: args.given_name,
          family_name: args.family_name,
          opt_in_reason: args.opt_in_reason,
        };

        if (args.email) {
          contactData.email_addresses = [{ email: args.email, field: 'EMAIL1' }];
        }

        if (args.phone) {
          contactData.phone_numbers = [{ number: args.phone, field: 'PHONE1' }];
        }

        if (args.address_line1 || args.city) {
          contactData.addresses = [{
            line1: args.address_line1,
            line2: args.address_line2,
            locality: args.city,
            region: args.state,
            postal_code: args.postal_code,
            country_code: args.country || 'US',
          }];
        }

        if (args.company_name) {
          contactData.company = { company_name: args.company_name };
        }

        if (args.job_title) contactData.job_title = args.job_title;
        if (args.tag_ids) contactData.tag_ids = args.tag_ids;
        if (args.custom_fields) contactData.custom_fields = args.custom_fields;
        if (args.owner_id) contactData.owner_id = args.owner_id;

        result = await client.post('/contacts', contactData);
        break;
      }

      case 'keap_get_contact':
        result = await client.get(`/contacts/${args.contact_id}`, {
          optional_properties: args.optional_properties?.join(','),
        });
        break;

      case 'keap_update_contact': {
        const { contact_id, ...updateData } = args;
        result = await client.patch(`/contacts/${contact_id}`, updateData);
        break;
      }

      case 'keap_delete_contact':
        await client.delete(`/contacts/${args.contact_id}`);
        result = { success: true, message: 'Contact deleted successfully' };
        break;

      case 'keap_list_contacts':
        result = await client.get('/contacts', args);
        break;

      case 'keap_search_contacts':
        result = await client.get('/contacts', args);
        break;

      case 'keap_merge_contacts':
        result = await client.post(`/contacts/${args.target_contact_id}/merge`, {
          duplicate_contact_id: args.source_contact_id,
        });
        break;

      case 'keap_apply_tag_to_contact':
        result = await client.post(`/contacts/${args.contact_id}/tags`, {
          tagIds: args.tag_ids,
        });
        break;

      case 'keap_remove_tag_from_contact':
        for (const tagId of args.tag_ids) {
          await client.delete(`/contacts/${args.contact_id}/tags/${tagId}`);
        }
        result = { success: true, message: 'Tags removed successfully' };
        break;

      case 'keap_get_contact_tags':
        result = await client.get(`/contacts/${args.contact_id}/tags`);
        break;

      case 'keap_get_contact_emails':
        result = await client.get(`/contacts/${args.contact_id}/emails`);
        break;

      case 'keap_create_contact_email':
        result = await client.post(`/contacts/${args.contact_id}/emails`, {
          email: args.email,
          field: args.field || 'EMAIL1',
        });
        break;

      case 'keap_delete_contact_email':
        await client.delete(`/contacts/${args.contact_id}/emails/${args.email_id}`);
        result = { success: true, message: 'Email deleted successfully' };
        break;

      case 'keap_get_contact_credit_cards':
        result = await client.get(`/contacts/${args.contact_id}/creditCards`);
        break;

      case 'keap_create_contact_credit_card':
        result = await client.post(`/contacts/${args.contact_id}/creditCards`, {
          card_number: args.card_number,
          expiration_month: args.expiration_month,
          expiration_year: args.expiration_year,
          card_type: args.card_type,
          name_on_card: args.name_on_card,
        });
        break;

      case 'keap_get_contact_custom_fields':
        result = await client.get(`/contacts/${args.contact_id}?optional_properties=custom_fields`);
        break;

      case 'keap_update_contact_custom_field':
        result = await client.patch(`/contacts/${args.contact_id}`, {
          custom_fields: [{ id: args.custom_field_id, content: args.content }],
        });
        break;

      case 'keap_list_contact_notes':
        result = await client.get(`/contacts/${args.contact_id}/notes`, {
          limit: args.limit,
          offset: args.offset,
        });
        break;

      case 'keap_get_contact_model':
        result = await client.get('/contacts/model');
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
