import { FastifyInstance } from 'fastify';
import fastifyApiKey from '@fracabu/fastify-api-key';
import fastifyCacheControl from 'fastify-cache-control';
import fastifyRfc9457 from 'fastify-rfc9457';
import fastifyWebhookVerify from 'fastify-webhook-verify';
// @ts-ignore - no type declarations available
import fastifyI18n from 'fastify-i18n-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function registerPlugins(server: FastifyInstance) {

  // 1. @fracabu/fastify-api-key - API Key Authentication
  const apiKeys: Record<string, { scopes: string[] }> = {
    [process.env.API_KEY_MASTER || 'demo-master-key-12345']: { scopes: ['read', 'write', 'admin'] },
    [process.env.API_KEY_READ_ONLY || 'demo-readonly-key-67890']: { scopes: ['read'] }
  };

  await server.register(fastifyApiKey as any, {
    validate: async (key: string) => {
      const apiKey = apiKeys[key];
      if (!apiKey) return { valid: false };
      return { valid: true, scopes: apiKey.scopes };
    },
    extractFrom: ['header:x-api-key', 'query:api_key']
  });
  server.log.info('Plugin loaded: @fracabu/fastify-api-key');

  // 2. fastify-cache-control - HTTP Cache Headers
  await server.register(fastifyCacheControl, {
    privacy: 'public',
    maxAge: 3600,
    staleWhileRevalidate: 60
  });
  server.log.info('Plugin loaded: fastify-cache-control');

  // 3. fastify-rfc9457 - Problem Details for HTTP APIs
  await server.register(fastifyRfc9457, {
    baseUrl: 'https://api.example.com/errors'
  });
  server.log.info('Plugin loaded: fastify-rfc9457');

  // 4. fastify-webhook-verify - Webhook Signature Verification
  await server.register(fastifyWebhookVerify, {
    providers: {
      github: process.env.WEBHOOK_SECRET_GITHUB || 'whsec_test_github_secret',
      stripe: process.env.WEBHOOK_SECRET_STRIPE || 'whsec_test_stripe_secret'
    }
  });
  server.log.info('Plugin loaded: fastify-webhook-verify');

  // 5. fastify-i18n-plugin - Internationalization
  await server.register(fastifyI18n, {
    translationsPath: path.join(__dirname, '../locales')
  });
  server.log.info('Plugin loaded: fastify-i18n-plugin');

  server.log.info('All @fracabu plugins registered successfully!');
}
