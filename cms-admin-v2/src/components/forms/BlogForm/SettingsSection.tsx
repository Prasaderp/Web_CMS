import type { BlogFormData } from '@/types/blog';

interface SettingsSectionProps {
  formData: BlogFormData;
  updateFormData: (updates: Partial<BlogFormData>) => void;
}

export default function SettingsSection({ formData, updateFormData }: SettingsSectionProps) {
  return (
    <div className="space-y-6">
      {/* CTA Builder */}
      <div className="bg-[#242424] border border-[#3a3a3a] rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Call-to-Action</h2>
        <p className="text-gray-400 mb-6">Add a CTA to drive engagement</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">CTA Text</label>
            <input
              type="text"
              value={formData.cta_text}
              onChange={(e) => updateFormData({ cta_text: e.target.value })}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Learn More"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">CTA URL</label>
            <input
              type="url"
              value={formData.cta_url}
              onChange={(e) => updateFormData({ cta_url: e.target.value })}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Style</label>
            <select
              value={formData.cta_style}
              onChange={(e) => updateFormData({ cta_style: e.target.value as any })}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="outline">Outline</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Position</label>
            <select
              value={formData.cta_position}
              onChange={(e) => updateFormData({ cta_position: e.target.value as any })}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>
      </div>

      {/* Publishing Options */}
      <div className="bg-[#242424] border border-[#3a3a3a] rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Publishing Options</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer p-4 bg-[#1a1a1a] rounded-xl border border-[#3a3a3a] hover:border-blue-500/50 transition-all">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => updateFormData({ published: e.target.checked })}
              className="w-5 h-5 text-blue-500 bg-[#2a2a2a] border-2 border-[#4a4a4a] rounded"
            />
            <div>
              <span className="text-sm font-semibold text-gray-200 block">Publish immediately</span>
              <span className="text-xs text-gray-500">Make this post live right away</span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-4 bg-[#1a1a1a] rounded-xl border border-[#3a3a3a] hover:border-yellow-500/50 transition-all">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => updateFormData({ is_featured: e.target.checked })}
              className="w-5 h-5 text-yellow-500 bg-[#2a2a2a] border-2 border-[#4a4a4a] rounded"
            />
            <div>
              <span className="text-sm font-semibold text-gray-200 block">Mark as featured</span>
              <span className="text-xs text-gray-500">Highlight this post on homepage</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
