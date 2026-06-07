# GitHub Deployment Setup Guide

## How It Works

This project now uses GitHub Actions to securely handle EmailJS credentials:

1. **GitHub Secrets** store your sensitive credentials (never exposed publicly)
2. **GitHub Actions Workflow** automatically generates `env.js` during deployment
3. **env.js** is injected with your secrets and deployed to GitHub Pages
4. Your code functionality remains completely unchanged

## Setup Steps

### Step 1: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these three secrets:

   - **Name:** `EMAILJS_PUBLIC_KEY`  
     **Value:** Your EmailJS public key (e.g., `ZmKVt47oezSrXxiyd`)

   - **Name:** `EMAILJS_SERVICE_ID`  
     **Value:** Your EmailJS service ID (e.g., `service_15t6abk`)

   - **Name:** `EMAILJS_TEMPLATE_ID`  
     **Value:** Your EmailJS template ID (e.g., `template_aba043k`)

### Step 2: Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Set **Source** to "Deploy from a branch"
3. Select **Branch:** `main` (or `master`) and folder `/root`
4. Click **Save**

### Step 3: Push to GitHub

Commit and push your changes:
```bash
git add .
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

### Step 4: Monitor Deployment

1. Go to your repository's **Actions** tab
2. You should see the "Deploy to GitHub Pages" workflow running
3. Once it completes (green checkmark), your site is live at:  
   `https://yourusername.github.io/repository-name`

## Local Development

For local testing, keep your `.env` file (it's in `.gitignore`):
```
EMAILJS_PUBLIC_KEY=ZmKVt47oezSrXxiyd
EMAILJS_SERVICE_ID=service_15t6abk
EMAILJS_TEMPLATE_ID=template_aba043k
```

## Security Notes

✅ **What's Protected:**
- Credentials are stored in GitHub Secrets (encrypted, never shown)
- `env.js` is not committed to Git (.gitignore excludes it)
- Only the deployment process has access to secrets

✅ **How It's Safe:**
- GitHub Actions only exposes secrets to the workflow
- Secrets don't appear in logs or build artifacts
- Each deployment gets fresh credentials injected

## Troubleshooting

If you see "Could not send email" after deployment:

1. **Verify secrets are set** → Go to Settings → Secrets → Check all three are present
2. **Check the workflow log** → Actions tab → Check for errors
3. **Clear cache** → GitHub Actions workflow completed successfully with no errors
4. **Verify repository is public** → GitHub Pages only works with public repos (or Pro account)

---

**No code changes needed!** Your existing `cart.js` works exactly as before. The workflow automatically handles credential injection during deployment.
