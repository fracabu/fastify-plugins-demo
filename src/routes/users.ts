import { FastifyInstance } from 'fastify';

/**
 * Demo: @fracabu/fastify-api-key
 * Shows API Key authentication with scopes
 */
export async function userRoutes(server: FastifyInstance) {

  // Public endpoint - no auth required
  server.get('/public', async () => ({
    message: 'This is a public endpoint - no API key required',
    plugin: '@fracabu/fastify-api-key'
  }));

  // Protected endpoint - requires valid API key
  server.get('/', {
    preHandler: server.apiKey()
  }, async (request: any) => ({
    message: 'Authenticated! You have access to user data.',
    plugin: '@fracabu/fastify-api-key',
    apiKey: {
      scopes: request.apiKeyData?.scopes
    },
    users: [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' }
    ]
  }));

  // Scoped endpoint - requires 'admin' scope
  server.get('/admin', {
    preHandler: server.apiKey({ scopes: ['admin'] })
  }, async (request: any) => ({
    message: 'Admin access granted!',
    plugin: '@fracabu/fastify-api-key',
    feature: 'Scope-based authorization',
    apiKey: request.apiKeyData
  }));

  // Usage instructions
  server.get('/help', async () => ({
    plugin: '@fracabu/fastify-api-key',
    description: 'Complete API Key authentication with scopes',
    usage: {
      header: 'x-api-key: your-api-key',
      query: '?api_key=your-api-key'
    },
    testKeys: {
      master: 'demo-master-key-12345 (scopes: read, write, admin)',
      readOnly: 'demo-readonly-key-67890 (scopes: read)'
    },
    endpoints: [
      'GET /api/users/public - No auth required',
      'GET /api/users - Requires valid API key',
      'GET /api/users/admin - Requires admin scope'
    ]
  }));
}
