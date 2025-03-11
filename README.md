# Repair Computer Shop

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), designed as a full-stack web application for a repair computer shop. It leverages modern tools and frameworks to provide a robust, scalable, and user-friendly experience for managing computer repair services.

## Features

- **Customer Management**: Track customer details and repair history.
- **Ticket System**: Create, update, and manage repair tickets.
- **Authentication**: Secure user login with [Kinde Auth](https://kinde.com/).
- **Database**: Powered by [Neon Postgres](https://neon.tech/) and [Drizzle ORM](https://orm.drizzle.team/) for efficient data management.
- **Form Handling**: Built with [react-hook-form](https://react-hook-form.com/) and [Zod](https://zod.dev/) for validation.
- **Safe Actions**: Server-side logic with [next-safe-action](https://next-safe-action.dev/).
- **Data Tables**: Interactive tables using [TanStack Table](https://tanstack.com/table/).
- **Error Monitoring**: Integrated with [Sentry](https://sentry.io/) for real-time error tracking (see [Turbopack support status](https://github.com/getsentry/sentry-javascript/issues/8105)).
- **Styling**: Responsive design with [Tailwind CSS](https://tailwindcss.com/) and [ShadCN/ui](https://ui.shadcn.com/).
- **Font Optimization**: Uses [Geist](https://vercel.com/font) via [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for a sleek, developer-friendly typeface.
- **Deployment**: Hosted on [Vercel](https://vercel.com/) for seamless scalability.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev

