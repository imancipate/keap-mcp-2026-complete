// AUTO-GENERATED from Keap v2 OpenAPI (keap_v2.yml). Do not hand-edit.
// 113 net-new v2 operations the v1 MCP lacks. Regenerate via /tmp/gen_v2_tools.py.
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from '../clients/keap.js';

interface V2Op {
  name: string;
  description: string;
  method: string;
  url: string;
  pathParams: string[];
  query: string[];
  body: string[];
  inputSchema: any;
}

const V2_OPS: V2Op[] = [
  {
    "name": "keap_v2_unpublish_automation",
    "description": "Unpublish an Automation",
    "method": "PUT",
    "url": "/automations/{automation_id}/unpublish",
    "pathParams": [
      "automation_id"
    ],
    "query": [],
    "body": [
      "unpublished_form_message"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "automation_id": {
          "type": "string",
          "description": "Path parameter: automation_id"
        },
        "unpublished_form_message": {
          "type": "string",
          "description": "Custom message to display on forms when the automation is unpublished"
        }
      },
      "required": [
        "automation_id"
      ]
    }
  },
  {
    "name": "keap_v2_set_merchant_gateway_as_default",
    "description": "Set default Merchant Account",
    "method": "POST",
    "url": "/sales/merchants/{id}:setDefault",
    "pathParams": [
      "id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Path parameter: id"
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "keap_v2_run_report",
    "description": "Run a Report",
    "method": "POST",
    "url": "/reporting/reports/{report_id}:run",
    "pathParams": [
      "report_id"
    ],
    "query": [
      "runReportRequest"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "report_id": {
          "type": "string",
          "description": "Path parameter: report_id"
        },
        "runReportRequest": {
          "type": "string"
        }
      },
      "required": [
        "report_id",
        "runReportRequest"
      ]
    }
  },
  {
    "name": "keap_v2_list_referrals",
    "description": "List Referrals",
    "method": "GET",
    "url": "/referrals",
    "pathParams": [],
    "query": [
      "filter",
      "page_token",
      "order_by",
      "page_size"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `referral_partner_id` - Allowable operators: \"==\", \"<=\", \"<\", \">=\", \">\", \"!=\"\n- (String) `contact_id` - Allowable operators: \"==\", \"<=\", \"<\", \">=\", \">\", \"!=\"\n- (String) `source` - Wildcard matching allowed\n- (String) `description` - Wildcard matching allowed\n- (String) `type` (Allowed values: `COOKIE`, `PERMANENT`, `MANUAL`)\n\nYou will need to apply the `==` operator (or other supported operators) to check the equality\nof one of the filters with your searched word, in the encoded form `%3D%3D`. For the filters listed above,\nhere are some examples:\n- `filter=referral_partner_id%3D%3D123`\n- `filter=referral_partner_id%3E10` (referral_partner_id > 10)\n- `filter=contact_id%3D%3D456`\n- `filter=contact_id%3C%3D100` (contact_id <= 100)\n- `filter=source%3D%3DEmail Marketing`\n- `filter=source%3D%3DEmail*` (starts with \"Email\")\n- `filter=description%3D%3DReferred*` (starts with \"Referred\")\n- `filter=type%3D%3DCOOKIE`\n- `filter=referral_partner_id%3D%3D123%3Bcontact_id%3D%3D456`\n\nFor fields which allow wildcard matching, you may use the * wildcard character (or its encoded form %2A)\nfor case-insensitive partial matching on text fields. Example of a valid pattern of wildcard usage:\n- `field==foo*` finds anything in `field` that begins with `foo`\n"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `referral_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_referral",
    "description": "Create a Referral",
    "method": "POST",
    "url": "/referrals",
    "pathParams": [],
    "query": [],
    "body": [
      "description",
      "source",
      "contact_id",
      "referral_partner_id",
      "referral_time",
      "expiration_time",
      "ip_address",
      "referral_type"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string",
          "description": "The referral description."
        },
        "source": {
          "type": "string",
          "description": "The source for the referral."
        },
        "contact_id": {
          "type": "string",
          "description": "The referral's contact ID."
        },
        "referral_partner_id": {
          "type": "string",
          "description": "The referring affiliate ID."
        },
        "referral_time": {
          "type": "string",
          "description": "The time of the referral."
        },
        "expiration_time": {
          "type": "string",
          "description": "When the referral expires."
        },
        "ip_address": {
          "type": "string",
          "description": "The IP address of the referral."
        },
        "referral_type": {
          "type": "string",
          "description": "The referral type."
        }
      },
      "required": [
        "contact_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_subscription_plans",
    "description": "List Subscription Plans",
    "method": "GET",
    "url": "/products/{product_id}/subscriptions",
    "pathParams": [
      "product_id"
    ],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (Boolean) `active`: true or false\n- (BillingCycle) `cycle_type`: DAILY, WEEKLY, MONTHLY, YEARLY\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=active%3D%3Dtrue`\n- `filter=cycle_type%3D%3DDAILY`\n- `filter=active%3D%3Dfalse%3Bcycle_type%3D%3DWEEKLY`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `product_id`\n\nOne of the following directions:\n- `asc`\n- `desc`\n"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      },
      "required": [
        "product_id"
      ]
    }
  },
  {
    "name": "keap_v2_create_subscription_plans",
    "description": "Create Subscription Plan",
    "method": "POST",
    "url": "/products/{product_id}/subscriptions",
    "pathParams": [
      "product_id"
    ],
    "query": [],
    "body": [
      "active",
      "frequency",
      "allow_prorating",
      "cycle_type",
      "display_order_index",
      "plan_price",
      "total_cycles"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        },
        "active": {
          "type": "boolean",
          "description": "Whether the subscription plan is active."
        },
        "frequency": {
          "type": "number",
          "description": "The frequency of the subscription plan. Must be greater than 0. Default is 1."
        },
        "allow_prorating": {
          "type": "boolean",
          "description": "Allow prorating of the subscription plan."
        },
        "cycle_type": {
          "type": "string",
          "description": "The cycle type of the subscription plan."
        },
        "display_order_index": {
          "type": "number",
          "description": "The order that this plan will be displayed to the user. Lower values indicate higher priority in order."
        },
        "plan_price": {
          "type": "number",
          "description": "The price of the subscription plan in the smallest currency unit. Must be greater than or equal to 0."
        },
        "total_cycles": {
          "type": "number",
          "description": "How many cycles the subscription plan will have. 0 means infinite."
        }
      },
      "required": [
        "product_id",
        "cycle_type",
        "plan_price"
      ]
    }
  },
  {
    "name": "keap_v2_list_product_interest_bundles",
    "description": "List Product Interest Bundles",
    "method": "GET",
    "url": "/productInterestBundles",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `name`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n\nOne of the following directions:\n- `asc`\n- `desc`\n"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_product_interest_bundle",
    "description": "Create a Product Interest Bundle",
    "method": "POST",
    "url": "/productInterestBundles",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "description"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Product interest bundle name"
        },
        "description": {
          "type": "string",
          "description": "Product interest bundle description"
        }
      },
      "required": [
        "name",
        "description"
      ]
    }
  },
  {
    "name": "keap_v2_add_product_interest",
    "description": "Create a Product Interest in an existing Bundle",
    "method": "POST",
    "url": "/productInterestBundles/{id}/interests",
    "pathParams": [
      "id"
    ],
    "query": [],
    "body": [
      "type",
      "entity_id",
      "price",
      "quantity",
      "discount_percent"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Path parameter: id"
        },
        "type": {
          "type": "string",
          "description": "The product interest type."
        },
        "entity_id": {
          "type": "string",
          "description": "The `product_id` (when the `type` is set to `PRODUCT`)\n or the `subscription_plan_id` (when the `type` is set to `SUBSCRIPTION_PLAN`).\n"
        },
        "price": {
          "type": "number",
          "description": "The price per unit of the product."
        },
        "quantity": {
          "type": "number",
          "description": "Defaults to `1`."
        },
        "discount_percent": {
          "type": "number",
          "description": "Defaults to `0`."
        }
      },
      "required": [
        "id",
        "type",
        "entity_id",
        "price"
      ]
    }
  },
  {
    "name": "keap_v2_list_product_categories",
    "description": "List all Product Categories",
    "method": "GET",
    "url": "/productCategories",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `product_id`\n- (String) `name` - Wildcard matching allowed\n- (Number) `product_category_id` - supports comparison operators: `==`,`!=`, `>`, `<`, `>=`, `<=`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`.\n\nFor fields which allow wildcard matching, you may use the * wildcard character (or its encoded form %2A)\nfor case-insensitive partial matching on text fields. Example of a valid pattern of wildcard usage:\n- `field==foo*` finds anything in `field` that begins with `foo`\n\nFor the filters listed above, here are some examples:\n- `filter=product_id%3D%3D29`\n- `filter=name%3D%3DTestSearch`\n- `filter=name%3D%3DElec*` (starts with \"Elec\")\n- `filter=product_category_id>5` (category ID greater than 5)\n- `filter=product_category_id>=10` (category ID greater than or equal to 10)\n- `filter=product_category_id%3D%3D42` (category ID equals 42)\n- `filter=name%3D%3DElec*%3Bproduct_category_id>5` (multiple filters combined)\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_product_category",
    "description": "Create a Product Category",
    "method": "POST",
    "url": "/productCategories",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "display_order_index",
      "parent_category_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "The category name"
        },
        "display_order_index": {
          "type": "number",
          "description": "Display order of the category"
        },
        "parent_category_id": {
          "type": "string",
          "description": "Parent category ID for subcategories"
        }
      },
      "required": [
        "name"
      ]
    }
  },
  {
    "name": "keap_v2_assign_products_to_category",
    "description": "Assign Products to a Product Category",
    "method": "POST",
    "url": "/productCategories/{category_id}:assignProducts",
    "pathParams": [
      "category_id"
    ],
    "query": [],
    "body": [
      "product_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "category_id": {
          "type": "string",
          "description": "Path parameter: category_id"
        },
        "product_ids": {
          "type": "array"
        }
      },
      "required": [
        "category_id",
        "product_ids"
      ]
    }
  },
  {
    "name": "keap_v2_create_image_file",
    "description": "Create the product category image file",
    "method": "POST",
    "url": "/productCategories/{category_id}/images",
    "pathParams": [
      "category_id"
    ],
    "query": [],
    "body": [
      "body"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "category_id": {
          "type": "string",
          "description": "Path parameter: category_id"
        },
        "body": {
          "type": "object",
          "description": "Request body payload"
        }
      },
      "required": [
        "category_id",
        "body"
      ]
    }
  },
  {
    "name": "keap_v2_delete_image_file",
    "description": "Delete the image from a product category",
    "method": "DELETE",
    "url": "/productCategories/{category_id}/images",
    "pathParams": [
      "category_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "category_id": {
          "type": "string",
          "description": "Path parameter: category_id"
        }
      },
      "required": [
        "category_id"
      ]
    }
  },
  {
    "name": "keap_v2_create_payment_method_config",
    "description": "Create Payment Method Configuration",
    "method": "POST",
    "url": "/paymentMethodConfigs",
    "pathParams": [],
    "query": [],
    "body": [
      "contact_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contact_id": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_lead_sources",
    "description": "List Lead Sources",
    "method": "GET",
    "url": "/leadSources",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n\n- (String) `name`\n- (String) `status`\n- (String) `lead_source_category_id`\n- (String) `vendor`\n- (String) `medium`\n- (String) `start_time`\n- (String) `end_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n\n- `filter=name%3D%3Dexample`\n- `filter=start_time%3D%3D2024-12-22T01:00:00.000Z`"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n\n- `name`\n- `status`\n- `vendor`\n- `medium`\n- `start_time`\n- `end_time`\n- `create_time`\n- `update_time`\n\nOne of the following directions:\n\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_lead_source",
    "description": "Create a Lead Source",
    "method": "POST",
    "url": "/leadSources",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "description",
      "vendor",
      "medium",
      "message",
      "status",
      "lead_source_category_id",
      "start_time",
      "end_time"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the lead source"
        },
        "description": {
          "type": "string",
          "description": "A description of the lead source"
        },
        "vendor": {
          "type": "string",
          "description": "The vendor of the lead source"
        },
        "medium": {
          "type": "string",
          "description": "The medium of the lead source"
        },
        "message": {
          "type": "string",
          "description": "A message on the lead source"
        },
        "status": {
          "type": "string",
          "description": "The status of the lead source"
        },
        "lead_source_category_id": {
          "type": "string",
          "description": "The lead source category that the lead source belongs to"
        },
        "start_time": {
          "type": "string",
          "description": "When the lead source starts"
        },
        "end_time": {
          "type": "string",
          "description": "When the lead source ends"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_lead_source_recurring_expenses",
    "description": "Retrieves a list of lead source recurring expenses",
    "method": "GET",
    "url": "/leadSources/{lead_source_id}/recurringExpenses",
    "pathParams": [
      "lead_source_id"
    ],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n\n- (String) `title`\n- (Long) `amount`\n- (String) `start_time`\n- (String) `end_time`\n- (String) `next_expense_time`\n- (String) `create_time`\n- (String) `update_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n\n- `filter=amount%3D%3D2500`\n- `filter=next_expense_time%3D%3D2024-12-22T01:00:00.000Z`"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `title`\n- `amount`\n- `start_time`\n- `end_time`\n- `next_expense_time`\n- `create_time`\n- `update_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      },
      "required": [
        "lead_source_id"
      ]
    }
  },
  {
    "name": "keap_v2_create_lead_source_recurring_expense",
    "description": "Create a Lead Source Recurring Expense",
    "method": "POST",
    "url": "/leadSources/{lead_source_id}/recurringExpenses",
    "pathParams": [
      "lead_source_id"
    ],
    "query": [],
    "body": [
      "title",
      "notes",
      "amount",
      "start_time",
      "end_time"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        },
        "title": {
          "type": "string",
          "description": "The title of the lead source recurring expense"
        },
        "notes": {
          "type": "string",
          "description": "The notes for the lead source recurring expense"
        },
        "amount": {
          "type": "number",
          "description": "The monthly cost of the lead source recurring expense. The value should be in the smallest unit of currency for your currency locale. For example, if your currency locale is USD, then the smallest unit of currency is in cents, $225.50 would be provided in the request as 22550."
        },
        "start_time": {
          "type": "string",
          "description": "The time the lead source recurring expense starts"
        },
        "end_time": {
          "type": "string",
          "description": "The time the lead source recurring expense ends"
        }
      },
      "required": [
        "lead_source_id",
        "amount"
      ]
    }
  },
  {
    "name": "keap_v2_list_lead_source_expenses",
    "description": "List Lead Source Expenses",
    "method": "GET",
    "url": "/leadSources/{lead_source_id}/expenses",
    "pathParams": [
      "lead_source_id"
    ],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n\n- (String) `title`\n- (Long) `amount`\n- (String) `incurred_time`\n- (String) `create_time`\n- (String) `update_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n\n- `filter=amount%3D%3D2500`\n- `filter=incurred_time%3D%3D2024-12-22T01:00:00.000Z`"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n\n- `title`\n- `amount`\n- `incurred_time`\n- `create_time`\n- `update_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      },
      "required": [
        "lead_source_id"
      ]
    }
  },
  {
    "name": "keap_v2_create_lead_source_expense",
    "description": "Create a Lead Source Expense",
    "method": "POST",
    "url": "/leadSources/{lead_source_id}/expenses",
    "pathParams": [
      "lead_source_id"
    ],
    "query": [],
    "body": [
      "title",
      "notes",
      "amount",
      "incurred_time"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        },
        "title": {
          "type": "string",
          "description": "The title of the lead source expense"
        },
        "notes": {
          "type": "string",
          "description": "The notes for the lead source expense"
        },
        "amount": {
          "type": "number",
          "description": "The cost of the lead source expense. The value should be in the smallest unit of currency for your currency locale. For example, if your currency locale is USD, then the smallest unit of currency is in cents, $225.50 would be provided in the request as 22550."
        },
        "incurred_time": {
          "type": "string",
          "description": "The time that the lead source expense was incurred."
        }
      },
      "required": [
        "lead_source_id",
        "amount"
      ]
    }
  },
  {
    "name": "keap_v2_list_lead_source_categories",
    "description": "List Lead Source Categories",
    "method": "GET",
    "url": "/leadSourceCategories",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n\n- (String) `name`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here is an example:\n\n- `filter=name%3D%3Dexample`"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_lead_source_category",
    "description": "Create a Lead Source Category",
    "method": "POST",
    "url": "/leadSourceCategories",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "description"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the category, must be unique"
        },
        "description": {
          "type": "string",
          "description": "The description of the category"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_integrations_word_press_opt_in_options",
    "description": "List WordPress Opt-In Options",
    "method": "GET",
    "url": "/integrations/wordpress/options",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_add_integrations_word_press_opt_in",
    "description": "Add a WordPress Opt-In Option",
    "method": "POST",
    "url": "/integrations/wordpress/options",
    "pathParams": [],
    "query": [],
    "body": [
      "key",
      "name"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string",
          "description": "The unique identifier of the opt-in option, which must be an alphanumeric string"
        },
        "name": {
          "type": "string",
          "description": "The display name of the opt-in option"
        }
      }
    }
  },
  {
    "name": "keap_v2_achieve_integrations_word_press_opt_in_goal",
    "description": "Achieve a WordPress Opt-In Goal",
    "method": "POST",
    "url": "/integrations/wordpress/options/{option_key}:achieve",
    "pathParams": [
      "option_key"
    ],
    "query": [],
    "body": [
      "contact_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "option_key": {
          "type": "string",
          "description": "Path parameter: option_key"
        },
        "contact_id": {
          "type": "string",
          "description": "The Contact Id to Opt-In"
        }
      },
      "required": [
        "option_key"
      ]
    }
  },
  {
    "name": "keap_v2_list_shipping_discounts",
    "description": "List all Shipping Discounts",
    "method": "GET",
    "url": "/discounts/shipping",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (DiscountType) `discount_type`: AMOUNT or PERCENT\n- (Double) `discount_value`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=discount_type%3D%3DAMOUNT`\n- `filter=discount_value%3D%3D4.5`\n- `filter=discount_type%3D%3DAMOUNT%3Bdiscount_value%3D%3D4.5`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `discount_type`\n- `discount_value`\n- `id`\n- `name`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_shipping_discount",
    "description": "Create a Shipping Discount",
    "method": "POST",
    "url": "/discounts/shipping",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "description",
      "criteria",
      "discount_type",
      "discount_value"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Name of the discount"
        },
        "description": {
          "type": "string",
          "description": "Description of the discount"
        },
        "criteria": {
          "type": "array",
          "description": "List of criteria that must be met for this discount to apply"
        },
        "discount_type": {
          "type": "string",
          "description": "Type of discount: AMOUNT (fixed amount) or PERCENT (percentage)"
        },
        "discount_value": {
          "type": "number",
          "description": "Value of the discount (amount or percentage depending on discount_type)"
        }
      },
      "required": [
        "name",
        "discount_type",
        "discount_value"
      ]
    }
  },
  {
    "name": "keap_v2_list_product_discounts",
    "description": "List all Product Discounts",
    "method": "GET",
    "url": "/discounts/products",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (Boolean) `apply_to_commissions`\n- (DiscountType) `discount_type`: AMOUNT or PERCENT\n- (Double) `discount_value`\n- (String) `product_id`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=apply_to_commissions%3D%3Dtrue`\n- `filter=discount_type%3D%3DAMOUNT`\n- `filter=discount_value%3D%3D10.0`\n- `filter=product_id%3D%3D2`\n- `filter=discount_type%3D%3DAMOUNT%3Bdiscount_value%3D%3D10.0`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `apply_to_commissions`\n- `discount_type`\n- `discount_value`\n- `id`\n- `name`\n- `product_id`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_product_discount",
    "description": "Create a Product Discount",
    "method": "POST",
    "url": "/discounts/products",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "description",
      "criteria",
      "apply_to_commissions",
      "product_id",
      "discount_type",
      "discount_value"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Name of the discount"
        },
        "description": {
          "type": "string",
          "description": "Description of the discount"
        },
        "criteria": {
          "type": "array",
          "description": "List of criteria that must be met for this discount to apply"
        },
        "apply_to_commissions": {
          "type": "boolean",
          "description": "Whether to apply this discount to commission calculations"
        },
        "product_id": {
          "type": "string",
          "description": "ID of the product this discount applies to"
        },
        "discount_type": {
          "type": "string",
          "description": "Type of discount: AMOUNT (fixed amount) or PERCENT (percentage)"
        },
        "discount_value": {
          "type": "number",
          "description": "Value of the discount (amount or percentage depending on discount_type)"
        }
      },
      "required": [
        "name",
        "product_id",
        "discount_type",
        "discount_value"
      ]
    }
  },
  {
    "name": "keap_v2_create_product_discount_criteria",
    "description": "Create a Product Discount Criteria",
    "method": "POST",
    "url": "/discounts/products/{discount_id}/criteria",
    "pathParams": [
      "discount_id"
    ],
    "query": [],
    "body": [
      "type",
      "code",
      "range_start_time",
      "range_end_time",
      "product_id",
      "product_quantity_min",
      "product_quantity_max",
      "plan_id",
      "subscription_quantity",
      "total_amount",
      "operator"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        },
        "type": {
          "type": "string",
          "description": "Type of criteria: DATE_RANGE, PROMO_CODE, PRODUCT, SUBSCRIPTION_PLAN, or ORDER_TOTAL"
        },
        "code": {
          "type": "string",
          "description": "Promotional code for PROMO_CODE criteria"
        },
        "range_start_time": {
          "type": "string",
          "description": "Start date/time for DATE_RANGE criteria (ISO-8601 format)"
        },
        "range_end_time": {
          "type": "string",
          "description": "End date/time for DATE_RANGE criteria (ISO-8601 format)"
        },
        "product_id": {
          "type": "string",
          "description": "Product ID for PRODUCT criteria"
        },
        "product_quantity_min": {
          "type": "number",
          "description": "Minimum product quantity for PRODUCT criteria"
        },
        "product_quantity_max": {
          "type": "number",
          "description": "Maximum product quantity for PRODUCT criteria"
        },
        "plan_id": {
          "type": "string",
          "description": "Subscription plan ID for SUBSCRIPTION_PLAN criteria"
        },
        "subscription_quantity": {
          "type": "number",
          "description": "Subscription quantity for SUBSCRIPTION_PLAN criteria"
        },
        "total_amount": {
          "type": "number",
          "description": "Total amount threshold for ORDER_TOTAL criteria"
        },
        "operator": {
          "type": "string",
          "description": "Comparison operator for ORDER_TOTAL criteria: LESS_THAN or GREATER_THAN"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_category_discounts",
    "description": "List Category Discounts",
    "method": "GET",
    "url": "/discounts/productCategories",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, the allowed field is:\n- (String) `id` - Allowable operators: \"==\",\"<=\", \"<\", \">=\", \">\", \"!=\"\n- (List[String]) `ids`\n- (String) `name` - Wildcard matching allowed\n- (String) `description` - Wildcard matching allowed\n- (String) `product_category_id`\n\nYou will need to apply the `==` operator to check the equality of the filter with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=product_category_id%3D%3D4`\n- `filter=ids%3D%3D1,10,4,24`\n- `filter=id%3E5`\n\nFor fields which allow wildcard matching, you may use the * wildcard character (or its encoded form %2A)\nfor case-insensitive partial matching on text fields. Example of a valid pattern of wildcard usage:\n- `description==foo*` finds anything in `description` that begins with `foo`\n\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `name`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_category_discount",
    "description": "Create a Category Discount",
    "method": "POST",
    "url": "/discounts/productCategories",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "description",
      "criteria",
      "apply_to_commissions",
      "discount_percent",
      "product_category_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Name of the discount"
        },
        "description": {
          "type": "string",
          "description": "Description of the discount"
        },
        "criteria": {
          "type": "array",
          "description": "List of criteria that must be met for this discount to apply"
        },
        "apply_to_commissions": {
          "type": "boolean",
          "description": "Whether to apply this discount to commission calculations"
        },
        "discount_percent": {
          "type": "number",
          "description": "Percentage discount to apply. Must be greater than or equal to 0."
        },
        "product_category_ids": {
          "type": "array",
          "description": "List of product category IDs this discount applies to"
        }
      },
      "required": [
        "name",
        "apply_to_commissions",
        "discount_percent",
        "product_category_ids"
      ]
    }
  },
  {
    "name": "keap_v2_list_order_total_discounts",
    "description": "List all Order Total Discounts",
    "method": "GET",
    "url": "/discounts/orderTotals",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (Boolean) `apply_to_commissions`\n- (DiscountStrategy) `discount_strategy`: GROSS or NET\n- (DiscountType) `discount_type`: AMOUNT or PERCENT\n- (Double) `discount_value`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=apply_to_commissions%3D%3Dtrue`\n- `filter=discount_strategy%3D%3DGROSS`\n- `filter=discount_type%3D%3DAMOUNT`\n- `filter=discount_value%3D%3D10.0`\n- `filter=discount_type%3D%3DAMOUNT%3Bdiscount_strategy%3D%3DNET`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `apply_to_commissions`\n- `discount_strategy`\n- `discount_type`\n- `discount_value`\n- `id`\n- `name`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_order_total_discount",
    "description": "Create an Order Total Discount",
    "method": "POST",
    "url": "/discounts/orderTotals",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "description",
      "criteria",
      "apply_to_commissions",
      "discount_type",
      "discount_value",
      "discount_strategy"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Name of the discount"
        },
        "description": {
          "type": "string",
          "description": "Description of the discount"
        },
        "criteria": {
          "type": "array",
          "description": "List of criteria that must be met for this discount to apply"
        },
        "apply_to_commissions": {
          "type": "boolean",
          "description": "Whether to apply this discount to commission calculations"
        },
        "discount_type": {
          "type": "string",
          "description": "Type of discount: AMOUNT (fixed amount) or PERCENT (percentage)"
        },
        "discount_value": {
          "type": "number",
          "description": "Value of the discount (amount or percentage depending on discount_type)"
        },
        "discount_strategy": {
          "type": "string",
          "description": "Strategy for applying discount: GROSS (before tax) or NET (after tax)"
        }
      },
      "required": [
        "name",
        "discount_type",
        "discount_value"
      ]
    }
  },
  {
    "name": "keap_v2_list_free_trial_discounts",
    "description": "List all Subscription Free Trial Discounts",
    "method": "GET",
    "url": "/discounts/freeTrials",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (Integer) `free_trial_days`\n- (Boolean) `hide_price`\n- (String) `subscription_plan_id`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=free_trial_days%3D%3D14`\n- `filter=hide_price%3D%3DTrue`\n- `filter=subscription_plan_id%3D%3DmySubscriptionPlanId`\n- `filter=free_trial_days%3D%3D14%3Bhide_price%3D%3DFalse`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `free_trial_days`\n- `hide_price`\n- `id`\n- `name`\n- `subscription_plan_id`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_free_trial_discount",
    "description": "Create a Subscription Free Trial Discount",
    "method": "POST",
    "url": "/discounts/freeTrials",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "description",
      "criteria",
      "hide_price",
      "subscription_plan_id",
      "free_trial_days"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Name of the discount"
        },
        "description": {
          "type": "string",
          "description": "Description of the discount"
        },
        "criteria": {
          "type": "array",
          "description": "List of criteria that must be met for this discount to apply"
        },
        "hide_price": {
          "type": "boolean",
          "description": "Whether to hide the price during the trial period"
        },
        "subscription_plan_id": {
          "type": "string",
          "description": "ID of the subscription plan this trial applies to"
        },
        "free_trial_days": {
          "type": "number",
          "description": "Number of free trial days. Must be a positive number. Defaults to 0."
        }
      },
      "required": [
        "name",
        "subscription_plan_id"
      ]
    }
  },
  {
    "name": "keap_v2_deactivate_payment_method",
    "description": "Deactivate a Contact Payment Method",
    "method": "POST",
    "url": "/contacts/{contact_id}/paymentMethods/{payment_method_id}:deactivate",
    "pathParams": [
      "contact_id",
      "payment_method_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contact_id": {
          "type": "string",
          "description": "Path parameter: contact_id"
        },
        "payment_method_id": {
          "type": "string",
          "description": "Path parameter: payment_method_id"
        }
      },
      "required": [
        "contact_id",
        "payment_method_id"
      ]
    }
  },
  {
    "name": "keap_v2_add_contacts_to_automation_sequence",
    "description": "Add Contacts to an Automation Sequence",
    "method": "POST",
    "url": "/automations/{automation_id}/sequences/{sequence_id}:addContacts",
    "pathParams": [
      "automation_id",
      "sequence_id"
    ],
    "query": [],
    "body": [
      "contact_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "automation_id": {
          "type": "string",
          "description": "Path parameter: automation_id"
        },
        "sequence_id": {
          "type": "string",
          "description": "Path parameter: sequence_id"
        },
        "contact_ids": {
          "type": "array",
          "description": "List of contact IDs to add to the automation sequence"
        }
      },
      "required": [
        "automation_id",
        "sequence_id",
        "contact_ids"
      ]
    }
  },
  {
    "name": "keap_v2_achieve_goal",
    "description": "Achieve an Automation Goal",
    "method": "POST",
    "url": "/automations/goals/achieve",
    "pathParams": [],
    "query": [],
    "body": [
      "integration",
      "call_name",
      "automation_id",
      "goal_id",
      "contact_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "integration": {
          "type": "string",
          "description": "The integration name of the goal. Required when using integration/call_name approach. Use together with 'call_name'. Mutually exclusive with automation_id/goal_id."
        },
        "call_name": {
          "type": "string",
          "description": "The call name of the goal. Required when using integration/call_name approach. Use together with 'integration'. Mutually exclusive with automation_id/goal_id."
        },
        "automation_id": {
          "type": "number",
          "description": "The automation ID. Required when using automation_id/goal_id approach. Use together with 'goal_id'. Mutually exclusive with integration/call_name."
        },
        "goal_id": {
          "type": "number",
          "description": "The goal ID within the automation. Required when using automation_id/goal_id approach. Use together with 'automation_id'. Mutually exclusive with integration/call_name."
        },
        "contact_id": {
          "type": "number",
          "description": "The contact ID for whom to achieve the goal"
        }
      },
      "required": [
        "contact_id"
      ]
    }
  },
  {
    "name": "keap_v2_bulk_assignment_automations_categories",
    "description": "Bulk update for Automations Categories",
    "method": "POST",
    "url": "/automations/categories/batchAssign",
    "pathParams": [],
    "query": [],
    "body": [
      "category_ids",
      "automation_ids",
      "apply_category"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "category_ids": {
          "type": "array",
          "description": "List of category IDs to assign to the automations"
        },
        "automation_ids": {
          "type": "array",
          "description": "List of automation IDs to update. Use '0' as a wildcard to select all automations."
        },
        "apply_category": {
          "type": "boolean",
          "description": "If true, the categories will be applied to the automations. If false, the categories will be removed from the automations."
        }
      }
    }
  },
  {
    "name": "keap_v2_bulk_unpublish_automations",
    "description": "Bulk unpublish Automations",
    "method": "POST",
    "url": "/automations/batch-unpublish",
    "pathParams": [],
    "query": [],
    "body": [
      "automation_ids",
      "unpublished_form_message"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "automation_ids": {
          "type": "array",
          "description": "List of automation IDs to unpublish"
        },
        "unpublished_form_message": {
          "type": "string",
          "description": "Custom message to display on forms when the automation is unpublished"
        }
      },
      "required": [
        "automation_ids"
      ]
    }
  },
  {
    "name": "keap_v2_list_categories",
    "description": "List automation categories",
    "method": "GET",
    "url": "/automationCategory",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_create_category",
    "description": "Create automation category",
    "method": "POST",
    "url": "/automationCategory",
    "pathParams": [],
    "query": [],
    "body": [
      "name"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the category to create"
        }
      },
      "required": [
        "name"
      ]
    }
  },
  {
    "name": "keap_v2_delete_categories",
    "description": "Delete automation category",
    "method": "DELETE",
    "url": "/automationCategory",
    "pathParams": [],
    "query": [
      "ids"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "ids": {
          "type": "array"
        }
      },
      "required": [
        "ids"
      ]
    }
  },
  {
    "name": "keap_v2_fetch_subscription_plan",
    "description": "Get Subscription Plan",
    "method": "GET",
    "url": "/products/{product_id}/subscriptions/{subscription_plan_id}",
    "pathParams": [
      "product_id",
      "subscription_plan_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        },
        "subscription_plan_id": {
          "type": "string",
          "description": "Path parameter: subscription_plan_id"
        }
      },
      "required": [
        "product_id",
        "subscription_plan_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_subscription_plan",
    "description": "Delete Subscription Plan",
    "method": "DELETE",
    "url": "/products/{product_id}/subscriptions/{subscription_plan_id}",
    "pathParams": [
      "product_id",
      "subscription_plan_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        },
        "subscription_plan_id": {
          "type": "string",
          "description": "Path parameter: subscription_plan_id"
        }
      },
      "required": [
        "product_id",
        "subscription_plan_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_subscription_plan",
    "description": "Update Subscription Plan",
    "method": "PATCH",
    "url": "/products/{product_id}/subscriptions/{subscription_plan_id}",
    "pathParams": [
      "product_id",
      "subscription_plan_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "active",
      "frequency",
      "allow_prorating",
      "cycle_type",
      "display_order_index",
      "plan_price",
      "total_cycles"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        },
        "subscription_plan_id": {
          "type": "string",
          "description": "Path parameter: subscription_plan_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "active": {
          "type": "boolean",
          "description": "Whether the subscription plan is active."
        },
        "frequency": {
          "type": "number",
          "description": "The frequency of the subscription plan. Must be greater than 0."
        },
        "allow_prorating": {
          "type": "boolean",
          "description": "Allow prorating of the subscription plan."
        },
        "cycle_type": {
          "type": "string",
          "description": "The cycle type of the subscription plan."
        },
        "display_order_index": {
          "type": "number",
          "description": "The order that this plan will be displayed to the user."
        },
        "plan_price": {
          "type": "number",
          "description": "The price of the subscription plan in the smallest currency unit. Must be greater than or equal to 0."
        },
        "total_cycles": {
          "type": "number",
          "description": "How many cycles the subscription plan will have. 0 means infinite."
        }
      },
      "required": [
        "product_id",
        "subscription_plan_id",
        "cycle_type",
        "plan_price"
      ]
    }
  },
  {
    "name": "keap_v2_get_product_interest_bundle",
    "description": "Get a Product Interest Bundle",
    "method": "GET",
    "url": "/productInterestBundles/{id}",
    "pathParams": [
      "id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Path parameter: id"
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_product_interest_bundle",
    "description": "Delete a Product Interest Bundle",
    "method": "DELETE",
    "url": "/productInterestBundles/{id}",
    "pathParams": [
      "id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Path parameter: id"
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "keap_v2_update_product_interest_bundle",
    "description": "Update a Product Interest Bundle",
    "method": "PATCH",
    "url": "/productInterestBundles/{id}",
    "pathParams": [
      "id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "description"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Path parameter: id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "Product interest bundle name"
        },
        "description": {
          "type": "string",
          "description": "Product interest bundle description"
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "keap_v2_remove_product_interest",
    "description": "Delete a Product Interest from an existing Bundle",
    "method": "DELETE",
    "url": "/productInterestBundles/{id}/interests/{interest_id}",
    "pathParams": [
      "id",
      "interest_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Path parameter: id"
        },
        "interest_id": {
          "type": "string",
          "description": "Path parameter: interest_id"
        }
      },
      "required": [
        "id",
        "interest_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_product_interest",
    "description": "Update a Product Interest in an existing Bundle",
    "method": "PATCH",
    "url": "/productInterestBundles/{id}/interests/{interest_id}",
    "pathParams": [
      "id",
      "interest_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "price",
      "quantity",
      "discount_percent"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Path parameter: id"
        },
        "interest_id": {
          "type": "string",
          "description": "Path parameter: interest_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "price": {
          "type": "number",
          "description": "The price per unit of the product."
        },
        "quantity": {
          "type": "number",
          "description": "The quantity of product."
        },
        "discount_percent": {
          "type": "number",
          "description": "The percent to discount the product."
        }
      },
      "required": [
        "id",
        "interest_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_product_category",
    "description": "Get a Product Category",
    "method": "GET",
    "url": "/productCategories/{category_id}",
    "pathParams": [
      "category_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "category_id": {
          "type": "string",
          "description": "Path parameter: category_id"
        }
      },
      "required": [
        "category_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_product_category",
    "description": "Delete a Product Category",
    "method": "DELETE",
    "url": "/productCategories/{category_id}",
    "pathParams": [
      "category_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "category_id": {
          "type": "string",
          "description": "Path parameter: category_id"
        }
      },
      "required": [
        "category_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_product_category",
    "description": "Update a Product Category",
    "method": "PATCH",
    "url": "/productCategories/{category_id}",
    "pathParams": [
      "category_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "display_order_index",
      "parent_category_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "category_id": {
          "type": "string",
          "description": "Path parameter: category_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "The category name"
        },
        "display_order_index": {
          "type": "number",
          "description": "Display order of the category"
        },
        "parent_category_id": {
          "type": "string",
          "description": "Parent category ID for subcategories"
        }
      },
      "required": [
        "category_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_lead_source",
    "description": "Retrieve a Lead Source",
    "method": "GET",
    "url": "/leadSources/{lead_source_id}",
    "pathParams": [
      "lead_source_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        }
      },
      "required": [
        "lead_source_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_lead_source",
    "description": "Delete a Lead Source",
    "method": "DELETE",
    "url": "/leadSources/{lead_source_id}",
    "pathParams": [
      "lead_source_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        }
      },
      "required": [
        "lead_source_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_lead_source",
    "description": "Update a Lead Source",
    "method": "PATCH",
    "url": "/leadSources/{lead_source_id}",
    "pathParams": [
      "lead_source_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "description",
      "vendor",
      "medium",
      "message",
      "status",
      "lead_source_category_id",
      "start_time",
      "end_time"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "The name of the lead source"
        },
        "description": {
          "type": "string",
          "description": "A description of the lead source"
        },
        "vendor": {
          "type": "string",
          "description": "The vendor of the lead source"
        },
        "medium": {
          "type": "string",
          "description": "The medium of the lead source"
        },
        "message": {
          "type": "string",
          "description": "A message on the lead source"
        },
        "status": {
          "type": "string",
          "description": "The status of the lead source"
        },
        "lead_source_category_id": {
          "type": "string",
          "description": "The lead source category that the lead source belongs to"
        },
        "start_time": {
          "type": "string",
          "description": "When the lead source starts"
        },
        "end_time": {
          "type": "string",
          "description": "When the lead source ends"
        }
      },
      "required": [
        "lead_source_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_lead_source_recurring_expense",
    "description": "Retrieve a Lead Source Recurring Expense",
    "method": "GET",
    "url": "/leadSources/{lead_source_id}/recurringExpenses/{lead_source_recurring_expense_id}",
    "pathParams": [
      "lead_source_id",
      "lead_source_recurring_expense_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        },
        "lead_source_recurring_expense_id": {
          "type": "string",
          "description": "Path parameter: lead_source_recurring_expense_id"
        }
      },
      "required": [
        "lead_source_id",
        "lead_source_recurring_expense_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_lead_source_recurring_expense",
    "description": "Delete a Lead Source Recurring Expense",
    "method": "DELETE",
    "url": "/leadSources/{lead_source_id}/recurringExpenses/{lead_source_recurring_expense_id}",
    "pathParams": [
      "lead_source_id",
      "lead_source_recurring_expense_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        },
        "lead_source_recurring_expense_id": {
          "type": "string",
          "description": "Path parameter: lead_source_recurring_expense_id"
        }
      },
      "required": [
        "lead_source_id",
        "lead_source_recurring_expense_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_lead_source_recurring_expense",
    "description": "Update a Lead Source Recurring Expense",
    "method": "PATCH",
    "url": "/leadSources/{lead_source_id}/recurringExpenses/{lead_source_recurring_expense_id}",
    "pathParams": [
      "lead_source_id",
      "lead_source_recurring_expense_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "title",
      "notes",
      "amount",
      "start_time",
      "end_time"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        },
        "lead_source_recurring_expense_id": {
          "type": "string",
          "description": "Path parameter: lead_source_recurring_expense_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "title": {
          "type": "string",
          "description": "The title of the lead source recurring expense"
        },
        "notes": {
          "type": "string",
          "description": "The notes for the lead source recurring expense"
        },
        "amount": {
          "type": "number",
          "description": "The monthly cost of the lead source recurring expense.\n The value should be in the smallest unit of currency for your currency locale.\n For example, if your currency locale is USD, then the smallest unit of currency is\n in cents, $225.50 would be provided in the request as 22550."
        },
        "start_time": {
          "type": "string",
          "description": "The time the lead source recurring expense starts"
        },
        "end_time": {
          "type": "string",
          "description": "The time the lead source recurring expense ends"
        }
      },
      "required": [
        "lead_source_id",
        "lead_source_recurring_expense_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_lead_source_expense",
    "description": "Retrieve a Lead Source Expense",
    "method": "GET",
    "url": "/leadSources/{lead_source_id}/expenses/{lead_source_expense_id}",
    "pathParams": [
      "lead_source_id",
      "lead_source_expense_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        },
        "lead_source_expense_id": {
          "type": "string",
          "description": "Path parameter: lead_source_expense_id"
        }
      },
      "required": [
        "lead_source_id",
        "lead_source_expense_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_lead_source_expense",
    "description": "Delete a lead source expense",
    "method": "DELETE",
    "url": "/leadSources/{lead_source_id}/expenses/{lead_source_expense_id}",
    "pathParams": [
      "lead_source_id",
      "lead_source_expense_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        },
        "lead_source_expense_id": {
          "type": "string",
          "description": "Path parameter: lead_source_expense_id"
        }
      },
      "required": [
        "lead_source_id",
        "lead_source_expense_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_lead_source_expense",
    "description": "Update a Lead Source Expense",
    "method": "PATCH",
    "url": "/leadSources/{lead_source_id}/expenses/{lead_source_expense_id}",
    "pathParams": [
      "lead_source_id",
      "lead_source_expense_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "title",
      "notes",
      "amount",
      "incurred_time"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        },
        "lead_source_expense_id": {
          "type": "string",
          "description": "Path parameter: lead_source_expense_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "title": {
          "type": "string",
          "description": "The title of the lead source expense"
        },
        "notes": {
          "type": "string",
          "description": "The notes for the lead source expense"
        },
        "amount": {
          "type": "number",
          "description": "The cost of the lead source expense. The value should be in the smallest unit of currency for your currency locale. For example, if your currency locale is USD, then the smallest unit of currency is in cents, $225.50 would be provided in the request as 22550."
        },
        "incurred_time": {
          "type": "string",
          "description": "The time that the lead source expense was incurred."
        }
      },
      "required": [
        "lead_source_id",
        "lead_source_expense_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_lead_source_category",
    "description": "Retrieve a Lead Source Category",
    "method": "GET",
    "url": "/leadSourceCategories/{lead_source_category_id}",
    "pathParams": [
      "lead_source_category_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_category_id": {
          "type": "string",
          "description": "Path parameter: lead_source_category_id"
        }
      },
      "required": [
        "lead_source_category_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_lead_source_category",
    "description": "Delete a Lead Source Category",
    "method": "DELETE",
    "url": "/leadSourceCategories/{lead_source_category_id}",
    "pathParams": [
      "lead_source_category_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_category_id": {
          "type": "string",
          "description": "Path parameter: lead_source_category_id"
        }
      },
      "required": [
        "lead_source_category_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_lead_source_category",
    "description": "Update a Lead Source Category",
    "method": "PATCH",
    "url": "/leadSourceCategories/{lead_source_category_id}",
    "pathParams": [
      "lead_source_category_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "description"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_category_id": {
          "type": "string",
          "description": "Path parameter: lead_source_category_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "The name of the category, must be unique"
        },
        "description": {
          "type": "string",
          "description": "The description of the category"
        }
      },
      "required": [
        "lead_source_category_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_shipping_discount",
    "description": "Retrieve a Shipping Discount",
    "method": "GET",
    "url": "/discounts/shipping/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_shipping_discount",
    "description": "Delete a Shipping Discount",
    "method": "DELETE",
    "url": "/discounts/shipping/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_shipping_discount",
    "description": "Update a Shipping Discount",
    "method": "PATCH",
    "url": "/discounts/shipping/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "description",
      "criteria",
      "discount_type",
      "discount_value"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "Name of the discount"
        },
        "description": {
          "type": "string",
          "description": "Description of the discount"
        },
        "criteria": {
          "type": "array",
          "description": "List of criteria that must be met for this discount to apply"
        },
        "discount_type": {
          "type": "string",
          "description": "Type of discount: AMOUNT (fixed amount) or PERCENT (percentage)"
        },
        "discount_value": {
          "type": "number",
          "description": "Value of the discount (amount or percentage depending on discount_type)"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_product_discount",
    "description": "Retrieve a Product Discount",
    "method": "GET",
    "url": "/discounts/products/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_product_discount",
    "description": "Delete a Product Discount",
    "method": "DELETE",
    "url": "/discounts/products/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_product_discount",
    "description": "Update a Product Discount",
    "method": "PATCH",
    "url": "/discounts/products/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "description",
      "criteria",
      "apply_to_commissions",
      "product_id",
      "discount_type",
      "discount_value"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "Name of the discount"
        },
        "description": {
          "type": "string",
          "description": "Description of the discount"
        },
        "criteria": {
          "type": "array",
          "description": "List of criteria that must be met for this discount to apply"
        },
        "apply_to_commissions": {
          "type": "boolean",
          "description": "Whether to apply this discount to commission calculations"
        },
        "product_id": {
          "type": "string",
          "description": "ID of the product this discount applies to"
        },
        "discount_type": {
          "type": "string",
          "description": "Type of discount: AMOUNT (fixed amount) or PERCENT (percentage)"
        },
        "discount_value": {
          "type": "number",
          "description": "Value of the discount (amount or percentage depending on discount_type)"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_category_discount",
    "description": "Retrieve a Category Discount",
    "method": "GET",
    "url": "/discounts/productCategories/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_category_discount",
    "description": "Delete a Category Discount",
    "method": "DELETE",
    "url": "/discounts/productCategories/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_category_discount",
    "description": "Update a Category Discount",
    "method": "PATCH",
    "url": "/discounts/productCategories/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "description",
      "criteria",
      "apply_to_commissions",
      "discount_percent",
      "product_category_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "Name of the discount"
        },
        "description": {
          "type": "string",
          "description": "Description of the discount"
        },
        "criteria": {
          "type": "array",
          "description": "List of criteria that must be met for this discount to apply"
        },
        "apply_to_commissions": {
          "type": "boolean",
          "description": "Whether to apply this discount to commission calculations"
        },
        "discount_percent": {
          "type": "number",
          "description": "Percentage discount to apply. Must be greater than or equal to 0."
        },
        "product_category_ids": {
          "type": "array",
          "description": "List of product category IDs this discount applies to"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_order_total_discount",
    "description": "Retrieve an Order Total Discount",
    "method": "GET",
    "url": "/discounts/orderTotals/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_order_total_discount",
    "description": "Delete an Order Total Discount",
    "method": "DELETE",
    "url": "/discounts/orderTotals/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_order_total_discount",
    "description": "Update an Order Total Discount",
    "method": "PATCH",
    "url": "/discounts/orderTotals/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "description",
      "criteria",
      "apply_to_commissions",
      "discount_type",
      "discount_value",
      "discount_strategy"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "Name of the discount"
        },
        "description": {
          "type": "string",
          "description": "Description of the discount"
        },
        "criteria": {
          "type": "array",
          "description": "List of criteria that must be met for this discount to apply"
        },
        "apply_to_commissions": {
          "type": "boolean",
          "description": "Whether to apply this discount to commission calculations"
        },
        "discount_type": {
          "type": "string",
          "description": "Type of discount: AMOUNT (fixed amount) or PERCENT (percentage)"
        },
        "discount_value": {
          "type": "number",
          "description": "Value of the discount (amount or percentage depending on discount_type)"
        },
        "discount_strategy": {
          "type": "string",
          "description": "Strategy for applying discount: GROSS (before tax) or NET (after tax)"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_free_trial_discount",
    "description": "Retrieve a Subscription Free Trial Discount",
    "method": "GET",
    "url": "/discounts/freeTrials/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_free_trial_discount",
    "description": "Delete a Subscription Free Trial Discount",
    "method": "DELETE",
    "url": "/discounts/freeTrials/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_free_trial_discount",
    "description": "Update a Subscription Free Trial Discount",
    "method": "PATCH",
    "url": "/discounts/freeTrials/{discount_id}",
    "pathParams": [
      "discount_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "description",
      "criteria",
      "free_trial_days",
      "hide_price",
      "subscription_plan_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "Name of the discount"
        },
        "description": {
          "type": "string",
          "description": "Description of the discount"
        },
        "criteria": {
          "type": "array",
          "description": "List of criteria that must be met for this discount to apply"
        },
        "free_trial_days": {
          "type": "number",
          "description": "Number of free trial days"
        },
        "hide_price": {
          "type": "boolean",
          "description": "Whether to hide the price during the trial period"
        },
        "subscription_plan_id": {
          "type": "string",
          "description": "ID of the subscription plan this trial applies to"
        }
      },
      "required": [
        "discount_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_business_profile",
    "description": "Retrieve Business Profile",
    "method": "GET",
    "url": "/businessProfile",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_update_business_profile",
    "description": "Update Business Profile",
    "method": "PATCH",
    "url": "/businessProfile",
    "pathParams": [],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "email",
      "website",
      "phone",
      "address",
      "currency_code",
      "business_goals",
      "business_primary_color",
      "business_secondary_color"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "website": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "address": {
          "type": "string"
        },
        "currency_code": {
          "type": "string",
          "description": "ISO 4217 Currency Code"
        },
        "business_goals": {
          "type": "array",
          "description": "The goals of this business, ie. Grow Business, Convert more leads"
        },
        "business_primary_color": {
          "type": "string"
        },
        "business_secondary_color": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "keap_v2_patch_category",
    "description": "Update automation category",
    "method": "PATCH",
    "url": "/automationCategory/{id}",
    "pathParams": [
      "id"
    ],
    "query": [],
    "body": [
      "name"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Path parameter: id"
        },
        "name": {
          "type": "string",
          "description": "New name for the category"
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "keap_v2_list_webforms",
    "description": "List Webforms with filter",
    "method": "GET",
    "url": "/webforms",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `name`\n- (String) `webform_type`\n- (String) `since_create_time`\n- (String) `until_create_time`\n- (String) `since_update_time`\n- (String) `until_update_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=name%3D%3DContact Us`\n- `filter=webform_type%3D%3Dlegacy`"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n- `webform_type`\n- `create_time`\n- `update_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_get_html",
    "description": "Get Webform HTML",
    "method": "GET",
    "url": "/webforms/{webform_id}:data",
    "pathParams": [
      "webform_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "webform_id": {
          "type": "string",
          "description": "Path parameter: webform_id"
        }
      },
      "required": [
        "webform_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_user_groups",
    "description": "List User Groups",
    "method": "GET",
    "url": "/userGroups",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_get_user_group",
    "description": "Retrieve a User Group",
    "method": "GET",
    "url": "/userGroups/{user_group_id}",
    "pathParams": [
      "user_group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_group_id": {
          "type": "string",
          "description": "Path parameter: user_group_id"
        }
      },
      "required": [
        "user_group_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_shipping_methods",
    "description": "List Shipping methods",
    "method": "GET",
    "url": "/shipping",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_list_transactions",
    "description": "List Transactions",
    "method": "GET",
    "url": "/sales/transactions",
    "pathParams": [],
    "query": [
      "filter",
      "page_token",
      "order_by",
      "page_size"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `amount` - Allowable operators: \"==\",\"<=\", \"<\", \">=\", \">\", \"!=\"\n- (String) `order_id`\n- (String) `contact_id`\n- (String) `since_time`\n- (String) `until_time`\n- (String) `merchant_account_id`\n- (String) `merchant_account_type`\n- (String) `status`\n- (String) `transaction_method`\n- (String) `is_successful`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=order_id%3D%3D123`\n- `filter=order_id%3D%3D123%3Bcontact_id%3D%3D567`"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `amount`\n- `transaction_time`\n- `contact_id`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_payments",
    "description": "List Payments",
    "method": "GET",
    "url": "/sales/payments",
    "pathParams": [],
    "query": [
      "filter",
      "page_token",
      "order_by",
      "page_size"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `id`\n- (List[String]) `ids`\n- (String) `amount` - Allowable operators: \"==\",\"<=\", \"<\", \">=\", \">\", \"!=\"\n- (String) `order_id`\n- (String) `contact_id`\n- (String) `since_time`\n- (String) `until_time`\n- (String) `merchant_account_id`\n- (String) `merchant_account_type`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=id%3D%3D123`\n- `filter=ids%3D%3D1,10,4,24`\n- `filter=order_id%3D%3D123%3Bcontact_id%3D%3D567`"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `amount`\n- `payment_time`\n- `contact_id`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_reports",
    "description": "List Reports",
    "method": "GET",
    "url": "/reporting/reports",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `name`\n- (DateTime) `since_created_time`\n- (DateTime) `until_created_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\n word, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=name%3D%3DMonthly%20Sales`\n- `filter=since_created_time%3D%3D2024-01-01`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n- `created_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_retrieve_report",
    "description": "Retrieve Report",
    "method": "GET",
    "url": "/reporting/reports/{report_id}",
    "pathParams": [
      "report_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "report_id": {
          "type": "string",
          "description": "Path parameter: report_id"
        }
      },
      "required": [
        "report_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_assigned_products",
    "description": "List Assigned Products to Categories",
    "method": "GET",
    "url": "/productCategories/assignedProducts",
    "pathParams": [],
    "query": [
      "filter",
      "page_token",
      "order_by",
      "page_size"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (List[String]) `product_ids`\n- (List[String]) `product_category_ids`\n"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `product_category_id`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_payment_methods",
    "description": "List of Payment Methods",
    "method": "GET",
    "url": "/paymentMethods",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `payment_method_id`\n- (String) `credit_card_id`\n- (String) `contact_id`\n- (String) `merchant_account_id`\n- (String) `since_time`\n- (String) `until_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`.\n- `filter=payment_method_id%3D%3D123`\n- `filter=contact_id%3D%3D123%3Bmerchant_account_id%3D%3D567`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `payment_method_id`\n- `created_time`\n- `contact_id`\n- `merchant_account_id`\n\nOne of the following directions:\n- `desc`\n- `asc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_merchants",
    "description": "List Merchant accounts",
    "method": "GET",
    "url": "/merchants",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `id`\n- (String) `name`\n- (String) `type`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=id%3D%3D123`\n- `filter=name%3D%3Dabc`\n- `filter=id%3D%3D123%3Bname%3D%3Dabc`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `name`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_countries",
    "description": "List Countries",
    "method": "GET",
    "url": "/locales/countries",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_get_country_by_code",
    "description": "Get Country",
    "method": "GET",
    "url": "/locales/countries/{country_code}",
    "pathParams": [
      "country_code"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "country_code": {
          "type": "string",
          "description": "Path parameter: country_code"
        }
      },
      "required": [
        "country_code"
      ]
    }
  },
  {
    "name": "keap_v2_list_provinces_for_country",
    "description": "List a Country's Provinces",
    "method": "GET",
    "url": "/locales/countries/{country_code}/provinces",
    "pathParams": [
      "country_code"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "country_code": {
          "type": "string",
          "description": "Path parameter: country_code"
        }
      },
      "required": [
        "country_code"
      ]
    }
  },
  {
    "name": "keap_v2_get_province_by_code",
    "description": "Get Province",
    "method": "GET",
    "url": "/locales/countries/{country_code}/provinces/{province_code}",
    "pathParams": [
      "country_code",
      "province_code"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "country_code": {
          "type": "string",
          "description": "Path parameter: country_code"
        },
        "province_code": {
          "type": "string",
          "description": "Path parameter: province_code"
        }
      },
      "required": [
        "country_code",
        "province_code"
      ]
    }
  },
  {
    "name": "keap_v2_list_lead_source_recurring_expense_charges",
    "description": "Retrieves a list of expenses incurred from a lead-source recurring expense (renamed from keap_v2_list_expenses_incurred_from_lead_source_recurring_expense to fit the 64-char tool-name limit)",
    "method": "GET",
    "url": "/leadSources/{lead_source_id}/recurringExpenses/{lead_source_recurring_expense_id}/expenses",
    "pathParams": [
      "lead_source_id",
      "lead_source_recurring_expense_id"
    ],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "lead_source_id": {
          "type": "string",
          "description": "Path parameter: lead_source_id"
        },
        "lead_source_recurring_expense_id": {
          "type": "string",
          "description": "Path parameter: lead_source_recurring_expense_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n\n- (String) `title`\n- (Long) `amount`\n- (String) `incurred_time`\n- (String) `create_time`\n- (String) `update_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n\n- `filter=amount%3D%3D2500`\n- `filter=incurred_time%3D%3D2024-12-22T01:00:00.000Z`"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n\n- `title`\n- `amount`\n- `incurred_time`\n- `create_time`\n- `update_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      },
      "required": [
        "lead_source_id",
        "lead_source_recurring_expense_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_payment_methods_get",
    "description": "List of Contact Payment Methods",
    "method": "GET",
    "url": "/contacts/{contact_id}/paymentMethods",
    "pathParams": [
      "contact_id"
    ],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contact_id": {
          "type": "string",
          "description": "Path parameter: contact_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `merchant_account_id`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`.\n- `filter=merchant_account_id%3D%3D123`\n\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `created_time`\n\nOne of the following directions:\n- `desc`\n- `asc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      },
      "required": [
        "contact_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_lead_score_details",
    "description": "Retrieve Lead Score of a Contact",
    "method": "GET",
    "url": "/contacts/{contact_id}/leadScore",
    "pathParams": [
      "contact_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contact_id": {
          "type": "string",
          "description": "Path parameter: contact_id"
        }
      },
      "required": [
        "contact_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_automations",
    "description": "List Automations",
    "method": "GET",
    "url": "/automations",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `name`\n\nYou will need to apply the `==` operator to check the equality of the filter with your searched\ntext, in the encoded form `%3D%3D`. The search will look for the text anywhere in the automation name.\n\n- `filter=name%3D%3DSpring Automation`\n- `filter=name%3D%3DTag New Contacts`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n- `category`\n- `activeContacts`\n- `publishedDate`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_delete_automation",
    "description": "Delete an Automation",
    "method": "DELETE",
    "url": "/automations",
    "pathParams": [],
    "query": [
      "automation_ids"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "automation_ids": {
          "type": "array"
        }
      },
      "required": [
        "automation_ids"
      ]
    }
  },
  {
    "name": "keap_v2_get_automation",
    "description": "Retrieve an Automation",
    "method": "GET",
    "url": "/automations/{automation_id}",
    "pathParams": [
      "automation_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "automation_id": {
          "type": "string",
          "description": "Path parameter: automation_id"
        }
      },
      "required": [
        "automation_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_all_automation_ids",
    "description": "List Automations Ids",
    "method": "GET",
    "url": "/automations/ids",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `name`\n\nYou will need to apply the `==` operator to check the equality of the filter with your searched\ntext, in the encoded form `%3D%3D`. The search will look for the text anywhere in the automation name.\n\n- `filter=name%3D%3DSpring Automation`\n- `filter=name%3D%3DTag New Contacts`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n- `category`\n- `activeContacts`\n- `publishedDate`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        }
      }
    }
  },
  {
    "name": "keap_v2_delete_integrations_word_press_opt_in",
    "description": "Delete a WordPress Opt-In Option",
    "method": "DELETE",
    "url": "/integrations/wordpress/options/{option_key}",
    "pathParams": [
      "option_key"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "option_key": {
          "type": "string",
          "description": "Path parameter: option_key"
        }
      },
      "required": [
        "option_key"
      ]
    }
  },
  {
    "name": "keap_v2_delete_product_discount_criteria",
    "description": "Delete a Product Discount Criteria",
    "method": "DELETE",
    "url": "/discounts/products/{discount_id}/criteria/{criteria_id}",
    "pathParams": [
      "discount_id",
      "criteria_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "discount_id": {
          "type": "string",
          "description": "Path parameter: discount_id"
        },
        "criteria_id": {
          "type": "string",
          "description": "Path parameter: criteria_id"
        }
      },
      "required": [
        "discount_id",
        "criteria_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_payment_method",
    "description": "Delete a Contact Payment Method",
    "method": "DELETE",
    "url": "/contacts/{contact_id}/paymentMethods/{payment_method_id}",
    "pathParams": [
      "contact_id",
      "payment_method_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contact_id": {
          "type": "string",
          "description": "Path parameter: contact_id"
        },
        "payment_method_id": {
          "type": "string",
          "description": "Path parameter: payment_method_id"
        }
      },
      "required": [
        "contact_id",
        "payment_method_id"
      ]
    }
  }
];

const BY_NAME = new Map<string, V2Op>(V2_OPS.map((o) => [o.name, o]));

// Some v2 endpoints 500 on legacy rows the v2 serializer can't map (e.g. merchants
// row id=23 "NetworkMerchants"). The v1 path serializes the full list correctly,
// so fall back to it. Verified: GET /crm/rest/v1/merchants -> 200 full list.
const V1_FALLBACK: Record<string, { method: string; url: string }> = {
  keap_v2_list_merchants: { method: 'GET', url: '/merchants' },
};

export function createV2Tools(_client: KeapClient): Tool[] {
  return V2_OPS.map((o) => ({
    name: o.name,
    description: o.description,
    inputSchema: o.inputSchema as any,
  }));
}

export function v2ToolNames(): string[] {
  return V2_OPS.map((o) => o.name);
}

// Generic executor: fills path params, splits query vs body, calls the v2 client.
export async function handleV2Tool(name: string, args: any, client: KeapClient): Promise<any> {
  const fb = V1_FALLBACK[name];
  if (fb) {
    const r = await client.get<any>(fb.url);
    return { content: [{ type: 'text', text: JSON.stringify(r, null, 2) }] };
  }
  const op = BY_NAME.get(name);
  if (!op) throw new Error(`Unknown v2 tool: ${name}`);
  args = args || {};
  let url = op.url;
  for (const p of op.pathParams) {
    url = url.replace(`{${p}}`, encodeURIComponent(String(args[p])));
  }
  const params: any = {};
  for (const q of op.query) if (args[q] !== undefined) params[q] = args[q];
  // Keap 500s on some list endpoints (e.g. leadSources) when page_size is absent;
  // default it whenever the operation supports it.
  if (op.query.includes('page_size') && params.page_size === undefined) params.page_size = 200;
  const data: any = {};
  for (const b of op.body) if (args[b] !== undefined) data[b] = args[b];

  const cfg: any = { method: op.method, url };
  if (Object.keys(params).length) cfg.params = params;
  if (op.body.length && Object.keys(data).length) cfg.data = ('body' in data ? data.body : data);

  const result = await client.requestV2<any>(cfg);
  return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
