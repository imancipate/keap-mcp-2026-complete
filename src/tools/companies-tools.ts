import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createCompaniesTools(client: KeapClient): Tool[] {
  return [
    {
      name: 'keap_create_company',
      description: 'Create a new company in Keap',
      inputSchema: {
        type: 'object',
        properties: {
          company_name: { type: 'string', description: 'Company name' },
          email: { type: 'string', description: 'Company email' },
          phone: { type: 'string', description: 'Company phone' },
          address_line1: { type: 'string', description: 'Street address' },
          city: { type: 'string', description: 'City' },
          state: { type: 'string', description: 'State/Region' },
          postal_code: { type: 'string', description: 'Postal code' },
          country: { type: 'string', description: 'Country code' },
          website: { type: 'string', description: 'Company website' },
          notes: { type: 'string', description: 'Notes about the company' },
        },
        required: ['company_name'],
      },
    },
    {
      name: 'keap_get_company',
      description: 'Retrieve a company by ID',
      inputSchema: {
        type: 'object',
        properties: {
          company_id: { type: 'number', description: 'Company ID' },
        },
        required: ['company_id'],
      },
    },
    {
      name: 'keap_update_company',
      description: 'Update an existing company',
      inputSchema: {
        type: 'object',
        properties: {
          company_id: { type: 'number', description: 'Company ID' },
          company_name: { type: 'string', description: 'Company name' },
          email: { type: 'string', description: 'Company email' },
          phone: { type: 'string', description: 'Company phone' },
          website: { type: 'string', description: 'Company website' },
          notes: { type: 'string', description: 'Notes' },
        },
        required: ['company_id'],
      },
    },
    {
      name: 'keap_list_companies',
      description: 'List all companies with pagination',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
          company_name: { type: 'string', description: 'Filter by company name' },
          order: { type: 'string', description: 'Order by field' },
        },
      },
    },
    {
      name: 'keap_get_company_contacts',
      description: 'Get all contacts associated with a company',
      inputSchema: {
        type: 'object',
        properties: {
          company_id: { type: 'number', description: 'Company ID' },
          limit: { type: 'number', description: 'Max results', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
        },
        required: ['company_id'],
      },
    },
  ];
}

export async function handleCompaniesTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      case 'keap_create_company':
        result = await client.post('/companies', {
          company_name: args.company_name,
          email_address: args.email ? { email: args.email } : undefined,
          phone_number: args.phone ? { number: args.phone } : undefined,
          address: args.address_line1 ? {
            line1: args.address_line1,
            locality: args.city,
            region: args.state,
            postal_code: args.postal_code,
            country_code: args.country,
          } : undefined,
          website: args.website,
          notes: args.notes,
        });
        break;

      case 'keap_get_company':
        result = await client.get(`/companies/${args.company_id}`);
        break;

      case 'keap_update_company': {
        const { company_id, ...updateData } = args;
        result = await client.patch(`/companies/${company_id}`, updateData);
        break;
      }

      case 'keap_list_companies':
        result = await client.get('/companies', args);
        break;

      case 'keap_get_company_contacts':
        result = await client.get(`/companies/${args.company_id}/contacts`, {
          limit: args.limit,
          offset: args.offset,
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
