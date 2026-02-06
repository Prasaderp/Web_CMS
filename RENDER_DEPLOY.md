# 🚀 AiGENThix CMS - Render Deployment Guide

This guide explains how to deploy the complete AiGENThix CMS system to Render, consisting of:
- **Backend API** (Python FastAPI) - Your API server
- **CMS Admin** (Static HTML/CSS/JS) - Admin dashboard for content management
- **Website** (Vite/React) - Public-facing website

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **Neon Database**: Your PostgreSQL database (already provided)
3. **Cloudinary Account**: For media uploads (you already have credentials)
4. **GitHub Repository**: Push your code to GitHub

---

## 🗄️ Step 1: Database Setup (Neon PostgreSQL)

Your Neon database connection string:
```
postgresql://neondb_owner:npg_NgBFDZX0r2UM@ep-sparkling-thunder-a1kapzml-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

The backend is already configured to handle this connection string with SSL.

---

## 🔧 Step 2: Deploy Backend API (First!)

> ⚠️ **Deploy the backend FIRST** - the frontends need its URL.

### Option A: Using Render Dashboard (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `aigenthix-backend`
   - **Root Directory**: `backend-v2`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

5. Click **"Advanced"** → Add Environment Variables:

| Key | Value |
|-----|-------|
| `SECRET_KEY` | (Auto-generate: Use Render's "Generate" button or run `python -c "import secrets; print(secrets.token_urlsafe(32))"`) |
| `DATABASE_URL` | `postgresql://neondb_owner:npg_NgBFDZX0r2UM@ep-sparkling-thunder-a1kapzml-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| `CORS_ORIGINS` | `https://aigenthix-cms.onrender.com,https://aigenthix-website.onrender.com` (update with your actual URLs) |
| `CLOUDINARY_CLOUD_NAME` | `dijbgepkx` |
| `CLOUDINARY_API_KEY` | `895962361469972` |
| `CLOUDINARY_API_SECRET` | `rcVHGPBkE3ahX_tZ46YKetxsRE4` |
| `DEBUG` | `false` |
| `ADMIN_EMAIL` | `admin@yourdomain.com` |
| `ADMIN_PASSWORD` | `YOUR_SECURE_PASSWORD` |

6. Click **"Create Web Service"**

7. **Copy your backend URL** (e.g., `https://aigenthix-backend.onrender.com`)

---

## 🖥️ Step 3: Deploy CMS Admin (Static Site)

> ⚡ **The CMS Admin is now a pure static HTML/CSS/JS site** - no build step required!

### Step 3a: Configure API URL

Before deploying, update the API URL in `cms-admin-v2/js/env.js`:

```javascript
// Set your backend URL (from Step 2)
window.CMS_API_URL = 'https://aigenthix-backend.onrender.com';
```

### Step 3b: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect the same repository
4. Configure:
   - **Name**: `aigenthix-cms`
   - **Root Directory**: `cms-admin-v2`
   - **Build Command**: (leave empty - no build needed)
   - **Publish Directory**: `.` (just a single dot - means "current directory")

5. **No environment variables needed** - configuration is in `js/env.js`

6. Click **"Create Static Site"**

---

## 🌐 Step 4: Deploy Website (Vite/React Static Site)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect the same repository
4. Configure:
   - **Name**: `aigenthix-website`
   - **Root Directory**: `website-v2`
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`

5. Add Environment Variables:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://aigenthix-backend.onrender.com` (your backend URL from Step 2) |

6. Click **"Create Static Site"**

7. Go to **Redirects/Rewrites** and add:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`

   This enables client-side routing.

---

## 🔄 Step 5: Update CORS Origins

After all services are deployed, update the backend's `CORS_ORIGINS`:

1. Go to your backend service on Render
2. Click **"Environment"**
3. Update `CORS_ORIGINS` with your actual frontend URLs:
   ```
   https://aigenthix-cms.onrender.com,https://aigenthix-website.onrender.com
   ```
4. Click **"Save Changes"** (this will trigger a redeploy)

---

## ✅ Step 6: Verify Deployment

### Test Backend API
```bash
curl https://aigenthix-backend.onrender.com/health
```
Expected response: `{"status": "healthy", ...}`

### Test CMS Admin
1. Visit `https://aigenthix-cms.onrender.com`
2. Login with your admin credentials

### Test Website
1. Visit `https://aigenthix-website.onrender.com`
2. Content should load from the CMS

---

## 🎯 Alternative: Using render.yaml Blueprint

If you prefer one-click deployment, use the included `render.yaml`:

1. Push code to GitHub (including `render.yaml` at root)
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click **"New +"** → **"Blueprint"**
4. Connect your repository
5. Render will detect `render.yaml` and create all services
6. Fill in the manual environment variables when prompted

---

## 📝 Environment Variables Summary

### Backend (`backend-v2`)
| Variable | Required | Description |
|----------|----------|-------------|
| `SECRET_KEY` | ✅ | JWT signing key (min 32 chars) |
| `DATABASE_URL` | ✅ | Neon PostgreSQL connection string |
| `CORS_ORIGINS` | ✅ | Comma-separated frontend URLs |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary API secret |
| `DEBUG` | ❌ | Set to `false` in production |
| `ADMIN_EMAIL` | ❌ | Initial admin email |
| `ADMIN_PASSWORD` | ❌ | Initial admin password |

### CMS Admin (`cms-admin-v2`)

> **Note**: The CMS Admin is now a static site. Configuration is done in `js/env.js`, not environment variables.

| File | Required | Description |
|------|----------|-------------|
| `js/env.js` | ✅ | Set `window.CMS_API_URL` to your backend URL |

### Website (`website-v2`)
| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | ✅ | Backend API URL |

---

## 🔧 Troubleshooting

### Backend not starting?
- Check Render logs for errors
- Verify `DATABASE_URL` is correct
- Ensure `SECRET_KEY` is at least 32 characters

### Database connection failed?
- Verify Neon database is active
- Check if connection string includes `?sslmode=require&channel_binding=require`

### CMS can't connect to backend?
- Verify `window.CMS_API_URL` in `js/env.js` is correct
- Check if `CORS_ORIGINS` includes CMS URL
- Ensure you committed the updated `js/env.js` file

### Website shows CORS errors?
- Update `CORS_ORIGINS` in backend to include website URL
- Make sure URLs don't have trailing slashes

### First login not working?
- Check if `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set
- The admin user is created only if no users exist in the database

---

## 🔒 Security Checklist

- [ ] `DEBUG` is set to `false`
- [ ] `SECRET_KEY` is unique and secure
- [ ] `ADMIN_PASSWORD` is strong
- [ ] `.env` files are not committed to git
- [ ] CORS is restricted to your frontend domains only

---

## 📞 Support

If you encounter issues:
1. Check Render service logs
2. Verify all environment variables are set
3. Test the backend health endpoint first
