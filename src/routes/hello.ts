import { FastifyInstance } from 'fastify';

/**
 * Demo: fastify-i18n-plugin
 * Shows internationalization support
 */
export async function helloRoutes(server: FastifyInstance) {

  // Default locale (English)
  server.get('/', async () => {
    return {
      message: await server.translate('en', 'hello'),
      plugin: 'fastify-i18n-plugin',
      locale: 'en (default)',
      translations: {
        hello: await server.translate('en', 'hello'),
        welcome: await server.translate('en', 'welcome'),
        goodbye: await server.translate('en', 'goodbye')
      }
    };
  });

  // English
  server.get('/en', async () => {
    return {
      message: await server.translate('en', 'hello'),
      locale: 'en',
      plugin: 'fastify-i18n-plugin',
      translations: {
        hello: await server.translate('en', 'hello'),
        welcome: await server.translate('en', 'welcome'),
        goodbye: await server.translate('en', 'goodbye')
      }
    };
  });

  // Italian
  server.get('/it', async () => {
    return {
      message: await server.translate('it', 'hello'),
      locale: 'it',
      plugin: 'fastify-i18n-plugin',
      translations: {
        hello: await server.translate('it', 'hello'),
        welcome: await server.translate('it', 'welcome'),
        goodbye: await server.translate('it', 'goodbye')
      }
    };
  });

  // Dynamic locale via param
  server.get('/lang/:lang', async (request) => {
    const { lang } = request.params as { lang: string };
    return {
      message: await server.translate(lang, 'hello'),
      locale: lang,
      plugin: 'fastify-i18n-plugin',
      translations: {
        hello: await server.translate(lang, 'hello'),
        welcome: await server.translate(lang, 'welcome'),
        goodbye: await server.translate(lang, 'goodbye')
      }
    };
  });

  // Usage instructions
  server.get('/help', async () => ({
    plugin: 'fastify-i18n-plugin',
    description: 'Dynamic internationalization for Fastify',
    features: [
      'Load translations from JSON files',
      'Async translation loading',
      'Fallback to default language'
    ],
    endpoints: [
      'GET /api/hello - Default (English)',
      'GET /api/hello/en - English',
      'GET /api/hello/it - Italian',
      'GET /api/hello/lang/:lang - Dynamic locale'
    ],
    availableLocales: ['en', 'it']
  }));
}
