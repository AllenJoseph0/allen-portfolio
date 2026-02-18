# 🚀 How to Deploy to Render

## Prerequisites
1. Ensure your code is pushed to **GitHub**.
2. Ensure you have your **Supabase Connection String** ready (starts with `postgres://...`).

## Step 1: Create Web Service
1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.

## Step 2: Configure Service
Fill in the following details:

*   **Name:** `portfolio-backend` (or similar)
*   **Region:** Choose the one closest to you (e.g., Singapore, Frankfurt, Oregon)
*   **Branch:** `main` (or `master`)
*   **Root Directory:** `backend` (⚠️ Important: since your backend is in a subfolder)
*   **Runtime:** `Node`
*   **Build Command:** `npm install`
*   **Start Command:** `node server.js`

## Step 3: Environment Variables
1. Scroll down to the **Environment Variables** section.
2. Click **Add Environment Variable**.
3. Add the following:
    *   **Key:** `DATABASE_URL`
    *   **Value:** *(Paste your Supabase Connection String here)*
    *   **Key:** `PORT`
    *   **Value:** `10000` (Optional, Render sets this automatically, but good to be explicit)

## Step 4: Deploy
1. Click **Create Web Service**.
2. Wait for the logs to say "Build successful" and "Portfolio backend running...".
3. Copy the URL provided by Render (e.g., `https://portfolio-backend.onrender.com`).

## Step 5: Update Frontend
1. Go to your frontend code (`src/hooks/useVisitorTracking.ts` or similar).
2. Update the API URL to point to your new Render URL instead of `localhost:5000`.
   *   Change: `http://localhost:5000/api/visitors`
   *   To: `https://your-app-name.onrender.com/api/visitors`
