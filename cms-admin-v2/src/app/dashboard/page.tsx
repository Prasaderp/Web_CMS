/**
 * Dashboard page - Blog management interface.
 * Lists all blogs with search, filter, bulk actions, and CRUD operations.
 */
'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
    Search, Plus, Edit2, Trash2, Star, Eye, EyeOff, Loader2,
    FileText, CheckCircle, TrendingUp, CheckSquare, Square,
    Filter, X, LogOut, RefreshCw
} from 'lucide-react';
import { useBlogs } from '@/lib/hooks/useBlogs';
import { useBlogMutations } from '@/lib/hooks/useBlogMutations';
import { useAuth } from '@/lib/hooks/useAuth';

const PreviewModal = dynamic(() => import('@/components/PreviewModal'), {
  ssr: false,
});
import type { BlogListItem } from '@/types/blog';

type FilterType = 'all' | 'published' | 'draft' | 'featured';

export default function DashboardPage() {
    const router = useRouter();
    const { logout, user } = useAuth();
    const { blogs, loading, error, refetch } = useBlogs();
    const {
        deleteBlog, togglePublish, toggleFeatured,
        bulkPublish, bulkUnpublish, bulkDelete,
        deleting, toggling
    } = useBlogMutations();

    // Local state
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [selectedBlogs, setSelectedBlogs] = useState<Set<number>>(new Set());
    const [previewBlog, setPreviewBlog] = useState<BlogListItem | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    // Stats computation
    const stats = useMemo(() => {
        if (!blogs.length) return { total: 0, published: 0, draft: 0, featured: 0 };
        return {
            total: blogs.length,
            published: blogs.filter(b => b.published).length,
            draft: blogs.filter(b => !b.published).length,
            featured: blogs.filter(b => b.is_featured).length,
        };
    }, [blogs]);

    // Filtered blogs
    const filteredBlogs = useMemo(() => {
        let result = blogs;

        // Apply filter
        if (filterType === 'published') {
            result = result.filter(b => b.published);
        } else if (filterType === 'draft') {
            result = result.filter(b => !b.published);
        } else if (filterType === 'featured') {
            result = result.filter(b => b.is_featured);
        }

        // Apply search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(b =>
                b.title.toLowerCase().includes(query) ||
                b.category?.toLowerCase().includes(query) ||
                b.author_name?.toLowerCase().includes(query)
            );
        }

        return result;
    }, [blogs, filterType, searchQuery]);

    // Selection handlers
    const toggleSelectBlog = (id: number) => {
        setSelectedBlogs(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selectedBlogs.size === filteredBlogs.length) {
            setSelectedBlogs(new Set());
        } else {
            setSelectedBlogs(new Set(filteredBlogs.map(b => b.id)));
        }
    };

    // Bulk action handlers
    const handleBulkPublish = async () => {
        if (!selectedBlogs.size) return;
        const success = await bulkPublish(Array.from(selectedBlogs));
        if (success) {
            setSelectedBlogs(new Set());
            refetch();
        }
    };

    const handleBulkUnpublish = async () => {
        if (!selectedBlogs.size) return;
        const success = await bulkUnpublish(Array.from(selectedBlogs));
        if (success) {
            setSelectedBlogs(new Set());
            refetch();
        }
    };

    const handleBulkDelete = async () => {
        if (!selectedBlogs.size) return;
        if (!confirm(`Delete ${selectedBlogs.size} blogs? This cannot be undone.`)) return;
        const success = await bulkDelete(Array.from(selectedBlogs));
        if (success) {
            setSelectedBlogs(new Set());
            refetch();
        }
    };

    // Single action handlers
    const handleDelete = async (id: number) => {
        if (!confirm('Delete this blog? This cannot be undone.')) return;
        const success = await deleteBlog(id);
        if (success) refetch();
    };

    const handleTogglePublish = async (id: number) => {
        const success = await togglePublish(id);
        if (success) refetch();
    };

    const handleToggleFeatured = async (id: number) => {
        const success = await toggleFeatured(id);
        if (success) refetch();
    };

    const handlePreview = (blog: BlogListItem) => {
        setPreviewBlog(blog);
        setShowPreview(true);
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading blogs...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">Failed to load blogs: {error}</p>
                    <button
                        onClick={refetch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#2a2a2a]">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Blog Dashboard</h1>
                            <p className="text-gray-500 text-sm">
                                Welcome, {user?.name || 'Admin'}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={refetch}
                                className="p-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors"
                                title="Refresh"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => router.push('/blogs/new')}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                <span>New Blog</span>
                            </button>
                            <button
                                onClick={logout}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#1a1a1a] rounded-lg transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard icon={FileText} label="Total" value={stats.total} color="blue" />
                    <StatCard icon={CheckCircle} label="Published" value={stats.published} color="green" />
                    <StatCard icon={Eye} label="Drafts" value={stats.draft} color="yellow" />
                    <StatCard icon={TrendingUp} label="Featured" value={stats.featured} color="purple" />
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search blogs by title, category, or author..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-500" />
                        {(['all', 'published', 'draft', 'featured'] as FilterType[]).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setFilterType(filter)}
                                className={`px-3 py-2 text-sm rounded-lg capitalize transition-colors ${filterType === filter
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2a2a2a]'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bulk Actions Bar */}
                {selectedBlogs.size > 0 && (
                    <div className="flex items-center gap-4 p-4 mb-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                        <span className="text-blue-400 font-medium">
                            {selectedBlogs.size} blog{selectedBlogs.size > 1 ? 's' : ''} selected
                        </span>
                        <div className="flex-1" />
                        <button
                            onClick={handleBulkPublish}
                            className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Publish
                        </button>
                        <button
                            onClick={handleBulkUnpublish}
                            className="px-3 py-1.5 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                        >
                            Unpublish
                        </button>
                        <button
                            onClick={handleBulkDelete}
                            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => setSelectedBlogs(new Set())}
                            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white"
                        >
                            Cancel
                        </button>
                    </div>
                )}

                {/* Blog List */}
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-16">
                        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-400 mb-2">
                            {searchQuery || filterType !== 'all' ? 'No blogs match your filter' : 'No blogs yet'}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {searchQuery || filterType !== 'all'
                                ? 'Try adjusting your search or filter'
                                : 'Create your first blog post to get started'}
                        </p>
                        {!searchQuery && filterType === 'all' && (
                            <button
                                onClick={() => router.push('/blogs/new')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Create First Blog
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="col-span-1">
                                <button onClick={toggleSelectAll} className="p-1 hover:text-white">
                                    {selectedBlogs.size === filteredBlogs.length && filteredBlogs.length > 0
                                        ? <CheckSquare className="w-4 h-4" />
                                        : <Square className="w-4 h-4" />
                                    }
                                </button>
                            </div>
                            <div className="col-span-5">Title</div>
                            <div className="col-span-2">Category</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>

                        {/* Blog Rows */}
                        {filteredBlogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl hover:border-[#3a3a3a] transition-all"
                            >
                                {/* Checkbox */}
                                <div className="hidden md:flex md:col-span-1 items-center">
                                    <button
                                        onClick={() => toggleSelectBlog(blog.id)}
                                        className="p-1 text-gray-500 hover:text-white"
                                    >
                                        {selectedBlogs.has(blog.id)
                                            ? <CheckSquare className="w-5 h-5 text-blue-500" />
                                            : <Square className="w-5 h-5" />
                                        }
                                    </button>
                                </div>

                                {/* Title & Info */}
                                <div className="md:col-span-5">
                                    <h3 className="font-medium text-white line-clamp-1 mb-1">
                                        {blog.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-1">
                                        {blog.excerpt || 'No excerpt'}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        by {blog.author_name || 'Unknown'} • {new Date(blog.created_at).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Category */}
                                <div className="md:col-span-2 flex items-center">
                                    {blog.category ? (
                                        <span className="px-2 py-1 text-xs font-medium bg-[#2a2a2a] text-gray-400 rounded">
                                            {blog.category}
                                        </span>
                                    ) : (
                                        <span className="text-gray-600 text-sm">—</span>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="md:col-span-2 flex items-center gap-2">
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded ${blog.published
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                        {blog.published ? (
                                            <>
                                                <Eye className="w-3 h-3" />
                                                Published
                                            </>
                                        ) : (
                                            <>
                                                <EyeOff className="w-3 h-3" />
                                                Draft
                                            </>
                                        )}
                                    </span>
                                    {blog.is_featured && (
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="md:col-span-2 flex items-center justify-end gap-1">
                                    <button
                                        onClick={() => handlePreview(blog)}
                                        className="p-2 text-gray-500 hover:text-white hover:bg-[#2a2a2a] rounded-lg"
                                        title="Preview"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => router.push(`/blogs/edit/${blog.id}`)}
                                        className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"
                                        title="Edit"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleToggleFeatured(blog.id)}
                                        disabled={toggling}
                                        className={`p-2 rounded-lg ${blog.is_featured
                                                ? 'text-yellow-400 hover:bg-yellow-500/10'
                                                : 'text-gray-500 hover:text-yellow-400 hover:bg-yellow-500/10'
                                            }`}
                                        title={blog.is_featured ? 'Unfeature' : 'Feature'}
                                    >
                                        <Star className={`w-4 h-4 ${blog.is_featured ? 'fill-yellow-400' : ''}`} />
                                    </button>
                                    <button
                                        onClick={() => handleTogglePublish(blog.id)}
                                        disabled={toggling}
                                        className="p-2 text-gray-500 hover:text-green-400 hover:bg-green-500/10 rounded-lg"
                                        title={blog.published ? 'Unpublish' : 'Publish'}
                                    >
                                        {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        disabled={deleting}
                                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Preview Modal */}
            {showPreview && previewBlog && (
                <PreviewModal
                    blog={previewBlog}
                    onClose={() => {
                        setShowPreview(false);
                        setPreviewBlog(null);
                    }}
                />
            )}
        </div>
    );
}

/**
 * Stat card component.
 */
interface StatCardProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: number;
    color: 'blue' | 'green' | 'yellow' | 'purple';
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
    const colors = {
        blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        green: 'bg-green-500/10 text-green-400 border-green-500/20',
        yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    };

    return (
        <div className={`p-4 rounded-xl border ${colors[color]}`}>
            <div className="flex items-center gap-3">
                <Icon className="w-8 h-8" />
                <div>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-sm opacity-75">{label}</p>
                </div>
            </div>
        </div>
    );
}
