import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerPlugins } from './plugins/index.js';
import { userRoutes } from './routes/users.js';
import { productRoutes } from './routes/products.js';
import { webhookRoutes } from './routes/webhooks.js';
import { errorRoutes } from './routes/errors.js';
import { helloRoutes } from './routes/hello.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: { colorize: true }
    }
  }
});

// Serve static files from public directory
await server.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
  prefix: '/'
});

// Register all @fracabu plugins
await registerPlugins(server);

// Register demo routes
await server.register(userRoutes, { prefix: '/api/users' });
await server.register(productRoutes, { prefix: '/api/products' });
await server.register(webhookRoutes, { prefix: '/api/webhooks' });
await server.register(errorRoutes, { prefix: '/api/errors' });
await server.register(helloRoutes, { prefix: '/api/hello' });

// Health check
server.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

// API documentation endpoint (UI is served at root via static files)
server.get('/api', async () => ({
  name: 'Fastify Plugins Demo',
  description: 'Demo project showcasing 7 production-ready Fastify plugins by @fracabu',
  ui: 'http://localhost:3000/',
  plugins: [
    { name: '@fracabu/fastify-api-key', demo: '/api/users' },
    { name: 'fastify-cache-control', demo: '/api/products' },
    { name: 'fastify-webhook-verify', demo: '/api/webhooks' },
    { name: 'fastify-rfc9457', demo: '/api/errors' },
    { name: 'fastify-i18n-plugin', demo: '/api/hello' }
  ],
  devTools: [
    { name: '@fracabu/env-checkup', usage: 'npm run env:check' },
    { name: 'node-test-expect', usage: 'npm test' }
  ],
  author: 'Francesco Capurso (@fracabu)',
  github: 'https://github.com/fracabu'
}));

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3000');
    const host = process.env.HOST || '0.0.0.0';

    await server.listen({ port, host });
    console.log(`
    ╔═══════════════════════════════════════════════════════════╗
    ║           Fastify Plugins Demo by @fracabu                ║
    ╠═══════════════════════════════════════════════════════════╣
    ║  Server running at http://${host}:${port}                    ║
    ║                                                           ║
    ║  UI:  http://localhost:${port}/                              ║
    ║                                                           ║
    ║  API Endpoints:                                           ║
    ║  GET  /api                 → API docs (JSON)              ║
    ║  GET  /health              → Health check                 ║
    ║  GET  /api/users           → API Key auth demo            ║
    ║  GET  /api/products        → Cache-Control demo           ║
    ║  POST /api/webhooks/:provider → Webhook verify demo       ║
    ║  GET  /api/errors/:type    → RFC 9457 errors demo         ║
    ║  GET  /api/hello           → i18n demo                    ║
    ╚═══════════════════════════════════════════════════════════╝
    `);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
