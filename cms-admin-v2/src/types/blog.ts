/**
 * Type definitions for blog-related data structures.
 * Ensures type safety across the entire CMS application.
 */

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category?: string;
  tags: string[];
  featured_image_url?: string;

  // Author fields
  author_name?: string;
  author_bio?: string;
  author_avatar_url?: string;
  author_twitter?: string;
  author_linkedin?: string;
  author_facebook?: string;
  author_instagram?: string;
  author_github?: string;
  author_website?: string;

  // CTA fields
  cta_text?: string;
  cta_url?: string;
  cta_style?: 'primary' | 'secondary' | 'outline';
  cta_position?: 'top' | 'bottom' | 'both';

  // Metadata
  published: boolean;
  is_featured: boolean;
  read_time: number;
  created_at: string;
  updated_at: string;
}

export interface BlogFormData extends Omit<Blog, 'id' | 'created_at' | 'updated_at' | 'read_time'> {
  // Form-specific fields if needed
}

export interface BlogListItem {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  tags: string[];
  featured_image_url?: string;
  author_name?: string;
  published: boolean;
  is_featured: boolean;
  read_time?: number;
  created_at: string;
}

export interface BlogPageData {
  featured: BlogListItem | null;
  latest: BlogListItem[];
  popular: BlogListItem[];
  categories: Array<{ id: number; name: string; description?: string }>;
}
