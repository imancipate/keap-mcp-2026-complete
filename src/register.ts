// Shared tool registry + dispatcher.
// Transport-agnostic: used by both the stdio server (src/server.ts) and the
// Cloudflare Worker (src/worker.ts). Keeps the routing logic in one place.
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from './clients/keap.js';

import { createContactsTools, handleContactsTool } from './tools/contacts-tools.js';
import { createCompaniesTools, handleCompaniesTool } from './tools/companies-tools.js';
import { createOpportunitiesTools, handleOpportunitiesTool } from './tools/opportunities-tools.js';
import { createTasksTools, handleTasksTool } from './tools/tasks-tools.js';
import { createAppointmentsTools, handleAppointmentsTool } from './tools/appointments-tools.js';
import { createCampaignsTools, handleCampaignsTool } from './tools/campaigns-tools.js';
import { createTagsTools, handleTagsTool } from './tools/tags-tools.js';
import { createNotesTools, handleNotesTool } from './tools/notes-tools.js';
import { createEmailsTools, handleEmailsTool } from './tools/emails-tools.js';
import { createFilesTools, handleFilesTool } from './tools/files-tools.js';
import { createEcommerceTools, handleEcommerceTool } from './tools/ecommerce-tools.js';
import { createAutomationsTools, handleAutomationsTool } from './tools/automations-tools.js';
import { createSettingsTools, handleSettingsTool } from './tools/settings-tools.js';
import { createAffiliatesTools, handleAffiliatesTool } from './tools/affiliates-tools.js';
import { createV2Tools, handleV2Tool } from './tools/v2-generated-tools.js';

export function getAllTools(client: KeapClient): Tool[] {
  return [
    ...createContactsTools(client),
    ...createCompaniesTools(client),
    ...createOpportunitiesTools(client),
    ...createTasksTools(client),
    ...createAppointmentsTools(client),
    ...createCampaignsTools(client),
    ...createTagsTools(client),
    ...createNotesTools(client),
    ...createEmailsTools(client),
    ...createFilesTools(client),
    ...createEcommerceTools(client),
    ...createAutomationsTools(client),
    ...createSettingsTools(client),
    ...createAffiliatesTools(client),
    ...createV2Tools(client),
  ];
}

// Routes a tool call to the correct domain handler by name prefix/substring.
// Mirrors the routing in src/server.ts exactly so both transports behave the same.
export async function dispatchTool(name: string, args: any, client: KeapClient): Promise<any> {
  try {
    // v2 generated tools route by exact-name map (deterministic — no substring collisions).
    if (name.startsWith('keap_v2_')) {
      return await handleV2Tool(name, args, client);
    }
    if (
      name.startsWith('keap_create_contact') ||
      name.startsWith('keap_get_contact') ||
      name.startsWith('keap_update_contact') ||
      name.startsWith('keap_delete_contact') ||
      name.startsWith('keap_list_contact') ||
      name.startsWith('keap_search_contact') ||
      name.startsWith('keap_merge_contact') ||
      name.startsWith('keap_apply_tag') ||
      name.startsWith('keap_remove_tag')
    ) {
      return await handleContactsTool(name, args, client);
    }
    if (name.startsWith('keap_') && name.includes('_compan')) return await handleCompaniesTool(name, args, client);
    if (name.startsWith('keap_') && name.includes('_opportunit')) return await handleOpportunitiesTool(name, args, client);
    if (name.startsWith('keap_') && name.includes('_task')) return await handleTasksTool(name, args, client);
    if (name.startsWith('keap_') && name.includes('_appointment')) return await handleAppointmentsTool(name, args, client);
    if (name.startsWith('keap_') && name.includes('_campaign')) return await handleCampaignsTool(name, args, client);
    if (name.startsWith('keap_') && name.includes('_tag')) return await handleTagsTool(name, args, client);
    if (name.startsWith('keap_') && name.includes('_note')) return await handleNotesTool(name, args, client);
    if (name.startsWith('keap_') && name.includes('_email')) return await handleEmailsTool(name, args, client);
    if (name.startsWith('keap_') && name.includes('_file')) return await handleFilesTool(name, args, client);
    if (
      name.startsWith('keap_') &&
      (name.includes('_product') || name.includes('_order') || name.includes('_transaction') || name.includes('_subscription'))
    ) {
      return await handleEcommerceTool(name, args, client);
    }
    if (name.startsWith('keap_') && (name.includes('_hook') || name.includes('_automation'))) return await handleAutomationsTool(name, args, client);
    if (
      name.startsWith('keap_') &&
      (name.includes('_account') || name.includes('_application') || name.includes('_user') || name.includes('_custom_field'))
    ) {
      return await handleSettingsTool(name, args, client);
    }
    if (name.startsWith('keap_') && (name.includes('_affiliate') || name.includes('_commission'))) return await handleAffiliatesTool(name, args, client);

    throw new Error(`Unknown tool: ${name}`);
  } catch (error: any) {
    return {
      content: [{ type: 'text', text: `Error executing ${name}: ${error.message}` }],
      isError: true,
    };
  }
}
