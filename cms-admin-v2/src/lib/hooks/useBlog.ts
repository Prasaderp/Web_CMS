/**
 * Custom hook for fetching and managing single blog data.
 */
'use client';

import { useState, useEffect } from 'react';
import { blogsApi } from '@/lib/api/blogs';
import type { Blog } from '@/types/blog';

export function useBlog(id: number) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await blogsApi.getById(id);
        setBlog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  return { blog, loading, error };
}
