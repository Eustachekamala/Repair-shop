"use client";

import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title : "Page not found"
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-6 md:p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full mx-4 animate-slide">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          404 - Not Found
        </h2>
        
        <Image className="m-0 w-full"
                src="/images/not-found-img.jpg"
                height={300}
                width={300}
                sizes="300px"
                alt="Page Not Found"
                priority={true}
                title="Page Not Found"/>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Oops! We couldn’t find the resource you’re looking for.
        </p>
        <Link
          href="/tickets"
          className="inline-block px-6 py-3 bg-[#AD6CAA] text-white rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-[#9D5C9A] transition-colors duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}