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
import { createBulkTools, handleBulkTool } from './tools/bulk-tools.js';

// CR-002/BUG-005: the destructive bulk-delete tool is OPT-IN. It registers + dispatches
// only when explicitly enabled (env KEAP_BULK_DELETE_ENABLED=true), so existing OAuth
// clients do not silently inherit an irreversible delete primitive.
export function getAllTools(client: KeapClient, opts?: { bulkDeleteEnabled?: boolean }): Tool[] {
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
    ...(opts?.bulkDeleteEnabled ? createBulkTools(client) : []),
  ];
}

// Routes a tool call to the correct domain handler by name prefix/substring.
// Mirrors the routing in src/server.ts exactly so both transports behave the same.
export async function dispatchTool(
  name: string,
  args: any,
  client: KeapClient,
  // CR-001/BUG-001: optional cross-instance rate limiter (Durable Object-backed),
  // supplied by the Worker transport; stdio omits it and uses the process-global one.
  opts?: { acquire?: () => Promise<void>; bulkDeleteEnabled?: boolean; confirmToken?: string }
): Promise<any> {
  try {
    // Hand-written bulk helpers — exact-name match BEFORE the keap_v2_ prefix branch
    // (the name has no keap_v2_ prefix, but route explicitly so intent is unambiguous).
    if (name === 'keap_bulk_delete_contacts') {
      // CR-002/BUG-005: refuse the destructive tool unless explicitly enabled, even if
      // a client somehow learned the name while it was unregistered.
      if (!opts?.bulkDeleteEnabled) {
        throw new Error('keap_bulk_delete_contacts is disabled (set KEAP_BULK_DELETE_ENABLED=true to enable).');
      }
      // CR-003/FR-017: pass the server confirm token; the handler enforces the gate.
      return await handleBulkTool(name, args, client, opts?.acquire, opts?.confirmToken);
    }
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
