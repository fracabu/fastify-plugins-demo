import { describe, it, before, after } from 'node:test';
import { expect } from 'node-test-expect';

/**
 * Demo: node-test-expect
 * Jest-like assertions for Node.js native test runner
 */

describe('Fastify Plugins Demo - API Tests', () => {
  const baseUrl = 'http://localhost:3000';

  describe('Health Check', () => {
    it('should return ok status', async () => {
      const res = await fetch(`${baseUrl}/health`);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.status).toBe('ok');
      expect(data).toHaveProperty('timestamp');
    });
  });

  describe('@fracabu/fastify-api-key', () => {
    it('should allow access to public endpoint without key', async () => {
      const res = await fetch(`${baseUrl}/api/users/public`);
      expect(res.status).toBe(200);
    });

    it('should reject protected endpoint without key', async () => {
      const res = await fetch(`${baseUrl}/api/users`);
      expect(res.status).toBe(401);
    });

    it('should allow access with valid API key', async () => {
      const res = await fetch(`${baseUrl}/api/users`, {
        headers: { 'x-api-key': 'demo-master-key-12345' }
      });
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.apiKey.scopes).toContain('admin');
    });

    it('should reject admin endpoint with read-only key', async () => {
      const res = await fetch(`${baseUrl}/api/users/admin`, {
        headers: { 'x-api-key': 'demo-readonly-key-67890' }
      });
      expect(res.status).toBe(403);
    });
  });

  describe('fastify-cache-control', () => {
    it('should set cache headers on products endpoint', async () => {
      const res = await fetch(`${baseUrl}/api/products`);
      const cacheHeader = res.headers.get('cache-control');

      expect(res.status).toBe(200);
      expect(cacheHeader).toContain('max-age=');
    });

    it('should set no-store on live endpoint', async () => {
      const res = await fetch(`${baseUrl}/api/products/live`);
      const cacheHeader = res.headers.get('cache-control');

      expect(cacheHeader).toContain('no-store');
    });
  });

  describe('fastify-rfc9457', () => {
    it('should return RFC 9457 problem details for errors', async () => {
      const res = await fetch(`${baseUrl}/api/errors/not-found`);
      const data = await res.json();

      expect(res.status).toBe(404);
      expect(res.headers.get('content-type')).toContain('application/problem+json');
      expect(data).toHaveProperty('type');
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('detail');
    });

    it('should include custom fields in error response', async () => {
      const res = await fetch(`${baseUrl}/api/errors/rate-limited`);
      const data = await res.json();

      expect(res.status).toBe(429);
      expect(data).toHaveProperty('retryAfter');
      expect(data).toHaveProperty('limit');
    });
  });

  describe('fastify-i18n-plugin', () => {
    it('should return English by default', async () => {
      const res = await fetch(`${baseUrl}/api/hello/en`);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.locale).toBe('en');
      expect(data.translations.hello).toBe('Hello!');
    });

    it('should return Italian when requested', async () => {
      const res = await fetch(`${baseUrl}/api/hello/it`);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.locale).toBe('it');
      expect(data.translations.hello).toBe('Ciao!');
    });

    it('should interpolate variables', async () => {
      const res = await fetch(`${baseUrl}/api/hello/greet/Francesco`);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.message).toContain('Francesco');
    });
  });

  describe('fastify-webhook-verify', () => {
    it('should accept test webhook without verification', async () => {
      const res = await fetch(`${baseUrl}/api/webhooks/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'test.event', data: {} })
      });
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.message).toContain('Test webhook received');
    });
  });
});

console.log(`
╔═══════════════════════════════════════════════════════════╗
║              node-test-expect Demo                         ║
╠═══════════════════════════════════════════════════════════╣
║  Jest-like assertions for Node.js native test runner      ║
║                                                            ║
║  Features demonstrated:                                    ║
║  - expect().toBe()                                         ║
║  - expect().toContain()                                    ║
║  - expect().toHaveProperty()                               ║
║                                                            ║
║  Run with: npm test                                        ║
╚═══════════════════════════════════════════════════════════╝
`);
