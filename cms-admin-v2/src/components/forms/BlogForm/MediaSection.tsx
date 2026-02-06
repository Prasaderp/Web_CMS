import type { BlogFormData } from '@/types/blog';

interface MediaSectionProps {
  formData: BlogFormData;
  updateFormData: (updates: Partial<BlogFormData>) => void;
}

export default function MediaSection({ formData, updateFormData }: MediaSectionProps) {
  return (
    <div className="bg-[#242424] border border-[#3a3a3a] rounded-2xl p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Featured Image</h2>
        <p className="text-gray-400">Upload a captivating cover image</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Image URL</label>
        <input
          type="url"
          value={formData.featured_image_url}
          onChange={(e) => updateFormData({ featured_image_url: e.target.value })}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="https://example.com/image.jpg"
        />
        <p className="text-xs text-gray-500 mt-2">Or use the image upload component</p>
      </div>

      {formData.featured_image_url && (
        <div className="rounded-xl overflow-hidden border border-[#3a3a3a]">
          <img
            src={formData.featured_image_url}
            alt="Preview"
            className="w-full h-64 object-cover"
          />
        </div>
      )}
    </div>
  );
}
