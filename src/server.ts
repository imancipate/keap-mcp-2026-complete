import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from './clients/keap.js';
// Single source of truth for tool registry + routing — shared with the Cloudflare
// Worker (src/worker.ts). server.ts no longer duplicates a per-domain router; it
// delegates to dispatchTool so all transports behave identically (incl. v2 tools).
import { getAllTools, dispatchTool } from './register.js';

export class KeapServer {
  private server: Server;
  private client: KeapClient;
  private allTools: Tool[] = [];

  constructor() {
    this.server = new Server(
      {
        name: 'keap-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize Keap client
    this.client = new KeapClient();

    // Register all tools
    this.registerTools();

    // Set up request handlers
    this.setupHandlers();

    // Error handling
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private bulkDeleteEnabled = process.env.KEAP_BULK_DELETE_ENABLED === 'true';
  private confirmToken = process.env.KEAP_BULK_DELETE_CONFIRM; // CR-003/FR-017

  private registerTools(): void {
    // CR-002/BUG-005: destructive bulk-delete opt-in via env (default off).
    this.allTools = getAllTools(this.client, { bulkDeleteEnabled: this.bulkDeleteEnabled });
    console.error(`[Keap MCP] Registered ${this.allTools.length} tools`);
  }

  private setupHandlers(): void {
    // Handle list_tools request
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: this.allTools,
    }));

    // Handle call_tool request — delegate to the shared dispatcher (which owns
    // routing + its own error envelope).
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      return dispatchTool(name, args, this.client, { bulkDeleteEnabled: this.bulkDeleteEnabled, confirmToken: this.confirmToken });
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('[Keap MCP] Server running on stdio');
  }
}
