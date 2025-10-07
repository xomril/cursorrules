# Deployment Guide

This guide will help you deploy the CursorRules Guide website to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Basic knowledge of Git and GitHub

## Step 1: Fork the Repository

1. Go to the [CursorRules Guide repository](https://github.com/xomril/cursorrules)
2. Click the "Fork" button in the top-right corner
3. Choose your GitHub account as the destination

## Step 2: Clone Your Fork

```bash
git clone https://github.com/xomril/cursorrules.git
cd cursorrules
```

## Step 3: Enable GitHub Pages

1. Go to your forked repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch
6. Select "/ (root)" folder
7. Click "Save"

## Step 4: Update URLs

Update the following files with your GitHub username:

1. **sitemap.xml**: Replace `yourusername` with your actual GitHub username
2. **robots.txt**: Replace `yourusername` with your actual GitHub username

## Step 5: Customize Content

1. Edit the content to match your needs
2. Update the README.md with your information
3. Modify the examples to match your preferred technologies

## Step 6: Deploy

1. Commit your changes:
```bash
git add .
git commit -m "Initial deployment setup"
git push origin main
```

2. Wait for GitHub Pages to build (usually takes 1-2 minutes)
3. Your site will be available at: `https://yourusername.github.io/cursorrules`

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the root directory with your domain name
2. Configure your DNS settings to point to GitHub Pages
3. Enable "Enforce HTTPS" in GitHub Pages settings

## Updating the Site

To update the site:

1. Make your changes locally
2. Commit and push:
```bash
git add .
git commit -m "Update content"
git push origin main
```

3. GitHub Pages will automatically rebuild and deploy

## Troubleshooting

### Site Not Loading
- Check that GitHub Pages is enabled in repository settings
- Verify the branch and folder settings are correct
- Wait a few minutes for the build to complete

### Changes Not Appearing
- Clear your browser cache
- Check the GitHub Actions tab for build errors
- Verify your changes were pushed to the main branch

### Custom Domain Issues
- Check DNS propagation (can take up to 24 hours)
- Verify the CNAME file is in the root directory
- Ensure HTTPS is enabled in GitHub Pages settings

## Contributing Back

If you make improvements that would benefit others:

1. Create a pull request to the original repository
2. Describe your changes in the PR description
3. Follow the existing code style and structure

## Support

If you encounter issues:

1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Open an issue in the repository
3. Join the GitHub community discussions

---

Happy deploying! 🚀
