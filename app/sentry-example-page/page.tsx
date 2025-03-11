"use client";

import Head from "next/head";
import * as Sentry from "@sentry/nextjs";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Sentry Onboarding</title>
        <meta name="description" content="Test Sentry for your Next.js app!" />
      </Head>

      <main className="min-h-screen flex flex-col justify-center items-center animate-slide">
        <h1 className="text-6xl my-3.5">
          <svg className="h-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 44">
            <path fill="currentColor" d="..." />
          </svg>
        </h1>

        <p>Get started by sending us a sample error:</p>
        <button
          type="button"
          className="px-3 py-2 cursor-pointer bg-[#AD6CAA] rounded text-white text-sm m-[18px] hover:bg-[#9D5C9A]"
          onClick={async () => {
            await Sentry.startSpan(
              { name: "Example Frontend Span", op: "test" },
              async () => {
                const res = await fetch("/api/sentry-example-api");
                if (!res.ok) throw new Error("Sentry Example Frontend Error");
              }
            );
          }}
        >
          Throw error!
        </button>

        <p>
          Next, look for the error on the{" "}
          <a href="https://repair-shop-ak.sentry.io/issues/?project=4508959286034432">
            Issues Page
          </a>.
        </p>
        <p className="mt-6">
          For more information, see{" "}
          <a href="https://docs.sentry.io/platforms/javascript/guides/nextjs/">
            https://docs.sentry.io/platforms/javascript/guides/nextjs/
          </a>
        </p>
      </main>
    </div>
  );
}