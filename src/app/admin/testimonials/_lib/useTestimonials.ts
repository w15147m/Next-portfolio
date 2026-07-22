import useSWR from 'swr';
import { apiService } from "@/lib/api-service";
import { type Testimonial } from './schema';

export const getTestimonialsKey = (userId?: string) => userId ? `/api/testimonials?userId=${userId}` : null;

const fetcher = (url: string) => apiService.fetchData<Testimonial[]>(url);

export function useTestimonials(userId?: string) {
  const { data, error, isLoading, mutate } = useSWR<Testimonial[]>(
    getTestimonialsKey(userId),
    fetcher
  );

  return {
    testimonials: data || [],
    isLoading,
    isError: error,
    mutate
  };
}
