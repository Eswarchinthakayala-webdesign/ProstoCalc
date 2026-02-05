
# ProstoCalc - Treatment Cost Estimator

## Setup & Testing

### 1. Configure Environment
Ensure you have a `.env` file in the root directory with your Mistral API key:
```
MISTRAL_API_KEY=your_api_key_here
```

### 2. Test AI Connection Logic (Local)
To verify that your API key is correct and the AI model is responding, I have created a test script. Run this in your terminal:

```bash
node scripts/test-mistral.js
```
If successful, you will see a sample response from the AI.

### 3. Test Full Application (Frontend + API)
Because this project uses Vercel Serverless Functions (`api/` folder), the default `npm run dev` (Vite) **will not serve the API endpoints**. USE `vercel dev` instead.

**Prerequisite:** Install Vercel CLI: `npm i -g vercel`

**Run Command:**
```bash
vercel dev
```
This will start a local server at `http://localhost:3000` (usually) where both the frontend and the `/api/explain-cost` endpoint are working.

### 4. Deploying to Vercel
1.  Push code to GitHub.
2.  Import project in Vercel Dashboard.
3.  **Add Environment Variable**: `MISTRAL_API_KEY` in Vercel Project Settings.
4.  Deploy.

## iOS Integration
See `ios-reference/CostEstimator.swift` for a Swift class you can drop into your iOS project to call the API.
