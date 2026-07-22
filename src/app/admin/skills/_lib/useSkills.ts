import useSWR from 'swr';
import { apiService } from "@/lib/api-service";
import { type skill } from './schema';

export const getSkillsKey = (userId?: string) => userId ? `/api/skills?userId=${userId}` : null;

const fetcher = (url: string) => apiService.fetchData<skill[]>(url);

export function useSkills(userId?: string) {
  const { data, error, isLoading, mutate } = useSWR<skill[]>(
    getSkillsKey(userId),
    fetcher
  );

  return {
    skills: data || [],
    isLoading,
    isError: error,
    mutate
  };
}
