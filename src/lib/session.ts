import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Returns the current session and a convenience `userId` string.
 * Safe to call from any Server Component or Server Action.
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session ?? null;
}

/**
 * Returns just the user ID, or null if not authenticated.
 * Handy shorthand for pages/actions that only need the ID.
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.user?.id ?? null;
}
