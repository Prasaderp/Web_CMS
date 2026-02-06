# AiGENThix CMS Admin

A minimal, static HTML/CSS/JavaScript CMS admin panel for managing blog content.

## Features

- 🎨 **Premium Dark Theme** - Modern, responsive design
- 🔐 **Authentication** - JWT-based login with secure token storage
- 📝 **Blog Management** - Create, edit, delete, publish/unpublish blog posts
- 🔍 **Search & Filter** - Search by title, category, author; filter by status
- ✨ **Bulk Actions** - Publish, unpublish, or delete multiple blogs at once
- 👁️ **Preview Modal** - Quick preview of blog posts
- ⚡ **Zero Build Step** - Pure static files, no compilation needed

## Structure

```
cms-admin-v2/
├── index.html           # Entry point (redirects to login/dashboard)
├── login.html           # Login page
├── dashboard.html       # Blog management dashboard
├── blog-new.html        # Create new blog
├── blog-edit.html       # Edit existing blog
├── css/
│   └── styles.css       # All styles (dark theme)
├── js/
│   ├── env.js           # Environment config (API URL)
│   ├── config.js        # App configuration
│   ├── utils.js         # Utility functions
│   ├── auth.js          # Authentication service
│   ├── api.js           # API client
│   ├── dashboard.js     # Dashboard controller
│   └── blog-form.js     # Blog form controller
└── package.json         # Minimal package for serving
```

## Setup

### Local Development

1. **Configure API URL**

   Edit `js/env.js` and set your backend URL:
   ```javascript
   window.CMS_API_URL = 'http://localhost:8000';
   ```

2. **Start the server**

   ```bash
   npx serve -s . -l 3000
   ```

3. **Open in browser**

   Navigate to `http://localhost:3000`

### Production Deployment on Render

1. The app is configured for static site deployment in `render.yaml`

2. Before deploying, update `js/env.js` with your production backend URL:
   ```javascript
   window.CMS_API_URL = 'https://your-backend.onrender.com';
   ```

3. Push to your repository - Render will automatically deploy

## API Requirements

This admin panel expects the following backend API endpoints:

### Authentication
- `POST /api/auth/login` - Login with email/password

### Blogs
- `GET /api/admin/blogs` - List all blogs
- `GET /api/admin/blogs/:id` - Get single blog
- `POST /api/admin/blogs` - Create blog
- `PUT /api/admin/blogs/:id` - Update blog
- `DELETE /api/admin/blogs/:id` - Delete blog
- `PATCH /api/admin/blogs/:id/publish` - Toggle publish status
- `PATCH /api/admin/blogs/:id/featured` - Toggle featured status
- `POST /api/admin/blogs/bulk/publish` - Bulk publish
- `POST /api/admin/blogs/bulk/unpublish` - Bulk unpublish
- `POST /api/admin/blogs/bulk/delete` - Bulk delete

### Upload
- `POST /api/admin/upload/image` - Upload image (multipart/form-data)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
