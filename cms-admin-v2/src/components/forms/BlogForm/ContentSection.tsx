import type { BlogFormData } from '@/types/blog';

interface ContentSectionProps {
  formData: BlogFormData;
  updateFormData: (updates: Partial<BlogFormData>) => void;
}

export default function ContentSection({ formData, updateFormData }: ContentSectionProps) {
  return (
    <div className="bg-[#242424] border border-[#3a3a3a] rounded-2xl p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Blog Content</h2>
        <p className="text-gray-400">Craft your story</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Content <span className="text-red-400">*</span>
        </label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => updateFormData({ content: e.target.value })}
          rows={20}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white resize-none font-mono text-sm"
          placeholder="Write your blog content here..."
        />
        <p className="text-xs text-gray-500 mt-2">
          Markdown and HTML supported. Use rich text editor in full version.
        </p>
      </div>
    </div>
  );
}
