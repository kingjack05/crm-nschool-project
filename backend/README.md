# Requirements:
1. Vercel account: this repo is currently developed with vercel's serverless architecture.
2. Fill in the environment variables according to `.env.example`. `DATABASE_URL` should be a [Neon](https://neon.com/) database url.

```
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=
DATABASE_URL=<YOUR_NEON_DATABASE_URL>
```

# Develop
Development with npm:
```
npm install
npm run start
```

Development with pnpm:
```
pnpm install
pnpm run start
```

To push the database schema, run the npm command `db:push`