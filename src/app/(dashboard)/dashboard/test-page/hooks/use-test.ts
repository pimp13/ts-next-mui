import { apiFetch, ORG_GO_API } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  published_at: string;
  author_name: string;
  view_count: number;
  created_at: string;
}


export function useTest() {
  return useQuery({
    queryKey: ['test'],
    queryFn: async () => (await apiFetch<Article[]>('/api/public/articles', {
      method: 'GET',
    }, ORG_GO_API)).data ?? [],
  });
}