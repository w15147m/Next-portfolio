import useSWR from 'swr';
import { apiService } from "@/lib/api-service";
import { type Experience } from './schema';

export const getExperiencesKey = (userId?: string) => userId ? `/api/experiences?userId=${userId}` : null;

const fetcher = (url: string) => apiService.fetchData<Experience[]>(url);

export function useExperiences(userId?: string) {
  const { data, error, isLoading, mutate } = useSWR<Experience[]>(
    getExperiencesKey(userId),
    fetcher
  );

  return {
    experiences: data || [],
    isLoading,
    isError: error,
    mutate
  };
}
