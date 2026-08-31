# Huipper

Huipper is maintained as two independent top-level applications. It is not an npm workspace or monorepo package.

## Applications

- `client/` — Next.js public website and admin interface
- `server/` — Express API, admin authentication, and MongoDB/Mongoose data layer

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
npm run dev
```

Copy `server/.env.example` to `server/.env` and supply the MongoDB and admin-session settings. After configuring a real database, create the first admin with:

```bash
npm run seed:admin
```

Real environment files, dependencies, Next.js output, and server build output are intentionally excluded from Git.
