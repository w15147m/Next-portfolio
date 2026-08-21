import useSWR from 'swr';
import { apiService } from "@/lib/api-service";
import { type Skill } from './schema';

export const getSkillsKey = (userId?: string) => userId ? `/api/skills?userId=${userId}` : null;

const fetcher = (url: string) => apiService.fetchData<Skill[]>(url);

export function useSkills(userId?: string) {
  const { data, error, isLoading, mutate } = useSWR<Skill[]>(
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
