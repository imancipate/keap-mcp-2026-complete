import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

export function createEcommerceTools(client: KeapClient): Tool[] {
  return [
    // Products
    {
      name: 'keap_create_product',
      description: 'Create a new product in Keap',
      inputSchema: {
        type: 'object',
        properties: {
          product_name: { type: 'string', description: 'Product name' },
          product_short_desc: { type: 'string', description: 'Short description' },
          product_desc: { type: 'string', description: 'Full description' },
          product_price: { type: 'number', description: 'Product price' },
          sku: { type: 'string', description: 'SKU code' },
          subscription_only: { type: 'boolean', description: 'Is subscription-only product', default: false },
          url: { type: 'string', description: 'Product URL' },
        },
        required: ['product_name', 'product_price'],
      },
    },
    {
      name: 'keap_get_product',
      description: 'Retrieve a product by ID',
      inputSchema: {
        type: 'object',
        properties: {
          product_id: { type: 'number', description: 'Product ID' },
        },
        required: ['product_id'],
      },
    },
    {
      name: 'keap_update_product',
      description: 'Update an existing product',
      inputSchema: {
        type: 'object',
        properties: {
          product_id: { type: 'number', description: 'Product ID' },
          product_name: { type: 'string', description: 'Product name' },
          product_price: { type: 'number', description: 'Product price' },
          sku: { type: 'string', description: 'SKU code' },
          status: { type: 'number', description: 'Status (0=inactive, 1=active)' },
        },
        required: ['product_id'],
      },
    },
    {
      name: 'keap_delete_product',
      description: 'Delete a product',
      inputSchema: {
        type: 'object',
        properties: {
          product_id: { type: 'number', description: 'Product ID to delete' },
        },
        required: ['product_id'],
      },
    },
    {
      name: 'keap_list_products',
      description: 'List all products with pagination',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
          active: { type: 'boolean', description: 'Filter by active status' },
        },
      },
    },
    // Orders
    {
      name: 'keap_create_order',
      description: 'Create a new order in Keap',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          order_title: { type: 'string', description: 'Order title' },
          order_type: { type: 'string', description: 'Order type (Online, Offline)', default: 'Online' },
          order_items: { type: 'array', items: { type: 'object' }, description: 'Array of order items' },
          promo_codes: { type: 'array', items: { type: 'string' }, description: 'Promo codes to apply' },
        },
        required: ['contact_id', 'order_title', 'order_items'],
      },
    },
    {
      name: 'keap_get_order',
      description: 'Retrieve an order by ID',
      inputSchema: {
        type: 'object',
        properties: {
          order_id: { type: 'number', description: 'Order ID' },
        },
        required: ['order_id'],
      },
    },
    {
      name: 'keap_delete_order',
      description: 'Delete an order',
      inputSchema: {
        type: 'object',
        properties: {
          order_id: { type: 'number', description: 'Order ID to delete' },
        },
        required: ['order_id'],
      },
    },
    {
      name: 'keap_list_orders',
      description: 'List orders with filtering',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Filter by contact' },
          product_id: { type: 'number', description: 'Filter by product' },
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
          since: { type: 'string', description: 'Orders after this date' },
          until: { type: 'string', description: 'Orders before this date' },
          paid: { type: 'boolean', description: 'Filter by paid status' },
        },
      },
    },
    {
      name: 'keap_list_order_transactions',
      description: 'Get all transactions for an order',
      inputSchema: {
        type: 'object',
        properties: {
          order_id: { type: 'number', description: 'Order ID' },
        },
        required: ['order_id'],
      },
    },
    // Transactions
    {
      name: 'keap_get_transaction',
      description: 'Retrieve a transaction by ID',
      inputSchema: {
        type: 'object',
        properties: {
          transaction_id: { type: 'number', description: 'Transaction ID' },
        },
        required: ['transaction_id'],
      },
    },
    {
      name: 'keap_list_transactions',
      description: 'List transactions with filtering',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Filter by contact' },
          limit: { type: 'number', description: 'Results per page', default: 50 },
          offset: { type: 'number', description: 'Pagination offset', default: 0 },
          since: { type: 'string', description: 'Transactions after this date' },
          until: { type: 'string', description: 'Transactions before this date' },
        },
      },
    },
    // Subscriptions
    {
      name: 'keap_create_subscription',
      description: 'Create a subscription for a contact',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Contact ID' },
          product_id: { type: 'number', description: 'Product ID' },
          subscription_plan_id: { type: 'number', description: 'Subscription plan ID' },
          quantity: { type: 'number', description: 'Quantity', default: 1 },
          billing_amount: { type: 'number', description: 'Billing amount' },
          credit_card_id: { type: 'number', description: 'Credit card ID for payment' },
        },
        required: ['contact_id', 'product_id', 'subscription_plan_id'],
      },
    },
    {
      name: 'keap_get_subscription',
      description: 'Retrieve a subscription by ID',
      inputSchema: {
        type: 'object',
        properties: {
          subscription_id: { type: 'number', description: 'Subscription ID' },
        },
        required: ['subscription_id'],
      },
    },
    {
      name: 'keap_list_subscriptions',
      description: 'List subscriptions with filtering',
      inputSchema: {
        type: 'object',
        properties: {
          contact_id: { type: 'number', description: 'Filter by contact' },
          active: { type: 'boolean', description: 'Filter by active status' },
          limit: { type: 'number', description: 'Results per page', default: 50 },
        },
      },
    },
  ];
}

export async function handleEcommerceTool(
  toolName: string,
  args: any,
  client: KeapClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let result: any;

  try {
    switch (toolName) {
      // Products
      case 'keap_create_product':
        result = await client.post('/products', args);
        break;

      case 'keap_get_product':
        result = await client.get(`/products/${args.product_id}`);
        break;

      case 'keap_update_product': {
        const { product_id, ...updateData } = args;
        result = await client.patch(`/products/${product_id}`, updateData);
        break;
      }

      case 'keap_delete_product':
        await client.delete(`/products/${args.product_id}`);
        result = { success: true, message: 'Product deleted successfully' };
        break;

      case 'keap_list_products':
        result = await client.get('/products', args);
        break;

      // Orders
      case 'keap_create_order':
        result = await client.post('/orders', {
          contact_id: args.contact_id,
          order_title: args.order_title,
          order_type: args.order_type || 'Online',
          order_items: args.order_items,
          promo_codes: args.promo_codes,
        });
        break;

      case 'keap_get_order':
        result = await client.get(`/orders/${args.order_id}`);
        break;

      case 'keap_delete_order':
        await client.delete(`/orders/${args.order_id}`);
        result = { success: true, message: 'Order deleted successfully' };
        break;

      case 'keap_list_orders':
        result = await client.get('/orders', args);
        break;

      case 'keap_list_order_transactions':
        result = await client.get(`/orders/${args.order_id}/transactions`);
        break;

      // Transactions
      case 'keap_get_transaction':
        result = await client.get(`/transactions/${args.transaction_id}`);
        break;

      case 'keap_list_transactions':
        result = await client.get('/transactions', args);
        break;

      // Subscriptions
      case 'keap_create_subscription':
        result = await client.post('/subscriptions', args);
        break;

      case 'keap_get_subscription':
        result = await client.get(`/subscriptions/${args.subscription_id}`);
        break;

      case 'keap_list_subscriptions':
        result = await client.get('/subscriptions', args);
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
