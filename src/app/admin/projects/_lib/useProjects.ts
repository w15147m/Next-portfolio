import useSWR from 'swr';
import { apiService } from "@/lib/api-service";
import { type Project } from './schema';

export const getProjectsKey = (userId?: string) => userId ? `/api/projects?userId=${userId}` : null;

const fetcher = (url: string) => apiService.fetchData<Project[]>(url);

export function useProjects(userId?: string) {
  const { data, error, isLoading, mutate } = useSWR<Project[]>(
    getProjectsKey(userId),
    fetcher
  );

  return {
    projects: data || [],
    isLoading,
    isError: error,
    mutate
  };
}
