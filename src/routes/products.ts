import { FastifyInstance } from 'fastify';

/**
 * Demo: fastify-cache-control
 * Shows HTTP Cache-Control header management
 */
export async function productRoutes(server: FastifyInstance) {

  const products = [
    { id: 1, name: 'Laptop', price: 999, category: 'electronics' },
    { id: 2, name: 'Headphones', price: 199, category: 'electronics' },
    { id: 3, name: 'Coffee Mug', price: 15, category: 'home' }
  ];

  // Default caching (uses plugin defaults)
  server.get('/', async (request, reply: any) => {
    reply.cacheControl({ maxAge: 3600, privacy: 'public' });
    return {
      message: 'Product list with 1 hour cache',
      plugin: 'fastify-cache-control',
      cacheHeader: 'public, max-age=3600',
      products
    };
  });

  // No cache - dynamic content
  server.get('/live', async (request, reply: any) => {
    reply.cacheControl({ privacy: 'no-store' });
    return {
      message: 'Live data - no caching',
      plugin: 'fastify-cache-control',
      cacheHeader: 'no-store',
      timestamp: new Date().toISOString(),
      products
    };
  });

  // Stale-while-revalidate pattern
  server.get('/swr', async (request, reply: any) => {
    reply.cacheControl({
      maxAge: 60,
      staleWhileRevalidate: 300,
      privacy: 'public'
    });
    return {
      message: 'SWR pattern: serve stale content while revalidating',
      plugin: 'fastify-cache-control',
      cacheHeader: 'public, max-age=60, stale-while-revalidate=300',
      products
    };
  });

  // CDN-optimized caching
  server.get('/cdn', async (request, reply: any) => {
    reply.cacheControl({
      maxAge: 300,
      sMaxage: 86400, // CDN caches for 1 day
      privacy: 'public'
    });
    return {
      message: 'CDN-optimized: browser 5min, CDN 1 day',
      plugin: 'fastify-cache-control',
      cacheHeader: 'public, max-age=300, s-maxage=86400',
      products
    };
  });

  // Usage instructions
  server.get('/help', async () => ({
    plugin: 'fastify-cache-control',
    description: 'Declarative HTTP Cache-Control headers for Fastify',
    features: [
      'Declarative cache headers',
      'CDN support (s-maxage)',
      'Stale-while-revalidate',
      'Pattern matching for routes'
    ],
    endpoints: [
      'GET /api/products - Default caching (1 hour)',
      'GET /api/products/live - No cache (dynamic)',
      'GET /api/products/swr - Stale-while-revalidate',
      'GET /api/products/cdn - CDN optimized'
    ]
  }));
}
