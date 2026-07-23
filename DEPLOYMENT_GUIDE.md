# 🚀 Deployment Guide for Hackathon Submission

## Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `accessibility-agent`
3. Description: `AI-powered web accessibility improvement tool for ChatGPT CODEX INDIA HACKATHON 2026`
4. Make it **Public**
5. Click "Create repository"

## Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
cd accessibility-agent
git remote add origin https://github.com/YOUR_USERNAME/accessibility-agent.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import" and select your GitHub repository
3. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. **Important**: Add Environment Variable:
   - Name: `OPENAI_API_KEY`
   - Value: Your actual OpenAI API key
5. Click "Deploy"
6. Wait for deployment to complete (usually 1-2 minutes)
7. Copy the deployed URL (e.g., `https://accessibility-agent.vercel.app`)

## Step 4: Test Deployed Application

1. Visit your deployed URL
2. Click "Run Demo" to test without API key
3. For full functionality, add your OpenAI API key in Vercel dashboard
4. Test with a real URL analysis

## Step 5: Create Demo Video

Record a 3-minute demo showing:

1. **Introduction** (30 seconds):
   - Explain the problem (web accessibility)
   - Show the application interface

2. **Demo Mode** (45 seconds):
   - Click "Run Demo" button
   - Show the analysis results
   - Display alt-text and ARIA suggestions
   - Show the export functionality

3. **Real URL Analysis** (45 seconds):
   - Enter a real URL (e.g., example.com)
   - Show the analysis process
   - Display results and improvements
   - Download improved HTML

4. **Conclusion** (30 seconds):
   - Explain the impact and benefits
   - Mention the tech stack and AI integration
   - Show the deployed link

**Recording Tips**:
- Use screen recording (OBS, Loom, or built-in tools)
- Speak clearly and explain each step
- Show the complete user flow
- Keep it under 3 minutes

## Step 6: Create Project Description Document

Create a Google Doc with the following structure:

### Title: Accessibility Agent - AI for Societal Good

#### Track & Theme
- **Theme**: Theme 8 - AI for Societal Good
- **Problem Statement**: Accessibility agents (alt-text, ARIA, captions)

#### Problem Description
Web accessibility remains a significant challenge, with millions of websites lacking proper alt text for images, ARIA labels for interactive elements, and other accessibility features. This creates barriers for users with disabilities to access digital content and services. Manual accessibility auditing is time-consuming and requires specialized knowledge.

#### Solution Overview
Accessibility Agent uses OpenAI's GPT-4o to automatically analyze web pages and generate:
- Descriptive alt text for images without proper accessibility labels
- ARIA labels for interactive elements (buttons, links, forms)
- Improved HTML that can be downloaded and implemented

#### Technical Stack
- **Frontend**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI GPT-4o API
- **Web Scraping**: Cheerio for HTML parsing
- **Deployment**: Vercel

#### Key Features
1. URL Analysis - Simply enter a URL to analyze its accessibility
2. AI-Powered Suggestions - Uses GPT-4o to generate contextual accessibility improvements
3. Before/After Comparison - See original content vs. AI-suggested improvements
4. Export Functionality - Download improved HTML for immediate implementation
5. Demo Mode - Test the tool with sample data without an API key

#### Impact & Benefits
- Reduces manual effort required to add accessibility features
- Provides contextual, intelligent suggestions for improvements
- Enables developers and content creators to implement accessibility quickly
- Supports compliance with WCAG guidelines
- Makes the web more accessible for users with disabilities

#### How It Works
1. User enters a URL to analyze
2. System fetches and parses the webpage HTML
3. AI analyzes images and interactive elements
4. GPT-4o generates contextual alt-text and ARIA labels
5. User can review suggestions and export improved HTML
6. Improved code can be implemented immediately

#### Demo Video Link
[Add your demo video link here]

#### Deployed Application Link
[Add your Vercel deployment link here]

#### GitHub Repository Link
[Add your GitHub repository link here]

---

**Make the Google Doc publicly accessible** and ensure it remains available throughout the evaluation period.

## Step 7: Final Submission

1. Go to [BlockseBlock Dashboard](https://blockseblock.com/dashboard)
2. Click "Create Project"
3. Enter Project Name: `Accessibility Agent`
4. Select Track: `Theme 8 - AI for Societal Good`
5. Click "Save & Next"
6. Add the required links:
   - Deployed Application Link
   - GitHub Repository Link
   - Demo Video Link
   - Project Description (Google Doc Link)
7. Click "Submit Now"
8. Toggle on both Notes
9. Click "Continue"
10. Click "Final Submit" (⚠️ This cannot be undone!)

## Verification

To verify your submission:
- Go to Dashboard → My Projects
- It should show "Submitted" against your project

---

**Good luck with the hackathon! 🎉**