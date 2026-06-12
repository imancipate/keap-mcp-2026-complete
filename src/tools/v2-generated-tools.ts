// AUTO-GENERATED from Keap v2 OpenAPI (scripts/keap_v2_openapi.yml). Do not hand-edit.
// Full v2 coverage: 343 operations. Regenerate via: python3 scripts/gen-v2-tools.py
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
    "name": "keap_v2_list_tasks",
    "description": "List Tasks",
    "method": "GET",
    "url": "/tasks",
    "pathParams": [],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token",
      "fields"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `contact_id`\n- (String) `has_due_date`\n- (String) `is_completed`\n- (String) `user_id`\n- (String) `opportunity_id`\n- (String) `task_ids`\n- (String) `since_time`\n- (String) `until_time`\n- (String)   `id`     \u2014 supports `==`, `>`, `<`, `>=`, `<=`\n- (String) `title`  \u2014 supports prefix wildcard (`title==Foo*`)\n\nOperators must be URL-encoded (`==` \u2192 `%3D%3D`, `>` \u2192 `%3E`, `<` \u2192 `%3C`).\nFor the filters listed above, here are some examples:\n- `filter=contact_id%3D%3D123`\n- `filter=has_due_date%3D%3Dtrue`\n- `filter=is_completed%3D%3Dtrue`\n- `filter=user_id%3D%3D321`\n- `filter=opportunity_id%3D%3D321`\n- `filter=task_ids%3D%3D1,2,3`\n- `filter=since_time%3D%3D2025-04-16T20:33:02.321Z;`\n- `filter=until_time%3D%3D2025-08-16T20:33:02.321Z;`\n- `filter=id%3E5`                  (id > 5)\n- `filter=id%3C%3D100`              (id <= 100)\n- `filter=title%3D%3DFollow%2A`     (title starts with \"Follow\")\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `create_time`\n- `due_time`\n- `update_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Task properties to include in the response. Allowed values: custom_fields"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_task",
    "description": "Create a Task",
    "method": "POST",
    "url": "/tasks",
    "pathParams": [],
    "query": [
      "fields"
    ],
    "body": [
      "title",
      "description",
      "type",
      "priority",
      "completed",
      "completion_time",
      "due_time",
      "remind_time_mins",
      "assigned_to_user_id",
      "contact_id",
      "opportunity_id",
      "accepted",
      "custom_fields"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Task properties to include in the response. Allowed values: custom_fields"
        },
        "title": {
          "type": "string",
          "description": "Task title"
        },
        "description": {
          "type": "string",
          "description": "Task description"
        },
        "type": {
          "type": "string",
          "description": "Task type"
        },
        "priority": {
          "type": "string",
          "description": "Task priority"
        },
        "completed": {
          "type": "boolean",
          "description": "Whether task is completed"
        },
        "completion_time": {
          "type": "string",
          "description": "Completion timestamp (ISO-8601)"
        },
        "due_time": {
          "type": "string",
          "description": "Due date/time (ISO-8601)"
        },
        "remind_time_mins": {
          "type": "number",
          "description": "Value in minutes before start_date to show pop-up reminder."
        },
        "assigned_to_user_id": {
          "type": "string",
          "description": "Assigned user ID"
        },
        "contact_id": {
          "type": "string",
          "description": "Associated contact ID"
        },
        "opportunity_id": {
          "type": "string",
          "description": "Associated opportunity ID"
        },
        "accepted": {
          "type": "boolean",
          "description": "Whether the task has been accepted."
        },
        "custom_fields": {
          "type": "array",
          "description": "Custom field values for the task. An empty array resets all custom fields to their defaults."
        }
      },
      "required": [
        "assigned_to_user_id"
      ]
    }
  },
  {
    "name": "keap_v2_create_task_custom_field",
    "description": "Create a Custom Field",
    "method": "POST",
    "url": "/tasks/model/customFields",
    "pathParams": [],
    "query": [],
    "body": [
      "label",
      "options",
      "field_type",
      "group_id",
      "user_group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "field_type": {
          "type": "string"
        },
        "group_id": {
          "type": "string",
          "description": "An optional tab group to place the field under in the interface.  If not specified, will default to the 'Custom Fields' tab."
        },
        "user_group_id": {
          "type": "string",
          "description": "An optional user group to choose from when selecting values for User or UserListBox fields."
        }
      },
      "required": [
        "label",
        "field_type"
      ]
    }
  },
  {
    "name": "keap_v2_list_task_custom_field_groups",
    "description": "List Task Custom Field Groups",
    "method": "GET",
    "url": "/tasks/model/customFields/groups",
    "pathParams": [],
    "query": [
      "tab_id"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tab_id": {
          "type": "string",
          "description": "Optional tab id to scope groups to a single tab"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_task_custom_field_group",
    "description": "Create a Task Custom Field Group",
    "method": "POST",
    "url": "/tasks/model/customFields/groups",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "tab_id": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_tags",
    "description": "List Tags",
    "method": "GET",
    "url": "/tags",
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
          "description": "Filter to apply, allowed fields are:\n\n- (String) `name`\n- (String) `description`\n- (String) `category_id`\n- (String) `tag_ids`\n- (String) `since_create_time`\n- (String) `until_create_time`\n- (String) `since_update_time`\n- (String) `until_update_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. If NONE is passed in for `category_id` or `description`, it will check\nfor the non-existence of that field. For the filters listed above, here are some examples:\n\n- `filter=name%3D%3Dmy-tag`\n- `filter=category_id%3D%3DNONE`\n- `filter=description%3D%3DNONE`\n- `filter=tag_ids%3D%3D1,2,3`\n- `filter=since_create_time%3D%3D2024-12-22T01:00:00.000Z;until_create_time%3D%3D2025-01-01T00:00:00.000Z;`"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n\n- `name`\n- `create_time`\n- `update_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_create_tag",
    "description": "Create Tag",
    "method": "POST",
    "url": "/tags",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "description",
      "category"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Name of the tag, up to 255 characters will be saved"
        },
        "description": {
          "type": "string",
          "description": "Description of the tag"
        },
        "category": {
          "type": "string",
          "description": "Category of the tag. If not provided, the tag will not be assigned to a category."
        }
      }
    }
  },
  {
    "name": "keap_v2_remove_tags",
    "description": "Remove Tags",
    "method": "POST",
    "url": "/tags/{tag_id}/contacts:removeTags",
    "pathParams": [
      "tag_id"
    ],
    "query": [],
    "body": [
      "contact_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tag_id": {
          "type": "string",
          "description": "Path parameter: tag_id"
        },
        "contact_ids": {
          "type": "array",
          "description": "The IDs of the contacts to apply/remove the tag to/from"
        }
      },
      "required": [
        "tag_id",
        "contact_ids"
      ]
    }
  },
  {
    "name": "keap_v2_apply_tags",
    "description": "Apply Tag",
    "method": "POST",
    "url": "/tags/{tag_id}/contacts:applyTags",
    "pathParams": [
      "tag_id"
    ],
    "query": [],
    "body": [
      "contact_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tag_id": {
          "type": "string",
          "description": "Path parameter: tag_id"
        },
        "contact_ids": {
          "type": "array",
          "description": "The IDs of the contacts to apply/remove the tag to/from"
        }
      },
      "required": [
        "tag_id",
        "contact_ids"
      ]
    }
  },
  {
    "name": "keap_v2_list_tag_categories",
    "description": "List Tag Categories",
    "method": "GET",
    "url": "/tags/categories",
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
          "description": "Filter to apply, allowed fields are:\n- (String) `name`\n- (String) `description`\n- (String) `since_create_time`\n- (String) `until_create_time`\n- (String) `since_update_time`\n- (String) `until_update_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. If NONE is passed in for `name` or `description`, it will check for the\nnon-existence of that field. For the filters listed above, here are some examples:\n- `filter=name%3D%3Dmy-tag-category`\n- `filter=description%3D%3DNONE`\n- `filter=since_create_time%3D%3D2024-12-22T01:00:00.000Z;until_create_time%3D%3D2025-01-01T00:00:00.000Z;`"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n- `create_time`\n- `update_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_create_tag_category",
    "description": "Create Tag Category",
    "method": "POST",
    "url": "/tags/categories",
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
          "description": "The name of the tag category, must be unique"
        },
        "description": {
          "type": "string",
          "description": "A description of the tag category"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_subscriptions",
    "description": "List Subscriptions",
    "method": "GET",
    "url": "/subscriptions",
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
          "description": "Filter to apply, allowed fields are:\n- (String) `contact_id`\n- (String) `subscription_plan_id`\n- (String) `status`\n- (String) `id` - Allowable operators: \"==\", \"<=\", \"<\", \">=\", \">\", \"!=\"\n- (String) `billing_amount` - Allowable operators: \"==\", \"<=\", \"<\", \">=\", \">\", \"!=\"\n- (List[String]) `ids`\n- (List[String]) `subscription_plan_ids`\n\nYou will need to apply the `==` operator (or other supported operators), to check the equality of one of the filters with your searched word, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=contact_id%3D%3D123`\n- `filter=subscription_plan_id%3D%3D456`\n- `filter=status%3D%3DActive`\n- `filter=id%3E5`\n- `filter=billing_amount%3E%3D100`\n- `filter=ids%3D%3D1,10,4,24`\n- `filter=subscription_plan_ids%3D%3D10,20,30`\n- `filter=contact_id%3D%3D123%3Bstatus%3D%3DActive`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `contact_id`\n- `subscription_plan_id`\n- `modification_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_create_subscription",
    "description": "Create Subscription",
    "method": "POST",
    "url": "/subscriptions",
    "pathParams": [],
    "query": [],
    "body": [
      "quantity",
      "active",
      "contact_id",
      "subscription_plan_id",
      "billing_amount",
      "auto_charge",
      "max_charge_attempts",
      "days_between_retries",
      "start_date",
      "payment_method_id",
      "allow_tax",
      "allow_duplicate",
      "lead_affiliate_id",
      "sale_affiliate_id",
      "shipping_address",
      "promo_code",
      "shipping_option_id",
      "reason_stopped",
      "custom_fields"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "quantity": {
          "type": "number",
          "description": "The subscription quantity. Must be 1 or greater. Default is 1."
        },
        "active": {
          "type": "boolean",
          "description": "If the subscription is active or not. Default is true"
        },
        "contact_id": {
          "type": "string",
          "description": "Id of the contact to create the subscription for."
        },
        "subscription_plan_id": {
          "type": "string",
          "description": "Id of the product subscription plan."
        },
        "billing_amount": {
          "type": "number",
          "description": "The billing amount. Must be 0 or greater. Default is the price in the product subscription plan."
        },
        "auto_charge": {
          "type": "boolean",
          "description": "If the subscription should auto charge on the next billing date. Default is true."
        },
        "max_charge_attempts": {
          "type": "number",
          "description": "Maximum number of charge attempts. Must be 1 or greater. Default is the configured [Max Retries] value."
        },
        "days_between_retries": {
          "type": "number",
          "description": "Number of days between charge attempts. Must be 1 or greater. Default is the configured [Num Days Between Retries] value."
        },
        "start_date": {
          "type": "string",
          "description": "The first day the subscription will bill. Must not be in the past. Default is today."
        },
        "payment_method_id": {
          "type": "string",
          "description": "Id associated with the payment method. Default is the contact's most recently used card, if auto charge is true. Default is 0 otherwise."
        },
        "allow_tax": {
          "type": "boolean",
          "description": "Only works if the product associated with the product subscription is taxable. Default is false."
        },
        "allow_duplicate": {
          "type": "boolean",
          "description": "If true, it will disable the check to see if there is already an identical subscription for the contact. Default is false."
        },
        "lead_affiliate_id": {
          "type": "string",
          "description": "The affiliate id for the lead of the subscription. Default is 0."
        },
        "sale_affiliate_id": {
          "type": "string",
          "description": "The affiliate id for the sale of the subscription. Default is 0."
        },
        "shipping_address": {
          "type": "string",
          "description": "The shipping address for the subscription."
        },
        "promo_code": {
          "type": "string",
          "description": "The promo code for the subscription."
        },
        "shipping_option_id": {
          "type": "string",
          "description": "The shipping option ID for the subscription."
        },
        "reason_stopped": {
          "type": "string",
          "description": "The reason the subscription is no longer active."
        },
        "custom_fields": {
          "type": "array",
          "description": "List of custom field values to apply to this subscription"
        }
      },
      "required": [
        "contact_id",
        "subscription_plan_id"
      ]
    }
  },
  {
    "name": "keap_v2_invoice_subscription",
    "description": "Invoice a Subscription",
    "method": "POST",
    "url": "/subscriptions/{subscription_id}:invoice",
    "pathParams": [
      "subscription_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "subscription_id": {
          "type": "string",
          "description": "Path parameter: subscription_id"
        }
      },
      "required": [
        "subscription_id"
      ]
    }
  },
  {
    "name": "keap_v2_cancel_subscription",
    "description": "Cancel Subscription",
    "method": "POST",
    "url": "/subscriptions/{subscription_id}:deactivate",
    "pathParams": [
      "subscription_id"
    ],
    "query": [],
    "body": [
      "reason"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "subscription_id": {
          "type": "string",
          "description": "Path parameter: subscription_id"
        },
        "reason": {
          "type": "string",
          "description": "The reason for cancelling the subscription."
        }
      },
      "required": [
        "subscription_id"
      ]
    }
  },
  {
    "name": "keap_v2_create_subscription_custom_field",
    "description": "Create a Subscription Custom Field",
    "method": "POST",
    "url": "/subscriptions/model/customFields",
    "pathParams": [],
    "query": [],
    "body": [
      "label",
      "options",
      "field_type",
      "group_id",
      "user_group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "field_type": {
          "type": "string"
        },
        "group_id": {
          "type": "string",
          "description": "An optional tab group to place the field under in the interface.  If not specified, will default to the 'Custom Fields' tab."
        },
        "user_group_id": {
          "type": "string",
          "description": "An optional user group to choose from when selecting values for User or UserListBox fields."
        }
      },
      "required": [
        "label",
        "field_type"
      ]
    }
  },
  {
    "name": "keap_v2_list_subscription_custom_field_groups",
    "description": "List Subscription Custom Field Groups",
    "method": "GET",
    "url": "/subscriptions/model/customFields/groups",
    "pathParams": [],
    "query": [
      "tab_id"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tab_id": {
          "type": "string",
          "description": "Optional tab id to scope groups to a single tab"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_subscription_custom_field_group",
    "description": "Create a Subscription Custom Field Group",
    "method": "POST",
    "url": "/subscriptions/model/customFields/groups",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "tab_id": {
          "type": "string"
        }
      }
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
    "name": "keap_v2_list_products",
    "description": "List Products",
    "method": "GET",
    "url": "/products",
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
          "description": "Filter to apply, allowed fields are:\n- (String) `name` - Wildcard matching allowed\n- (String) `sku` - Wildcard matching allowed\n- (String) `description` - Wildcard matching allowed\n- (String) `short_description` - Wildcard matching allowed\n- (String) `product_id` - supports comparison operators: `==`, `>`, `<`, `>=`, `<=`\n- (List[String]) `product_ids` - accepts a comma-separated list of product IDs\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`.\n\nFor fields which allow wildcard matching, you may use the * wildcard character (or its encoded form %2A)\nfor case-insensitive partial matching on text fields. Example of a valid pattern of wildcard usage:\n- `field==foo*` finds anything in `field` that begins with `foo`\n\nFor the filters listed above, here are some examples:\n- `filter=name%3D%3Dtestsearch`\n- `filter=name%3D%3Dtest*` (starts with \"test\")\n- `filter=sku%3D%3Dtestsearch`\n- `filter=sku%3D%3DSKU*` (starts with \"SKU\")\n- `filter=product_id>5` (product ID greater than 5)\n- `filter=product_id>=10` (product ID greater than or equal to 10)\n- `filter=product_id%3D%3D42` (product ID equals 42)\n- `filter=product_ids%3D%3D1,2,3,4,5` (products with IDs 1, 2, 3, 4, or 5)\n- `filter=name%3D%3Dtestsearch%3Bsku%3D%3Dtestsearch`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n- `sku`\n- `last_updated_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_create_product",
    "description": "Create a Product",
    "method": "POST",
    "url": "/products",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "sku",
      "price",
      "active",
      "description",
      "shippable",
      "weight",
      "taxable",
      "inventory",
      "short_description",
      "subscription_only",
      "storefront_hidden",
      "country_taxable",
      "state_taxable",
      "city_taxable",
      "top_html",
      "bottom_html",
      "is_package",
      "needs_digital_delivery",
      "delivery_description"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Product name"
        },
        "sku": {
          "type": "string",
          "description": "Product SKU"
        },
        "price": {
          "type": "number",
          "description": "The product price. The value is in the currency's smallest unit. e.g. $12.50 is 1250.  Must be greater than or equal to 0."
        },
        "active": {
          "type": "boolean",
          "description": "True means active, False means inactive"
        },
        "description": {
          "type": "string",
          "description": "Product long description"
        },
        "shippable": {
          "type": "boolean",
          "description": "If the product requires shipping"
        },
        "weight": {
          "type": "number",
          "description": "The product weight. Must be greater than or equal to 0."
        },
        "taxable": {
          "type": "boolean",
          "description": "Whether or not the product should be taxed"
        },
        "inventory": {
          "type": "string",
          "description": "The inventory details for this product"
        },
        "short_description": {
          "type": "string",
          "description": "Product short description"
        },
        "subscription_only": {
          "type": "boolean",
          "description": "If the product is a subscription-only product"
        },
        "storefront_hidden": {
          "type": "boolean",
          "description": "If the product should not be shown in the storefront"
        },
        "country_taxable": {
          "type": "boolean",
          "description": "If country-based taxes should be applied to this product"
        },
        "state_taxable": {
          "type": "boolean",
          "description": "If state-based taxes should be applied to this product"
        },
        "city_taxable": {
          "type": "boolean",
          "description": "If city-based taxes should be applied to this product"
        },
        "top_html": {
          "type": "string"
        },
        "bottom_html": {
          "type": "string"
        },
        "is_package": {
          "type": "boolean"
        },
        "needs_digital_delivery": {
          "type": "boolean"
        },
        "delivery_description": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "price",
        "short_description"
      ]
    }
  },
  {
    "name": "keap_v2_adjust_inventory",
    "description": "Adjust Inventory of a Product",
    "method": "POST",
    "url": "/products/{product_id}:adjustInventory",
    "pathParams": [
      "product_id"
    ],
    "query": [],
    "body": [
      "type",
      "quantity"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        },
        "type": {
          "type": "string"
        },
        "quantity": {
          "type": "number"
        }
      },
      "required": [
        "product_id"
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
    "name": "keap_v2_list_product_options",
    "description": "List Product Options",
    "method": "GET",
    "url": "/products/{product_id}/options",
    "pathParams": [
      "product_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        }
      },
      "required": [
        "product_id"
      ]
    }
  },
  {
    "name": "keap_v2_create_product_option",
    "description": "Create a Product Option",
    "method": "POST",
    "url": "/products/{product_id}/options",
    "pathParams": [
      "product_id"
    ],
    "query": [],
    "body": [
      "required",
      "option_type",
      "option_label",
      "display_order",
      "list_items",
      "text_rules"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        },
        "required": {
          "type": "boolean",
          "description": "Whether this option is required for product purchase."
        },
        "option_type": {
          "type": "string",
          "description": "The type of option. Possible valid values are LIST and TEXT."
        },
        "option_label": {
          "type": "string",
          "description": "The displayable name of the option (e.g. Size). Cannot be whitespace only."
        },
        "display_order": {
          "type": "number",
          "description": "The order in which this option will be displayed among other options. Minimum is 0. Lower values indicate higher priority in order."
        },
        "list_items": {
          "type": "array",
          "description": "Appears only for option_type of LIST. A fixed list of available selectable items for this product option."
        },
        "text_rules": {
          "type": "string",
          "description": "The option is a user-defined free-form field. The settings define the restrictions on what can be entered."
        }
      },
      "required": [
        "product_id",
        "option_type"
      ]
    }
  },
  {
    "name": "keap_v2_add_product_option_list_option_value",
    "description": "Add a Product Option List Option Value",
    "method": "POST",
    "url": "/products/{product_id}/options/{product_option_id}/listItems",
    "pathParams": [
      "product_id",
      "product_option_id"
    ],
    "query": [],
    "body": [
      "body"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        },
        "product_option_id": {
          "type": "string",
          "description": "Path parameter: product_option_id"
        },
        "body": {
          "type": "object",
          "description": "Request body payload"
        }
      },
      "required": [
        "product_id",
        "product_option_id",
        "body"
      ]
    }
  },
  {
    "name": "keap_v2_create_product_image",
    "description": "Create the Product Image",
    "method": "POST",
    "url": "/products/{product_id}/images",
    "pathParams": [
      "product_id"
    ],
    "query": [
      "legacy"
    ],
    "body": [
      "body"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        },
        "legacy": {
          "type": "boolean",
          "description": "Set to 'true' if the product image should also be used in legacy cart features. Only one image is allowed. If an image already exists, it will be replaced by the current image."
        },
        "body": {
          "type": "object",
          "description": "Request body payload"
        }
      },
      "required": [
        "product_id",
        "body"
      ]
    }
  },
  {
    "name": "keap_v2_delete_product_image",
    "description": "Delete the Product Image",
    "method": "DELETE",
    "url": "/products/{product_id}/images",
    "pathParams": [
      "product_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        }
      },
      "required": [
        "product_id"
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
    "name": "keap_v2_list_orders",
    "description": "List orders",
    "method": "GET",
    "url": "/orders",
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
          "description": "Filter to apply, allowed fields are:\n- (String) `id` - Allowable operators: \"==\",\"<=\", \"<\", \">=\", \">\", \"!=\"\n- (List[String]) `ids`\n- (String) `product_id`\n- (String) `contact_id`\n- (String) `invoice_id`\n- (String) `invoice_xid`\n- (Boolean) `paid`\n- (String) `created_since_time`\n- (String) `created_until_time`\n- (String) `modified_since_time`\n- (String) `modified_until_time`\n- (String) `title` - Wildcard matching allowed\n- (String) `order_type` (Allowed values: `ONLINE`, `OFFLINE`)\n- (String) `shipping_locality`\n- (String) `shipping_region_code`\n- (String) `shipping_postal_code`\n- (String) `shipping_country_code`\n\nYou will need to apply the `==` operator (or other supported operators), to check the equality\nof one of the filters with your searched word, in the encoded form `%3D%3D`. For the filters listed above,\nhere are some examples:\n- `filter=product_id%3D%3D123`\n- `filter=id%3C123`\n- `filter=ids%3D%3D1,10,4,24`\n- `filter=invoice_xid%3D%3Df411a79c-9a92-4960-91d9-656f910a25e8`\n- `filter=product_id%3D%3D123%3Bcontact_id%3D%3D567`\n- `filter=title%3D%3DOrder`\n- `filter=order_type%3D%3DONLINE`\n- `filter=shipping_locality%3D%3DPhoenix`\n- `filter=shipping_region_code%3D%3DIN-MH`\n- `filter=shipping_postal_code%3D%3D85001`\n- `filter=shipping_country_code%3D%3DIND`\n\nFor fields which allow wildcard matching, you may use the * wildcard character (or its encoded form %2A)\nfor case-insensitive partial matching on text fields. Example of a valid pattern of wildcard usage:\n- `field==foo*` finds anything in `field` that begins with `foo`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `order_time`\n- `modification_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_create_order",
    "description": "Create an Order",
    "method": "POST",
    "url": "/orders",
    "pathParams": [],
    "query": [],
    "body": [
      "notes",
      "terms",
      "contact_id",
      "order_items",
      "order_title",
      "order_time",
      "order_type",
      "promo_codes",
      "lead_affiliate_id",
      "sales_affiliate_id",
      "shipping_address",
      "custom_fields"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "notes": {
          "type": "string",
          "description": "Internal notes"
        },
        "terms": {
          "type": "string",
          "description": "Order terms"
        },
        "contact_id": {
          "type": "string",
          "description": "ID of the contact for this order"
        },
        "order_items": {
          "type": "array",
          "description": "List of items to include in the order"
        },
        "order_title": {
          "type": "string",
          "description": "Title for the order"
        },
        "order_time": {
          "type": "string",
          "description": "The date and time of the order. In ISO-8601 format (e.g. 2024-05-21T23:00:00Z)"
        },
        "order_type": {
          "type": "string",
          "description": "The order type."
        },
        "promo_codes": {
          "type": "array",
          "description": "Uses multiple strings as promo codes. The corresponding discount will be applied to the order."
        },
        "lead_affiliate_id": {
          "type": "string",
          "description": "Lead affiliate ID"
        },
        "sales_affiliate_id": {
          "type": "string",
          "description": "Sales affiliate ID"
        },
        "shipping_address": {
          "type": "string",
          "description": "Shipping address for the order"
        },
        "custom_fields": {
          "type": "array",
          "description": "List of custom field values to apply to this order"
        }
      },
      "required": [
        "contact_id",
        "order_title",
        "order_time",
        "order_type"
      ]
    }
  },
  {
    "name": "keap_v2_detach_file_from_order",
    "description": "Detach a File from an Order Invoice",
    "method": "POST",
    "url": "/orders/{order_id}:detachFile",
    "pathParams": [
      "order_id"
    ],
    "query": [],
    "body": [
      "file_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        },
        "file_id": {
          "type": "string"
        }
      },
      "required": [
        "order_id",
        "file_id"
      ]
    }
  },
  {
    "name": "keap_v2_attach_file_to_order",
    "description": "Attach a File to an Order Invoice",
    "method": "POST",
    "url": "/orders/{order_id}:attachFile",
    "pathParams": [
      "order_id"
    ],
    "query": [],
    "body": [
      "file_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        },
        "file_id": {
          "type": "string"
        }
      },
      "required": [
        "order_id",
        "file_id"
      ]
    }
  },
  {
    "name": "keap_v2_apply_tax",
    "description": "Apply Taxes on an Order",
    "method": "POST",
    "url": "/orders/{order_id}:applyTax",
    "pathParams": [
      "order_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        }
      },
      "required": [
        "order_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_order_payments",
    "description": "Retrieve Order Payments",
    "method": "GET",
    "url": "/orders/{order_id}/payments",
    "pathParams": [
      "order_id"
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
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `invoice_id`\n- (String) `payment_id`\n- (String) `amount`\n- (String) `pay_status`\n- (Boolean) `skip_commission`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\n word, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=payment_id%3D%3D123`\n- `filter=pay_status%3D%3DAPPROVED`\n- `filter=invoice_id%3D%3D456%3Bskip_commission=true`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `invoice_id`\n- `payment_id`\n- `amount`\n- `pay_time`\n- `pay_status`\n- `skip_commission`\n- `last_updated_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
        "order_id"
      ]
    }
  },
  {
    "name": "keap_v2_create_payment_for_an_order",
    "description": "Create a Payment",
    "method": "POST",
    "url": "/orders/{order_id}/payments",
    "pathParams": [
      "order_id"
    ],
    "query": [],
    "body": [
      "notes",
      "payment_method_id",
      "payment_method_type",
      "payment_time",
      "payment_amount",
      "apply_to_commissions"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        },
        "notes": {
          "type": "string",
          "description": "The notes for this payment."
        },
        "payment_method_id": {
          "type": "string",
          "description": "The payment method id to charge immediately against this order. Omit if you want to add a payment record instead."
        },
        "payment_method_type": {
          "type": "string",
          "description": "The manual payment method type for manually recording a payment. Value must match against the list of types defined under your application's Order Settings. Ignored if payment_method_id is provided."
        },
        "payment_time": {
          "type": "string",
          "description": "The date and time of payment. In ISO-8601 format (e.g. 2024-05-21T23:00:00Z)"
        },
        "payment_amount": {
          "type": "number",
          "description": "The amount to pay. Must not exceed the current balance of the order. Must be greater than 0 if charging with a payment_method_id"
        },
        "apply_to_commissions": {
          "type": "boolean",
          "description": "Whether to apply this payment to commissions."
        }
      },
      "required": [
        "order_id",
        "payment_amount",
        "apply_to_commissions"
      ]
    }
  },
  {
    "name": "keap_v2_create_order_item",
    "description": "Create an Order Item",
    "method": "POST",
    "url": "/orders/{order_id}/items",
    "pathParams": [
      "order_id"
    ],
    "query": [],
    "body": [
      "name",
      "description",
      "quantity",
      "notes",
      "product_id",
      "subscription_plan_id",
      "subscription_plan_description",
      "item_type",
      "price_per_unit",
      "cost_per_unit"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        },
        "name": {
          "type": "string",
          "description": "The name of the order item. Must not be whitespace. If not specified, the product name will be used."
        },
        "description": {
          "type": "string",
          "description": "The description of the order item. Must not be whitespace."
        },
        "quantity": {
          "type": "number",
          "description": "The quantity. Must be greater than or equal to 1."
        },
        "notes": {
          "type": "string",
          "description": "The notes for the order item. Must not be whitespace."
        },
        "product_id": {
          "type": "string",
          "description": "The id of the product to be added to the order. Must be a valid product id. Required for item_type PRODUCT or SUBSCRIPTION."
        },
        "subscription_plan_id": {
          "type": "string",
          "description": "The id of the subscription plan to be added to the order. Must be a valid subscription plan id. Required only when the item_type is SUBSCRIPTION."
        },
        "subscription_plan_description": {
          "type": "string",
          "description": "A short description of the subscription's schedule. Used only for item_type SUBSCRIPTION. Must not be whitespace."
        },
        "item_type": {
          "type": "string",
          "description": "The type of this order item. Will default to [PRODUCT] if omitted."
        },
        "price_per_unit": {
          "type": "number",
          "description": "The price per unit. For item_type PRODUCT or SUBSCRIPTION, if not specified, the product price will be used."
        },
        "cost_per_unit": {
          "type": "number",
          "description": "The cost per unit. Used only for item_type PRODUCT or SUBSCRIPTION. If not specified, the product cost will be used."
        }
      },
      "required": [
        "order_id",
        "quantity"
      ]
    }
  },
  {
    "name": "keap_v2_apply_commission_on_order_items",
    "description": "Apply Commission to an Order Item",
    "method": "POST",
    "url": "/orders/{order_id}/items/{order_item_id}:applyCommission",
    "pathParams": [
      "order_id",
      "order_item_id"
    ],
    "query": [],
    "body": [
      "affiliate_id",
      "pay_percent",
      "commission_amount",
      "payout_type",
      "description",
      "commission_date"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        },
        "order_item_id": {
          "type": "string",
          "description": "Path parameter: order_item_id"
        },
        "affiliate_id": {
          "type": "string",
          "description": "The affiliate id"
        },
        "pay_percent": {
          "type": "number",
          "description": "Commission percentage"
        },
        "commission_amount": {
          "type": "number",
          "description": "Fixed commission amount"
        },
        "payout_type": {
          "type": "string",
          "description": "The payout type"
        },
        "description": {
          "type": "string",
          "description": "Commission description"
        },
        "commission_date": {
          "type": "string",
          "description": "Date of the commission"
        }
      },
      "required": [
        "order_id",
        "order_item_id",
        "affiliate_id",
        "payout_type"
      ]
    }
  },
  {
    "name": "keap_v2_create_order_custom_field",
    "description": "Create an Order Custom Field",
    "method": "POST",
    "url": "/orders/model/customFields",
    "pathParams": [],
    "query": [],
    "body": [
      "label",
      "options",
      "field_type",
      "group_id",
      "user_group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "field_type": {
          "type": "string"
        },
        "group_id": {
          "type": "string",
          "description": "An optional tab group to place the field under in the interface.  If not specified, will default to the 'Custom Fields' tab."
        },
        "user_group_id": {
          "type": "string",
          "description": "An optional user group to choose from when selecting values for User or UserListBox fields."
        }
      },
      "required": [
        "label",
        "field_type"
      ]
    }
  },
  {
    "name": "keap_v2_list_order_custom_field_groups",
    "description": "List Order Custom Field Groups",
    "method": "GET",
    "url": "/orders/model/customFields/groups",
    "pathParams": [],
    "query": [
      "tab_id"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tab_id": {
          "type": "string",
          "description": "Optional tab id to scope groups to a single tab"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_order_custom_field_group",
    "description": "Create an Order Custom Field Group",
    "method": "POST",
    "url": "/orders/model/customFields/groups",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "tab_id": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_opportunities",
    "description": "List Opportunities",
    "method": "GET",
    "url": "/opportunities",
    "pathParams": [],
    "query": [
      "fields",
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Opportunities properties to include in the response. Legacy field names are supported for optional fields only if legacy opportunities feature is enabled. Allowed optional values: custom_fields. Allowed legacy optional values: monthly_revenue,order_revenue,objection,status,stage_entrance_time"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `stage_id`\n- (String) `user_id`\n- (String) `contact_id`\n- (String) `opportunity_title` \u2014 supports wildcard prefix search (e.g. `opportunity_title==Deal*`)\n- (String) `lead_source_name` \u2014 supports wildcard prefix search (e.g. `lead_source_name==Web*`)\n- (String) `affiliate_id` \u2014 exact match only (e.g. `affiliate_id==123`)\n- (String) `opportunity_id` \u2014 supports comparison operators: `==`, `>`, `<`, `>=`, `<=`\n- (String) `ids` \u2014 comma-separated list of opportunity IDs (e.g. `ids==1,2,3`), maximum 100 IDs\nNote: `opportunity_id` and `ids` cannot be used together in the same request.\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to opportunities items.\nOne of the following fields:\n- `next_action_time`\n- `contact_name`\n- `opportunity_title`\n- `created_time`\n- `update_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_create_opportunity",
    "description": "Create an Opportunity",
    "method": "POST",
    "url": "/opportunities",
    "pathParams": [],
    "query": [
      "fields"
    ],
    "body": [
      "opportunity_title",
      "next_action_time",
      "next_action_notes",
      "opportunity_notes",
      "estimated_close_time",
      "include_in_forecast",
      "projected_revenue_low",
      "projected_revenue_high",
      "contact_id",
      "stage_id",
      "user_id",
      "custom_fields",
      "affiliate_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Opportunities properties to include in the response. Legacy field names are supported for optional fields only if legacy opportunities feature is enabled. Allowed optional values: custom_fields. Allowed legacy optional values: monthly_revenue,order_revenue,objection,status,stage_entrance_time"
        },
        "opportunity_title": {
          "type": "string",
          "description": "Opportunity title"
        },
        "next_action_time": {
          "type": "string",
          "description": "Next action timestamp (ISO-8601)"
        },
        "next_action_notes": {
          "type": "string",
          "description": "Notes for next action"
        },
        "opportunity_notes": {
          "type": "string",
          "description": "General notes"
        },
        "estimated_close_time": {
          "type": "string",
          "description": "Estimated close timestamp (ISO-8601)"
        },
        "include_in_forecast": {
          "type": "boolean",
          "description": "Include in sales forecast"
        },
        "projected_revenue_low": {
          "type": "number",
          "description": "Low revenue estimate"
        },
        "projected_revenue_high": {
          "type": "number",
          "description": "High revenue estimate"
        },
        "contact_id": {
          "type": "string",
          "description": "Associated contact ID"
        },
        "stage_id": {
          "type": "string",
          "description": "Pipeline stage ID"
        },
        "user_id": {
          "type": "string",
          "description": "Assigned user ID"
        },
        "custom_fields": {
          "type": "array"
        },
        "affiliate_id": {
          "type": "string",
          "description": "Affiliate ID"
        }
      },
      "required": [
        "opportunity_title"
      ]
    }
  },
  {
    "name": "keap_v2_list_opportunity_stages",
    "description": "List of Opportunity Stages",
    "method": "GET",
    "url": "/opportunities/stages",
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
          "description": "Filter to apply, allowed fields are:\n- (String) `opportunity_stage_name` \u2014 supports wildcard prefix search (e.g. `opportunity_stage_name==Qualified*`)\n- (String) `opportunity_stage_id` \u2014 supports comparison operators: `==`, `>`, `<`, `>=`, `<=` (e.g. `opportunity_stage_id>5`)\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order stage items.\nOne of the following fields:\n- `stage_order`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_create_opportunity_stage",
    "description": "Create an Opportunity Stage",
    "method": "POST",
    "url": "/opportunities/stages",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "order",
      "target_number_days",
      "probability",
      "checklist_items"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "order": {
          "type": "number"
        },
        "target_number_days": {
          "type": "number"
        },
        "probability": {
          "type": "number"
        },
        "checklist_items": {
          "type": "array"
        }
      },
      "required": [
        "name",
        "order",
        "target_number_days",
        "probability"
      ]
    }
  },
  {
    "name": "keap_v2_create_opportunity_custom_fields",
    "description": "Create an Opportunity Custom Field",
    "method": "POST",
    "url": "/opportunities/model/customFields",
    "pathParams": [],
    "query": [],
    "body": [
      "label",
      "options",
      "field_type",
      "group_id",
      "user_group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "field_type": {
          "type": "string"
        },
        "group_id": {
          "type": "string",
          "description": "An optional tab group to place the field under in the interface.  If not specified, will default to the 'Custom Fields' tab."
        },
        "user_group_id": {
          "type": "string",
          "description": "An optional user group to choose from when selecting values for User or UserListBox fields."
        }
      },
      "required": [
        "label",
        "field_type"
      ]
    }
  },
  {
    "name": "keap_v2_list_opportunity_custom_field_groups",
    "description": "List Opportunity Custom Field Groups",
    "method": "GET",
    "url": "/opportunities/model/customFields/groups",
    "pathParams": [],
    "query": [
      "tab_id"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tab_id": {
          "type": "string",
          "description": "Optional tab id to scope groups to a single tab"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_opportunity_custom_field_group",
    "description": "Create an Opportunity Custom Field Group",
    "method": "POST",
    "url": "/opportunities/model/customFields/groups",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "tab_id": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_note_custom_field",
    "description": "Create a Custom Field",
    "method": "POST",
    "url": "/notes/model/customFields",
    "pathParams": [],
    "query": [],
    "body": [
      "label",
      "options",
      "field_type",
      "group_id",
      "user_group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "field_type": {
          "type": "string"
        },
        "group_id": {
          "type": "string",
          "description": "An optional tab group to place the field under in the interface.  If not specified, will default to the 'Custom Fields' tab."
        },
        "user_group_id": {
          "type": "string",
          "description": "An optional user group to choose from when selecting values for User or UserListBox fields."
        }
      },
      "required": [
        "label",
        "field_type"
      ]
    }
  },
  {
    "name": "keap_v2_list_note_custom_field_groups",
    "description": "List Note Custom Field Groups",
    "method": "GET",
    "url": "/notes/model/customFields/groups",
    "pathParams": [],
    "query": [
      "tab_id"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tab_id": {
          "type": "string",
          "description": "Optional tab id to scope groups to a single tab"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_note_custom_field_group",
    "description": "Create a Note Custom Field Group",
    "method": "POST",
    "url": "/notes/model/customFields/groups",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "tab_id": {
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
    "name": "keap_v2_list_files",
    "description": "List all files",
    "method": "GET",
    "url": "/files",
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
          "description": "Filter to apply, allowed fields are:\n- (Boolean) `is_public`\n- (String) `contact_id`\n- (String) `user_id`\n- (FileBoxCategory) `category`\n- (FileBoxType) `file_box_type`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=contact_id%3D%3D123`\n- `filter=category%3D%3DATTACHMENTS`\n- `filter=file_box_type%3D%3DTICKET%3Bcategory%3D%3DATTACHMENTS`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `file_name`\n- `updated_time`\n- ...\n\nOne of the following directions:\n- `asc`\n- `desc`\n"
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
    "name": "keap_v2_create_file",
    "description": "Create a file",
    "method": "POST",
    "url": "/files",
    "pathParams": [],
    "query": [],
    "body": [
      "body"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "body": {
          "type": "object",
          "description": "Request body payload"
        }
      },
      "required": [
        "body"
      ]
    }
  },
  {
    "name": "keap_v2_get_file",
    "description": "Retrieve a file",
    "method": "GET",
    "url": "/files/{file_id}",
    "pathParams": [
      "file_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "file_id": {
          "type": "string",
          "description": "Path parameter: file_id"
        }
      },
      "required": [
        "file_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_file",
    "description": "Update a file",
    "method": "POST",
    "url": "/files/{file_id}",
    "pathParams": [
      "file_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "body"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "file_id": {
          "type": "string",
          "description": "Path parameter: file_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "body": {
          "type": "object",
          "description": "Request body payload"
        }
      },
      "required": [
        "file_id",
        "body"
      ]
    }
  },
  {
    "name": "keap_v2_delete_file",
    "description": "Delete a file",
    "method": "DELETE",
    "url": "/files/{file_id}",
    "pathParams": [
      "file_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "file_id": {
          "type": "string",
          "description": "Path parameter: file_id"
        }
      },
      "required": [
        "file_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_emails",
    "description": "List Emails",
    "method": "GET",
    "url": "/emails",
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
          "description": "Filter to apply, allowed fields are:\n- (String) contact_id\n- (String) email\n- (String) start_created_time\n- (String) end_created_time\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `created_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_create_email",
    "description": "Create an Email Record",
    "method": "POST",
    "url": "/emails",
    "pathParams": [],
    "query": [],
    "body": [
      "subject",
      "headers",
      "contact_id",
      "sent_to_address",
      "sent_to_cc_address_list",
      "sent_to_bcc_address_list",
      "sent_from_address",
      "sent_from_reply_address",
      "sent_time",
      "received_time",
      "opened_time",
      "clicked_time",
      "plain_content",
      "html_content",
      "original_provider",
      "original_provider_id",
      "provider_source_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "subject": {
          "type": "string",
          "description": "The subject of the email"
        },
        "headers": {
          "type": "string",
          "description": "Email headers"
        },
        "contact_id": {
          "type": "string",
          "description": "The contact ID who received the email"
        },
        "sent_to_address": {
          "type": "string",
          "description": "The email address the email was sent to"
        },
        "sent_to_cc_address_list": {
          "type": "array",
          "description": "List of CC email addresses"
        },
        "sent_to_bcc_address_list": {
          "type": "array",
          "description": "List of BCC email addresses"
        },
        "sent_from_address": {
          "type": "string",
          "description": "The sender's email address"
        },
        "sent_from_reply_address": {
          "type": "string",
          "description": "The reply-to email address"
        },
        "sent_time": {
          "type": "string",
          "description": "When the email was sent, in ISO-8601 format"
        },
        "received_time": {
          "type": "string",
          "description": "When the email was received, in ISO-8601 format"
        },
        "opened_time": {
          "type": "string",
          "description": "When the email was opened, in ISO-8601 format"
        },
        "clicked_time": {
          "type": "string",
          "description": "When a link in the email was clicked, in ISO-8601 format"
        },
        "plain_content": {
          "type": "string",
          "description": "Base64 encoded text"
        },
        "html_content": {
          "type": "string",
          "description": "Base64 encoded HTML"
        },
        "original_provider": {
          "type": "string",
          "description": "Provider that sent the email, defaults to UNKNOWN"
        },
        "original_provider_id": {
          "type": "string",
          "description": "Provider id that sent the email, must be unique when combined with provider. If omitted a UUID without dashes is autogenerated for the record."
        },
        "provider_source_id": {
          "type": "string",
          "description": "The email address of the synced email account that generated this message."
        }
      },
      "required": [
        "sent_to_address"
      ]
    }
  },
  {
    "name": "keap_v2_send_email",
    "description": "Send an Email",
    "method": "POST",
    "url": "/emails:send",
    "pathParams": [],
    "query": [],
    "body": [
      "contacts",
      "subject",
      "attachments",
      "user_id",
      "html_content",
      "plain_content",
      "address_field"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contacts": {
          "type": "array",
          "description": "An array of Contact Ids to receive the email"
        },
        "subject": {
          "type": "string",
          "description": "The subject line of the email"
        },
        "attachments": {
          "type": "array",
          "description": "Attachments to be sent with each copy of the email, maximum of 10 with size of 1MB each"
        },
        "user_id": {
          "type": "string",
          "description": "The user ID to send the email on behalf of"
        },
        "html_content": {
          "type": "string",
          "description": "The HTML-formatted content of the email, encoded in Base64"
        },
        "plain_content": {
          "type": "string",
          "description": "The plain-text content of the email, encoded in Base64"
        },
        "address_field": {
          "type": "string",
          "description": "Email field of each Contact record to address the email to, such as 'Email', 'EmailAddress2', 'EmailAddress3' or '_CustomFieldName', defaulting to the contact's primary email"
        }
      },
      "required": [
        "contacts",
        "subject",
        "user_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_emails",
    "description": "Remove a set of Email Records",
    "method": "POST",
    "url": "/emails:batchRemove",
    "pathParams": [],
    "query": [],
    "body": [
      "email_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "email_ids": {
          "type": "array",
          "description": "List of email IDs to delete"
        }
      },
      "required": [
        "email_ids"
      ]
    }
  },
  {
    "name": "keap_v2_create_emails",
    "description": "Create a set of Email Records",
    "method": "POST",
    "url": "/emails:batchAdd",
    "pathParams": [],
    "query": [],
    "body": [
      "emails"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "emails": {
          "type": "array",
          "description": "Collection of email records to create, maximum 1000"
        }
      },
      "required": [
        "emails"
      ]
    }
  },
  {
    "name": "keap_v2_send_email_template",
    "description": "Send an email based on a template",
    "method": "POST",
    "url": "/emails/templates:send",
    "pathParams": [],
    "query": [],
    "body": [
      "template_id",
      "contact_ids",
      "user_id",
      "address_field"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "template_id": {
          "type": "string",
          "description": "Template ID"
        },
        "contact_ids": {
          "type": "array",
          "description": "List of contact IDs to send the email to"
        },
        "user_id": {
          "type": "string",
          "description": "The user ID to send the email on behalf of"
        },
        "address_field": {
          "type": "string",
          "description": "Email field of each Contact record to address the email to, such as 'Email', 'EmailAddress2', 'EmailAddress3' or '_CustomFieldName', defaulting to the contact's primary email"
        }
      },
      "required": [
        "template_id",
        "contact_ids",
        "user_id"
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
    "name": "keap_v2_list_contacts",
    "description": "List Contacts",
    "method": "GET",
    "url": "/contacts",
    "pathParams": [],
    "query": [
      "fields",
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of Contact properties to include in the response. (Available fields are: addresses,anniversary_date,birth_date,company,contact_type,create_time,\ncustom_fields,email_addresses,family_name,fax_numbers,given_name,id,job_title,leadsource_id,\nlinks,middle_name,notes,origin,owner_id,phone_numbers,preferred_locale,preferred_name,prefix,\nreferral_code,score_value,social_accounts,source_type,spouse_name,suffix,tag_ids,time_zone,\nupdate_time,utm_parameters,website,account_id,assistant_name,assistant_phone,\nbilling_information,created_by,groups,last_updated_by)"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `email` \u2014 supports wildcard (e.g. `email==john*`)\n- (String) `given_name` \u2014 supports wildcard (e.g. `given_name==Mar*`)\n- (String) `family_name` \u2014 supports wildcard (e.g. `family_name==Smi*`)\n- (String) `middle_name` \u2014 supports wildcard (e.g. `middle_name==J*`)\n- (String) `company_id`\n- (Set[String]) `contact_ids`\n- (Set[String]) `ids` \u2014 accepts a list of contact IDs (e.g. `ids==1,2,3`)\n- (String) `start_update_time`\n- (String) `end_update_time`\n- (String) `phone_number` \u2014 the phone number to search for. Requires `phone_fields` to be specified; only the specified phone fields are searched.\n- (Set[String]) `phone_fields` \u2014 restricts which phone fields to search (e.g. PHONE1, PHONE2, or comma-separated list PHONE1,PHONE2,PHONE3,PHONE4,PHONE5). Required when `phone_number` is supplied.\n- (String) `billing_address_line1`\n- (String) `billing_address_locality`\n- (String) `billing_address_region` (long-form region/state name, e.g. \"Arizona\")\n- (String) `billing_address_postal_code`\n- (String) `billing_address_country_code` (ISO 3166-1 alpha-3, e.g. \"USA\")\n- (String) `shipping_address_line1`\n- (String) `shipping_address_locality`\n- (String) `shipping_address_region`\n- (String) `shipping_address_postal_code`\n- (String) `shipping_address_country_code`\n- (String) `other_address_line1`\n- (String) `other_address_locality`\n- (String) `other_address_region`\n- (String) `other_address_postal_code`\n- (String) `other_address_country_code`\n- (String) `website` \u2014 supports wildcard (e.g. `website==https://example*`)\n- (String) `lead_source_name` \u2014 supports wildcard (e.g. `lead_source_name==Google*`)\n- (String) `contact_id` \u2014 supports comparison operators: `==`, `>`, `<`, `>=`, `<=`\n(e.g. `contact_id>5` encoded as `contact_id%3E5`)\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`.\nFor wildcard filtering, use `*` at the end of the value (prefix matching), encoded as `%2A`.\nFor the filters listed above, here are some examples:\n- `filter=given_name%3D%3DMary`\n- `filter=given_name%3D%3DMar%2A` (wildcard: starts with \"Mar\")\n- `filter=company_id%3D%3D123`\n- `filter=company_id%3D%3D123%3Bfamily_name%3D%3DSmith`\n- `filter=billing_address_locality%3D%3DChandler`\n- `filter=shipping_address_country_code%3D%3DUSA%3Bshipping_address_region%3D%3DArizona`\n- `filter=contact_id%3E5` (contact_id > 5)\n- `filter=ids%3D%3D1,2,3` (contacts with IDs 1, 2, or 3)\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `create_time`\n- `email`\n- `update_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_create_contact",
    "description": "Create a Contact",
    "method": "POST",
    "url": "/contacts",
    "pathParams": [],
    "query": [
      "fields",
      "duplicate_option"
    ],
    "body": [
      "addresses",
      "company",
      "origin",
      "prefix",
      "suffix",
      "website",
      "anniversary_date",
      "birth_date",
      "contact_type",
      "custom_fields",
      "email_addresses",
      "family_name",
      "fax_numbers",
      "given_name",
      "job_title",
      "leadsource_id",
      "middle_name",
      "owner_id",
      "phone_numbers",
      "preferred_locale",
      "preferred_name",
      "referral_code",
      "social_accounts",
      "source_type",
      "spouse_name",
      "time_zone",
      "utm_parameters",
      "assistant_name",
      "assistant_phone",
      "billing_information"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of Contact properties to include in the response. (Available fields are: addresses,anniversary_date,birth_date,company,contact_type,create_time,\ncustom_fields,email_addresses,family_name,fax_numbers,given_name,id,job_title,leadsource_id,\nlinks,middle_name,notes,origin,owner_id,phone_numbers,preferred_locale,preferred_name,prefix,\nreferral_code,score_value,social_accounts,source_type,spouse_name,suffix,tag_ids,time_zone,\nupdate_time,utm_parameters,website,account_id,assistant_name,assistant_phone,\nbilling_information,created_by,groups,last_updated_by)"
        },
        "duplicate_option": {
          "type": "string",
          "description": "Duplicate check strategy. If provided, performs duplicate checking and updates the existing contact if a match is found."
        },
        "addresses": {
          "type": "array",
          "description": "Any address not listed here will be removed if it already exists. If an empty array is specified, all existing values will be removed."
        },
        "company": {
          "type": "string"
        },
        "origin": {
          "type": "string"
        },
        "prefix": {
          "type": "string",
          "description": "Name prefix"
        },
        "suffix": {
          "type": "string",
          "description": "Name suffix"
        },
        "website": {
          "type": "string",
          "description": "Personal website URL"
        },
        "anniversary_date": {
          "type": "string",
          "description": "The anniversary date"
        },
        "birth_date": {
          "type": "string",
          "description": "The birth date"
        },
        "contact_type": {
          "type": "string",
          "description": "Type of contact"
        },
        "custom_fields": {
          "type": "array",
          "description": "Any address not listed here will be removed if it already exists. If an empty array is specified, all existing values will be removed."
        },
        "email_addresses": {
          "type": "array",
          "description": "Any address not listed here will be removed if it already exists. If an empty array is specified, all existing values will be removed."
        },
        "family_name": {
          "type": "string",
          "description": "Last name / surname"
        },
        "fax_numbers": {
          "type": "array",
          "description": "Any address not listed here will be removed if it already exists. If an empty array is specified, all existing values will be removed."
        },
        "given_name": {
          "type": "string",
          "description": "First name"
        },
        "job_title": {
          "type": "string",
          "description": "Job title"
        },
        "leadsource_id": {
          "type": "string",
          "description": "Lead source identifier"
        },
        "middle_name": {
          "type": "string",
          "description": "Middle name"
        },
        "owner_id": {
          "type": "string",
          "description": "ID of the user who owns this contact"
        },
        "phone_numbers": {
          "type": "array",
          "description": "Any address not listed here will be removed if it already exists. If an empty array is specified, all existing values will be removed."
        },
        "preferred_locale": {
          "type": "string",
          "description": "Preferred locale"
        },
        "preferred_name": {
          "type": "string",
          "description": "Preferred name or nickname"
        },
        "referral_code": {
          "type": "string",
          "description": "Referral code"
        },
        "social_accounts": {
          "type": "array",
          "description": "Any address not listed here will be removed if it already exists. If an empty array is specified, all existing values will be removed."
        },
        "source_type": {
          "type": "string"
        },
        "spouse_name": {
          "type": "string",
          "description": "Spouse's name"
        },
        "time_zone": {
          "type": "string",
          "description": "Contact's timezone"
        },
        "utm_parameters": {
          "type": "string"
        },
        "assistant_name": {
          "type": "string"
        },
        "assistant_phone": {
          "type": "string"
        },
        "billing_information": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "keap_v2_unlink_contacts",
    "description": "Delete Link between two Contacts",
    "method": "POST",
    "url": "/contacts:unlink",
    "pathParams": [],
    "query": [],
    "body": [
      "contact1_id",
      "link_type_id",
      "contact2_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contact1_id": {
          "type": "string",
          "description": "First contact ID to link"
        },
        "link_type_id": {
          "type": "string",
          "description": "Link type ID"
        },
        "contact2_id": {
          "type": "string",
          "description": "Second contact ID to link"
        }
      }
    }
  },
  {
    "name": "keap_v2_merge_contacts",
    "description": "Merge two Contacts",
    "method": "POST",
    "url": "/contacts:merge",
    "pathParams": [],
    "query": [
      "fields"
    ],
    "body": [
      "contact_id",
      "duplicate_contact_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of Contact properties to include in the response. (Available fields are: addresses,anniversary_date,birth_date,company,contact_type,create_time,\ncustom_fields,email_addresses,family_name,fax_numbers,given_name,id,job_title,leadsource_id,\nlinks,middle_name,notes,origin,owner_id,phone_numbers,preferred_locale,preferred_name,prefix,\nreferral_code,score_value,social_accounts,source_type,spouse_name,suffix,tag_ids,time_zone,\nupdate_time,utm_parameters,website,account_id,assistant_name,assistant_phone,\nbilling_information,created_by,groups,last_updated_by)"
        },
        "contact_id": {
          "type": "string",
          "description": "Primary contact ID to merge into"
        },
        "duplicate_contact_id": {
          "type": "string",
          "description": "Duplicate contact ID to merge from"
        }
      },
      "required": [
        "contact_id",
        "duplicate_contact_id"
      ]
    }
  },
  {
    "name": "keap_v2_link_contacts",
    "description": "Link Contacts",
    "method": "POST",
    "url": "/contacts:link",
    "pathParams": [],
    "query": [],
    "body": [
      "contact1_id",
      "link_type_id",
      "contact2_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contact1_id": {
          "type": "string",
          "description": "First contact ID to link"
        },
        "link_type_id": {
          "type": "string",
          "description": "Link type ID"
        },
        "contact2_id": {
          "type": "string",
          "description": "Second contact ID to link"
        }
      }
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
    "name": "keap_v2_list_notes",
    "description": "List Notes",
    "method": "GET",
    "url": "/contacts/{contact_id}/notes",
    "pathParams": [
      "contact_id"
    ],
    "query": [
      "filter",
      "order_by",
      "page_size",
      "page_token",
      "fields"
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
          "description": "Filter to apply. Allowed fields and operators:\n- (String) `id` \u2014 supports `==`, `!=`, `>`, `<`, `>=`, `<=`\n- (String list) `ids` \u2014 comma-separated note ids, supports `==` only (e.g. `ids==1,2,3`)\n- (String) `title` \u2014 supports `==`. Bare value matches anywhere in the title (contains).\n   Wildcard prefix match also supported (e.g. `title==Follow*`)\n- (String) `contact_id`\n- (String) `assigned_to_user_id`\n- (String) `since_time` \u2014 ISO-8601 date/time\n- (String) `until_time` \u2014 ISO-8601 date/time\n\nOperators must be URL-encoded. Common encodings:\n`==` \u2192 `%3D%3D`, `!=` \u2192 `!%3D`, `>` \u2192 `%3E`, `<` \u2192 `%3C`,\n`>=` \u2192 `%3E%3D`, `<=` \u2192 `%3C%3D`, `*` \u2192 `%2A`.\n\nMultiple filters are combined with AND using `;`.\n\nExamples:\n- `filter=contact_id%3D%3D1001`\n- `filter=id%3E5`\n- `filter=ids%3D%3D1,2,3`\n- `filter=title%3D%3DFollow%2A`\n- `filter=since_time%3D%3D2025-04-16T20:33:02.321Z`\n- `filter=until_time%3D%3D2025-08-16T20:33:02.321Z`\n\nNotes:\n- `id` and `ids` cannot be combined in the same request.\n- Wildcard `*` may only appear at the end of the value (prefix match).\n   Leading wildcards (`*foo`, `*foo*`) are rejected for performance reasons.\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `create_time`\n- `update_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Note properties to include in the response. Allowed values: custom_fields"
        }
      },
      "required": [
        "contact_id"
      ]
    }
  },
  {
    "name": "keap_v2_create_note",
    "description": "Create a Note",
    "method": "POST",
    "url": "/contacts/{contact_id}/notes",
    "pathParams": [
      "contact_id"
    ],
    "query": [
      "fields"
    ],
    "body": [
      "title",
      "text",
      "type",
      "user_id",
      "is_pinned",
      "custom_fields"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contact_id": {
          "type": "string",
          "description": "Path parameter: contact_id"
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Note properties to include in the response. Allowed values: custom_fields"
        },
        "title": {
          "type": "string",
          "description": "A value for either `title` or `type` is required."
        },
        "text": {
          "type": "string",
          "description": "Note content"
        },
        "type": {
          "type": "string",
          "description": "A value for either `title` or `type` is required. The value may be one of `Appointment`, `Call`, `Email`, `Fax`, `Letter` or `Other` in Keap Max/Pro, or an admin-configured value in Classic."
        },
        "user_id": {
          "type": "string",
          "description": "ID of user creating the note"
        },
        "is_pinned": {
          "type": "boolean",
          "description": "Whether to pin this note"
        },
        "custom_fields": {
          "type": "array",
          "description": "Custom field values for the note. An empty array resets all custom fields to their defaults."
        }
      },
      "required": [
        "contact_id",
        "user_id"
      ]
    }
  },
  {
    "name": "keap_v2_create_contact_custom_field",
    "description": "Create a Contact Custom Field",
    "method": "POST",
    "url": "/contacts/model/customFields",
    "pathParams": [],
    "query": [],
    "body": [
      "label",
      "options",
      "field_type",
      "group_id",
      "user_group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "field_type": {
          "type": "string"
        },
        "group_id": {
          "type": "string",
          "description": "An optional tab group to place the field under in the interface.  If not specified, will default to the 'Custom Fields' tab."
        },
        "user_group_id": {
          "type": "string",
          "description": "An optional user group to choose from when selecting values for User or UserListBox fields."
        }
      },
      "required": [
        "label",
        "field_type"
      ]
    }
  },
  {
    "name": "keap_v2_list_contact_custom_field_groups",
    "description": "List Contact Custom Field Groups",
    "method": "GET",
    "url": "/contacts/model/customFields/groups",
    "pathParams": [],
    "query": [
      "tab_id"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tab_id": {
          "type": "string",
          "description": "Optional tab id to scope groups to a single tab"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_contact_custom_field_group",
    "description": "Create a Contact Custom Field Group",
    "method": "POST",
    "url": "/contacts/model/customFields/groups",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "tab_id": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_contact_link_types",
    "description": "List Contact Link types",
    "method": "GET",
    "url": "/contacts/links/types",
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
          "description": "Filter to apply, allowed fields are:\n- (String) `name`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=name%3D%3DexpectedValue`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n- `max_links`\n- `create_time`\n\nOne of the following directions:\n- `asc`\n- `desc`\n"
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
    "name": "keap_v2_create_contact_link_type",
    "description": "Create a Contact Link type",
    "method": "POST",
    "url": "/contacts/links/types",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "max_links"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Link type name"
        },
        "max_links": {
          "type": "number",
          "description": "Maximum number of links allowed (must be > 0)"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_companies",
    "description": "List Companies",
    "method": "GET",
    "url": "/companies",
    "pathParams": [],
    "query": [
      "fields",
      "filter",
      "order_by",
      "page_size",
      "page_token"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of Company properties to include in the response. (Fields such as `notes`, `fax_number`, `address`, `email_address`, `phone_number`, `update_time`, `create_time` and `custom_fields` aren't included, by default.)"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `company_name` - exact match on company name (equality only)\n- (String) `name` - company name with support for a wildcard at the end (e.g. `smith*`)\n- (String) `email` - exact match on email\n- (String) `since_time` - companies updated on or after this time\n- (String) `until_time` - companies updated on or before this time\n- (Number) `company_id` - supports comparison operators: `==`, `>`, `<`, `>=`, `<=`\n\nFor equality filters, use the `==` operator in encoded form `%3D%3D`:\n- `filter=company_name%3D%3DCompany`\n- `filter=email%3D%3Dtest@gmail.com`\n- `filter=since_time%3D%3D2025-04-16T20:33:02.321Z`\n- `filter=until_time%3D%3D2025-08-16T20:33:02.321Z`\n\nFor wildcard name search (prefix only, case-insensitive):\n- `filter=name%3D%3DAcme%2A` (starts with \"Acme\")\n\nFor company_id comparison:\n- `filter=company_id%3E5` (company_id > 5)\n- `filter=company_id%3E%3D10` (company_id >= 10)\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `create_time`\n- `name`\n- `email`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_create_company",
    "description": "Create a Company",
    "method": "POST",
    "url": "/companies",
    "pathParams": [],
    "query": [],
    "body": [
      "address",
      "notes",
      "website",
      "suffix",
      "title",
      "company_name",
      "custom_fields",
      "email_address",
      "fax_number",
      "phone_number",
      "anniversary_date",
      "assistant_name",
      "assistant_phone",
      "billing_information",
      "birth_date",
      "contact_type",
      "first_name",
      "job_title",
      "last_name",
      "middle_name",
      "preferred_name",
      "owner_id",
      "referral_code",
      "spouse_name"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string",
          "description": "The company's address"
        },
        "notes": {
          "type": "string",
          "description": "Notes about the company"
        },
        "website": {
          "type": "string",
          "description": "The company's website URL"
        },
        "suffix": {
          "type": "string",
          "description": "Name suffix"
        },
        "title": {
          "type": "string",
          "description": "Name prefix or salutation"
        },
        "company_name": {
          "type": "string",
          "description": "The name of the company"
        },
        "custom_fields": {
          "type": "array"
        },
        "email_address": {
          "type": "string"
        },
        "fax_number": {
          "type": "string"
        },
        "phone_number": {
          "type": "string"
        },
        "anniversary_date": {
          "type": "string",
          "description": "The anniversary date"
        },
        "assistant_name": {
          "type": "string",
          "description": "The name of the company contact's assistant"
        },
        "assistant_phone": {
          "type": "string",
          "description": "The phone number of the company contact's assistant"
        },
        "billing_information": {
          "type": "string",
          "description": "Billing information for the company"
        },
        "birth_date": {
          "type": "string",
          "description": "The birth date"
        },
        "contact_type": {
          "type": "string",
          "description": "Type of contact"
        },
        "first_name": {
          "type": "string",
          "description": "First name of the company contact"
        },
        "job_title": {
          "type": "string",
          "description": "Job title of the company contact"
        },
        "last_name": {
          "type": "string",
          "description": "Last name of the company contact"
        },
        "middle_name": {
          "type": "string",
          "description": "Middle name of the company contact"
        },
        "preferred_name": {
          "type": "string",
          "description": "Preferred name or nickname of the company contact"
        },
        "owner_id": {
          "type": "string",
          "description": "ID of the user who owns this company"
        },
        "referral_code": {
          "type": "string",
          "description": "Referral code"
        },
        "spouse_name": {
          "type": "string",
          "description": "Spouse's name"
        }
      }
    }
  },
  {
    "name": "keap_v2_add_tag_to_company",
    "description": "Add Tag to Company",
    "method": "POST",
    "url": "/companies/{company_id}/tags/{tag_id}",
    "pathParams": [
      "company_id",
      "tag_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "company_id": {
          "type": "string",
          "description": "Path parameter: company_id"
        },
        "tag_id": {
          "type": "string",
          "description": "Path parameter: tag_id"
        }
      },
      "required": [
        "company_id",
        "tag_id"
      ]
    }
  },
  {
    "name": "keap_v2_remove_tag_from_company",
    "description": "Remove Tag",
    "method": "DELETE",
    "url": "/companies/{company_id}/tags/{tag_id}",
    "pathParams": [
      "company_id",
      "tag_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "company_id": {
          "type": "string",
          "description": "Path parameter: company_id"
        },
        "tag_id": {
          "type": "string",
          "description": "Path parameter: tag_id"
        }
      },
      "required": [
        "company_id",
        "tag_id"
      ]
    }
  },
  {
    "name": "keap_v2_create_company_custom_field",
    "description": "Create a Company Custom Field",
    "method": "POST",
    "url": "/companies/model/customFields",
    "pathParams": [],
    "query": [],
    "body": [
      "label",
      "options",
      "field_type",
      "group_id",
      "user_group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "field_type": {
          "type": "string"
        },
        "group_id": {
          "type": "string",
          "description": "An optional tab group to place the field under in the interface.  If not specified, will default to the 'Custom Fields' tab."
        },
        "user_group_id": {
          "type": "string",
          "description": "An optional user group to choose from when selecting values for User or UserListBox fields."
        }
      },
      "required": [
        "label",
        "field_type"
      ]
    }
  },
  {
    "name": "keap_v2_list_company_custom_field_groups",
    "description": "List Company Custom Field Groups",
    "method": "GET",
    "url": "/companies/model/customFields/groups",
    "pathParams": [],
    "query": [
      "tab_id"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tab_id": {
          "type": "string",
          "description": "Optional tab id to scope groups to a single tab"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_company_custom_field_group",
    "description": "Create a Company Custom Field Group",
    "method": "POST",
    "url": "/companies/model/customFields/groups",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "tab_id": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "keap_v2_remove_contacts_from_campaign_sequence",
    "description": "Remove Contacts from Campaign Sequence",
    "method": "POST",
    "url": "/campaigns/{campaign_id}/sequences/{sequence_id}:removeContacts",
    "pathParams": [
      "campaign_id",
      "sequence_id"
    ],
    "query": [],
    "body": [
      "contact_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "campaign_id": {
          "type": "string",
          "description": "Path parameter: campaign_id"
        },
        "sequence_id": {
          "type": "string",
          "description": "Path parameter: sequence_id"
        },
        "contact_ids": {
          "type": "array",
          "description": "List of contact IDs to remove from the sequence"
        }
      },
      "required": [
        "campaign_id",
        "sequence_id",
        "contact_ids"
      ]
    }
  },
  {
    "name": "keap_v2_add_contacts_to_campaign_sequence",
    "description": "Add Contacts to Campaign Sequence",
    "method": "POST",
    "url": "/campaigns/{campaign_id}/sequences/{sequence_id}:addContacts",
    "pathParams": [
      "campaign_id",
      "sequence_id"
    ],
    "query": [],
    "body": [
      "contact_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "campaign_id": {
          "type": "string",
          "description": "Path parameter: campaign_id"
        },
        "sequence_id": {
          "type": "string",
          "description": "Path parameter: sequence_id"
        },
        "contact_ids": {
          "type": "array",
          "description": "List of contact IDs to add to the sequence"
        }
      },
      "required": [
        "campaign_id",
        "sequence_id",
        "contact_ids"
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
    "name": "keap_v2_list_affiliate",
    "description": "List Affiliates",
    "method": "GET",
    "url": "/affiliates",
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
          "description": "Filter to apply, allowed fields are:\n- (String) `id` - Allowable operators: \"==\",\"<=\", \"<\", \">=\", \">\", \"!=\"\n- (String) `name` - Wildcard matching allowed\n- (String) `contact_id`\n- (String) `referral_contact_id`\n- (String) `status`\n- (String) `code`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with the\nvalue you want to match, in the encoded form `%3D%3D`. For the filters listed above,\nhere are some examples:\n- `filter=id%3C123`\n- `filter=id%3D%3D123`\n- `filter=name%3D%3DBob`\n- `filter=contact_id%3D%3D567`\n- `filter=contact_id%3D%3D123%3Bcode%3D%3D567`\n\nFor fields which allow wildcard matching, you may use the * wildcard character (or its encoded form %2A)\nfor case-insensitive partial matching on text fields. Example of a valid pattern of wildcard usage:\n- `field==foo*` finds anything in `field` that begins with `foo`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `date_created`\n- `name`\n- `status`\n- `code`\n\nOne of the following directions:\n- `asc`\n- `desc`\n"
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
    "name": "keap_v2_add_affiliate",
    "description": "Create an Affiliate",
    "method": "POST",
    "url": "/affiliates",
    "pathParams": [],
    "query": [],
    "body": [
      "code",
      "status",
      "name",
      "contact_id",
      "parent_affiliate_id",
      "notify_on_sale",
      "notify_on_lead",
      "track_leads_days",
      "password",
      "custom_fields"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "code": {
          "type": "string",
          "description": "The Affiliate code which have some validations.\n1. The code should not have white spaces\n2. The code should starts with letters\n3. The code minimum 4 characters length"
        },
        "status": {
          "type": "string",
          "description": "The Affiliate Status"
        },
        "name": {
          "type": "string",
          "description": "The Affiliate name will be derived from the Contact,\nwhen not explicitly provided"
        },
        "contact_id": {
          "type": "string",
          "description": "The contactId identifier , Must be a positive number"
        },
        "parent_affiliate_id": {
          "type": "string",
          "description": "The Parent Affiliate Id"
        },
        "notify_on_sale": {
          "type": "boolean",
          "description": "Whether to notify on sale events"
        },
        "notify_on_lead": {
          "type": "boolean",
          "description": "Whether to notify on lead events"
        },
        "track_leads_days": {
          "type": "number",
          "description": "Number of days to track leads"
        },
        "password": {
          "type": "string",
          "description": "Affiliate portal password"
        },
        "custom_fields": {
          "type": "array",
          "description": "List of custom field values to apply to this affiliate"
        }
      },
      "required": [
        "code",
        "contact_id"
      ]
    }
  },
  {
    "name": "keap_v2_remove_affiliate_from_program",
    "description": "Remove an Affiliate from a Commission Program",
    "method": "POST",
    "url": "/affiliates/{id}:removeFromProgram",
    "pathParams": [
      "id"
    ],
    "query": [],
    "body": [
      "affiliate_program_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Path parameter: id"
        },
        "affiliate_program_id": {
          "type": "string"
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "keap_v2_add_affiliate_to_program",
    "description": "Assign Affiliate to Commission program",
    "method": "POST",
    "url": "/affiliates/{id}:assignToProgram",
    "pathParams": [
      "id"
    ],
    "query": [],
    "body": [
      "affiliate_program_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Path parameter: id"
        },
        "affiliate_program_id": {
          "type": "string"
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "keap_v2_list_affiliate_links",
    "description": "List Affiliate Links",
    "method": "GET",
    "url": "/affiliates/redirects",
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
          "description": "Filter to apply, allowed fields are:\n- (String) `name`\n- (String) `affiliate_id`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n- `date_created`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_create_redirect_link",
    "description": "Create an Affiliate Link",
    "method": "POST",
    "url": "/affiliates/redirects",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "code",
      "affiliate_id",
      "website_address",
      "program_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "The Affiliate Link Name"
        },
        "code": {
          "type": "string",
          "description": "Code"
        },
        "affiliate_id": {
          "type": "string",
          "description": "The AffiliateId"
        },
        "website_address": {
          "type": "string",
          "description": "Website Address"
        },
        "program_ids": {
          "type": "array",
          "description": "Program IDs to associate"
        }
      },
      "required": [
        "name",
        "code",
        "website_address"
      ]
    }
  },
  {
    "name": "keap_v2_create_affiliate_custom_field",
    "description": "Create an Affiliate Custom Field",
    "method": "POST",
    "url": "/affiliates/model/customFields",
    "pathParams": [],
    "query": [],
    "body": [
      "label",
      "options",
      "field_type",
      "group_id",
      "user_group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "field_type": {
          "type": "string"
        },
        "group_id": {
          "type": "string",
          "description": "An optional tab group to place the field under in the interface.  If not specified, will default to the 'Custom Fields' tab."
        },
        "user_group_id": {
          "type": "string",
          "description": "An optional user group to choose from when selecting values for User or UserListBox fields."
        }
      },
      "required": [
        "label",
        "field_type"
      ]
    }
  },
  {
    "name": "keap_v2_list_affiliate_custom_field_groups",
    "description": "List Affiliate Custom Field Groups",
    "method": "GET",
    "url": "/affiliates/model/customFields/groups",
    "pathParams": [],
    "query": [
      "tab_id"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tab_id": {
          "type": "string",
          "description": "Optional tab id to scope groups to a single tab"
        }
      }
    }
  },
  {
    "name": "keap_v2_create_affiliate_custom_field_group",
    "description": "Create an Affiliate Custom Field Group",
    "method": "POST",
    "url": "/affiliates/model/customFields/groups",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "tab_id": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_affiliate_commission_programs",
    "description": "List Affiliate Commission Programs",
    "method": "GET",
    "url": "/affiliates/commissionPrograms",
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
          "description": "Filter to apply, allowed fields are:\n- (String) `name`\n- (String) `affiliate_id`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n- `date_created`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_add_commission_program",
    "description": "Create an Affiliate Commission Program",
    "method": "POST",
    "url": "/affiliates/commissionPrograms",
    "pathParams": [],
    "query": [],
    "body": [
      "name",
      "notes",
      "priority"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the Commission Program"
        },
        "notes": {
          "type": "string",
          "description": "The notes of the Commission Program"
        },
        "priority": {
          "type": "number",
          "description": "The priority of the Commission Program"
        }
      },
      "required": [
        "name",
        "priority"
      ]
    }
  },
  {
    "name": "keap_v2_remove_subscription_plan_commission_from_commissions",
    "description": "Remove a Subscription from a Commission Program",
    "method": "POST",
    "url": "/affiliates/commissionPrograms/{commission_id}:removeSubscriptionCommission",
    "pathParams": [
      "commission_id"
    ],
    "query": [],
    "body": [
      "product_id",
      "subscription_plan_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "commission_id": {
          "type": "string",
          "description": "Path parameter: commission_id"
        },
        "product_id": {
          "type": "string"
        },
        "subscription_plan_id": {
          "type": "string"
        }
      },
      "required": [
        "commission_id"
      ]
    }
  },
  {
    "name": "keap_v2_remove_product_commission_from_commissions",
    "description": "Remove a Product from a Commission Program",
    "method": "POST",
    "url": "/affiliates/commissionPrograms/{commission_id}:removeProductCommission",
    "pathParams": [
      "commission_id"
    ],
    "query": [],
    "body": [
      "product_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "commission_id": {
          "type": "string",
          "description": "Path parameter: commission_id"
        },
        "product_id": {
          "type": "string"
        }
      },
      "required": [
        "commission_id"
      ]
    }
  },
  {
    "name": "keap_v2_assign_subscription_commission_program",
    "description": "Assign a Subscription Commission Program",
    "method": "POST",
    "url": "/affiliates/commissionPrograms/subscriptionCommissionPrograms/{commission_program_id}",
    "pathParams": [
      "commission_program_id"
    ],
    "query": [],
    "body": [
      "percentage",
      "unused",
      "dollar_amount",
      "level_1",
      "level_2",
      "payout_type",
      "subscription_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "commission_program_id": {
          "type": "string",
          "description": "Path parameter: commission_program_id"
        },
        "percentage": {
          "type": "string",
          "description": "Level 1 percentage to be paid for commission (0-100). This will be set for the Sale. This is deprecated for `level_1`"
        },
        "unused": {
          "type": "string",
          "description": "Payout rules for any unused commissions."
        },
        "dollar_amount": {
          "type": "string",
          "description": "Level 1 fixed dollar amount to be paid for commission. This will be set for the Sale. This is deprecated for `level_1`"
        },
        "level_1": {
          "type": "string",
          "description": "Payout rules for Level 1 recipients of the commission."
        },
        "level_2": {
          "type": "string",
          "description": "Payout rules for Level 2 recipients of the commission."
        },
        "payout_type": {
          "type": "string",
          "description": "The payout type for this commission."
        },
        "subscription_id": {
          "type": "string",
          "description": "Subscription ID to assign commission"
        }
      },
      "required": [
        "commission_program_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_subscription_commission_program",
    "description": "Update a Subscription Commission Program",
    "method": "PATCH",
    "url": "/affiliates/commissionPrograms/subscriptionCommissionPrograms/{commission_program_id}",
    "pathParams": [
      "commission_program_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "percentage",
      "unused",
      "dollar_amount",
      "level_1",
      "level_2",
      "payout_type",
      "subscription_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "commission_program_id": {
          "type": "string",
          "description": "Path parameter: commission_program_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "percentage": {
          "type": "string",
          "description": "Level 1 percentage to be paid for commission (0-100). This will be set for the Sale. This is deprecated for `level_1`"
        },
        "unused": {
          "type": "string",
          "description": "Payout rules for any unused commissions."
        },
        "dollar_amount": {
          "type": "string",
          "description": "Level 1 fixed dollar amount to be paid for commission. This will be set for the Sale. This is deprecated for `level_1`"
        },
        "level_1": {
          "type": "string",
          "description": "Payout rules for Level 1 recipients of the commission."
        },
        "level_2": {
          "type": "string",
          "description": "Payout rules for Level 2 recipients of the commission."
        },
        "payout_type": {
          "type": "string",
          "description": "The payout type for this commission."
        },
        "subscription_id": {
          "type": "string",
          "description": "Subscription ID to assign commission"
        }
      },
      "required": [
        "commission_program_id"
      ]
    }
  },
  {
    "name": "keap_v2_add_commission_program_resource",
    "description": "Create Commission Program Resource",
    "method": "POST",
    "url": "/affiliates/commissionPrograms/resources",
    "pathParams": [],
    "query": [],
    "body": [
      "title",
      "type",
      "notes",
      "url",
      "order",
      "content_html",
      "page_width",
      "page_height",
      "commission_program_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "The program resource title"
        },
        "type": {
          "type": "string",
          "description": "The type of resource"
        },
        "notes": {
          "type": "string",
          "description": "The resource notes."
        },
        "url": {
          "type": "string",
          "description": "The URL to the resource."
        },
        "order": {
          "type": "number",
          "description": "The order in which the resource is displayed. Minimum value is 0. Defaults to 0. Lower values indicate higher priority."
        },
        "content_html": {
          "type": "string",
          "description": "The contents of the PAGE or EMAIL. In HTML format."
        },
        "page_width": {
          "type": "number",
          "description": "The width of the page for PAGE types, in pixels. Minimum value is 0. Defaults to 0"
        },
        "page_height": {
          "type": "number",
          "description": "The height of the page for PAGE types, in pixels. Minimum value is 0. Defaults to 0"
        },
        "commission_program_ids": {
          "type": "array",
          "description": "A list of commission program ids that will use this resource."
        }
      },
      "required": [
        "title",
        "type",
        "commission_program_ids"
      ]
    }
  },
  {
    "name": "keap_v2_assign_product_commission_program",
    "description": "Assign a Product Commission Program",
    "method": "POST",
    "url": "/affiliates/commissionPrograms/productCommissionPrograms/{commission_program_id}",
    "pathParams": [
      "commission_program_id"
    ],
    "query": [],
    "body": [
      "percentage",
      "unused",
      "dollar_amount",
      "level_1",
      "level_2",
      "payout_type",
      "product_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "commission_program_id": {
          "type": "string",
          "description": "Path parameter: commission_program_id"
        },
        "percentage": {
          "type": "string",
          "description": "Level 1 percentage to be paid for commission (0-100). This will be set for the Sale. This is deprecated for `level_1`"
        },
        "unused": {
          "type": "string",
          "description": "Payout rules for any unused commissions."
        },
        "dollar_amount": {
          "type": "string",
          "description": "Level 1 fixed dollar amount to be paid for commission. This will be set for the Sale. This is deprecated for `level_1`"
        },
        "level_1": {
          "type": "string",
          "description": "Payout rules for Level 1 recipients of the commission."
        },
        "level_2": {
          "type": "string",
          "description": "Payout rules for Level 2 recipients of the commission."
        },
        "payout_type": {
          "type": "string",
          "description": "The payout type for this commission."
        },
        "product_id": {
          "type": "string",
          "description": "Product ID to assign commission"
        }
      },
      "required": [
        "commission_program_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_product_commission_program",
    "description": "Update a Product Commission Program",
    "method": "PATCH",
    "url": "/affiliates/commissionPrograms/productCommissionPrograms/{commission_program_id}",
    "pathParams": [
      "commission_program_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "percentage",
      "unused",
      "dollar_amount",
      "level_1",
      "level_2",
      "payout_type",
      "product_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "commission_program_id": {
          "type": "string",
          "description": "Path parameter: commission_program_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "percentage": {
          "type": "string",
          "description": "Level 1 percentage to be paid for commission (0-100). This will be set for the Sale. This is deprecated for `level_1`"
        },
        "unused": {
          "type": "string",
          "description": "Payout rules for any unused commissions."
        },
        "dollar_amount": {
          "type": "string",
          "description": "Level 1 fixed dollar amount to be paid for commission. This will be set for the Sale. This is deprecated for `level_1`"
        },
        "level_1": {
          "type": "string",
          "description": "Payout rules for Level 1 recipients of the commission."
        },
        "level_2": {
          "type": "string",
          "description": "Payout rules for Level 2 recipients of the commission."
        },
        "payout_type": {
          "type": "string",
          "description": "The payout type for this commission."
        },
        "product_id": {
          "type": "string",
          "description": "Product ID to assign commission"
        }
      },
      "required": [
        "commission_program_id",
        "product_id"
      ]
    }
  },
  {
    "name": "keap_v2_create_default_commission_program",
    "description": "Create a Default Commission Program",
    "method": "POST",
    "url": "/affiliates/commissionPrograms/defaultCommissionPrograms/{commission_program_id}",
    "pathParams": [
      "commission_program_id"
    ],
    "query": [],
    "body": [
      "percentage",
      "unused",
      "dollar_amount",
      "level_1",
      "level_2",
      "payout_type"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "commission_program_id": {
          "type": "string",
          "description": "Path parameter: commission_program_id"
        },
        "percentage": {
          "type": "string",
          "description": "Level 1 percentage to be paid for commission (0-100). This will be set for the Sale. This is deprecated for `level_1`"
        },
        "unused": {
          "type": "string",
          "description": "Payout rules for any unused commissions."
        },
        "dollar_amount": {
          "type": "string",
          "description": "Level 1 fixed dollar amount to be paid for commission. This will be set for the Sale. This is deprecated for `level_1`"
        },
        "level_1": {
          "type": "string",
          "description": "Payout rules for Level 1 recipients of the commission."
        },
        "level_2": {
          "type": "string",
          "description": "Payout rules for Level 2 recipients of the commission."
        },
        "payout_type": {
          "type": "string",
          "description": "The payout type for this commission."
        }
      },
      "required": [
        "commission_program_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_default_commission_program",
    "description": "Update a Default Commission Program",
    "method": "PATCH",
    "url": "/affiliates/commissionPrograms/defaultCommissionPrograms/{commission_program_id}",
    "pathParams": [
      "commission_program_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "percentage",
      "unused",
      "dollar_amount",
      "level_1",
      "level_2",
      "payout_type"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "commission_program_id": {
          "type": "string",
          "description": "Path parameter: commission_program_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "percentage": {
          "type": "string",
          "description": "Level 1 percentage to be paid for commission (0-100). This will be set for the Sale. This is deprecated for `level_1`"
        },
        "unused": {
          "type": "string",
          "description": "Payout rules for any unused commissions."
        },
        "dollar_amount": {
          "type": "string",
          "description": "Level 1 fixed dollar amount to be paid for commission. This will be set for the Sale. This is deprecated for `level_1`"
        },
        "level_1": {
          "type": "string",
          "description": "Payout rules for Level 1 recipients of the commission."
        },
        "level_2": {
          "type": "string",
          "description": "Payout rules for Level 2 recipients of the commission."
        },
        "payout_type": {
          "type": "string",
          "description": "The payout type for this commission."
        }
      },
      "required": [
        "commission_program_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_user_by_id",
    "description": "Get User",
    "method": "GET",
    "url": "/users/{user_id}",
    "pathParams": [
      "user_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string",
          "description": "Path parameter: user_id"
        }
      },
      "required": [
        "user_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_user",
    "description": "Update User",
    "method": "PATCH",
    "url": "/users/{user_id}",
    "pathParams": [
      "user_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "address",
      "title",
      "website",
      "company_name",
      "email_address",
      "family_name",
      "fax_numbers",
      "given_name",
      "phone_numbers",
      "time_zone"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string",
          "description": "Path parameter: user_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "address": {
          "type": "string",
          "description": "The user's address"
        },
        "title": {
          "type": "string",
          "description": "The user's job title"
        },
        "website": {
          "type": "string",
          "description": "The user's website URL"
        },
        "company_name": {
          "type": "string",
          "description": "The user's company name"
        },
        "email_address": {
          "type": "string",
          "description": "The user's email address"
        },
        "family_name": {
          "type": "string",
          "description": "The user's last name"
        },
        "fax_numbers": {
          "type": "array",
          "description": "List of user's fax numbers"
        },
        "given_name": {
          "type": "string",
          "description": "The user's first name"
        },
        "phone_numbers": {
          "type": "array",
          "description": "List of user's phone numbers"
        },
        "time_zone": {
          "type": "string",
          "description": "The user's timezone in IANA format"
        }
      },
      "required": [
        "user_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_task",
    "description": "Retrieve a Task",
    "method": "GET",
    "url": "/tasks/{task_id}",
    "pathParams": [
      "task_id"
    ],
    "query": [
      "fields"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "task_id": {
          "type": "string",
          "description": "Path parameter: task_id"
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Task properties to include in the response. Allowed values: custom_fields"
        }
      },
      "required": [
        "task_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_task",
    "description": "Delete a Task",
    "method": "DELETE",
    "url": "/tasks/{task_id}",
    "pathParams": [
      "task_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "task_id": {
          "type": "string",
          "description": "Path parameter: task_id"
        }
      },
      "required": [
        "task_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_task",
    "description": "Update a Task",
    "method": "PATCH",
    "url": "/tasks/{task_id}",
    "pathParams": [
      "task_id"
    ],
    "query": [
      "update_mask",
      "fields"
    ],
    "body": [
      "title",
      "description",
      "type",
      "priority",
      "completed",
      "completion_time",
      "due_time",
      "remind_time_mins",
      "assigned_to_user_id",
      "contact_id",
      "opportunity_id",
      "accepted",
      "custom_fields"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "task_id": {
          "type": "string",
          "description": "Path parameter: task_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Task properties to include in the response. Allowed values: custom_fields"
        },
        "title": {
          "type": "string",
          "description": "Task title"
        },
        "description": {
          "type": "string",
          "description": "Task description"
        },
        "type": {
          "type": "string",
          "description": "Task type"
        },
        "priority": {
          "type": "string",
          "description": "Task priority"
        },
        "completed": {
          "type": "boolean",
          "description": "Whether task is completed"
        },
        "completion_time": {
          "type": "string",
          "description": "Completion timestamp (ISO-8601)"
        },
        "due_time": {
          "type": "string",
          "description": "Due date/time (ISO-8601)"
        },
        "remind_time_mins": {
          "type": "number",
          "description": "Value in minutes before start_date to show pop-up reminder."
        },
        "assigned_to_user_id": {
          "type": "string",
          "description": "Assigned user ID"
        },
        "contact_id": {
          "type": "string",
          "description": "Associated contact ID"
        },
        "opportunity_id": {
          "type": "string",
          "description": "Associated opportunity ID"
        },
        "accepted": {
          "type": "boolean",
          "description": "Whether the task has been accepted. Defaults to false"
        },
        "custom_fields": {
          "type": "array",
          "description": "Custom field values for the task. An empty array resets all custom fields to their defaults."
        }
      },
      "required": [
        "task_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_task_custom_field",
    "description": "Delete a Custom Field",
    "method": "DELETE",
    "url": "/tasks/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        }
      },
      "required": [
        "custom_field_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_task_custom_field",
    "description": "Update a Task's Custom Field",
    "method": "PATCH",
    "url": "/tasks/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "label",
      "options",
      "group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "group_id": {
          "type": "string"
        }
      },
      "required": [
        "custom_field_id",
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_task_custom_field_group",
    "description": "Retrieve a Task Custom Field Group",
    "method": "GET",
    "url": "/tasks/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_task_custom_field_group",
    "description": "Delete a Task Custom Field Group",
    "method": "DELETE",
    "url": "/tasks/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_task_custom_field_group",
    "description": "Update a Task Custom Field Group",
    "method": "PATCH",
    "url": "/tasks/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "order",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        },
        "update_mask": {
          "type": "array",
          "description": "Comma-separated list of fields to update"
        },
        "name": {
          "type": "string"
        },
        "order": {
          "type": "number"
        },
        "tab_id": {
          "type": "string"
        }
      },
      "required": [
        "group_id",
        "update_mask"
      ]
    }
  },
  {
    "name": "keap_v2_get_tag",
    "description": "Retrieve a Tag",
    "method": "GET",
    "url": "/tags/{tag_id}",
    "pathParams": [
      "tag_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tag_id": {
          "type": "string",
          "description": "Path parameter: tag_id"
        }
      },
      "required": [
        "tag_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_tag",
    "description": "Delete Tag",
    "method": "DELETE",
    "url": "/tags/{tag_id}",
    "pathParams": [
      "tag_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tag_id": {
          "type": "string",
          "description": "Path parameter: tag_id"
        }
      },
      "required": [
        "tag_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_tag",
    "description": "Update a Tag",
    "method": "PATCH",
    "url": "/tags/{tag_id}",
    "pathParams": [
      "tag_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "description",
      "category"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tag_id": {
          "type": "string",
          "description": "Path parameter: tag_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "Name of the tag, up to 255 characters will be saved"
        },
        "description": {
          "type": "string",
          "description": "Description of the tag"
        },
        "category": {
          "type": "string",
          "description": "Category of the tag. If not provided, the tag will not be assigned to a category."
        }
      },
      "required": [
        "tag_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_category",
    "description": "Retrieve a Tag Category",
    "method": "GET",
    "url": "/tags/categories/{tag_category_id}",
    "pathParams": [
      "tag_category_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tag_category_id": {
          "type": "string",
          "description": "Path parameter: tag_category_id"
        }
      },
      "required": [
        "tag_category_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_tag_category",
    "description": "Delete Tag Category",
    "method": "DELETE",
    "url": "/tags/categories/{tag_category_id}",
    "pathParams": [
      "tag_category_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "tag_category_id": {
          "type": "string",
          "description": "Path parameter: tag_category_id"
        }
      },
      "required": [
        "tag_category_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_tag_category",
    "description": "Update a Tag Category",
    "method": "PATCH",
    "url": "/tags/categories/{tag_category_id}",
    "pathParams": [
      "tag_category_id"
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
        "tag_category_id": {
          "type": "string",
          "description": "Path parameter: tag_category_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "The name of the tag category, must be unique"
        },
        "description": {
          "type": "string",
          "description": "A description of the tag category"
        }
      },
      "required": [
        "tag_category_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_subscription",
    "description": "Retrieve a Subscription",
    "method": "GET",
    "url": "/subscriptions/{subscription_id}",
    "pathParams": [
      "subscription_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "subscription_id": {
          "type": "string",
          "description": "Path parameter: subscription_id"
        }
      },
      "required": [
        "subscription_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_subscription",
    "description": "Update a Subscription",
    "method": "PATCH",
    "url": "/subscriptions/{subscription_id}",
    "pathParams": [
      "subscription_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "quantity",
      "active",
      "contact_id",
      "subscription_plan_id",
      "billing_amount",
      "auto_charge",
      "max_charge_attempts",
      "days_between_retries",
      "billing_frequency",
      "billing_cycle",
      "next_bill_date",
      "end_date",
      "payment_method_id",
      "allow_tax",
      "lead_affiliate_id",
      "sale_affiliate_id",
      "shipping_address",
      "promo_code",
      "shipping_option_id",
      "reason_stopped",
      "custom_fields"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "subscription_id": {
          "type": "string",
          "description": "Path parameter: subscription_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "quantity": {
          "type": "number",
          "description": "The subscription quantity. Must be 1 or greater."
        },
        "active": {
          "type": "boolean",
          "description": "If the subscription is active or not."
        },
        "contact_id": {
          "type": "string",
          "description": "Id of the contact associated with the subscription."
        },
        "subscription_plan_id": {
          "type": "string",
          "description": "Id of the product subscription plan."
        },
        "billing_amount": {
          "type": "number",
          "description": "The billing amount. Must be 0 or greater."
        },
        "auto_charge": {
          "type": "boolean",
          "description": "If the subscription should auto charge on the next billing date."
        },
        "max_charge_attempts": {
          "type": "number",
          "description": "Maximum number of charge attempts. Must be 1 or greater."
        },
        "days_between_retries": {
          "type": "number",
          "description": "Number of days between charge attempts. Must be 1 or greater."
        },
        "billing_frequency": {
          "type": "number",
          "description": "The number of days between billing cycles. Must be 1 or greater."
        },
        "billing_cycle": {
          "type": "string",
          "description": "The billing cycle for the subscription."
        },
        "next_bill_date": {
          "type": "string",
          "description": "The next date the subscription will bill. Must not be in the past."
        },
        "end_date": {
          "type": "string",
          "description": "The date the subscription will end. Must not be in the past."
        },
        "payment_method_id": {
          "type": "string",
          "description": "Id associated with the payment method."
        },
        "allow_tax": {
          "type": "boolean",
          "description": "Only works if the product associated with the product subscription is taxable."
        },
        "lead_affiliate_id": {
          "type": "string",
          "description": "The affiliate id for the lead of the subscription."
        },
        "sale_affiliate_id": {
          "type": "string",
          "description": "The affiliate id for the sale of the subscription."
        },
        "shipping_address": {
          "type": "string",
          "description": "The shipping address for the subscription."
        },
        "promo_code": {
          "type": "string",
          "description": "The promo code for the subscription."
        },
        "shipping_option_id": {
          "type": "string",
          "description": "The shipping option ID for the subscription."
        },
        "reason_stopped": {
          "type": "string",
          "description": "The reason the subscription is no longer active."
        },
        "custom_fields": {
          "type": "array",
          "description": "List of custom field values to apply to this subscription"
        }
      },
      "required": [
        "subscription_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_subscription_custom_field",
    "description": "Delete a Subscription Custom Field",
    "method": "DELETE",
    "url": "/subscriptions/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        }
      },
      "required": [
        "custom_field_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_subscription_custom_field",
    "description": "Update a Subscription Custom Field",
    "method": "PATCH",
    "url": "/subscriptions/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "label",
      "options",
      "group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "group_id": {
          "type": "string"
        }
      },
      "required": [
        "custom_field_id",
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_subscription_custom_field_group",
    "description": "Retrieve a Subscription Custom Field Group",
    "method": "GET",
    "url": "/subscriptions/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_subscription_custom_field_group",
    "description": "Delete a Subscription Custom Field Group",
    "method": "DELETE",
    "url": "/subscriptions/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_subscription_custom_field_group",
    "description": "Update a Subscription Custom Field Group",
    "method": "PATCH",
    "url": "/subscriptions/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "order",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        },
        "update_mask": {
          "type": "array",
          "description": "Comma-separated list of fields to update"
        },
        "name": {
          "type": "string"
        },
        "order": {
          "type": "number"
        },
        "tab_id": {
          "type": "string"
        }
      },
      "required": [
        "group_id",
        "update_mask"
      ]
    }
  },
  {
    "name": "keap_v2_get_product",
    "description": "Get a Product",
    "method": "GET",
    "url": "/products/{product_id}",
    "pathParams": [
      "product_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        }
      },
      "required": [
        "product_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_product",
    "description": "Delete a Product",
    "method": "DELETE",
    "url": "/products/{product_id}",
    "pathParams": [
      "product_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        }
      },
      "required": [
        "product_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_product",
    "description": "Update a Product",
    "method": "PATCH",
    "url": "/products/{product_id}",
    "pathParams": [
      "product_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "sku",
      "price",
      "active",
      "description",
      "shippable",
      "weight",
      "taxable",
      "short_description",
      "subscription_only",
      "storefront_hidden",
      "country_taxable",
      "state_taxable",
      "city_taxable",
      "inventory_limit",
      "out_of_stock_enabled",
      "email_for_inventory_notifications",
      "top_html",
      "bottom_html",
      "is_package",
      "needs_digital_delivery",
      "delivery_description"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "Product name"
        },
        "sku": {
          "type": "string",
          "description": "Product SKU"
        },
        "price": {
          "type": "number",
          "description": "The product price. The value is in the currency's smallest unit. e.g. $12.50 is 1250. Must be greater than or equal to 0."
        },
        "active": {
          "type": "boolean",
          "description": "True means active, False means inactive"
        },
        "description": {
          "type": "string",
          "description": "Product long description"
        },
        "shippable": {
          "type": "boolean",
          "description": "If the product requires shipping"
        },
        "weight": {
          "type": "number",
          "description": "The product weight. Must be greater than or equal to 0."
        },
        "taxable": {
          "type": "boolean",
          "description": "Whether or not the product should be taxed"
        },
        "short_description": {
          "type": "string",
          "description": "Product short description"
        },
        "subscription_only": {
          "type": "boolean",
          "description": "If the product is a subscription-only product"
        },
        "storefront_hidden": {
          "type": "boolean",
          "description": "If the product should not be shown in the storefront"
        },
        "country_taxable": {
          "type": "boolean",
          "description": "If country-based taxes should be applied to this product"
        },
        "state_taxable": {
          "type": "boolean",
          "description": "If state-based taxes should be applied to this product"
        },
        "city_taxable": {
          "type": "boolean",
          "description": "If city-based taxes should be applied to this product"
        },
        "inventory_limit": {
          "type": "number",
          "description": "The inventory limit for this product. Must be greater than or equal to 0."
        },
        "out_of_stock_enabled": {
          "type": "boolean",
          "description": "The flag to enable out of stock inventory"
        },
        "email_for_inventory_notifications": {
          "type": "string",
          "description": "The email address for notifications about inventory"
        },
        "top_html": {
          "type": "string"
        },
        "bottom_html": {
          "type": "string"
        },
        "is_package": {
          "type": "boolean"
        },
        "needs_digital_delivery": {
          "type": "boolean"
        },
        "delivery_description": {
          "type": "string"
        }
      },
      "required": [
        "product_id"
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
    "name": "keap_v2_get_product_option",
    "description": "Get Product Option",
    "method": "GET",
    "url": "/products/{product_id}/options/{product_option_id}",
    "pathParams": [
      "product_id",
      "product_option_id"
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
        "product_option_id": {
          "type": "string",
          "description": "Path parameter: product_option_id"
        }
      },
      "required": [
        "product_id",
        "product_option_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_product_option",
    "description": "Delete a Product Option",
    "method": "DELETE",
    "url": "/products/{product_id}/options/{product_option_id}",
    "pathParams": [
      "product_id",
      "product_option_id"
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
        "product_option_id": {
          "type": "string",
          "description": "Path parameter: product_option_id"
        }
      },
      "required": [
        "product_id",
        "product_option_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_product_option",
    "description": "Updates a Product Option",
    "method": "PATCH",
    "url": "/products/{product_id}/options/{product_option_id}",
    "pathParams": [
      "product_id",
      "product_option_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "required",
      "option_label",
      "display_order",
      "minimum_characters",
      "maximum_characters",
      "allow_spaces",
      "only_starts_with",
      "only_ends_with",
      "only_contains",
      "error_message"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        },
        "product_option_id": {
          "type": "string",
          "description": "Path parameter: product_option_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "required": {
          "type": "boolean",
          "description": "Whether this option is required for product purchase."
        },
        "option_label": {
          "type": "string",
          "description": "The displayable name of the option (e.g. Size). Cannot be whitespace only."
        },
        "display_order": {
          "type": "number",
          "description": "The order in which this option will be displayed among other options. Minimum is 0. Lower values indicate higher priority in order."
        },
        "minimum_characters": {
          "type": "number",
          "description": "Used only for option_type of `TEXT`. Minimum allowable characters. Minimum is 0."
        },
        "maximum_characters": {
          "type": "number",
          "description": "Used only for option_type of `TEXT`. Maximum allowable characters. Minimum is 0."
        },
        "allow_spaces": {
          "type": "boolean",
          "description": "Used only for option_type of `TEXT`. Whether or not to allow whitespace in the text."
        },
        "only_starts_with": {
          "type": "string",
          "description": "Used only for option_type of `TEXT`.  Restricts the text to start with certain character types. Valid values are NONE, LETTER, DIGIT, BOTH."
        },
        "only_ends_with": {
          "type": "string",
          "description": "Used only for option_type of `TEXT`. Restricts the text to end with certain character types. Valid values are NONE, LETTER, DIGIT, BOTH."
        },
        "only_contains": {
          "type": "string",
          "description": "Used only for option_type of `TEXT`. Restricts the text to contain certain character types. Valid values are NONE, LETTER, DIGIT, BOTH."
        },
        "error_message": {
          "type": "string",
          "description": "Used only for option_type of `TEXT`. An error message to display if any rules are broken. Cannot be whitespace only."
        }
      },
      "required": [
        "product_id",
        "product_option_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_product_option_list_option_value",
    "description": "Delete a Product Option List Item",
    "method": "DELETE",
    "url": "/products/{product_id}/options/{product_option_id}/listItems/{item_id}",
    "pathParams": [
      "product_id",
      "product_option_id",
      "item_id"
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
        "product_option_id": {
          "type": "string",
          "description": "Path parameter: product_option_id"
        },
        "item_id": {
          "type": "string",
          "description": "Path parameter: item_id"
        }
      },
      "required": [
        "product_id",
        "product_option_id",
        "item_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_product_option_list_option_value",
    "description": "Updates a Product Option List Option Value",
    "method": "PATCH",
    "url": "/products/{product_id}/options/{product_option_id}/listItems/{item_id}",
    "pathParams": [
      "product_id",
      "product_option_id",
      "item_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "item_label",
      "item_code",
      "item_display_order",
      "price_adjustment"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        },
        "product_option_id": {
          "type": "string",
          "description": "Path parameter: product_option_id"
        },
        "item_id": {
          "type": "string",
          "description": "Path parameter: item_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "item_label": {
          "type": "string",
          "description": "The displayable name of the option item. Cannot be whitespace only."
        },
        "item_code": {
          "type": "string",
          "description": "An internal code (e.g. sku) to associate the item option."
        },
        "item_display_order": {
          "type": "number",
          "description": "The order in which this item will be displayed among other items. Minimum is 0. Lower values indicate higher priority in order."
        },
        "price_adjustment": {
          "type": "number",
          "description": "An amount to adjust to the product price is selected. Negative value indicates subtraction from price."
        }
      },
      "required": [
        "product_id",
        "product_option_id",
        "item_id"
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
    "name": "keap_v2_get_order",
    "description": "Retrieve an Order",
    "method": "GET",
    "url": "/orders/{order_id}",
    "pathParams": [
      "order_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        }
      },
      "required": [
        "order_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_order",
    "description": "Delete an Order",
    "method": "DELETE",
    "url": "/orders/{order_id}",
    "pathParams": [
      "order_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        }
      },
      "required": [
        "order_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_order",
    "description": "Update an Order",
    "method": "PATCH",
    "url": "/orders/{order_id}",
    "pathParams": [
      "order_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "notes",
      "terms",
      "contact_id",
      "order_title",
      "order_time",
      "order_type",
      "promo_codes",
      "lead_affiliate_id",
      "sales_affiliate_id",
      "shipping_address",
      "payment_plan",
      "custom_fields"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "notes": {
          "type": "string",
          "description": "Internal notes"
        },
        "terms": {
          "type": "string",
          "description": "Order terms"
        },
        "contact_id": {
          "type": "string",
          "description": "ID of the contact for this order"
        },
        "order_title": {
          "type": "string",
          "description": "Title for the order"
        },
        "order_time": {
          "type": "string",
          "description": "The date and time of the order. In ISO-8601 format (e.g. 2024-05-21T23:00:00Z)"
        },
        "order_type": {
          "type": "string",
          "description": "The order type."
        },
        "promo_codes": {
          "type": "array",
          "description": "Uses multiple strings as promo codes. The corresponding discount will be applied to the order."
        },
        "lead_affiliate_id": {
          "type": "string",
          "description": "Lead affiliate ID"
        },
        "sales_affiliate_id": {
          "type": "string",
          "description": "Sales affiliate ID"
        },
        "shipping_address": {
          "type": "string",
          "description": "Shipping address for the order"
        },
        "payment_plan": {
          "type": "string",
          "description": "Payment plan details"
        },
        "custom_fields": {
          "type": "array",
          "description": "List of custom field values to apply to this order"
        }
      },
      "required": [
        "order_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_order_item",
    "description": "Retrieve an Order Item",
    "method": "GET",
    "url": "/orders/{order_id}/items/{order_item_id}",
    "pathParams": [
      "order_id",
      "order_item_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        },
        "order_item_id": {
          "type": "string",
          "description": "Path parameter: order_item_id"
        }
      },
      "required": [
        "order_id",
        "order_item_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_order_item",
    "description": "Delete an Order Item",
    "method": "DELETE",
    "url": "/orders/{order_id}/items/{order_item_id}",
    "pathParams": [
      "order_id",
      "order_item_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        },
        "order_item_id": {
          "type": "string",
          "description": "Path parameter: order_item_id"
        }
      },
      "required": [
        "order_id",
        "order_item_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_order_item",
    "description": "Update an Order Item",
    "method": "PATCH",
    "url": "/orders/{order_id}/items/{order_item_id}",
    "pathParams": [
      "order_id",
      "order_item_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "description",
      "quantity",
      "notes",
      "product_id",
      "subscription_plan_id",
      "subscription_plan_description",
      "price_per_unit",
      "cost_per_unit"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "Path parameter: order_id"
        },
        "order_item_id": {
          "type": "string",
          "description": "Path parameter: order_item_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "The name of the order item. Must not be whitespace."
        },
        "description": {
          "type": "string",
          "description": "The description of the order item. Must not be whitespace."
        },
        "quantity": {
          "type": "number",
          "description": "The quantity. Must be greater than or equal to 1."
        },
        "notes": {
          "type": "string",
          "description": "The notes for the order item. Must not be whitespace."
        },
        "product_id": {
          "type": "string",
          "description": "The id of the product. Must be a valid product id. Used only for item_type PRODUCT or SUBSCRIPTION."
        },
        "subscription_plan_id": {
          "type": "string",
          "description": "The id of the subscription plan. Must be a valid subscription plan id. Used only for item_type SUBSCRIPTION."
        },
        "subscription_plan_description": {
          "type": "string",
          "description": "A short description of the subscription's schedule. Used only for item_type SUBSCRIPTION. Must not be whitespace."
        },
        "price_per_unit": {
          "type": "number",
          "description": "The price per unit."
        },
        "cost_per_unit": {
          "type": "number",
          "description": "The cost per unit. Used for item_type PRODUCT or SUBSCRIPTION."
        }
      },
      "required": [
        "order_id",
        "order_item_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_order_custom_field",
    "description": "Delete an Order Custom Field",
    "method": "DELETE",
    "url": "/orders/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        }
      },
      "required": [
        "custom_field_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_order_custom_field",
    "description": "Update an Order Custom Field",
    "method": "PATCH",
    "url": "/orders/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "label",
      "options",
      "group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "group_id": {
          "type": "string"
        }
      },
      "required": [
        "custom_field_id",
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_order_custom_field_group",
    "description": "Retrieve an Order Custom Field Group",
    "method": "GET",
    "url": "/orders/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_order_custom_field_group",
    "description": "Delete an Order Custom Field Group",
    "method": "DELETE",
    "url": "/orders/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_order_custom_field_group",
    "description": "Update an Order Custom Field Group",
    "method": "PATCH",
    "url": "/orders/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "order",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        },
        "update_mask": {
          "type": "array",
          "description": "Comma-separated list of fields to update"
        },
        "name": {
          "type": "string"
        },
        "order": {
          "type": "number"
        },
        "tab_id": {
          "type": "string"
        }
      },
      "required": [
        "group_id",
        "update_mask"
      ]
    }
  },
  {
    "name": "keap_v2_get_opportunity",
    "description": "Retrieve a Opportunity",
    "method": "GET",
    "url": "/opportunities/{opportunity_id}",
    "pathParams": [
      "opportunity_id"
    ],
    "query": [
      "fields"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "opportunity_id": {
          "type": "string",
          "description": "Path parameter: opportunity_id"
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Opportunities properties to include in the response. Legacy field names are supported for optional fields only if legacy opportunities feature is enabled. Allowed optional values: custom_fields. Allowed legacy optional values: monthly_revenue,order_revenue,objection,status,stage_entrance_time"
        }
      },
      "required": [
        "opportunity_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_opportunity",
    "description": "Delete an Opportunity",
    "method": "DELETE",
    "url": "/opportunities/{opportunity_id}",
    "pathParams": [
      "opportunity_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "opportunity_id": {
          "type": "string",
          "description": "Path parameter: opportunity_id"
        }
      },
      "required": [
        "opportunity_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_opportunity",
    "description": "Update an opportunity",
    "method": "PATCH",
    "url": "/opportunities/{opportunity_id}",
    "pathParams": [
      "opportunity_id"
    ],
    "query": [
      "update_mask",
      "fields"
    ],
    "body": [
      "opportunity_title",
      "next_action_time",
      "next_action_notes",
      "opportunity_notes",
      "estimated_close_time",
      "include_in_forecast",
      "projected_revenue_low",
      "projected_revenue_high",
      "contact_id",
      "stage_id",
      "user_id",
      "custom_fields",
      "affiliate_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "opportunity_id": {
          "type": "string",
          "description": "Path parameter: opportunity_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Opportunities properties to include in the response. Legacy field names are supported for optional fields only if legacy opportunities feature is enabled. Allowed optional values: custom_fields. Allowed legacy optional values: monthly_revenue,order_revenue,objection,status,stage_entrance_time"
        },
        "opportunity_title": {
          "type": "string",
          "description": "Opportunity title"
        },
        "next_action_time": {
          "type": "string",
          "description": "Next action timestamp (ISO-8601)"
        },
        "next_action_notes": {
          "type": "string",
          "description": "Notes for next action"
        },
        "opportunity_notes": {
          "type": "string",
          "description": "General notes"
        },
        "estimated_close_time": {
          "type": "string",
          "description": "Estimated close timestamp (ISO-8601)"
        },
        "include_in_forecast": {
          "type": "boolean",
          "description": "Include in sales forecast"
        },
        "projected_revenue_low": {
          "type": "number",
          "description": "Low revenue estimate"
        },
        "projected_revenue_high": {
          "type": "number",
          "description": "High revenue estimate"
        },
        "contact_id": {
          "type": "string",
          "description": "Associated contact ID"
        },
        "stage_id": {
          "type": "string",
          "description": "Pipeline stage ID"
        },
        "user_id": {
          "type": "string",
          "description": "Assigned user ID"
        },
        "custom_fields": {
          "type": "array"
        },
        "affiliate_id": {
          "type": "string",
          "description": "Affiliate ID"
        }
      },
      "required": [
        "opportunity_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_opportunity_stage",
    "description": "Retrieve an Opportunity Stage",
    "method": "GET",
    "url": "/opportunities/stages/{stage_id}",
    "pathParams": [
      "stage_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "stage_id": {
          "type": "string",
          "description": "Path parameter: stage_id"
        }
      },
      "required": [
        "stage_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_opportunity_stage",
    "description": "Delete an Opportunity Stage",
    "method": "DELETE",
    "url": "/opportunities/stages/{stage_id}",
    "pathParams": [
      "stage_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "stage_id": {
          "type": "string",
          "description": "Path parameter: stage_id"
        }
      },
      "required": [
        "stage_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_opportunity_stage",
    "description": "Update an Opportunity Stage",
    "method": "PATCH",
    "url": "/opportunities/stages/{stage_id}",
    "pathParams": [
      "stage_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "order",
      "probability",
      "target_number_days",
      "checklist_items"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "stage_id": {
          "type": "string",
          "description": "Path parameter: stage_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string"
        },
        "order": {
          "type": "number"
        },
        "probability": {
          "type": "number",
          "description": "must be an integer between 0 and 100."
        },
        "target_number_days": {
          "type": "number",
          "description": "Value should be >=0."
        },
        "checklist_items": {
          "type": "array"
        }
      },
      "required": [
        "stage_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_opportunities_custom_field",
    "description": "Delete an Opportunity Custom Field",
    "method": "DELETE",
    "url": "/opportunities/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        }
      },
      "required": [
        "custom_field_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_opportunity_custom_field",
    "description": "Update a Opportunity's Custom Field",
    "method": "PATCH",
    "url": "/opportunities/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "label",
      "options",
      "group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "group_id": {
          "type": "string"
        }
      },
      "required": [
        "custom_field_id",
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_opportunity_custom_field_group",
    "description": "Retrieve an Opportunity Custom Field Group",
    "method": "GET",
    "url": "/opportunities/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_opportunity_custom_field_group",
    "description": "Delete an Opportunity Custom Field Group",
    "method": "DELETE",
    "url": "/opportunities/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_opportunity_custom_field_group",
    "description": "Update an Opportunity Custom Field Group",
    "method": "PATCH",
    "url": "/opportunities/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "order",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        },
        "update_mask": {
          "type": "array",
          "description": "Comma-separated list of fields to update"
        },
        "name": {
          "type": "string"
        },
        "order": {
          "type": "number"
        },
        "tab_id": {
          "type": "string"
        }
      },
      "required": [
        "group_id",
        "update_mask"
      ]
    }
  },
  {
    "name": "keap_v2_delete_notes_custom_field",
    "description": "Delete a Note Custom Field",
    "method": "DELETE",
    "url": "/notes/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        }
      },
      "required": [
        "custom_field_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_notes_custom_field",
    "description": "Update a Custom Field",
    "method": "PATCH",
    "url": "/notes/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "label",
      "options",
      "group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "group_id": {
          "type": "string"
        }
      },
      "required": [
        "custom_field_id",
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_note_custom_field_group",
    "description": "Retrieve a Note Custom Field Group",
    "method": "GET",
    "url": "/notes/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_note_custom_field_group",
    "description": "Delete a Note Custom Field Group",
    "method": "DELETE",
    "url": "/notes/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_note_custom_field_group",
    "description": "Update a Note Custom Field Group",
    "method": "PATCH",
    "url": "/notes/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "order",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        },
        "update_mask": {
          "type": "array",
          "description": "Comma-separated list of fields to update"
        },
        "name": {
          "type": "string"
        },
        "order": {
          "type": "number"
        },
        "tab_id": {
          "type": "string"
        }
      },
      "required": [
        "group_id",
        "update_mask"
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
    "name": "keap_v2_get_email_address_status",
    "description": "Retrieve an Email Address status",
    "method": "GET",
    "url": "/emailAddresses/{email}/status",
    "pathParams": [
      "email"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "description": "Path parameter: email"
        }
      },
      "required": [
        "email"
      ]
    }
  },
  {
    "name": "keap_v2_update_email_address_opt_status",
    "description": "Update an Email Address opt-in status",
    "method": "PATCH",
    "url": "/emailAddresses/{email}/status",
    "pathParams": [
      "email"
    ],
    "query": [],
    "body": [
      "reason",
      "opted_in"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "description": "Path parameter: email"
        },
        "reason": {
          "type": "string",
          "description": "Reason for the opt-in status change"
        },
        "opted_in": {
          "type": "boolean",
          "description": "Whether to opt-in the email address"
        }
      },
      "required": [
        "email",
        "reason",
        "opted_in"
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
    "name": "keap_v2_get_contact",
    "description": "Retrieve a Contact",
    "method": "GET",
    "url": "/contacts/{contact_id}",
    "pathParams": [
      "contact_id"
    ],
    "query": [
      "fields"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contact_id": {
          "type": "string",
          "description": "Path parameter: contact_id"
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of Contact properties to include in the response. (Available fields are: addresses,anniversary_date,birth_date,company,contact_type,create_time,\ncustom_fields,email_addresses,family_name,fax_numbers,given_name,id,job_title,leadsource_id,\nlinks,middle_name,notes,origin,owner_id,phone_numbers,preferred_locale,preferred_name,prefix,\nreferral_code,score_value,social_accounts,source_type,spouse_name,suffix,tag_ids,time_zone,\nupdate_time,utm_parameters,website,account_id,assistant_name,assistant_phone,\nbilling_information,created_by,groups,last_updated_by)"
        }
      },
      "required": [
        "contact_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_contact",
    "description": "Delete a Contact",
    "method": "DELETE",
    "url": "/contacts/{contact_id}",
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
    "name": "keap_v2_update_contact",
    "description": "Update a Contact",
    "method": "PATCH",
    "url": "/contacts/{contact_id}",
    "pathParams": [
      "contact_id"
    ],
    "query": [
      "update_mask",
      "fields"
    ],
    "body": [
      "addresses",
      "company",
      "origin",
      "prefix",
      "suffix",
      "website",
      "anniversary_date",
      "birth_date",
      "contact_type",
      "custom_fields",
      "email_addresses",
      "family_name",
      "fax_numbers",
      "given_name",
      "job_title",
      "leadsource_id",
      "middle_name",
      "owner_id",
      "phone_numbers",
      "preferred_locale",
      "preferred_name",
      "referral_code",
      "social_accounts",
      "source_type",
      "spouse_name",
      "time_zone",
      "utm_parameters",
      "assistant_name",
      "assistant_phone",
      "billing_information"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contact_id": {
          "type": "string",
          "description": "Path parameter: contact_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of Contact properties to include in the response. (Available fields are: addresses,anniversary_date,birth_date,company,contact_type,create_time,\ncustom_fields,email_addresses,family_name,fax_numbers,given_name,id,job_title,leadsource_id,\nlinks,middle_name,notes,origin,owner_id,phone_numbers,preferred_locale,preferred_name,prefix,\nreferral_code,score_value,social_accounts,source_type,spouse_name,suffix,tag_ids,time_zone,\nupdate_time,utm_parameters,website,account_id,assistant_name,assistant_phone,\nbilling_information,created_by,groups,last_updated_by)"
        },
        "addresses": {
          "type": "array",
          "description": "Any address not listed here will be removed if it already exists. If an empty array is specified, all existing values will be removed."
        },
        "company": {
          "type": "string"
        },
        "origin": {
          "type": "string"
        },
        "prefix": {
          "type": "string",
          "description": "Name prefix"
        },
        "suffix": {
          "type": "string",
          "description": "Name suffix"
        },
        "website": {
          "type": "string",
          "description": "Personal website URL"
        },
        "anniversary_date": {
          "type": "string",
          "description": "The anniversary date"
        },
        "birth_date": {
          "type": "string",
          "description": "The birth date"
        },
        "contact_type": {
          "type": "string",
          "description": "Type of contact"
        },
        "custom_fields": {
          "type": "array",
          "description": "Any address not listed here will be removed if it already exists. If an empty array is specified, all existing values will be removed."
        },
        "email_addresses": {
          "type": "array",
          "description": "Any address not listed here will be removed if it already exists. If an empty array is specified, all existing values will be removed."
        },
        "family_name": {
          "type": "string",
          "description": "Last name / surname"
        },
        "fax_numbers": {
          "type": "array",
          "description": "Any address not listed here will be removed if it already exists. If an empty array is specified, all existing values will be removed."
        },
        "given_name": {
          "type": "string",
          "description": "First name"
        },
        "job_title": {
          "type": "string",
          "description": "Job title"
        },
        "leadsource_id": {
          "type": "string",
          "description": "Lead source identifier"
        },
        "middle_name": {
          "type": "string",
          "description": "Middle name"
        },
        "owner_id": {
          "type": "string",
          "description": "ID of the user who owns this contact"
        },
        "phone_numbers": {
          "type": "array",
          "description": "Any address not listed here will be removed if it already exists. If an empty array is specified, all existing values will be removed."
        },
        "preferred_locale": {
          "type": "string",
          "description": "Preferred locale"
        },
        "preferred_name": {
          "type": "string",
          "description": "Preferred name or nickname"
        },
        "referral_code": {
          "type": "string",
          "description": "Referral code"
        },
        "social_accounts": {
          "type": "array",
          "description": "Any address not listed here will be removed if it already exists. If an empty array is specified, all existing values will be removed."
        },
        "source_type": {
          "type": "string"
        },
        "spouse_name": {
          "type": "string",
          "description": "Spouse's name"
        },
        "time_zone": {
          "type": "string",
          "description": "Contact's timezone"
        },
        "utm_parameters": {
          "type": "string"
        },
        "assistant_name": {
          "type": "string"
        },
        "assistant_phone": {
          "type": "string"
        },
        "billing_information": {
          "type": "string"
        }
      },
      "required": [
        "contact_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_note",
    "description": "Retrieve a Note",
    "method": "GET",
    "url": "/contacts/{contact_id}/notes/{note_id}",
    "pathParams": [
      "contact_id",
      "note_id"
    ],
    "query": [
      "fields"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contact_id": {
          "type": "string",
          "description": "Path parameter: contact_id"
        },
        "note_id": {
          "type": "string",
          "description": "Path parameter: note_id"
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Note properties to include in the response. Allowed values: custom_fields"
        }
      },
      "required": [
        "contact_id",
        "note_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_note",
    "description": "Delete a Note",
    "method": "DELETE",
    "url": "/contacts/{contact_id}/notes/{note_id}",
    "pathParams": [
      "contact_id",
      "note_id"
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
        "note_id": {
          "type": "string",
          "description": "Path parameter: note_id"
        }
      },
      "required": [
        "contact_id",
        "note_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_note",
    "description": "Update a Note",
    "method": "PATCH",
    "url": "/contacts/{contact_id}/notes/{note_id}",
    "pathParams": [
      "contact_id",
      "note_id"
    ],
    "query": [
      "update_mask",
      "fields"
    ],
    "body": [
      "title",
      "text",
      "type",
      "user_id",
      "is_pinned",
      "custom_fields",
      "contact_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "contact_id": {
          "type": "string",
          "description": "Associated contact ID"
        },
        "note_id": {
          "type": "string",
          "description": "Path parameter: note_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Note properties to include in the response. Allowed values: custom_fields"
        },
        "title": {
          "type": "string",
          "description": "A value for either `title` or `type` is required."
        },
        "text": {
          "type": "string",
          "description": "Note content"
        },
        "type": {
          "type": "string",
          "description": "A value for either `title` or `type` is required. The value may be one of `Appointment`, `Call`, `Email`, `Fax`, `Letter` or `Other` in Keap Max/Pro, or an admin-configured value in Classic."
        },
        "user_id": {
          "type": "string",
          "description": "ID of user creating the note"
        },
        "is_pinned": {
          "type": "boolean",
          "description": "Whether to pin this note"
        },
        "custom_fields": {
          "type": "array",
          "description": "Custom field values for the note. An empty array resets all custom fields to their defaults."
        }
      },
      "required": [
        "contact_id",
        "note_id",
        "user_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_contact_custom_field_group",
    "description": "Retrieve a Contact Custom Field Group",
    "method": "GET",
    "url": "/contacts/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_contact_custom_field_group",
    "description": "Delete a Contact Custom Field Group",
    "method": "DELETE",
    "url": "/contacts/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_contact_custom_field_group",
    "description": "Update a Contact Custom Field Group",
    "method": "PATCH",
    "url": "/contacts/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "order",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        },
        "update_mask": {
          "type": "array",
          "description": "Comma-separated list of fields to update"
        },
        "name": {
          "type": "string"
        },
        "order": {
          "type": "number"
        },
        "tab_id": {
          "type": "string"
        }
      },
      "required": [
        "group_id",
        "update_mask"
      ]
    }
  },
  {
    "name": "keap_v2_get_company",
    "description": "Retrieve a Company",
    "method": "GET",
    "url": "/companies/{company_id}",
    "pathParams": [
      "company_id"
    ],
    "query": [
      "fields"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "company_id": {
          "type": "string",
          "description": "Path parameter: company_id"
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of Company properties to include in the response. (Available fields are: `address`, `custom_fields`, `email_address`, `fax_number`, `phone_number`, `website`, `notes`)"
        }
      },
      "required": [
        "company_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_company",
    "description": "Delete a Company",
    "method": "DELETE",
    "url": "/companies/{company_id}",
    "pathParams": [
      "company_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "company_id": {
          "type": "string",
          "description": "Path parameter: company_id"
        }
      },
      "required": [
        "company_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_company",
    "description": "Update a Company",
    "method": "PATCH",
    "url": "/companies/{company_id}",
    "pathParams": [
      "company_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "address",
      "notes",
      "website",
      "suffix",
      "title",
      "company_name",
      "custom_fields",
      "email_address",
      "fax_number",
      "phone_number",
      "anniversary_date",
      "assistant_name",
      "assistant_phone",
      "billing_information",
      "birth_date",
      "contact_type",
      "first_name",
      "job_title",
      "last_name",
      "middle_name",
      "preferred_name",
      "owner_id",
      "referral_code",
      "spouse_name"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "company_id": {
          "type": "string",
          "description": "Path parameter: company_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "address": {
          "type": "string",
          "description": "The company's address"
        },
        "notes": {
          "type": "string",
          "description": "Notes about the company"
        },
        "website": {
          "type": "string",
          "description": "The company's website URL"
        },
        "suffix": {
          "type": "string",
          "description": "Name suffix"
        },
        "title": {
          "type": "string",
          "description": "Name prefix or salutation"
        },
        "company_name": {
          "type": "string",
          "description": "The name of the company"
        },
        "custom_fields": {
          "type": "array"
        },
        "email_address": {
          "type": "string"
        },
        "fax_number": {
          "type": "string"
        },
        "phone_number": {
          "type": "string"
        },
        "anniversary_date": {
          "type": "string",
          "description": "The anniversary date"
        },
        "assistant_name": {
          "type": "string",
          "description": "The name of the company contact's assistant"
        },
        "assistant_phone": {
          "type": "string",
          "description": "The phone number of the company contact's assistant"
        },
        "billing_information": {
          "type": "string",
          "description": "Billing information for the company"
        },
        "birth_date": {
          "type": "string",
          "description": "The birth date"
        },
        "contact_type": {
          "type": "string",
          "description": "Type of contact"
        },
        "first_name": {
          "type": "string",
          "description": "First name of the company contact"
        },
        "job_title": {
          "type": "string",
          "description": "Job title of the company contact"
        },
        "last_name": {
          "type": "string",
          "description": "Last name of the company contact"
        },
        "middle_name": {
          "type": "string",
          "description": "Middle name of the company contact"
        },
        "preferred_name": {
          "type": "string",
          "description": "Preferred name or nickname of the company contact"
        },
        "owner_id": {
          "type": "string",
          "description": "ID of the user who owns this company"
        },
        "referral_code": {
          "type": "string",
          "description": "Referral code"
        },
        "spouse_name": {
          "type": "string",
          "description": "Spouse's name"
        }
      },
      "required": [
        "company_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_company_custom_field",
    "description": "Delete a Company Custom Field",
    "method": "DELETE",
    "url": "/companies/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        }
      },
      "required": [
        "custom_field_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_company_custom_field",
    "description": "Update a Company Custom Field",
    "method": "PATCH",
    "url": "/companies/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "label",
      "options",
      "group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "group_id": {
          "type": "string"
        }
      },
      "required": [
        "custom_field_id",
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_company_custom_field_group",
    "description": "Retrieve a Company Custom Field Group",
    "method": "GET",
    "url": "/companies/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_company_custom_field_group",
    "description": "Delete a Company Custom Field Group",
    "method": "DELETE",
    "url": "/companies/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_company_custom_field_group",
    "description": "Update a Company Custom Field Group",
    "method": "PATCH",
    "url": "/companies/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "order",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        },
        "update_mask": {
          "type": "array",
          "description": "Comma-separated list of fields to update"
        },
        "name": {
          "type": "string"
        },
        "order": {
          "type": "number"
        },
        "tab_id": {
          "type": "string"
        }
      },
      "required": [
        "group_id",
        "update_mask"
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
    "name": "keap_v2_get_affiliate",
    "description": "Retrieve an Affiliate",
    "method": "GET",
    "url": "/affiliates/{id}",
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
    "name": "keap_v2_delete_affiliate",
    "description": "Delete Affiliate",
    "method": "DELETE",
    "url": "/affiliates/{id}",
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
    "name": "keap_v2_update_affiliate",
    "description": "Update an Affiliate",
    "method": "PATCH",
    "url": "/affiliates/{id}",
    "pathParams": [
      "id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "code",
      "name",
      "status",
      "contact_id",
      "parent_affiliate_id",
      "notify_on_sale",
      "notify_on_lead",
      "track_leads_days",
      "password",
      "custom_fields"
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
        "code": {
          "type": "string",
          "description": "The Affiliate code which have some validations.\n1. The code should not have white spaces\n2. The code should starts with letters\n3. The code minimum 2 characters length"
        },
        "name": {
          "type": "string",
          "description": "The Affiliate name."
        },
        "status": {
          "type": "string",
          "description": "The Affiliate Status"
        },
        "contact_id": {
          "type": "string",
          "description": "The contactId identifier. Must be a positive number"
        },
        "parent_affiliate_id": {
          "type": "string",
          "description": "The Parent Affiliate Id"
        },
        "notify_on_sale": {
          "type": "boolean",
          "description": "Whether to notify on sale events"
        },
        "notify_on_lead": {
          "type": "boolean",
          "description": "Whether to notify on lead events"
        },
        "track_leads_days": {
          "type": "number",
          "description": "Number of days to track leads"
        },
        "password": {
          "type": "string",
          "description": "Affiliate portal password."
        },
        "custom_fields": {
          "type": "array",
          "description": "List of custom field values to apply to this affiliate"
        }
      },
      "required": [
        "id"
      ]
    }
  },
  {
    "name": "keap_v2_get_redirect_link",
    "description": "Retrieve an Affiliate Link",
    "method": "GET",
    "url": "/affiliates/redirects/{redirect_id}",
    "pathParams": [
      "redirect_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "redirect_id": {
          "type": "string",
          "description": "Path parameter: redirect_id"
        }
      },
      "required": [
        "redirect_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_redirect_link",
    "description": "Delete an Affiliate Link",
    "method": "DELETE",
    "url": "/affiliates/redirects/{redirect_id}",
    "pathParams": [
      "redirect_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "redirect_id": {
          "type": "string",
          "description": "Path parameter: redirect_id"
        }
      },
      "required": [
        "redirect_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_redirect_link",
    "description": "Update an Affiliate Link",
    "method": "PATCH",
    "url": "/affiliates/redirects/{redirect_id}",
    "pathParams": [
      "redirect_id"
    ],
    "query": [],
    "body": [
      "name",
      "code",
      "affiliate_id",
      "website_address",
      "program_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "redirect_id": {
          "type": "string",
          "description": "Path parameter: redirect_id"
        },
        "name": {
          "type": "string",
          "description": "The Affiliate Link Name"
        },
        "code": {
          "type": "string",
          "description": "Code"
        },
        "affiliate_id": {
          "type": "string",
          "description": "The AffiliateId"
        },
        "website_address": {
          "type": "string",
          "description": "Website Address"
        },
        "program_ids": {
          "type": "array",
          "description": "Program IDs to associate"
        }
      },
      "required": [
        "redirect_id",
        "name",
        "code",
        "website_address"
      ]
    }
  },
  {
    "name": "keap_v2_delete_affiliate_custom_field",
    "description": "Delete a Custom Field",
    "method": "DELETE",
    "url": "/affiliates/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        }
      },
      "required": [
        "custom_field_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_affiliate_custom_field",
    "description": "Update a Custom Field",
    "method": "PATCH",
    "url": "/affiliates/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "label",
      "options",
      "group_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "label": {
          "type": "string"
        },
        "options": {
          "type": "array"
        },
        "group_id": {
          "type": "string"
        }
      },
      "required": [
        "custom_field_id",
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_affiliate_custom_field_group",
    "description": "Retrieve an Affiliate Custom Field Group",
    "method": "GET",
    "url": "/affiliates/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_affiliate_custom_field_group",
    "description": "Delete an Affiliate Custom Field Group",
    "method": "DELETE",
    "url": "/affiliates/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        }
      },
      "required": [
        "group_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_affiliate_custom_field_group",
    "description": "Update an Affiliate Custom Field Group",
    "method": "PATCH",
    "url": "/affiliates/model/customFields/groups/{group_id}",
    "pathParams": [
      "group_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "order",
      "tab_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "group_id": {
          "type": "string",
          "description": "Path parameter: group_id"
        },
        "update_mask": {
          "type": "array",
          "description": "Comma-separated list of fields to update"
        },
        "name": {
          "type": "string"
        },
        "order": {
          "type": "number"
        },
        "tab_id": {
          "type": "string"
        }
      },
      "required": [
        "group_id",
        "update_mask"
      ]
    }
  },
  {
    "name": "keap_v2_get_commission_program",
    "description": "Retrieve a Commission Program",
    "method": "GET",
    "url": "/affiliates/commissionPrograms/{commission_program_id}",
    "pathParams": [
      "commission_program_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "commission_program_id": {
          "type": "string",
          "description": "Path parameter: commission_program_id"
        }
      },
      "required": [
        "commission_program_id"
      ]
    }
  },
  {
    "name": "keap_v2_delete_affiliate_commission_program",
    "description": "Delete a Commission Program",
    "method": "DELETE",
    "url": "/affiliates/commissionPrograms/{commission_program_id}",
    "pathParams": [
      "commission_program_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "commission_program_id": {
          "type": "string",
          "description": "Path parameter: commission_program_id"
        }
      },
      "required": [
        "commission_program_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_commission_program",
    "description": "Update an Affiliate Commission Program",
    "method": "PATCH",
    "url": "/affiliates/commissionPrograms/{commission_program_id}",
    "pathParams": [
      "commission_program_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "name",
      "notes",
      "priority"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "commission_program_id": {
          "type": "string",
          "description": "Path parameter: commission_program_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "name": {
          "type": "string",
          "description": "The name of the Commission Program"
        },
        "notes": {
          "type": "string",
          "description": "The notes of the Commission Program"
        },
        "priority": {
          "type": "number",
          "description": "The priority of the Commission Program"
        }
      },
      "required": [
        "commission_program_id",
        "name",
        "priority"
      ]
    }
  },
  {
    "name": "keap_v2_delete_commission_program_resource",
    "description": "Remove Commission Program Resource",
    "method": "DELETE",
    "url": "/affiliates/commissionPrograms/resources/{resource_id}",
    "pathParams": [
      "resource_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "resource_id": {
          "type": "string",
          "description": "Path parameter: resource_id"
        }
      },
      "required": [
        "resource_id"
      ]
    }
  },
  {
    "name": "keap_v2_update_commission_program_resource",
    "description": "Update Commission Program Resource",
    "method": "PATCH",
    "url": "/affiliates/commissionPrograms/resources/{resource_id}",
    "pathParams": [
      "resource_id"
    ],
    "query": [
      "update_mask"
    ],
    "body": [
      "title",
      "notes",
      "url",
      "order",
      "content_html",
      "page_width",
      "page_height",
      "commission_program_ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "resource_id": {
          "type": "string",
          "description": "Path parameter: resource_id"
        },
        "update_mask": {
          "type": "array",
          "description": "An optional list of properties to be updated. If set, only the provided properties will be updated and others will be skipped."
        },
        "title": {
          "type": "string",
          "description": "The program resource title"
        },
        "notes": {
          "type": "string",
          "description": "The resource notes."
        },
        "url": {
          "type": "string",
          "description": "The URL to the resource."
        },
        "order": {
          "type": "number",
          "description": "The order in which the resource is displayed. Minimum value is 0. Lower values indicate higher priority."
        },
        "content_html": {
          "type": "string",
          "description": "The contents of the PAGE or EMAIL. In HTML format."
        },
        "page_width": {
          "type": "number",
          "description": "The width of the page for PAGE types, in pixels. Minimum value is 0."
        },
        "page_height": {
          "type": "number",
          "description": "The height of the page for PAGE types, in pixels. Minimum value is 0."
        },
        "commission_program_ids": {
          "type": "array",
          "description": "A list of commission program ids to use this resource. The values in this list will replace the existing list of commission program ids."
        }
      },
      "required": [
        "resource_id"
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
    "name": "keap_v2_list_paginated_users",
    "description": "List Users",
    "method": "GET",
    "url": "/users",
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
          "description": "Filter to apply, allowed fields are:\n- (String) `email`\n- (String) `given_name`\n- (Boolean) `include_inactive`\n- (Boolean) `include_partners`\n- (Set[String]) `user_ids`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`.\nFor the filters listed above, here are some examples:\n- `filter=given_name%3D%3DMary`\n- `filter=user_ids%3D%3D123%3Bgiven_name%3D%3DSmith`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `create_time`\n- `email`\n- `name` (sorts by family name / last name; uses User ID as tiebreaker for stable pagination)\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_get_user_signature",
    "description": "Get User email signature",
    "method": "GET",
    "url": "/users/{user_id}/signature",
    "pathParams": [
      "user_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string",
          "description": "Path parameter: user_id"
        }
      },
      "required": [
        "user_id"
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
    "name": "keap_v2_retrieve_task_model",
    "description": "Retrieve Task Model",
    "method": "GET",
    "url": "/tasks/model",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_list_contacts_with_tag_id",
    "description": "List Tagged Contacts",
    "method": "GET",
    "url": "/tags/{tag_id}/contacts",
    "pathParams": [
      "tag_id"
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
        "tag_id": {
          "type": "string",
          "description": "Path parameter: tag_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `given_name`\n- (String) `family_name`\n- (String) `email`\n- (String) `since_applied_time`\n- (String) `until_applied_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. If NONE is passed in for `email`, `given_name`, or `family_name`, it\nwill check for the non-existence of that field. For the filters listed above, here are some examples:\n- `filter=given_name%3D%3DJohn`\n- `filter=family_name%3D%3DSmith`\n- `filter=email%3D%3DNONE`\n- `filter=since_applied_time%3D%3D2025-04-16T20:33:02.321Z;until_applied_time%3D%3D2025-08-16T20:33:02.321Z;`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `given_name`\n- `family_name`\n- `email`\n- `applied_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
        "tag_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_companies_for_tag_id",
    "description": "List Tagged Companies",
    "method": "GET",
    "url": "/tags/{tag_id}/companies",
    "pathParams": [
      "tag_id"
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
        "tag_id": {
          "type": "string",
          "description": "Path parameter: tag_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `company_name`\n- (String) `email`\n- (String) `since_applied_time`\n- (String) `until_applied_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. If NONE is passed in for `email`, it\nwill check for the non-existence of that field. For the filters listed above, here are some examples:\n- `filter=company_name%3D%3DCompany`\n- `filter=email%3D%3Dtest@gmail.com`\n- `filter=since_applied_time%3D%3D2025-04-16T20:33:02.321Z;until_applied_time%3D%3D2025-08-16T20:33:02.321Z;`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `company_name`\n- `email`\n- `applied_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
        "tag_id"
      ]
    }
  },
  {
    "name": "keap_v2_retrieve_subscription_custom_field_model",
    "description": "Retrieve Subscription Custom Field Model",
    "method": "GET",
    "url": "/subscriptions/model",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
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
    "name": "keap_v2_get_contact_option_types",
    "description": "Get Contact Option types",
    "method": "GET",
    "url": "/settings/contactOptionTypes",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_is_application_enabled",
    "description": "Get Application Status",
    "method": "GET",
    "url": "/settings/applications:isEnabled",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_get_application_configurations",
    "description": "Get Application Configuration",
    "method": "GET",
    "url": "/settings/applications:getConfiguration",
    "pathParams": [],
    "query": [
      "fields"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "description": "By default, only application data is returned. In addition to that, data is returned for the fields that are mentioned in the query."
        }
      }
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
    "name": "keap_v2_get_file_data",
    "description": "Retrieve Product Legacy Image Data",
    "method": "GET",
    "url": "/products/{product_id}/images/legacyImageData",
    "pathParams": [
      "product_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "product_id": {
          "type": "string",
          "description": "Path parameter: product_id"
        }
      },
      "required": [
        "product_id"
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
    "name": "keap_v2_retrieve_order_custom_field_model",
    "description": "Retrieve Order Custom Field Model",
    "method": "GET",
    "url": "/orders/model",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_retrieve_opportunity_custom_field_model",
    "description": "Retrieve Opportunity Custom Field Model",
    "method": "GET",
    "url": "/opportunities/model",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_get_user_info",
    "description": "Retrieve User Info",
    "method": "GET",
    "url": "/oauth/connect/userinfo",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_list_all_notes",
    "description": "List All Notes",
    "method": "GET",
    "url": "/notes",
    "pathParams": [],
    "query": [
      "filter",
      "page_token",
      "order_by",
      "page_size",
      "fields"
    ],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "filter": {
          "type": "string",
          "description": "Filter to apply. Allowed fields and operators:\n- (String) `id` \u2014 supports `==`, `!=`, `>`, `<`, `>=`, `<=`\n- (String list) `ids` \u2014 comma-separated note ids, supports `==` only (e.g. `ids==1,2,3`)\n- (String) `title` \u2014 supports `==`. Bare value matches anywhere in the title (contains).\n   Wildcard prefix match also supported (e.g. `title==Follow*`)\n- (String) `contact_id`\n- (String) `assigned_to_user_id`\n- (String) `since_time` \u2014 ISO-8601 date/time\n- (String) `until_time` \u2014 ISO-8601 date/time\n\nOperators must be URL-encoded. Common encodings:\n`==` \u2192 `%3D%3D`, `!=` \u2192 `!%3D`, `>` \u2192 `%3E`, `<` \u2192 `%3C`,\n`>=` \u2192 `%3E%3D`, `<=` \u2192 `%3C%3D`, `*` \u2192 `%2A`.\n\nMultiple filters are combined with AND using `;`.\n\nExamples:\n- `filter=contact_id%3D%3D1001`\n- `filter=id%3E5`\n- `filter=ids%3D%3D1,2,3`\n- `filter=title%3D%3DFollow%2A`\n- `filter=since_time%3D%3D2025-04-16T20:33:02.321Z`\n- `filter=until_time%3D%3D2025-08-16T20:33:02.321Z`\n\nNotes:\n- `id` and `ids` cannot be combined in the same request.\n- Wildcard `*` may only appear at the end of the value (prefix match).\n   Leading wildcards (`*foo`, `*foo*`) are rejected for performance reasons.\n"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `id`\n- `create_time`\n- `update_time`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        },
        "fields": {
          "type": "array",
          "description": "Comma-delimited list of optional Note properties to include in the response. Allowed values: custom_fields"
        }
      }
    }
  },
  {
    "name": "keap_v2_list_note_templates",
    "description": "Retrieve Note Templates",
    "method": "GET",
    "url": "/notes/templates",
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
          "description": "Search filter to apply to results"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items by. E.g. `given_name desc`"
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
    "name": "keap_v2_retrieve_note_model",
    "description": "Retrieve Note Model",
    "method": "GET",
    "url": "/notes/model",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
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
    "name": "keap_v2_list_expenses_incurred_from_lead_source_recurring_f0667e",
    "description": "Retrieves a list of expenses incurred from a recurring expense",
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
    "name": "keap_v2_get_file_data_get",
    "description": "Retrieve a file's data",
    "method": "GET",
    "url": "/files/{file_id}:data",
    "pathParams": [
      "file_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "file_id": {
          "type": "string",
          "description": "Path parameter: file_id"
        }
      },
      "required": [
        "file_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_email",
    "description": "Retrieve an Email",
    "method": "GET",
    "url": "/emails/{id}",
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
    "name": "keap_v2_delete_email",
    "description": "Delete an Email Record",
    "method": "DELETE",
    "url": "/emails/{id}",
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
    "name": "keap_v2_get_email_template",
    "description": "Retrieve an email template",
    "method": "GET",
    "url": "/emails/templates/{email_template_id}",
    "pathParams": [
      "email_template_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "email_template_id": {
          "type": "string",
          "description": "Path parameter: email_template_id"
        }
      },
      "required": [
        "email_template_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_tags_for_contact",
    "description": "List Applied Tags",
    "method": "GET",
    "url": "/contacts/{contact_id}/tags",
    "pathParams": [
      "contact_id"
    ],
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
        "contact_id": {
          "type": "string",
          "description": "Path parameter: contact_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `name`\n- (String) `description`\n- (String) `category_id` (use `category_id==NONE` to filter tags not assigned to any category)\n- (String) `since_applied_time`\n- (String) `until_applied_time`\n- (String) `since_create_time`\n- (String) `until_create_time`\n- (String) `since_update_time`\n- (String) `until_update_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=name%3D%3DCustomer`\n- `filter=category_id%3D%3D123`\n- `filter=category_id%3D%3DNONE`\n- `filter=since_applied_time%3D%3D2025-04-16T20:33:02.321Z;until_applied_time%3D%3D2025-08-16T20:33:02.321Z;`\n"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n- `create_time`\n- `update_time`\n- `applied_time`\n- `category_id`\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        }
      },
      "required": [
        "contact_id"
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
    "name": "keap_v2_list_contact_links",
    "description": "List Linked Contacts",
    "method": "GET",
    "url": "/contacts/{contact_id}/links",
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
    "name": "keap_v2_retrieve_contact_model",
    "description": "Retrieve Contact Model",
    "method": "GET",
    "url": "/contacts/model",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_list_tags_for_company",
    "description": "List Applied Tags",
    "method": "GET",
    "url": "/companies/{company_id}/tags",
    "pathParams": [
      "company_id"
    ],
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
        "company_id": {
          "type": "string",
          "description": "Path parameter: company_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `name`\n- (String) `description`\n- (String) `category_id` (use `category_id==NONE` to filter tags not assigned to any category)\n- (String) `since_applied_time`\n- (String) `until_applied_time`\n- (String) `since_create_time`\n- (String) `until_create_time`\n- (String) `since_update_time`\n- (String) `until_update_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=name%3D%3DCustomer`\n- `filter=category_id%3D%3D123`\n- `filter=category_id%3D%3DNONE`\n- `filter=since_applied_time%3D%3D2025-04-16T20:33:02.321Z;until_applied_time%3D%3D2025-08-16T20:33:02.321Z;`\n"
        },
        "page_token": {
          "type": "string",
          "description": "Page token"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n- `create_time`\n- `update_time`\n- `applied_time`\n- `category_id`\n\nOne of the following directions:\n- `asc`\n- `desc`"
        },
        "page_size": {
          "type": "number",
          "description": "Total number of items to return per page"
        }
      },
      "required": [
        "company_id"
      ]
    }
  },
  {
    "name": "keap_v2_retrieve_company_custom_field_model",
    "description": "Retrieve Company Custom Field Model",
    "method": "GET",
    "url": "/companies/model",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_list_campaigns",
    "description": "List Campaigns",
    "method": "GET",
    "url": "/campaigns",
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
          "description": "Filter to apply, allowed fields are:\n- (String) `name`\n\nYou will need to apply the `==` operator to check the equality of the filter with your searched\ntext, in the encoded form `%3D%3D`.\nThe search will look for the text anywhere in the campaign name.\n- `filter=name%3D%3DSpring Campaign`\n- `filter=name%3D%3DTag New Contacts`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `name`\n- `publisheddate`\n- `id`\n- `completedContactCount`\n- `activeContacts`\n- `datecreated`\n- `lastupdated`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_get_campaign",
    "description": "Retrieve a Campaign",
    "method": "GET",
    "url": "/campaigns/{campaign_id}",
    "pathParams": [
      "campaign_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "campaign_id": {
          "type": "string",
          "description": "Path parameter: campaign_id"
        }
      },
      "required": [
        "campaign_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_campaign_sequences",
    "description": "Retrieve a list of Sequences for a Campaign",
    "method": "GET",
    "url": "/campaigns/{campaign_id}/sequences",
    "pathParams": [
      "campaign_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "campaign_id": {
          "type": "string",
          "description": "Path parameter: campaign_id"
        }
      },
      "required": [
        "campaign_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_campaign_goals",
    "description": "Retrieve a list of Goals for a Campaign",
    "method": "GET",
    "url": "/campaigns/{campaign_id}/goals",
    "pathParams": [
      "campaign_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "campaign_id": {
          "type": "string",
          "description": "Path parameter: campaign_id"
        }
      },
      "required": [
        "campaign_id"
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
    "name": "keap_v2_get_affiliate_commissions",
    "description": "Retrieve Affiliate Commissions",
    "method": "GET",
    "url": "/affiliates/{affiliate_id}:commissions",
    "pathParams": [
      "affiliate_id"
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
        "affiliate_id": {
          "type": "string",
          "description": "Path parameter: affiliate_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `since_time`\n- (String) `until_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=since_time%3D%3D2024-05-21T23:00:00Z%3Buntil_time%3D%3D2025-05-21T23:00:00Z`\n- `filter=until_time%3D%3D2025-05-21T23:00:00Z`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `invoice_id`\n- `time_earned`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
        "affiliate_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_referrals_by_affiliate_id",
    "description": "Retrieve Affiliate Referrals",
    "method": "GET",
    "url": "/affiliates/{affiliate_id}/referrals",
    "pathParams": [
      "affiliate_id"
    ],
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
        "affiliate_id": {
          "type": "string",
          "description": "Path parameter: affiliate_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `source` - Wildcard matching allowed\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`.\n\nFor fields which allow wildcard matching, you may use the * wildcard character (or its encoded form %2A)\nfor case-insensitive partial matching on text fields. Example of a valid pattern of wildcard usage:\n- `field==foo*` finds anything in `field` that begins with `foo`\n\nFor the filters listed above, here are some examples:\n- `filter=source%3D%3DEmail Marketing`\n- `filter=source%3D%3DEmail*` (starts with \"Email\")\n"
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
      },
      "required": [
        "affiliate_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_affiliate_payments",
    "description": "List Affiliate Payments",
    "method": "GET",
    "url": "/affiliates/{affiliate_id}/payments",
    "pathParams": [
      "affiliate_id"
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
        "affiliate_id": {
          "type": "string",
          "description": "Path parameter: affiliate_id"
        },
        "filter": {
          "type": "string",
          "description": "Filter to apply, allowed fields are:\n- (String) `since_time`\n- (String) `until_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\nword, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n- `filter=since_time%3D%3D2024-09-17T-15:50+00`\n- `filter=until_time%3D%3D2024-09-17T-15:50+00`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `create_time`\n- `pay_date`\n- `pay_amount`\n\nOne of the following directions:\n- `asc`\n- `desc`\n"
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
        "affiliate_id"
      ]
    }
  },
  {
    "name": "keap_v2_get_affiliate_commission_total",
    "description": "Retrieve Affiliate Commission Earned and View LedgerURl for portal",
    "method": "GET",
    "url": "/affiliates/{affiliate_id}/commissionTotal",
    "pathParams": [
      "affiliate_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "affiliate_id": {
          "type": "string",
          "description": "Path parameter: affiliate_id"
        }
      },
      "required": [
        "affiliate_id"
      ]
    }
  },
  {
    "name": "keap_v2_list_summaries",
    "description": "List Affiliate Summaries",
    "method": "GET",
    "url": "/affiliates/summaries",
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
          "description": "Filter to apply, allowed fields are:\n- (List[String]) `affiliate_ids`\n- (String) `since_time`\n- (String) `until_time`\n\nYou will need to apply the `==` operator to check the equality of one of the filters with your searched\n word, in the encoded form `%3D%3D`. For the filters listed above, here are some examples:\n - `filter=since_time%3D%3D2024-09-17T-15:50+00`\n - `filter=until_time%3D%3D2024-09-17T-15:50+00`\n - `filter=affiliate_ids%3D%3D123,456,789`\n"
        },
        "order_by": {
          "type": "string",
          "description": "Attribute and direction to order items.\nOne of the following fields:\n- `affiliate_id`\n- `amount_earned`\n- `balance`\n- `clawbacks`\n\nOne of the following directions:\n- `asc`\n- `desc`"
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
    "name": "keap_v2_get_affiliate_custom_fields",
    "description": "Retrieve Affiliate Model",
    "method": "GET",
    "url": "/affiliates/model",
    "pathParams": [],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "keap_v2_list_commission_program_resources",
    "description": "Retrieve Commission Program Resources",
    "method": "GET",
    "url": "/affiliates/commissionPrograms/{commission_program_id}/resources",
    "pathParams": [
      "commission_program_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "commission_program_id": {
          "type": "string",
          "description": "Path parameter: commission_program_id"
        }
      },
      "required": [
        "commission_program_id"
      ]
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
  },
  {
    "name": "keap_v2_delete_contact_custom_field",
    "description": "Delete a Contact Custom Field",
    "method": "DELETE",
    "url": "/contacts/model/customFields/{custom_field_id}",
    "pathParams": [
      "custom_field_id"
    ],
    "query": [],
    "body": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "custom_field_id": {
          "type": "string",
          "description": "Path parameter: custom_field_id"
        }
      },
      "required": [
        "custom_field_id"
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
