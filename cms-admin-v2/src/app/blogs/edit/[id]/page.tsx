/**
 * Edit blog page - dramatically simplified from 500+ lines to ~40 lines.
 * All logic moved to shared BlogForm component.
 */
'use client';

import { use } from 'react';
import { Loader2 } from 'lucide-react';
import BlogForm from '@/components/forms/BlogForm';
import { useBlog } from '@/lib/hooks/useBlog';
import { useBlogMutations } from '@/lib/hooks/useBlogMutations';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const blogId = parseInt(id, 10);
  
  const { blog, loading } = useBlog(blogId);
  const { updateBlog, submitting } = useBlogMutations();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
          <p className="text-gray-400">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <p className="text-gray-400">Blog not found</p>
      </div>
    );
  }

  return (
    <BlogForm
      mode="edit"
      initialData={blog}
      onSubmit={(data) => updateBlog(blogId, data)}
      submitting={submitting}
    />
  );
}
