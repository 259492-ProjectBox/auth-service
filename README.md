# Elysia with Bun runtime

## Install Bun

```
https://bun.sh/docs/installation
```

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

# Install List

```
bun add @elysiajs/swagger
bun add axios
bun add @elysiajs/jwt
bun add -d @types/jsonwebtoken
bun add @elysiajs/cors
bun add -d prisma
```

# Prisma

We can setup prisma project with prisma init

`bunx prisma init`

Then we can run prisma migrate to sync our database with Prisma schema:

`bunx prisma migrate dev --name init`

Prisma Client Generation: After running migrate dev, you should regenerate the Prisma Client to ensure your application is up to date with the latest database schema:

`bunx prisma generate`

Re-run Migration (if necessary): If there was an issue with the initial migration, you can reset and reapply it:
`bunx prisma migrate reset`

Remove prisma

```bun remove prisma
bun remove @prisma/client
```

# This plugin has been merged into Elysia core and is deprecated

```

bun uninstall @elysiajs/cookie

```
