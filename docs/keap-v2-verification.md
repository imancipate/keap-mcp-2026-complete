# Keap v2 per-tool live verification (through keap.zeyadhq.workers.dev)

GET OK=44 ERROR=1 NO-DATA=5 | writes withheld=63

WRITE    PUT    keap_v2_unpublish_automation  
WRITE    POST   keap_v2_set_merchant_gateway_as_default  
WRITE    POST   keap_v2_run_report  
OK       GET    keap_v2_list_referrals  {   "referrals": [     {       "id": "2",       "descri
WRITE    POST   keap_v2_create_referral  
OK       GET    keap_v2_list_subscription_plans  {'product_id': '1410'} {   "subscriptions": [],   "next_page_token": "" }
WRITE    POST   keap_v2_create_subscription_plans  
OK       GET    keap_v2_list_product_interest_bundles  {   "product_interest_bundles": [     {       "id": "2"
WRITE    POST   keap_v2_create_product_interest_bundle  
WRITE    POST   keap_v2_add_product_interest  
OK       GET    keap_v2_list_product_categories  {   "product_categories": [     {       "id": "1",     
WRITE    POST   keap_v2_create_product_category  
WRITE    POST   keap_v2_assign_products_to_category  
WRITE    POST   keap_v2_create_image_file  
WRITE    DELETE keap_v2_delete_image_file  
WRITE    POST   keap_v2_create_payment_method_config  
OK       GET    keap_v2_list_lead_sources  {   "lead_sources": [     {       "id": "6",       "nam
WRITE    POST   keap_v2_create_lead_source  
OK       GET    keap_v2_list_lead_source_recurring_expenses  {'lead_source_id': '6'} {   "lead_source_recurring_expenses": [],   "next_page_
WRITE    POST   keap_v2_create_lead_source_recurring_expense  
OK       GET    keap_v2_list_lead_source_expenses  {'lead_source_id': '6'} {   "lead_source_expenses": [],   "next_page_token": ""
WRITE    POST   keap_v2_create_lead_source_expense  
OK       GET    keap_v2_list_lead_source_categories  {   "lead_source_categories": [     {       "id": "2", 
WRITE    POST   keap_v2_create_lead_source_category  
OK       GET    keap_v2_list_integrations_word_press_opt_in_options  {   "wordpress_opt_in_options": [],   "next_page_token"
WRITE    POST   keap_v2_add_integrations_word_press_opt_in  
WRITE    POST   keap_v2_achieve_integrations_word_press_opt_in_goal  
OK       GET    keap_v2_list_shipping_discounts  {   "discounts": [],   "next_page_token": "" }
WRITE    POST   keap_v2_create_shipping_discount  
OK       GET    keap_v2_list_product_discounts  {   "discounts": [     {       "id": "8",       "name":
WRITE    POST   keap_v2_create_product_discount  
WRITE    POST   keap_v2_create_product_discount_criteria  
OK       GET    keap_v2_list_category_discounts  {   "discounts": [     {       "id": "181",       "name
WRITE    POST   keap_v2_create_category_discount  
OK       GET    keap_v2_list_order_total_discounts  {   "discounts": [     {       "id": "4",       "name":
WRITE    POST   keap_v2_create_order_total_discount  
OK       GET    keap_v2_list_free_trial_discounts  {   "discounts": [     {       "id": "5",       "name":
WRITE    POST   keap_v2_create_free_trial_discount  
WRITE    POST   keap_v2_deactivate_payment_method  
WRITE    POST   keap_v2_add_contacts_to_automation_sequence  
WRITE    POST   keap_v2_achieve_goal  
WRITE    POST   keap_v2_bulk_assignment_automations_categories  
WRITE    POST   keap_v2_bulk_unpublish_automations  
OK       GET    keap_v2_list_categories  {   "automation_categories": [     {       "id": "44", 
WRITE    POST   keap_v2_create_category  
WRITE    DELETE keap_v2_delete_categories  
NO-DATA  GET    keap_v2_fetch_subscription_plan  no subscription_plan_id record exists to fetch
WRITE    DELETE keap_v2_delete_subscription_plan  
WRITE    PATCH  keap_v2_update_subscription_plan  
OK       GET    keap_v2_get_product_interest_bundle  {'id': '2'} {   "id": "2",   "name": "Coaching Consultation Bundle"
WRITE    DELETE keap_v2_delete_product_interest_bundle  
WRITE    PATCH  keap_v2_update_product_interest_bundle  
WRITE    DELETE keap_v2_remove_product_interest  
WRITE    PATCH  keap_v2_update_product_interest  
OK       GET    keap_v2_get_product_category  {'category_id': '1'} {   "id": "1",   "name": "Freedom Blueprint",   "displa
WRITE    DELETE keap_v2_delete_product_category  
WRITE    PATCH  keap_v2_update_product_category  
OK       GET    keap_v2_get_lead_source  {'lead_source_id': '6'} {   "id": "6",   "name": "Advertisement",   "descriptio
WRITE    DELETE keap_v2_delete_lead_source  
WRITE    PATCH  keap_v2_update_lead_source  
NO-DATA  GET    keap_v2_get_lead_source_recurring_expense  no lead_source_recurring_expense_id record exists to fetch
WRITE    DELETE keap_v2_delete_lead_source_recurring_expense  
WRITE    PATCH  keap_v2_update_lead_source_recurring_expense  
NO-DATA  GET    keap_v2_get_lead_source_expense  no lead_source_expense_id record exists to fetch
WRITE    DELETE keap_v2_delete_lead_source_expense  
WRITE    PATCH  keap_v2_update_lead_source_expense  
OK       GET    keap_v2_get_lead_source_category  {'lead_source_category_id': '2'} {   "id": "2",   "name": "Referral",   "description": "
WRITE    DELETE keap_v2_delete_lead_source_category  
WRITE    PATCH  keap_v2_update_lead_source_category  
NO-DATA  GET    keap_v2_get_shipping_discount  no discount_id record exists to fetch
WRITE    DELETE keap_v2_delete_shipping_discount  
WRITE    PATCH  keap_v2_update_shipping_discount  
OK       GET    keap_v2_get_product_discount  {'discount_id': '8'} {   "id": "8",   "name": "Wives of Jannah - November Pr
WRITE    DELETE keap_v2_delete_product_discount  
WRITE    PATCH  keap_v2_update_product_discount  
OK       GET    keap_v2_get_category_discount  {'discount_id': '181'} {   "id": "181",   "name": "BeingMe",   "description": 
WRITE    DELETE keap_v2_delete_category_discount  
WRITE    PATCH  keap_v2_update_category_discount  
OK       GET    keap_v2_get_order_total_discount  {'discount_id': '4'} {   "id": "4",   "name": "sharon",   "description": "",
WRITE    DELETE keap_v2_delete_order_total_discount  
WRITE    PATCH  keap_v2_update_order_total_discount  
OK       GET    keap_v2_get_free_trial_discount  {'discount_id': '5'} {   "id": "5",   "name": "ITFC-297-FreeTrial",   "descr
WRITE    DELETE keap_v2_delete_free_trial_discount  
WRITE    PATCH  keap_v2_update_free_trial_discount  
OK       GET    keap_v2_get_business_profile  {   "name": "Imancipate LLC",   "email": "zeyad@purifyy
WRITE    PATCH  keap_v2_update_business_profile  
WRITE    PATCH  keap_v2_patch_category  
OK       GET    keap_v2_list_webforms  {   "webforms": [     {       "id": "6",       "xid": "
OK       GET    keap_v2_get_html  {'webform_id': '6'} "<form action=\"https://imancipate.infusionsoft.com/Add
OK       GET    keap_v2_list_user_groups  {   "user_groups": [     {       "id": "5",       "name
OK       GET    keap_v2_get_user_group  {'user_group_id': '5'} {   "id": "5",   "name": "Accounting" }
OK       GET    keap_v2_list_shipping_methods  {   "shipping_methods": [     {       "id": "2",       
OK       GET    keap_v2_list_transactions  {   "transactions": [     {       "amount": 107,       
OK       GET    keap_v2_list_payments  {   "payments": [     {       "id": "2",       "type": 
OK       GET    keap_v2_list_reports  {   "reports": [     {       "id": "120",       "name":
OK       GET    keap_v2_retrieve_report  {'report_id': '120'} {   "id": "120",   "name": "Import - 4/27/2011 9:18 PM"
OK       GET    keap_v2_list_assigned_products  {   "assigned_product_categories": [     {       "produ
OK       GET    keap_v2_list_payment_methods  {   "payment_methods": [     {       "contact_id": "323
ERROR    GET    keap_v2_list_merchants  Error executing keap_v2_list_merchants: Request failed 
OK       GET    keap_v2_list_countries  {   "countries": [     {       "codes": {         "alph
OK       GET    keap_v2_get_country_by_code  {'country_code': 'US'} {   "codes": {     "alpha2": "US",     "alpha3": "USA" 
OK       GET    keap_v2_list_provinces_for_country  {'country_code': 'US'} {   "provinces": [     {       "code": "US-AL",       "
OK       GET    keap_v2_get_province_by_code  {'country_code': 'US', 'province_code': 'US-AL'} {   "code": "US-AL",   "name": "Alabama",   "country": 
NO-DATA  GET    keap_v2_list_expenses_incurred_from_lead_source_recurring_expense  no lead_source_recurring_expense_id record exists to fetch
OK       GET    keap_v2_list_payment_methods_get  {'contact_id': '6'} {   "records": [     {       "contact_id": "6",       "
OK       GET    keap_v2_get_lead_score_details  {'contact_id': '6'} {   "score": "5",   "last_updated": "2020-09-11T16:02:1
OK       GET    keap_v2_list_automations  {   "automations": [     {       "id": "13654",       "
WRITE    DELETE keap_v2_delete_automation  
OK       GET    keap_v2_get_automation  {'automation_id': '13654'} {   "id": "13654",   "title": "12 Week Program: Trainin
OK       GET    keap_v2_list_all_automation_ids  {   "automation_ids": [     "92",     "138",     "140",
WRITE    DELETE keap_v2_delete_integrations_word_press_opt_in  
WRITE    DELETE keap_v2_delete_product_discount_criteria  
WRITE    DELETE keap_v2_delete_payment_method  