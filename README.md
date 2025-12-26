# Fastify Plugins Demo

<div align="center">

![Fastify](https://img.shields.io/badge/Fastify-5.0-000000?style=for-the-badge&logo=fastify&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A demo project showcasing 7 production-ready Fastify plugins by [@fracabu](https://github.com/fracabu)**

[Live Demo](#quick-start) | [Plugins](#plugins) | [API Docs](#api-endpoints) | [npm Packages](#npm-packages)

</div>

---

## Plugins

This demo showcases **7 npm packages** built for production APIs:

| Plugin | Description | npm |
|--------|-------------|-----|
| **@fracabu/fastify-api-key** | API Key authentication with scopes | [![npm](https://img.shields.io/npm/v/@fracabu/fastify-api-key)](https://www.npmjs.com/package/@fracabu/fastify-api-key) |
| **fastify-cache-control** | Declarative HTTP Cache-Control headers | [![npm](https://img.shields.io/npm/v/fastify-cache-control)](https://www.npmjs.com/package/fastify-cache-control) |
| **fastify-rfc9457** | RFC 9457 Problem Details error responses | [![npm](https://img.shields.io/npm/v/fastify-rfc9457)](https://www.npmjs.com/package/fastify-rfc9457) |
| **fastify-webhook-verify** | Multi-provider webhook signature verification | [![npm](https://img.shields.io/npm/v/fastify-webhook-verify)](https://www.npmjs.com/package/fastify-webhook-verify) |
| **fastify-i18n-plugin** | Dynamic internationalization support | [![npm](https://img.shields.io/npm/v/fastify-i18n-plugin)](https://www.npmjs.com/package/fastify-i18n-plugin) |
| **@fracabu/env-checkup** | CLI tool to validate .env files | [![npm](https://img.shields.io/npm/v/@fracabu/env-checkup)](https://www.npmjs.com/package/@fracabu/env-checkup) |
| **node-test-expect** | Jest-like assertions for Node.js test runner | [![npm](https://img.shields.io/npm/v/node-test-expect)](https://www.npmjs.com/package/node-test-expect) |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/fracabu/fastify-plugins-demo.git
cd fastify-plugins-demo

# Install dependencies
npm install

# Validate environment variables
npm run env:check

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints

### Root & Health

| Endpoint | Description |
|----------|-------------|
| `GET /` | API documentation |
| `GET /health` | Health check |

### @fracabu/fastify-api-key

| Endpoint | Auth | Description |
|----------|------|-------------|
| `GET /api/users/public` | None | Public endpoint |
| `GET /api/users` | API Key | Protected endpoint |
| `GET /api/users/admin` | API Key + admin scope | Admin only |
| `GET /api/users/help` | None | Usage instructions |

**Test:**
```bash
# Public (no auth)
curl http://localhost:3000/api/users/public

# With API Key
curl -H "x-api-key: demo-master-key-12345" http://localhost:3000/api/users
```

### fastify-cache-control

| Endpoint | Cache Strategy |
|----------|----------------|
| `GET /api/products` | 1 hour cache |
| `GET /api/products/live` | No cache |
| `GET /api/products/swr` | Stale-while-revalidate |
| `GET /api/products/cdn` | CDN optimized |

### fastify-rfc9457

| Endpoint | Error Type |
|----------|------------|
| `GET /api/errors/bad-request` | 400 Bad Request |
| `GET /api/errors/unauthorized` | 401 Unauthorized |
| `GET /api/errors/forbidden` | 403 Forbidden |
| `GET /api/errors/not-found` | 404 Not Found |
| `GET /api/errors/rate-limited` | 429 Too Many Requests |
| `GET /api/errors/server-error` | 500 Internal Error |

### fastify-webhook-verify

| Endpoint | Provider |
|----------|----------|
| `POST /api/webhooks/github` | GitHub (verified) |
| `POST /api/webhooks/stripe` | Stripe (verified) |
| `POST /api/webhooks/test` | Test (no verification) |

### fastify-i18n-plugin

| Endpoint | Language |
|----------|----------|
| `GET /api/hello` | Auto-detect |
| `GET /api/hello/en` | English |
| `GET /api/hello/it` | Italian |
| `GET /api/hello/greet/:name` | Interpolation demo |

---

## Scripts

```bash
npm run dev        # Start dev server with hot reload
npm run build      # Build TypeScript
npm start          # Run production build
npm test           # Run tests with node-test-expect
npm run env:check  # Validate .env against .env.example
```

---

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Server
PORT=3000
HOST=0.0.0.0

# API Keys
API_KEY_MASTER=your-master-key
API_KEY_READ_ONLY=your-readonly-key

# Webhooks
WEBHOOK_SECRET_GITHUB=whsec_xxx
WEBHOOK_SECRET_STRIPE=whsec_xxx

# i18n
DEFAULT_LOCALE=en
SUPPORTED_LOCALES=en,it
```

---

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Fastify 5
- **Language**: TypeScript 5.7
- **Testing**: Node.js native test runner + node-test-expect

---

## Author

**Francesco Capurso** ([@fracabu](https://github.com/fracabu))

- GitHub: [github.com/fracabu](https://github.com/fracabu)
- npm: [npmjs.com/~fracabu](https://www.npmjs.com/~fracabu)
- Dev.to: [dev.to/fracabu](https://dev.to/fracabu)

---

## License

MIT License - see [LICENSE](LICENSE) for details.
