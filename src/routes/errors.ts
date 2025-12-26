import { FastifyInstance } from 'fastify';

/**
 * Demo: fastify-rfc9457
 * Shows RFC 9457 Problem Details error responses
 */
export async function errorRoutes(server: FastifyInstance) {

  // 400 Bad Request
  server.get('/bad-request', async (request, reply: any) => {
    return reply.badRequest('The request body is missing required field: email');
  });

  // 401 Unauthorized
  server.get('/unauthorized', async (request, reply: any) => {
    return reply.unauthorized('Valid authentication credentials are required');
  });

  // 403 Forbidden
  server.get('/forbidden', async (request, reply: any) => {
    return reply.forbidden('You do not have permission to access this resource');
  });

  // 404 Not Found
  server.get('/not-found', async (request, reply: any) => {
    return reply.notFound('The requested resource could not be found');
  });

  // 429 Rate Limited
  server.get('/rate-limited', async (request, reply: any) => {
    return reply.tooManyRequests('Rate limit exceeded. Please try again later.');
  });

  // 500 Internal Server Error
  server.get('/server-error', async (request, reply: any) => {
    return reply.internalServerError('An unexpected error occurred');
  });

  // Usage instructions
  server.get('/help', async () => ({
    plugin: 'fastify-rfc9457',
    description: 'RFC 9457 Problem Details for HTTP APIs',
    features: [
      'Standardized error responses',
      'Content-Type: application/problem+json',
      'Multi-language support',
      'Consistent error structure'
    ],
    endpoints: [
      'GET /api/errors/bad-request - 400 error',
      'GET /api/errors/unauthorized - 401 error',
      'GET /api/errors/forbidden - 403 error',
      'GET /api/errors/not-found - 404 error',
      'GET /api/errors/rate-limited - 429 error',
      'GET /api/errors/server-error - 500 error'
    ],
    responseFormat: {
      type: 'https://api.example.com/errors/not-found',
      title: 'Not Found',
      status: 404,
      detail: 'The requested resource could not be found',
      instance: '/api/errors/not-found'
    }
  }));
}
