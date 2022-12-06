This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Database setup

This section will explain the installation and setup of postgreSQL and prisma to use the database

## PostgreSQL

1. Download postgreSQL here: https://www.postgresql.org/download/
2. Follow the steps from the installer and finish the installation (No need to launch stackbuilder at the last step)
3. Launch pgAdmin
4. Fill in the password you created when setting up postgreSQL
5. Select Servers > PostgreSQL 15
6. Right click on Databases and click on Create
7. Fill in BenFleuri in the database field
8. Click on Save

You now have an empty database in postgreSQL

## Prisma connection

1. Go to the .env file in this directory
2. In the DATABASE_URL, replace johndoe with postgres
3. Replace randompassword with the password you created for postgres
4. Replace mydb with BenFleuri

## Importing database

In the terminal, use the command npx prisma migrate dev

This will import all the models from the prisma schema into the postgreSQL database