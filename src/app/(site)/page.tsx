import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome | Starter Kit",
  description: "A clean starter kit with admin and public pages.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-24">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to the Starter Kit
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
          A universal starter with both a public-facing site and a full admin dashboard.
          Build anything — portfolio, blog, SaaS, e-commerce.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/signin"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
