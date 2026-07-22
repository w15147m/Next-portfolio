import useSWR from 'swr';
import { apiService } from "@/lib/api-service";
import { type Education } from './schema';

export const getEducationsKey = (userId?: string) => userId ? `/api/educations?userId=${userId}` : null;

const fetcher = (url: string) => apiService.fetchData<Education[]>(url);

export function useEducations(userId?: string) {
  const { data, error, isLoading, mutate } = useSWR<Education[]>(
    getEducationsKey(userId),
    fetcher
  );

  return {
    educations: data || [],
    isLoading,
    isError: error,
    mutate
  };
}
