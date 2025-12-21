# Helios Capital - Solar Asset Financing

A premium banking loan application for solar panel financing, featuring a complex form with regulated PPA zones, financial calibration, and extensive technical inputs.

## Technical Stack
- **Framework:** Bun + Hono + React (SSR)
- **State Management:** Nanostores
- **Styling:** Bootstrap 5 (Dark Mode/Glassmorphism)

## Deployment Instructions

### 1. Activate GitHub Pages
To ensure the deployment pipeline works:
1. Go to your repository **Settings**.
2. Click on **Pages** in the left sidebar.
3. Under **Build and deployment** > **Source**, select **GitHub Actions** from the dropdown menu.
4. The configuration is already handled by `.github/workflows/deploy.yml`.

### 2. Monitoring Deployment
After pushing changes:
1. Go to the **Actions** tab in your repository.
2. You should see a workflow run named "Deploy to GitHub Pages".
3. Click on the run to view logs and verify success.
4. Once verified, the URL to your live site will be displayed in the deploy job logs or on the main repo page under "Environments".

### 3. Troubleshooting
If the workflow does not start automatically:
- Ensure you are pushing to the `main` or `master` branch.
- Check if "Workflow permissions" (under Settings > Actions > General) are set to "Read and write permissions".
