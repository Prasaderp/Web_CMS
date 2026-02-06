/**
 * Custom hook for blog CRUD operations (mutations).
 * Handles create, update, delete, toggle, and bulk operations.
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { blogsApi } from '@/lib/api/blogs';
import type { BlogFormData } from '@/types/blog';

export function useBlogMutations() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBlog = async (data: BlogFormData) => {
    try {
      setSubmitting(true);
      setError(null);
      await blogsApi.create(data);
      router.push('/dashboard');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create blog';
      setError(message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const updateBlog = async (id: number, data: BlogFormData) => {
    try {
      setSubmitting(true);
      setError(null);
      await blogsApi.update(id, data);
      router.push('/dashboard');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update blog';
      setError(message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const deleteBlog = async (id: number) => {
    try {
      setDeleting(true);
      setError(null);
      await blogsApi.delete(id);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete blog';
      setError(message);
      return false;
    } finally {
      setDeleting(false);
    }
  };

  const togglePublish = async (id: number) => {
    try {
      setToggling(true);
      setError(null);
      await blogsApi.togglePublish(id);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to toggle publish';
      setError(message);
      return false;
    } finally {
      setToggling(false);
    }
  };

  const toggleFeatured = async (id: number) => {
    try {
      setToggling(true);
      setError(null);
      await blogsApi.toggleFeatured(id);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to toggle featured';
      setError(message);
      return false;
    } finally {
      setToggling(false);
    }
  };

  const bulkPublish = async (ids: number[]) => {
    try {
      setSubmitting(true);
      setError(null);
      await blogsApi.bulkPublish(ids);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Bulk publish failed';
      setError(message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const bulkUnpublish = async (ids: number[]) => {
    try {
      setSubmitting(true);
      setError(null);
      await blogsApi.bulkUnpublish(ids);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Bulk unpublish failed';
      setError(message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const bulkDelete = async (ids: number[]) => {
    try {
      setDeleting(true);
      setError(null);
      await blogsApi.bulkDelete(ids);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Bulk delete failed';
      setError(message);
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return {
    createBlog,
    updateBlog,
    deleteBlog,
    togglePublish,
    toggleFeatured,
    bulkPublish,
    bulkUnpublish,
    bulkDelete,
    submitting,
    deleting,
    toggling,
    error,
  };
}

