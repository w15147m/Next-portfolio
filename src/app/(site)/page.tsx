import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Welcome | Starter Kit",
  description: "A clean starter kit with admin and public pages.",
};

export default async function LandingPage() {
  // Fetch users from MySQL via Prisma (server component)
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-24">
      <div className="text-center max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to the Starter Kit
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
          A universal starter with both a public-facing site and a full admin
          dashboard. Build anything — portfolio, blog, SaaS, e-commerce.
        </p>

        <div className="flex gap-4 justify-center mb-12">
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

        {/* Users table from MySQL database */}
        <div className="w-full">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-left">
            Users (from MySQL · {users.length} record{users.length !== 1 ? "s" : ""})
          </h2>

          {users.length === 0 ? (
            <p className="text-gray-400 text-sm">No users found. Run the seeder.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {user.id}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === "ADMIN"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                        {user.createdAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
