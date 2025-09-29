# 🚀 Deployment Guide

This guide will walk you through deploying MOM Builder Free with:
- **Backend**: Railway (FastAPI)
- **Frontend**: Vercel (Flask)

## 📋 Prerequisites

- GitHub account
- Railway account ([railway.app](https://railway.app))
- Vercel account ([vercel.com](https://vercel.com))
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

---

## 🚂 Backend Deployment on Railway

### Step 1: Push to GitHub
```bash
# Initialize git repository (if not done already)
git init
git add .
git commit -m "feat: initial commit with Railway configuration"

# Create GitHub repository and push
git branch -M main
git remote add origin https://github.com/krishn1122/mom-builder-free.git
git push -u origin main
```

### Step 2: Deploy to Railway

1. **Go to [Railway](https://railway.app)** and sign in with GitHub
2. **Click "New Project"** → **"Deploy from GitHub repo"**
3. **Select your repository**: `krishn1122/mom-builder-free`
4. **Choose the backend folder**: Railway will detect the Python app
5. **Configure environment variables**:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `ENVIRONMENT`: `production`
   - `PORT`: `8000` (Railway will auto-assign if not set)

### Step 3: Configure Railway Settings

1. **In Railway dashboard**, go to your project
2. **Settings** → **Environment**:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ENVIRONMENT=production
   PORT=8000
   ```
3. **Settings** → **Networking**: Note your Railway URL (e.g., `https://your-app.railway.app`)

### Step 4: Test Backend Deployment

Visit your Railway URL endpoints:
- `https://your-app.railway.app/` - Should show API info
- `https://your-app.railway.app/api/health` - Should show health status

---

## ⚡ Frontend Deployment on Vercel

### Step 1: Update Frontend Configuration

1. **Update CORS in backend** (already done):
   - Add your Vercel domain to allowed origins
   - Update `backend/main.py` line 28 with your actual Vercel domain

2. **Update frontend environment**:
   ```bash
   # In frontend/.env (create if doesn't exist)
   SECRET_KEY=your-super-secret-key-here
   BACKEND_URL=https://your-railway-app.railway.app
   ENVIRONMENT=production
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com)** and sign in with GitHub
2. **Click "New Project"** → **Import Git Repository**
3. **Select your repository**: `krishn1122/mom-builder-free`
4. **Configure project**:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: Leave empty (Flask doesn't need build)
   - **Output Directory**: Leave empty
   - **Install Command**: `pip install -r requirements.txt`

### Step 3: Configure Vercel Environment Variables

In Vercel dashboard → **Settings** → **Environment Variables**:
```
SECRET_KEY=your-super-secret-key-here
BACKEND_URL=https://your-railway-app.railway.app
ENVIRONMENT=production
```

### Step 4: Update CORS Configuration

After getting your Vercel URL, update the backend CORS:

1. **Edit `backend/main.py`** line 28:
   ```python
   "https://your-actual-vercel-domain.vercel.app",
   ```

2. **Redeploy backend** on Railway (it will auto-deploy on git push)

---

## 🔧 Complete Deployment Steps

### 1. Prepare Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "feat: add deployment configurations"
git push origin main
```

### 2. Deploy Backend (Railway)
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select `krishn1122/mom-builder-free`
4. Choose root directory (Railway will detect backend)
5. Add environment variables:
   - `GEMINI_API_KEY=your_key_here`
   - `ENVIRONMENT=production`
6. Deploy and note the Railway URL

### 3. Deploy Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com)
2. New Project → Import from GitHub
3. Select `krishn1122/mom-builder-free`
4. Set root directory to `frontend`
5. Add environment variables:
   - `SECRET_KEY=your_secret_key`
   - `BACKEND_URL=https://your-railway-url`
   - `ENVIRONMENT=production`
6. Deploy and note the Vercel URL

### 4. Update CORS (Important!)
1. Edit `backend/main.py` line 28
2. Replace with your actual Vercel URL
3. Commit and push (Railway will auto-redeploy)

### 5. Test Complete Application
1. Visit your Vercel URL
2. Test both text input and image upload
3. Verify MOM generation works

---

## 🐛 Troubleshooting

### Backend Issues
- **Check Railway logs**: Dashboard → Deployments → View Logs
- **Environment variables**: Ensure `GEMINI_API_KEY` is set correctly
- **Health check**: Visit `/api/health` endpoint

### Frontend Issues
- **Check Vercel logs**: Dashboard → Functions → View Function Logs
- **CORS errors**: Ensure backend CORS includes your Vercel domain
- **Environment variables**: Verify `BACKEND_URL` points to Railway

### Common Issues
1. **CORS Error**: Update backend CORS with exact Vercel URL
2. **API Key Error**: Double-check Gemini API key in Railway
3. **Connection Error**: Ensure Railway backend is running and accessible

---

## 📊 Monitoring

### Railway Monitoring
- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Health checks**: Automatic health monitoring

### Vercel Monitoring
- **Analytics**: Page views, performance metrics
- **Function logs**: Serverless function execution logs
- **Performance**: Core Web Vitals tracking

---

## 🔄 Updates and Maintenance

### Updating the Application
1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Railway and Vercel will auto-deploy

### Environment Management
- **Development**: Use local `.env` files
- **Production**: Use platform environment variables
- **Staging**: Consider separate Railway/Vercel projects

---

## 💡 Tips for Success

1. **Test locally first**: Always test changes locally before deploying
2. **Monitor logs**: Check deployment logs for any issues
3. **Use environment variables**: Never hardcode secrets
4. **HTTPS only**: Both platforms provide HTTPS by default
5. **Custom domains**: Consider adding custom domains for production

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Railway/Vercel documentation
3. Check GitHub issues for similar problems
4. Create a new issue with detailed error logs
