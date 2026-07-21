import useSWR from 'swr';
import { apiService } from "@/lib/api-service";
import type { Social } from "./actions";

export const getSocialsKey = (userId?: string) => userId ? `/api/socials?userId=${userId}` : null;

const fetcher = (url: string) => apiService.fetchData<Social[]>(url);

export function useSocials(userId?: string) {
  const { data, error, isLoading, mutate } = useSWR<Social[]>(
    getSocialsKey(userId),
    fetcher
  );

  return {
    socials: data || [],
    isLoading,
    isError: error,
    mutate
  };
}
