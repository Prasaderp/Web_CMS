import type { BlogFormData } from '@/types/blog';

interface AuthorSectionProps {
  formData: BlogFormData;
  updateFormData: (updates: Partial<BlogFormData>) => void;
}

export default function AuthorSection({ formData, updateFormData }: AuthorSectionProps) {
  return (
    <div className="bg-[#242424] border border-[#3a3a3a] rounded-2xl p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Author Information</h2>
        <p className="text-gray-400">Add credibility with author details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Author Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.author_name}
            onChange={(e) => updateFormData({ author_name: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Avatar URL</label>
          <input
            type="url"
            value={formData.author_avatar_url}
            onChange={(e) => updateFormData({ author_avatar_url: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Bio</label>
        <textarea
          value={formData.author_bio}
          onChange={(e) => updateFormData({ author_bio: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white resize-none"
          placeholder="Brief bio about the author..."
        />
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'author_twitter', label: 'Twitter' },
            { key: 'author_linkedin', label: 'LinkedIn' },
            { key: 'author_facebook', label: 'Facebook' },
            { key: 'author_instagram', label: 'Instagram' },
            { key: 'author_github', label: 'GitHub' },
            { key: 'author_website', label: 'Website' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-300 mb-2">{label}</label>
              <input
                type="url"
                value={formData[key as keyof BlogFormData] as string}
                onChange={(e) => updateFormData({ [key]: e.target.value })}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
                placeholder={`https://${label.toLowerCase()}.com/username`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
