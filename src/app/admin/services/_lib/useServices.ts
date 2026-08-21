import useSWR from 'swr';
import { apiService } from "@/lib/api-service";
import { type Service } from './schema';

export const getServicesKey = (userId?: string) => userId ? `/api/services?userId=${userId}` : null;

const fetcher = (url: string) => apiService.fetchData<Service[]>(url);

export function useServices(userId?: string) {
  const { data, error, isLoading, mutate } = useSWR<Service[]>(
    getServicesKey(userId),
    fetcher
  );

  return {
    services: data || [],
    isLoading,
    isError: error,
    mutate
  };
}
