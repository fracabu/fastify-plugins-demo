import { FastifyInstance } from 'fastify';

/**
 * Demo: fastify-webhook-verify
 * Shows webhook signature verification
 */
export async function webhookRoutes(server: FastifyInstance) {

  // GitHub webhook endpoint
  server.post('/github', {
    preHandler: server.webhookVerify({ provider: 'github' })
  }, async (request: any) => ({
    message: 'GitHub webhook verified successfully!',
    plugin: 'fastify-webhook-verify',
    provider: 'github',
    event: request.headers['x-github-event'],
    webhook: request.webhook,
    payload: request.body
  }));

  // Stripe webhook endpoint
  server.post('/stripe', {
    preHandler: server.webhookVerify({ provider: 'stripe' })
  }, async (request: any) => ({
    message: 'Stripe webhook verified successfully!',
    plugin: 'fastify-webhook-verify',
    provider: 'stripe',
    webhook: request.webhook,
    payload: request.body
  }));

  // Generic test endpoint (no verification)
  server.post('/test', async (request) => ({
    message: 'Test webhook received (no signature verification)',
    plugin: 'fastify-webhook-verify',
    receivedAt: new Date().toISOString(),
    payload: request.body
  }));

  // Usage instructions
  server.get('/help', async () => ({
    plugin: 'fastify-webhook-verify',
    description: 'Multi-provider webhook signature verification',
    features: [
      'GitHub signature verification (x-hub-signature-256)',
      'Stripe signature verification (stripe-signature)',
      'Replay attack protection',
      'Custom provider support'
    ],
    endpoints: [
      'POST /api/webhooks/github - Verifies GitHub signature',
      'POST /api/webhooks/stripe - Verifies Stripe signature',
      'POST /api/webhooks/test - No verification (testing)'
    ],
    testExample: {
      curl: `curl -X POST http://localhost:3000/api/webhooks/test -H "Content-Type: application/json" -d '{"event":"test"}'`
    }
  }));
}
