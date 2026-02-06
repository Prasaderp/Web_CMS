# AiGENThix Website v2

Production-ready React website with clean architecture and shared utilities.

## Key Improvements from v1

### Environment Configuration
- **Before**: Hardcoded `API_URL` in components
- **After**: Centralized `config.js` with env vars

### Shared Utilities
- **Before**: Duplicate image optimization, date formatting in multiple files
- **After**: Reusable utility functions

### Service Layer
- **Before**: Inline `fetch` calls in components
- **After**: `BlogService` class for API calls

## Project Structure

```
src/
├── lib/
│   └── config.js           # Environment configuration
├── services/
│   └── blogService.js      # API service layer
├── utils/
│   ├── image.js            # Image optimization
│   ├── date.js             # Date formatting
│   └── text.js             # Text utilities
└── components/             # React components
```

## Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your API URL
```

3. **Run Development Server**
```bash
npm run dev
```

## Usage Examples

### Blog Service
```javascript
import { blogService } from '@/services/blogService';

// Get all blog data
const data = await blogService.getPageData();

// Get single blog
const blog = await blogService.getBlogBySlug('my-blog-post');
```

### Utilities
```javascript
import { optimizeImage } from '@/utils/image';
import { formatDate } from '@/utils/date';
import { truncateText } from '@/utils/text';

// Optimize images
const imageUrl = optimizeImage(blog.featured_image, 800);

// Format dates
const formattedDate = formatDate(blog.created_at);

// Truncate text
const excerpt = truncateText(blog.content, 150);
```

## Build for Production

```bash
npm run build
npm run preview  # Test production build
```

## Deployment

Deploy to Vercel, Netlify, or any static hosting.

Set environment variable:
- `VITE_API_URL` - Backend API URL
