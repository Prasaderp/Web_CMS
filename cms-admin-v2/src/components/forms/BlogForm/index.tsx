/**
 * Shared BlogForm component - eliminates 500+ lines of duplication.
 * Used by both new and edit pages with mode prop.
 */
'use client';

import { useState } from 'react';
import { Save, ArrowLeft, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Blog, BlogFormData } from '@/types/blog';

import BasicInfoSection from './BasicInfoSection';
import ContentSection from './ContentSection';
import MediaSection from './MediaSection';
import AuthorSection from './AuthorSection';
import SettingsSection from './SettingsSection';
import SectionNav from './SectionNav';

interface BlogFormProps {
  mode: 'create' | 'edit';
  initialData?: Blog;
  onSubmit: (data: BlogFormData) => Promise<boolean>;
  submitting: boolean;
}

const INITIAL_FORM_DATA: BlogFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featured_image_url: '',
  category: '',
  tags: [],
  author_name: '',
  author_bio: '',
  author_avatar_url: '',
  author_twitter: '',
  author_linkedin: '',
  author_facebook: '',
  author_instagram: '',
  author_github: '',
  author_website: '',
  cta_text: '',
  cta_url: '',
  cta_style: 'primary',
  cta_position: 'bottom',
  published: false,
  is_featured: false,
};

export default function BlogForm({ mode, initialData, onSubmit, submitting }: BlogFormProps) {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<BlogFormData>(
    initialData ? { ...initialData } : INITIAL_FORM_DATA
  );

  const updateFormData = (updates: Partial<BlogFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in required fields: title and content');
      return;
    }

    const success = await onSubmit(formData);
    if (success) {
      // Navigation handled in mutation hook
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>

          <h1 className="text-3xl font-bold text-white mb-2">
            {mode === 'create' ? 'Create New Blog Post' : 'Edit Blog Post'}
          </h1>
          <p className="text-gray-400">
            {mode === 'create'
              ? 'Follow the steps to craft engaging content'
              : 'Update your content and settings'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Section Navigation */}
          <div className="lg:col-span-3">
            <SectionNav
              currentSection={currentSection}
              onSectionChange={setCurrentSection}
            />
          </div>

          {/* Form Sections */}
          <div className="lg:col-span-9">
            {currentSection === 0 && (
              <BasicInfoSection formData={formData} updateFormData={updateFormData} />
            )}
            {currentSection === 1 && (
              <ContentSection formData={formData} updateFormData={updateFormData} />
            )}
            {currentSection === 2 && (
              <MediaSection formData={formData} updateFormData={updateFormData} />
            )}
            {currentSection === 3 && (
              <AuthorSection formData={formData} updateFormData={updateFormData} />
            )}
            {currentSection === 4 && (
              <SettingsSection formData={formData} updateFormData={updateFormData} />
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {currentSection > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentSection((prev) => prev - 1)}
                  className="px-8 py-4 bg-[#242424] text-white rounded-xl font-semibold hover:bg-[#2a2a2a] border border-[#3a3a3a] transition-all"
                >
                  Previous
                </button>
              )}

              {currentSection < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentSection((prev) => prev + 1)}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  {submitting
                    ? mode === 'create'
                      ? 'Creating...'
                      : 'Updating...'
                    : mode === 'create'
                    ? 'Create Blog Post'
                    : 'Update Blog Post'}
                </button>
              )}

              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="px-8 py-4 bg-[#242424] text-gray-400 rounded-xl font-semibold hover:bg-[#2a2a2a] hover:text-white border border-[#3a3a3a] transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
