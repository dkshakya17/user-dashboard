This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Environment Variables

Open your terminal, navigate to the root directory of the project and execute the following command:


```bash
cp .env.local.example .env.local
```

This command copies the provided example file for local environment variables. Now, proceed to fill in the values for the following environmental variables in the newly created .env.local file:

`NEXT_PUBLIC_GOOGLE_MAP_API_KEY` is optional unless you're utilizing Google Maps. If you plan to integrate Google Maps into your project, obtain your API key from this link and assign it to NEXT_PUBLIC_GOOGLE_MAP_API_KEY in your environment variables.

`NEXTAUTH_SECRET` Open your terminal in mac/linux and enter the following command and it will generates a random 32-character base64-encoded string using OpenSSL. If your are a Windows user you can generate from here https://generate-secret.vercel.app/32


```bash

openssl rand -base64 32

```


`NEXTAUTH_URL` should be set to your project's base URL. During development, it commonly defaults to [http://localhost:3000](http://localhost:3000). However, in a production environment, ensure to update it to match the URL of your deployed application.

`GOOGLE_CLIENT_ID` is your project's Google API client ID. During development, use a test ID, and for production, obtain the official ID from the Google Developer Console [https://console.developers.google.com/](https://console.developers.google.com/). This ID is essential for authenticating with Google services in your application.

`GOOGLE_CLIENT_SECRET` is your project's confidential key for secure communication with the Google API. During development, use a test secret; for production, obtain the official one from the Google Developer Console [https://console.developers.google.com/](https://console.developers.google.com/). This key is essential for authenticating and authorizing your application with Google services.