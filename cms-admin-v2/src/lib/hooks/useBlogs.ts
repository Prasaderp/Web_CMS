/**
 * Custom hook for fetching and managing blog list data.
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { blogsApi } from '@/lib/api/blogs';
import type { BlogListItem } from '@/types/blog';

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogsApi.getAll();
      setBlogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogs,
    loading,
    error,
    refetch: fetchBlogs,
  };
}
