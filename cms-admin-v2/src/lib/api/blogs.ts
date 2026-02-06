/**
 * Blog API methods.
 */
import { apiClient } from './client';
import type { Blog, BlogFormData, BlogListItem } from '@/types/blog';

export const blogsApi = {
  /**
   * Get all blogs (admin).
   */
  getAll: () =>
    apiClient.get<BlogListItem[]>('/api/admin/blogs', true),

  /**
   * Get blog by ID (admin).
   */
  getById: (id: number) =>
    apiClient.get<Blog>(`/api/admin/blogs/${id}`, true),

  /**
   * Create new blog.
   */
  create: (data: BlogFormData) =>
    apiClient.post<{ id: number; slug: string }>('/api/admin/blogs', data, true),

  /**
   * Update existing blog.
   */
  update: (id: number, data: BlogFormData) =>
    apiClient.put<{ slug: string }>(`/api/admin/blogs/${id}`, data, true),

  /**
   * Delete blog.
   */
  delete: (id: number) =>
    apiClient.delete(`/api/admin/blogs/${id}`, true),

  /**
   * Toggle published status.
   */
  togglePublish: (id: number) =>
    apiClient.patch<{ published: boolean }>(`/api/admin/blogs/${id}/publish`, undefined, true),

  /**
   * Toggle featured status.
   */
  toggleFeatured: (id: number) =>
    apiClient.patch<{ is_featured: boolean }>(`/api/admin/blogs/${id}/featured`, undefined, true),

  /**
   * Bulk publish blogs.
   */
  bulkPublish: (ids: number[]) =>
    apiClient.post<{ affected: number }>('/api/admin/blogs/bulk/publish', { ids }, true),

  /**
   * Bulk unpublish blogs.
   */
  bulkUnpublish: (ids: number[]) =>
    apiClient.post<{ affected: number }>('/api/admin/blogs/bulk/unpublish', { ids }, true),

  /**
   * Bulk delete blogs.
   */
  bulkDelete: (ids: number[]) =>
    apiClient.post<{ affected: number }>('/api/admin/blogs/bulk/delete', { ids }, true),

  /**
   * Upload image.
   */
  uploadImage: (file: File) =>
    apiClient.upload<{ url: string }>('/api/admin/upload/image', file, true),
};
