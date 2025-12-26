import { FastifyInstance, FastifyRequest, FastifyReply, preHandlerHookHandler } from 'fastify';

// fastify-i18n-plugin
declare module 'fastify-i18n-plugin' {
  import { FastifyPluginAsync } from 'fastify';

  interface I18nPluginOptions {
    translationsPath: string;
    defaultLocale?: string;
  }

  const plugin: FastifyPluginAsync<I18nPluginOptions>;
  export default plugin;
}

// Extend FastifyInstance with plugin decorators
declare module 'fastify' {
  interface FastifyInstance {
    // fastify-i18n-plugin
    translate(locale: string, key: string): Promise<string>;

    // @fracabu/fastify-api-key
    apiKey(options?: { scopes?: string[] }): preHandlerHookHandler;

    // fastify-webhook-verify
    webhookVerify(options: { provider: string }): preHandlerHookHandler;
  }

  interface FastifyReply {
    // fastify-rfc9457
    badRequest(detail: string): FastifyReply;
    unauthorized(detail: string): FastifyReply;
    forbidden(detail: string): FastifyReply;
    notFound(detail: string): FastifyReply;
    tooManyRequests(detail: string): FastifyReply;
    internalServerError(detail: string): FastifyReply;

    // fastify-cache-control
    cacheControl(options: CacheControlDirectives): FastifyReply;
  }

  interface CacheControlDirectives {
    privacy?: 'public' | 'private' | 'no-cache' | 'no-store';
    maxAge?: number;
    sMaxage?: number;
    staleWhileRevalidate?: number;
    staleIfError?: number;
    mustRevalidate?: boolean;
    immutable?: boolean;
  }
}

export {};
