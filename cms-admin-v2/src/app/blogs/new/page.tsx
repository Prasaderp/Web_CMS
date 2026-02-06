/**
 * New blog page - dramatically simplified from 500+ lines to ~30 lines.
 * All logic moved to shared BlogForm component.
 */
'use client';

import BlogForm from '@/components/forms/BlogForm';
import { useBlogMutations } from '@/lib/hooks/useBlogMutations';

export default function NewBlogPage() {
  const { createBlog, submitting } = useBlogMutations();

  return <BlogForm mode="create" onSubmit={createBlog} submitting={submitting} />;
}
