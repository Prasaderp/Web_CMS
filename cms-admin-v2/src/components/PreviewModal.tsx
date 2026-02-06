/**
 * Blog preview modal component.
 * Shows blog content in a modal overlay.
 */
'use client';

import { X, ExternalLink, Clock, Calendar, Tag } from 'lucide-react';
import type { BlogListItem } from '@/types/blog';

interface PreviewModalProps {
    blog: BlogListItem;
    onClose: () => void;
}

export default function PreviewModal({ blog, onClose }: PreviewModalProps) {
    // Close on escape key
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    // Close on backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={handleBackdropClick}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-title"
        >
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a] shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 id="preview-title" className="text-lg font-semibold text-white">
                            Blog Preview
                        </h2>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded ${blog.published
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                            {blog.published ? 'Published' : 'Draft'}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                        aria-label="Close preview"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Featured Image */}
                    {blog.featured_image_url && (
                        <div className="w-full h-64 bg-[#2a2a2a]">
                            <img
                                src={blog.featured_image_url}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80';
                                }}
                            />
                        </div>
                    )}

                    <div className="p-6">
                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                            {blog.category && (
                                <span className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
                                    <Tag className="w-3.5 h-3.5" />
                                    {blog.category}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(blog.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                            {typeof blog.read_time === 'number' && (
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    {blog.read_time} min read
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Author */}
                        {blog.author_name && (
                            <p className="text-gray-400 mb-6">
                                By <span className="text-white">{blog.author_name}</span>
                            </p>
                        )}

                        {/* Excerpt */}
                        {blog.excerpt && (
                            <div className="prose prose-invert max-w-none">
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {blog.excerpt}
                                </p>
                            </div>
                        )}

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[#2a2a2a]">
                                {blog.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm bg-[#2a2a2a] text-gray-400 rounded-full"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-[#2a2a2a] bg-[#1a1a1a] shrink-0">
                    <p className="text-sm text-gray-500">
                        Slug: <code className="px-2 py-0.5 bg-[#2a2a2a] rounded text-gray-400">{blog.slug}</code>
                    </p>
                    {blog.published && (
                        <a
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View Live
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
