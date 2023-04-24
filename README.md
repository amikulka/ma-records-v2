# Visit MA-Records
[MA-Records](https://marecords.vercel.app) is deployed on Vercel

# Project Setup

- Clone the repository on your local machine
- Auth for this app was done with [Clerk](https://clerk.com) -> you will need account for app to work
- Database for project is deployed with [PlanetScale](https://planetscale.com/)
- create `.env` file
- insert env variables in `.env` file:
```
# PlanetScale URL
DATABASE_URL=

#Clerk env variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```
- run `npm install && npx prisma db push && npm run dev`
- open project at http://localhost:3000

# Created with Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow T3's deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
