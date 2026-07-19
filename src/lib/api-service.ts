"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

/**
 * Client-side API helper: axios wrapper + auth header injection + global
 * 401/403/451 handling + small localStorage helpers.
 *
 * This only works in the browser (it reads `window`/`localStorage`), so only
 * import it from Client Components ("use client"), not from Server
 * Components or Server Actions.
 */

const isBrowser = typeof window !== "undefined";

// ---------------------------------------------------------------------------
// localStorage helpers (SSR-safe — everything no-ops on the server)
// ---------------------------------------------------------------------------

function safeGetItem(key: string): string | null {
  if (!isBrowser) return null;
  return window.localStorage.getItem(key);
}

function safeSetItem(key: string, value: string): void {
  if (!isBrowser) return;
  window.localStorage.setItem(key, value);
}

export function getStoredObject<T = unknown>(key: string): T | null {
  const raw = safeGetItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function storeObject<T>(key: string, value: T): T | null {
  safeSetItem(key, JSON.stringify(value));
  return getStoredObject<T>(key);
}

export function storeString(key: string, value: string): string | null {
  safeSetItem(key, value);
  return safeGetItem(key);
}

export function getStoredString(key: string): string | null {
  return safeGetItem(key);
}

export function clearStoredString(): void {
  if (isBrowser) window.localStorage.clear();
}

// ---------------------------------------------------------------------------
// Auth headers
// ---------------------------------------------------------------------------

export interface ApiHeaders {
  Accept: string;
  Authorization: string;
  company_id?: string;
  // Axios's header types require an index signature to accept this object
  // as request headers.
  [key: string]: string | undefined;
}

export function getHeader(): ApiHeaders {
  const company = getStoredObject<{ id?: string }>("company");
  let token = safeGetItem("accessToken");

  // accessToken may have been saved either as a raw string, or as
  // JSON.stringify({ accessToken: "..." }) — support both.
  if (token) {
    try {
      const parsed = JSON.parse(token);
      if (parsed && typeof parsed === "object" && "accessToken" in parsed) {
        token = parsed.accessToken;
      }
    } catch {
      // Not JSON — it's already the raw token string, leave it as-is.
    }
  }

  return {
    Accept: "application/json",
    Authorization: `Bearer ${token ?? ""}`,
    company_id: company?.id,
  };
}

// ---------------------------------------------------------------------------
// Global error handling
// ---------------------------------------------------------------------------

interface ApiErrorPayload {
  resource?: string;
  message?: string;
}

export function handleError(error: unknown): void {
  const axiosError = error as AxiosError<ApiErrorPayload>;
  const status = axiosError?.response?.status;

  if (status === 401 || status === 403) {
    console.warn("🔐 Session expired or unauthorized (401/403). Cleaning up...");
    if (isBrowser) {
      window.localStorage.clear();
      const path = window.location.pathname;
      if (path !== "/auth/login" && path !== "/auth/force-logout") {
        window.location.href = "/auth/force-logout";
      }
    }
    return;
  }

  if (status === 451 && axiosError.response?.data?.resource === "access-denied") {
    toast.error(
      axiosError.response?.data?.message ?? "You do not have permission to access this resource",
      { duration: 3000 }
    );
    return;
  }
}

// ---------------------------------------------------------------------------
// API client
// ---------------------------------------------------------------------------

export const apiService = {
  async fetchData<T = unknown>(url: string): Promise<T> {
    try {
      const response = await axios.get<T>(url, { headers: getHeader() });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  async post<T = unknown>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
    try {
      return await axios.post<T>(url, data, { headers: getHeader() });
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  async put<T = unknown>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
    try {
      return await axios.put<T>(url, data, { headers: getHeader() });
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  /**
   * Straight delete, no confirmation dialog. Fires a toast on both
   * success and failure. Returns the response, or `null` on failure
   * (instead of the old behaviour of resolving the *error* object).
   */
  async destroy<T = unknown>(url: string): Promise<AxiosResponse<T> | null> {
    try {
      const response = await axios.delete<T>(url, { headers: getHeader() });
      toast.success("Deleted Successfully", { duration: 3000 });
      return response;
    } catch (error) {
      handleError(error);
      toast.error("Something Went Wrong", { duration: 3000 });
      return null;
    }
  },
};

// Backwards-compatible alias, in case other ported code still imports `funcApi`.
export const funcApi = apiService;