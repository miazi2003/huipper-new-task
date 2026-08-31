# Huipper

Huipper is maintained as two independent top-level applications. It is not an npm workspace or monorepo package.

## Applications

- `client/` — Next.js public website and admin interface
- `server/` — Express API, admin authentication, and Prisma/PostgreSQL data layer

Each application owns its dependencies, lockfile, environment configuration, and build output. Run npm commands from the corresponding application directory.

## Client

```bash
cd client
npm install
npm run dev
```

Copy `client/.env.example` to `client/.env.local` and configure `SERVER_API_URL` when the API is not available at the default local address.

## Server

```bash
cd server
npm install
npm run db:validate
npm run db:generate
npm run dev
```

Copy `server/.env.example` to `server/.env` and supply the PostgreSQL and admin-session settings. After configuring a real database:

```bash
npm run db:migrate
npm run admin:create
```

Real environment files, dependencies, generated Prisma Client files, Next.js output, and server build output are intentionally excluded from Git.
