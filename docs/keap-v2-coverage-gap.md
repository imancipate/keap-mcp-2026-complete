# Keap REST v2 — Coverage Gap vs this MCP

v2 total operations: 343 | MCP tools: 111 (all REST v1)

Legend: [PARTIAL]=resource exists in MCP but on v1 with fewer ops; [MISSING]=zero coverage.


## [PARTIAL] Affiliate  (43 ops)
  DELETE /rest/v2/affiliates/commissionPrograms/resources/{resource_id}   — Remove Commission Program Resource
  DELETE /rest/v2/affiliates/commissionPrograms/{commission_program_id}   — Delete a Commission Program
  DELETE /rest/v2/affiliates/model/customFields/groups/{group_id}   — Delete an Affiliate Custom Field Group
  DELETE /rest/v2/affiliates/model/customFields/{custom_field_id}   — Delete a Custom Field
  DELETE /rest/v2/affiliates/redirects/{redirect_id}   — Delete an Affiliate Link
  DELETE /rest/v2/affiliates/{id}   — Delete Affiliate
  GET    /rest/v2/affiliates   — List Affiliates
  GET    /rest/v2/affiliates/commissionPrograms   — List Affiliate Commission Programs
  GET    /rest/v2/affiliates/commissionPrograms/{commission_program_id}   — Retrieve a Commission Program
  GET    /rest/v2/affiliates/commissionPrograms/{commission_program_id}/resources   — Retrieve Commission Program Resources
  GET    /rest/v2/affiliates/model   — Retrieve Affiliate Model
  GET    /rest/v2/affiliates/model/customFields/groups   — List Affiliate Custom Field Groups
  GET    /rest/v2/affiliates/model/customFields/groups/{group_id}   — Retrieve an Affiliate Custom Field Group
  GET    /rest/v2/affiliates/redirects   — List Affiliate Links
  GET    /rest/v2/affiliates/redirects/{redirect_id}   — Retrieve an Affiliate Link
  GET    /rest/v2/affiliates/summaries   — List Affiliate Summaries
  GET    /rest/v2/affiliates/{affiliate_id}/commissionTotal   — Retrieve Affiliate Commission Earned and View LedgerURl for portal
  GET    /rest/v2/affiliates/{affiliate_id}/payments   — List Affiliate Payments
  GET    /rest/v2/affiliates/{affiliate_id}/referrals   — Retrieve Affiliate Referrals
  GET    /rest/v2/affiliates/{affiliate_id}:commissions   — Retrieve Affiliate Commissions
  GET    /rest/v2/affiliates/{id}   — Retrieve an Affiliate
  PATCH  /rest/v2/affiliates/commissionPrograms/defaultCommissionPrograms/{commission_program_id}   — Update a Default Commission Program
  PATCH  /rest/v2/affiliates/commissionPrograms/productCommissionPrograms/{commission_program_id}   — Update a Product Commission Program
  PATCH  /rest/v2/affiliates/commissionPrograms/resources/{resource_id}   — Update Commission Program Resource
  PATCH  /rest/v2/affiliates/commissionPrograms/subscriptionCommissionPrograms/{commission_program_id}   — Update a Subscription Commission Program
  PATCH  /rest/v2/affiliates/commissionPrograms/{commission_program_id}   — Update an Affiliate Commission Program
  PATCH  /rest/v2/affiliates/model/customFields/groups/{group_id}   — Update an Affiliate Custom Field Group
  PATCH  /rest/v2/affiliates/model/customFields/{custom_field_id}   — Update a Custom Field
  PATCH  /rest/v2/affiliates/redirects/{redirect_id}   — Update an Affiliate Link
  PATCH  /rest/v2/affiliates/{id}   — Update an Affiliate
  POST   /rest/v2/affiliates   — Create an Affiliate
  POST   /rest/v2/affiliates/commissionPrograms   — Create an Affiliate Commission Program
  POST   /rest/v2/affiliates/commissionPrograms/defaultCommissionPrograms/{commission_program_id}   — Create a Default Commission Program
  POST   /rest/v2/affiliates/commissionPrograms/productCommissionPrograms/{commission_program_id}   — Assign a Product Commission Program
  POST   /rest/v2/affiliates/commissionPrograms/resources   — Create Commission Program Resource
  POST   /rest/v2/affiliates/commissionPrograms/subscriptionCommissionPrograms/{commission_program_id}   — Assign a Subscription Commission Program
  POST   /rest/v2/affiliates/commissionPrograms/{commission_id}:removeProductCommission   — Remove a Product from a Commission Program
  POST   /rest/v2/affiliates/commissionPrograms/{commission_id}:removeSubscriptionCommission   — Remove a Subscription from a Commission Program
  POST   /rest/v2/affiliates/model/customFields   — Create an Affiliate Custom Field
  POST   /rest/v2/affiliates/model/customFields/groups   — Create an Affiliate Custom Field Group
  POST   /rest/v2/affiliates/redirects   — Create an Affiliate Link
  POST   /rest/v2/affiliates/{id}:assignToProgram   — Assign Affiliate to Commission program
  POST   /rest/v2/affiliates/{id}:removeFromProgram   — Remove an Affiliate from a Commission Program

## [PARTIAL] Campaign  (6 ops)
  GET    /rest/v2/campaigns   — List Campaigns
  GET    /rest/v2/campaigns/{campaign_id}   — Retrieve a Campaign
  GET    /rest/v2/campaigns/{campaign_id}/goals   — Retrieve a list of Goals for a Campaign
  GET    /rest/v2/campaigns/{campaign_id}/sequences   — Retrieve a list of Sequences for a Campaign
  POST   /rest/v2/campaigns/{campaign_id}/sequences/{sequence_id}:addContacts   — Add Contacts to Campaign Sequence
  POST   /rest/v2/campaigns/{campaign_id}/sequences/{sequence_id}:removeContacts   — Remove Contacts from Campaign Sequence

## [PARTIAL] Company  (17 ops)
  DELETE /rest/v2/companies/model/customFields/groups/{group_id}   — Delete a Company Custom Field Group
  DELETE /rest/v2/companies/model/customFields/{custom_field_id}   — Delete a Company Custom Field
  DELETE /rest/v2/companies/{company_id}   — Delete a Company
  DELETE /rest/v2/companies/{company_id}/tags/{tag_id}   — Remove Tag
  GET    /rest/v2/companies   — List Companies
  GET    /rest/v2/companies/model   — Retrieve Company Custom Field Model
  GET    /rest/v2/companies/model/customFields/groups   — List Company Custom Field Groups
  GET    /rest/v2/companies/model/customFields/groups/{group_id}   — Retrieve a Company Custom Field Group
  GET    /rest/v2/companies/{company_id}   — Retrieve a Company
  GET    /rest/v2/companies/{company_id}/tags   — List Applied Tags
  PATCH  /rest/v2/companies/model/customFields/groups/{group_id}   — Update a Company Custom Field Group
  PATCH  /rest/v2/companies/model/customFields/{custom_field_id}   — Update a Company Custom Field
  PATCH  /rest/v2/companies/{company_id}   — Update a Company
  POST   /rest/v2/companies   — Create a Company
  POST   /rest/v2/companies/model/customFields   — Create a Company Custom Field
  POST   /rest/v2/companies/model/customFields/groups   — Create a Company Custom Field Group
  POST   /rest/v2/companies/{company_id}/tags/{tag_id}   — Add Tag to Company

## [PARTIAL] Contact  (20 ops)
  DELETE /rest/v2/contacts/model/customFields/groups/{group_id}   — Delete a Contact Custom Field Group
  DELETE /rest/v2/contacts/model/customFields/{custom_field_id}   — Delete a Contact Custom Field
  DELETE /rest/v2/contacts/{contact_id}   — Delete a Contact
  GET    /rest/v2/contacts   — List Contacts
  GET    /rest/v2/contacts/links/types   — List Contact Link types
  GET    /rest/v2/contacts/model   — Retrieve Contact Model
  GET    /rest/v2/contacts/model/customFields/groups   — List Contact Custom Field Groups
  GET    /rest/v2/contacts/model/customFields/groups/{group_id}   — Retrieve a Contact Custom Field Group
  GET    /rest/v2/contacts/{contact_id}   — Retrieve a Contact
  GET    /rest/v2/contacts/{contact_id}/links   — List Linked Contacts
  GET    /rest/v2/contacts/{contact_id}/tags   — List Applied Tags
  PATCH  /rest/v2/contacts/model/customFields/groups/{group_id}   — Update a Contact Custom Field Group
  PATCH  /rest/v2/contacts/{contact_id}   — Update a Contact
  POST   /rest/v2/contacts   — Create a Contact
  POST   /rest/v2/contacts/links/types   — Create a Contact Link type
  POST   /rest/v2/contacts/model/customFields   — Create a Contact Custom Field
  POST   /rest/v2/contacts/model/customFields/groups   — Create a Contact Custom Field Group
  POST   /rest/v2/contacts:link   — Link Contacts
  POST   /rest/v2/contacts:merge   — Merge two Contacts
  POST   /rest/v2/contacts:unlink   — Delete Link between two Contacts

## [PARTIAL] Email  (9 ops)
  DELETE /rest/v2/emails/{id}   — Delete an Email Record
  GET    /rest/v2/emails   — List Emails
  GET    /rest/v2/emails/templates/{email_template_id}   — Retrieve an email template
  GET    /rest/v2/emails/{id}   — Retrieve an Email
  POST   /rest/v2/emails   — Create an Email Record
  POST   /rest/v2/emails/templates:send   — Send an email based on a template
  POST   /rest/v2/emails:batchAdd   — Create a set of Email Records
  POST   /rest/v2/emails:batchRemove   — Remove a set of Email Records
  POST   /rest/v2/emails:send   — Send an Email

## [PARTIAL] Files  (6 ops)
  DELETE /rest/v2/files/{file_id}   — Delete a file
  GET    /rest/v2/files   — List all files
  GET    /rest/v2/files/{file_id}   — Retrieve a file
  GET    /rest/v2/files/{file_id}:data   — Retrieve a file's data
  POST   /rest/v2/files   — Create a file
  POST   /rest/v2/files/{file_id}   — Update a file

## [PARTIAL] Note  (16 ops)
  DELETE /rest/v2/contacts/{contact_id}/notes/{note_id}   — Delete a Note
  DELETE /rest/v2/notes/model/customFields/groups/{group_id}   — Delete a Note Custom Field Group
  DELETE /rest/v2/notes/model/customFields/{custom_field_id}   — Delete a Note Custom Field
  GET    /rest/v2/contacts/{contact_id}/notes   — List Notes
  GET    /rest/v2/contacts/{contact_id}/notes/{note_id}   — Retrieve a Note
  GET    /rest/v2/notes   — List All Notes
  GET    /rest/v2/notes/model   — Retrieve Note Model
  GET    /rest/v2/notes/model/customFields/groups   — List Note Custom Field Groups
  GET    /rest/v2/notes/model/customFields/groups/{group_id}   — Retrieve a Note Custom Field Group
  GET    /rest/v2/notes/templates   — Retrieve Note Templates
  PATCH  /rest/v2/contacts/{contact_id}/notes/{note_id}   — Update a Note
  PATCH  /rest/v2/notes/model/customFields/groups/{group_id}   — Update a Note Custom Field Group
  PATCH  /rest/v2/notes/model/customFields/{custom_field_id}   — Update a Custom Field
  POST   /rest/v2/contacts/{contact_id}/notes   — Create a Note
  POST   /rest/v2/notes/model/customFields   — Create a Custom Field
  POST   /rest/v2/notes/model/customFields/groups   — Create a Note Custom Field Group

## [PARTIAL] Opportunity  (19 ops)
  DELETE /rest/v2/opportunities/model/customFields/groups/{group_id}   — Delete an Opportunity Custom Field Group
  DELETE /rest/v2/opportunities/model/customFields/{custom_field_id}   — Delete an Opportunity Custom Field
  DELETE /rest/v2/opportunities/stages/{stage_id}   — Delete an Opportunity Stage
  DELETE /rest/v2/opportunities/{opportunity_id}   — Delete an Opportunity
  GET    /rest/v2/opportunities   — List Opportunities
  GET    /rest/v2/opportunities/model   — Retrieve Opportunity Custom Field Model
  GET    /rest/v2/opportunities/model/customFields/groups   — List Opportunity Custom Field Groups
  GET    /rest/v2/opportunities/model/customFields/groups/{group_id}   — Retrieve an Opportunity Custom Field Group
  GET    /rest/v2/opportunities/stages   — List of Opportunity Stages
  GET    /rest/v2/opportunities/stages/{stage_id}   — Retrieve an Opportunity Stage
  GET    /rest/v2/opportunities/{opportunity_id}   — Retrieve a Opportunity
  PATCH  /rest/v2/opportunities/model/customFields/groups/{group_id}   — Update an Opportunity Custom Field Group
  PATCH  /rest/v2/opportunities/model/customFields/{custom_field_id}   — Update a Opportunity's Custom Field
  PATCH  /rest/v2/opportunities/stages/{stage_id}   — Update an Opportunity Stage
  PATCH  /rest/v2/opportunities/{opportunity_id}   — Update an opportunity
  POST   /rest/v2/opportunities   — Create an Opportunity
  POST   /rest/v2/opportunities/model/customFields   — Create an Opportunity Custom Field
  POST   /rest/v2/opportunities/model/customFields/groups   — Create an Opportunity Custom Field Group
  POST   /rest/v2/opportunities/stages   — Create an Opportunity Stage

## [PARTIAL] Orders  (24 ops)
  DELETE /rest/v2/orders/model/customFields/groups/{group_id}   — Delete an Order Custom Field Group
  DELETE /rest/v2/orders/model/customFields/{custom_field_id}   — Delete an Order Custom Field
  DELETE /rest/v2/orders/{order_id}   — Delete an Order
  DELETE /rest/v2/orders/{order_id}/items/{order_item_id}   — Delete an Order Item
  GET    /rest/v2/orders   — List orders
  GET    /rest/v2/orders/model   — Retrieve Order Custom Field Model
  GET    /rest/v2/orders/model/customFields/groups   — List Order Custom Field Groups
  GET    /rest/v2/orders/model/customFields/groups/{group_id}   — Retrieve an Order Custom Field Group
  GET    /rest/v2/orders/{order_id}   — Retrieve an Order
  GET    /rest/v2/orders/{order_id}/items/{order_item_id}   — Retrieve an Order Item
  GET    /rest/v2/orders/{order_id}/payments   — Retrieve Order Payments
  PATCH  /rest/v2/orders/model/customFields/groups/{group_id}   — Update an Order Custom Field Group
  PATCH  /rest/v2/orders/model/customFields/{custom_field_id}   — Update an Order Custom Field
  PATCH  /rest/v2/orders/{order_id}   — Update an Order
  PATCH  /rest/v2/orders/{order_id}/items/{order_item_id}   — Update an Order Item
  POST   /rest/v2/orders   — Create an Order
  POST   /rest/v2/orders/model/customFields   — Create an Order Custom Field
  POST   /rest/v2/orders/model/customFields/groups   — Create an Order Custom Field Group
  POST   /rest/v2/orders/{order_id}/items   — Create an Order Item
  POST   /rest/v2/orders/{order_id}/items/{order_item_id}:applyCommission   — Apply Commission to an Order Item
  POST   /rest/v2/orders/{order_id}/payments   — Create a Payment
  POST   /rest/v2/orders/{order_id}:applyTax   — Apply Taxes on an Order
  POST   /rest/v2/orders/{order_id}:attachFile   — Attach a File to an Order Invoice
  POST   /rest/v2/orders/{order_id}:detachFile   — Detach a File from an Order Invoice

## [PARTIAL] Products  (17 ops)
  DELETE /rest/v2/products/{product_id}   — Delete a Product
  DELETE /rest/v2/products/{product_id}/images   — Delete the Product Image
  DELETE /rest/v2/products/{product_id}/options/{product_option_id}   — Delete a Product Option
  DELETE /rest/v2/products/{product_id}/options/{product_option_id}/listItems/{item_id}   — Delete a Product Option List Item
  GET    /rest/v2/products   — List Products
  GET    /rest/v2/products/{product_id}   — Get a Product
  GET    /rest/v2/products/{product_id}/images/legacyImageData   — Retrieve Product Legacy Image Data
  GET    /rest/v2/products/{product_id}/options   — List Product Options
  GET    /rest/v2/products/{product_id}/options/{product_option_id}   — Get Product Option
  PATCH  /rest/v2/products/{product_id}   — Update a Product
  PATCH  /rest/v2/products/{product_id}/options/{product_option_id}   — Updates a Product Option
  PATCH  /rest/v2/products/{product_id}/options/{product_option_id}/listItems/{item_id}   — Updates a Product Option List Option Value
  POST   /rest/v2/products   — Create a Product
  POST   /rest/v2/products/{product_id}/images   — Create the Product Image
  POST   /rest/v2/products/{product_id}/options   — Create a Product Option
  POST   /rest/v2/products/{product_id}/options/{product_option_id}/listItems   — Add a Product Option List Option Value
  POST   /rest/v2/products/{product_id}:adjustInventory   — Adjust Inventory of a Product

## [PARTIAL] Settings  (3 ops)
  GET    /rest/v2/settings/applications:getConfiguration   — Get Application Configuration
  GET    /rest/v2/settings/applications:isEnabled   — Get Application Status
  GET    /rest/v2/settings/contactOptionTypes   — Get Contact Option types

## [PARTIAL] Subscriptions  (15 ops)
  DELETE /rest/v2/subscriptions/model/customFields/groups/{group_id}   — Delete a Subscription Custom Field Group
  DELETE /rest/v2/subscriptions/model/customFields/{custom_field_id}   — Delete a Subscription Custom Field
  GET    /rest/v2/subscriptions   — List Subscriptions
  GET    /rest/v2/subscriptions/model   — Retrieve Subscription Custom Field Model
  GET    /rest/v2/subscriptions/model/customFields/groups   — List Subscription Custom Field Groups
  GET    /rest/v2/subscriptions/model/customFields/groups/{group_id}   — Retrieve a Subscription Custom Field Group
  GET    /rest/v2/subscriptions/{subscription_id}   — Retrieve a Subscription
  PATCH  /rest/v2/subscriptions/model/customFields/groups/{group_id}   — Update a Subscription Custom Field Group
  PATCH  /rest/v2/subscriptions/model/customFields/{custom_field_id}   — Update a Subscription Custom Field
  PATCH  /rest/v2/subscriptions/{subscription_id}   — Update a Subscription
  POST   /rest/v2/subscriptions   — Create Subscription
  POST   /rest/v2/subscriptions/model/customFields   — Create a Subscription Custom Field
  POST   /rest/v2/subscriptions/model/customFields/groups   — Create a Subscription Custom Field Group
  POST   /rest/v2/subscriptions/{subscription_id}:deactivate   — Cancel Subscription
  POST   /rest/v2/subscriptions/{subscription_id}:invoice   — Invoice a Subscription

## [PARTIAL] Tags  (14 ops)
  DELETE /rest/v2/tags/categories/{tag_category_id}   — Delete Tag Category
  DELETE /rest/v2/tags/{tag_id}   — Delete Tag
  GET    /rest/v2/tags   — List Tags
  GET    /rest/v2/tags/categories   — List Tag Categories
  GET    /rest/v2/tags/categories/{tag_category_id}   — Retrieve a Tag Category
  GET    /rest/v2/tags/{tag_id}   — Retrieve a Tag
  GET    /rest/v2/tags/{tag_id}/companies   — List Tagged Companies
  GET    /rest/v2/tags/{tag_id}/contacts   — List Tagged Contacts
  PATCH  /rest/v2/tags/categories/{tag_category_id}   — Update a Tag Category
  PATCH  /rest/v2/tags/{tag_id}   — Update a Tag
  POST   /rest/v2/tags   — Create Tag
  POST   /rest/v2/tags/categories   — Create Tag Category
  POST   /rest/v2/tags/{tag_id}/contacts:applyTags   — Apply Tag
  POST   /rest/v2/tags/{tag_id}/contacts:removeTags   — Remove Tags

## [PARTIAL] Task  (14 ops)
  DELETE /rest/v2/tasks/model/customFields/groups/{group_id}   — Delete a Task Custom Field Group
  DELETE /rest/v2/tasks/model/customFields/{custom_field_id}   — Delete a Custom Field
  DELETE /rest/v2/tasks/{task_id}   — Delete a Task
  GET    /rest/v2/tasks   — List Tasks
  GET    /rest/v2/tasks/model   — Retrieve Task Model
  GET    /rest/v2/tasks/model/customFields/groups   — List Task Custom Field Groups
  GET    /rest/v2/tasks/model/customFields/groups/{group_id}   — Retrieve a Task Custom Field Group
  GET    /rest/v2/tasks/{task_id}   — Retrieve a Task
  PATCH  /rest/v2/tasks/model/customFields/groups/{group_id}   — Update a Task Custom Field Group
  PATCH  /rest/v2/tasks/model/customFields/{custom_field_id}   — Update a Task's Custom Field
  PATCH  /rest/v2/tasks/{task_id}   — Update a Task
  POST   /rest/v2/tasks   — Create a Task
  POST   /rest/v2/tasks/model/customFields   — Create a Custom Field
  POST   /rest/v2/tasks/model/customFields/groups   — Create a Task Custom Field Group

## [PARTIAL] Users  (5 ops)
  GET    /rest/v2/oauth/connect/userinfo   — Retrieve User Info
  GET    /rest/v2/users   — List Users
  GET    /rest/v2/users/{user_id}   — Get User
  GET    /rest/v2/users/{user_id}/signature   — Get User email signature
  PATCH  /rest/v2/users/{user_id}   — Update User

## [MISSING] Automation  (9 ops)
  DELETE /rest/v2/automations   — Delete an Automation
  GET    /rest/v2/automations   — List Automations
  GET    /rest/v2/automations/ids   — List Automations Ids
  GET    /rest/v2/automations/{automation_id}   — Retrieve an Automation
  POST   /rest/v2/automations/batch-unpublish   — Bulk unpublish Automations
  POST   /rest/v2/automations/categories/batchAssign   — Bulk update for Automations Categories
  POST   /rest/v2/automations/goals/achieve   — Achieve an Automation Goal
  POST   /rest/v2/automations/{automation_id}/sequences/{sequence_id}:addContacts   — Add Contacts to an Automation Sequence
  PUT    /rest/v2/automations/{automation_id}/unpublish   — Unpublish an Automation

## [MISSING] AutomationCategory  (4 ops)
  DELETE /rest/v2/automationCategory   — Delete automation category
  GET    /rest/v2/automationCategory   — List automation categories
  PATCH  /rest/v2/automationCategory/{id}   — Update automation category
  POST   /rest/v2/automationCategory   — Create automation category

## [MISSING] Business Profile  (2 ops)
  GET    /rest/v2/businessProfile   — Retrieve Business Profile
  PATCH  /rest/v2/businessProfile   — Update Business Profile

## [MISSING] Category Discounts  (5 ops)
  DELETE /rest/v2/discounts/productCategories/{discount_id}   — Delete a Category Discount
  GET    /rest/v2/discounts/productCategories   — List Category Discounts
  GET    /rest/v2/discounts/productCategories/{discount_id}   — Retrieve a Category Discount
  PATCH  /rest/v2/discounts/productCategories/{discount_id}   — Update a Category Discount
  POST   /rest/v2/discounts/productCategories   — Create a Category Discount

## [MISSING] Email Address  (2 ops)
  GET    /rest/v2/emailAddresses/{email}/status   — Retrieve an Email Address status
  PATCH  /rest/v2/emailAddresses/{email}/status   — Update an Email Address opt-in status

## [MISSING] Free Trial Discounts  (5 ops)
  DELETE /rest/v2/discounts/freeTrials/{discount_id}   — Delete a Subscription Free Trial Discount
  GET    /rest/v2/discounts/freeTrials   — List all Subscription Free Trial Discounts
  GET    /rest/v2/discounts/freeTrials/{discount_id}   — Retrieve a Subscription Free Trial Discount
  PATCH  /rest/v2/discounts/freeTrials/{discount_id}   — Update a Subscription Free Trial Discount
  POST   /rest/v2/discounts/freeTrials   — Create a Subscription Free Trial Discount

## [MISSING] Integrations  (4 ops)
  DELETE /rest/v2/integrations/wordpress/options/{option_key}   — Delete a WordPress Opt-In Option
  GET    /rest/v2/integrations/wordpress/options   — List WordPress Opt-In Options
  POST   /rest/v2/integrations/wordpress/options   — Add a WordPress Opt-In Option
  POST   /rest/v2/integrations/wordpress/options/{option_key}:achieve   — Achieve a WordPress Opt-In Goal

## [MISSING] Lead Source Categories  (5 ops)
  DELETE /rest/v2/leadSourceCategories/{lead_source_category_id}   — Delete a Lead Source Category
  GET    /rest/v2/leadSourceCategories   — List Lead Source Categories
  GET    /rest/v2/leadSourceCategories/{lead_source_category_id}   — Retrieve a Lead Source Category
  PATCH  /rest/v2/leadSourceCategories/{lead_source_category_id}   — Update a Lead Source Category
  POST   /rest/v2/leadSourceCategories   — Create a Lead Source Category

## [MISSING] Lead Source Expenses  (5 ops)
  DELETE /rest/v2/leadSources/{lead_source_id}/expenses/{lead_source_expense_id}   — Delete a lead source expense
  GET    /rest/v2/leadSources/{lead_source_id}/expenses   — List Lead Source Expenses
  GET    /rest/v2/leadSources/{lead_source_id}/expenses/{lead_source_expense_id}   — Retrieve a Lead Source Expense
  PATCH  /rest/v2/leadSources/{lead_source_id}/expenses/{lead_source_expense_id}   — Update a Lead Source Expense
  POST   /rest/v2/leadSources/{lead_source_id}/expenses   — Create a Lead Source Expense

## [MISSING] Lead Source Recurring Expenses  (6 ops)
  DELETE /rest/v2/leadSources/{lead_source_id}/recurringExpenses/{lead_source_recurring_expense_id}   — Delete a Lead Source Recurring Expense
  GET    /rest/v2/leadSources/{lead_source_id}/recurringExpenses   — Retrieves a list of lead source recurring expenses
  GET    /rest/v2/leadSources/{lead_source_id}/recurringExpenses/{lead_source_recurring_expense_id}   — Retrieve a Lead Source Recurring Expense
  GET    /rest/v2/leadSources/{lead_source_id}/recurringExpenses/{lead_source_recurring_expense_id}/expenses   — Retrieves a list of expenses incurred from a recurring expense
  PATCH  /rest/v2/leadSources/{lead_source_id}/recurringExpenses/{lead_source_recurring_expense_id}   — Update a Lead Source Recurring Expense
  POST   /rest/v2/leadSources/{lead_source_id}/recurringExpenses   — Create a Lead Source Recurring Expense

## [MISSING] Lead Sources  (5 ops)
  DELETE /rest/v2/leadSources/{lead_source_id}   — Delete a Lead Source
  GET    /rest/v2/leadSources   — List Lead Sources
  GET    /rest/v2/leadSources/{lead_source_id}   — Retrieve a Lead Source
  PATCH  /rest/v2/leadSources/{lead_source_id}   — Update a Lead Source
  POST   /rest/v2/leadSources   — Create a Lead Source

## [MISSING] LeadScore  (1 ops)
  GET    /rest/v2/contacts/{contact_id}/leadScore   — Retrieve Lead Score of a Contact

## [MISSING] Locale  (4 ops)
  GET    /rest/v2/locales/countries   — List Countries
  GET    /rest/v2/locales/countries/{country_code}   — Get Country
  GET    /rest/v2/locales/countries/{country_code}/provinces   — List a Country's Provinces
  GET    /rest/v2/locales/countries/{country_code}/provinces/{province_code}   — Get Province

## [MISSING] Merchants  (1 ops)
  GET    /rest/v2/merchants   — List Merchant accounts

## [MISSING] Order Total Discounts  (5 ops)
  DELETE /rest/v2/discounts/orderTotals/{discount_id}   — Delete an Order Total Discount
  GET    /rest/v2/discounts/orderTotals   — List all Order Total Discounts
  GET    /rest/v2/discounts/orderTotals/{discount_id}   — Retrieve an Order Total Discount
  PATCH  /rest/v2/discounts/orderTotals/{discount_id}   — Update an Order Total Discount
  POST   /rest/v2/discounts/orderTotals   — Create an Order Total Discount

## [MISSING] Payment Method Configs  (1 ops)
  POST   /rest/v2/paymentMethodConfigs   — Create Payment Method Configuration

## [MISSING] Payment Methods  (4 ops)
  DELETE /rest/v2/contacts/{contact_id}/paymentMethods/{payment_method_id}   — Delete a Contact Payment Method
  GET    /rest/v2/contacts/{contact_id}/paymentMethods   — List of Contact Payment Methods
  GET    /rest/v2/paymentMethods   — List of Payment Methods
  POST   /rest/v2/contacts/{contact_id}/paymentMethods/{payment_method_id}:deactivate   — Deactivate a Contact Payment Method

## [MISSING] Product Categories  (9 ops)
  DELETE /rest/v2/productCategories/{category_id}   — Delete a Product Category
  DELETE /rest/v2/productCategories/{category_id}/images   — Delete the image from a product category
  GET    /rest/v2/productCategories   — List all Product Categories
  GET    /rest/v2/productCategories/assignedProducts   — List Assigned Products to Categories
  GET    /rest/v2/productCategories/{category_id}   — Get a Product Category
  PATCH  /rest/v2/productCategories/{category_id}   — Update a Product Category
  POST   /rest/v2/productCategories   — Create a Product Category
  POST   /rest/v2/productCategories/{category_id}/images   — Create the product category image file
  POST   /rest/v2/productCategories/{category_id}:assignProducts   — Assign Products to a Product Category

## [MISSING] Product Discounts  (7 ops)
  DELETE /rest/v2/discounts/products/{discount_id}   — Delete a Product Discount
  DELETE /rest/v2/discounts/products/{discount_id}/criteria/{criteria_id}   — Delete a Product Discount Criteria
  GET    /rest/v2/discounts/products   — List all Product Discounts
  GET    /rest/v2/discounts/products/{discount_id}   — Retrieve a Product Discount
  PATCH  /rest/v2/discounts/products/{discount_id}   — Update a Product Discount
  POST   /rest/v2/discounts/products   — Create a Product Discount
  POST   /rest/v2/discounts/products/{discount_id}/criteria   — Create a Product Discount Criteria

## [MISSING] Product Interest Bundles  (8 ops)
  DELETE /rest/v2/productInterestBundles/{id}   — Delete a Product Interest Bundle
  DELETE /rest/v2/productInterestBundles/{id}/interests/{interest_id}   — Delete a Product Interest from an existing Bundle
  GET    /rest/v2/productInterestBundles   — List Product Interest Bundles
  GET    /rest/v2/productInterestBundles/{id}   — Get a Product Interest Bundle
  PATCH  /rest/v2/productInterestBundles/{id}   — Update a Product Interest Bundle
  PATCH  /rest/v2/productInterestBundles/{id}/interests/{interest_id}   — Update a Product Interest in an existing Bundle
  POST   /rest/v2/productInterestBundles   — Create a Product Interest Bundle
  POST   /rest/v2/productInterestBundles/{id}/interests   — Create a Product Interest in an existing Bundle

## [MISSING] Referral  (2 ops)
  GET    /rest/v2/referrals   — List Referrals
  POST   /rest/v2/referrals   — Create a Referral

## [MISSING] Reporting  (3 ops)
  GET    /rest/v2/reporting/reports   — List Reports
  GET    /rest/v2/reporting/reports/{report_id}   — Retrieve Report
  POST   /rest/v2/reporting/reports/{report_id}:run   — Run a Report

## [MISSING] Sales  (3 ops)
  GET    /rest/v2/sales/payments   — List Payments
  GET    /rest/v2/sales/transactions   — List Transactions
  POST   /rest/v2/sales/merchants/{id}:setDefault   — Set default Merchant Account

## [MISSING] Shipping  (1 ops)
  GET    /rest/v2/shipping   — List Shipping methods

## [MISSING] Shipping Discounts  (5 ops)
  DELETE /rest/v2/discounts/shipping/{discount_id}   — Delete a Shipping Discount
  GET    /rest/v2/discounts/shipping   — List all Shipping Discounts
  GET    /rest/v2/discounts/shipping/{discount_id}   — Retrieve a Shipping Discount
  PATCH  /rest/v2/discounts/shipping/{discount_id}   — Update a Shipping Discount
  POST   /rest/v2/discounts/shipping   — Create a Shipping Discount

## [MISSING] Subscription Plans  (5 ops)
  DELETE /rest/v2/products/{product_id}/subscriptions/{subscription_plan_id}   — Delete Subscription Plan
  GET    /rest/v2/products/{product_id}/subscriptions   — List Subscription Plans
  GET    /rest/v2/products/{product_id}/subscriptions/{subscription_plan_id}   — Get Subscription Plan
  PATCH  /rest/v2/products/{product_id}/subscriptions/{subscription_plan_id}   — Update Subscription Plan
  POST   /rest/v2/products/{product_id}/subscriptions   — Create Subscription Plan

## [MISSING] User Groups  (2 ops)
  GET    /rest/v2/userGroups   — List User Groups
  GET    /rest/v2/userGroups/{user_group_id}   — Retrieve a User Group

## [MISSING] Webforms  (2 ops)
  GET    /rest/v2/webforms   — List Webforms with filter
  GET    /rest/v2/webforms/{webform_id}:data   — Get Webform HTML