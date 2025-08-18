# Deployment Guide

## Deploy to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial workout app commit"
git push origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
5. Click "Deploy"

### 3. Set Up Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Run the SQL commands from the README.md file
4. Get your project URL and keys from Settings > API

### 4. Update Environment Variables
After setting up Supabase, update your Vercel environment variables with the actual values.

## Local Development
```bash
npm run dev
# Open http://localhost:3000
```

## Build for Production
```bash
npm run build
npm start
```

## Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```
