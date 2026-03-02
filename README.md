# Veritas AI Lab

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rowebotz/responsible-ai-foundations-lab)

A production-ready full-stack web application built on Cloudflare Workers and Pages. Featuring a modern React frontend with shadcn/ui, Tailwind CSS, and a Hono-powered API backend. Designed for high performance, scalability, and developer experience.

## Features

- **Modern React Stack**: React 18, React Router, Tanstack Query, Zustand for state management
- **Beautiful UI**: shadcn/ui components, Tailwind CSS with custom design system, dark/light mode support
- **Full-Stack API**: Cloudflare Workers with Hono routing, CORS, logging, and error handling
- **Developer Tools**: Vite for ultra-fast dev server and builds, TypeScript with strict typing, ESLint
- **Responsive Design**: Mobile-first, sidebar layout option, animations, glassmorphism effects
- **Production-Ready**: Error boundaries, client error reporting, health checks, SPA routing
- **Easy Customization**: Modular structure, extensible user routes in `worker/userRoutes.ts`
- **Deployment Ready**: One-command deploy to Cloudflare with `bun deploy`

## Tech Stack

| Frontend | Backend | Tools & Utils |
|----------|---------|---------------|
| React, TypeScript | Cloudflare Workers, Hono | Vite, Bun, Tailwind CSS |
| shadcn/ui, Lucide Icons | Durable Objects & KV Ready | Tanstack Query, React Hook Form |
| Framer Motion, Sonner | CORS & Logging | ESLint, TypeScript 5 |

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed (≥1.0)
- [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for deployment
- Cloudflare account with Pages/Workers enabled

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Generate Worker types (optional, for IDE support):
   ```bash
   bun run cf-typegen
   ```

### Development

Start the development server:
```bash
bun dev
```

- Frontend: http://localhost:3000 (or `${PORT:-3000}`)
- API: http://localhost:3000/api/*
- Hot reload enabled
- Worker types auto-generate in dev

### Build for Production

```bash
bun run build
```

Outputs optimized assets to `dist/` for Cloudflare Pages.

### Deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rowebotz/responsible-ai-foundations-lab)

Deploy to Cloudflare:
```bash
bun run deploy
```

This builds the app and deploys via Wrangler. Configure your `wrangler.toml` with account ID, secrets, and bindings as needed.

## Usage

### Frontend Development

- Edit pages in `src/pages/`
- Add routes in `src/main.tsx`
- Use shadcn/ui components from `@/components/ui/*`
- Hooks in `@/hooks/`, utils in `@/lib/`
- API calls via Tanstack Query or fetch to `/api/*`

### Backend Development

- Add API routes in `worker/userRoutes.ts` (e.g., `app.get('/api/your-endpoint', ...)`)
- Core worker in `worker/index.ts` (do not modify)
- Environment bindings via `Env` interface in `worker/core-utils.ts`
- Test API: `curl http://localhost:3000/api/health`

Example API route addition:
```typescript
// worker/userRoutes.ts
app.post('/api/users', async (c) => {
  // Your logic
  return c.json({ success: true });
});
```

### Key Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start dev server |
| `bun build` | Production build |
| `bun lint` | Run ESLint |
| `bun deploy` | Build + deploy to Cloudflare |
| `bun preview` | Preview production build |

## Project Structure

```
├── src/                 # React app
│   ├── components/      # UI components (shadcn/ui + custom)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities, error reporting
│   ├── pages/           # Route pages
│   └── main.tsx         # App entry
├── worker/              # Cloudflare Worker backend
│   ├── index.ts         # Core router (do not edit)
│   └── userRoutes.ts    # Add your API routes here
├── tailwind.config.js   # Design system
└── wrangler.jsonc       # Worker config
```

## Customization

- **Theme**: Edit CSS vars in `src/index.css`
- **Sidebar**: Customize `src/components/app-sidebar.tsx` or use `AppLayout`
- **Routes**: Extend router in `src/main.tsx`, API in `worker/userRoutes.ts`
- **Components**: `npx shadcn@latest add <component>` for shadcn/ui

## Error Handling & Monitoring

- Client errors reported to `/api/client-errors`
- Server errors logged with Hono middleware
- Health check: `/api/health`
- Observability enabled in Wrangler config

## Contributing

1. Fork the repo
2. `bun install`
3. Create feature branch (`bun dev`)
4. Commit changes (`bun lint`)
5. Submit PR

## License

MIT License. See [LICENSE](LICENSE) for details.