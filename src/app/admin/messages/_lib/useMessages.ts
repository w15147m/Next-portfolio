import useSWR from 'swr';
import { apiService } from "@/lib/api-service";
import { type ContactMessage } from './schema';

export const getMessagesKey = () => `/api/messages`;

const fetcher = (url: string) => apiService.fetchData<ContactMessage[]>(url);

export function useMessages() {
  const { data, error, isLoading, mutate } = useSWR<ContactMessage[]>(
    getMessagesKey(),
    fetcher
  );

  return {
    messages: data || [],
    isLoading,
    isError: error,
    mutate
  };
}
