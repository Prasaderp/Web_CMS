import type { BlogFormData } from '@/types/blog';
import { slugify } from '@/lib/utils';

interface BasicInfoSectionProps {
  formData: BlogFormData;
  updateFormData: (updates: Partial<BlogFormData>) => void;
}

export default function BasicInfoSection({ formData, updateFormData }: BasicInfoSectionProps) {
  const handleTitleChange = (title: string) => {
    updateFormData({
      title,
      slug: formData.slug || slugify(title),
    });
  };

  return (
    <div className="bg-[#242424] border border-[#3a3a3a] rounded-2xl p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
        <p className="text-gray-400">Start with the essentials of your blog post</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Post Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white text-lg"
          placeholder="Enter an engaging blog title..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          URL Slug <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.slug}
          onChange={(e) => updateFormData({ slug: e.target.value })}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white font-mono text-sm"
          placeholder="blog-post-url"
        />
        <p className="text-xs text-gray-500 mt-2">Auto-generated from title. Edit if needed.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Excerpt <span className="text-red-400">*</span>
        </label>
        <textarea
          required
          value={formData.excerpt}
          onChange={(e) => updateFormData({ excerpt: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white resize-none"
          placeholder="Write a compelling summary..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Category <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.category}
          onChange={(e) => updateFormData({ category: e.target.value })}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="e.g., Technology, Business, AI"
        />
      </div>

      {/* Tags input - simplified for now */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Tags</label>
        <input
          type="text"
          value={formData.tags.join(', ')}
          onChange={(e) =>
            updateFormData({
              tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
            })
          }
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="ai, machine-learning, technology"
        />
        <p className="text-xs text-gray-500 mt-2">Comma-separated tags</p>
      </div>
    </div>
  );
}
