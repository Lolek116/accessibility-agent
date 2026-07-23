# ♿ Accessibility Agent

An AI-powered web accessibility improvement tool built for the ChatGPT CODEX INDIA HACKATHON 2026 (Theme 8: AI for Societal Good).

## 🎯 Problem Statement

Web accessibility remains a significant challenge, with millions of websites lacking proper alt text for images, ARIA labels for interactive elements, and other accessibility features. This creates barriers for users with disabilities to access digital content and services.

## 💡 Solution

Accessibility Agent uses OpenAI's Codex to automatically analyze web pages and generate:
- **Descriptive alt text** for images without proper accessibility labels
- **ARIA labels** for interactive elements (buttons, links, forms)
- **Improved HTML** that can be downloaded and implemented

## 🚀 Features

- **URL Analysis**: Simply enter a URL to analyze its accessibility
- **AI-Powered Suggestions**: Uses GPT-4o to generate contextual accessibility improvements
- **Before/After Comparison**: See original content vs. AI-suggested improvements
- **Export Functionality**: Download improved HTML for immediate implementation
- **Demo Mode**: Test the tool with sample data without an API key

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI GPT-4o API
- **Web Scraping**: Cheerio for HTML parsing
- **Deployment**: Vercel

## 📋 Quick Start

1. Clone the repository:
```bash
git clone <your-repo-url>
cd accessibility-agent
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your OpenAI API key:
```bash
cp .env.example .env.local
# Edit .env.local and add your OpenAI API key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 🎯 Hackathon Submission

- **Theme**: Theme 8 - AI for Societal Good
- **Track**: Accessibility agents (alt-text, ARIA, captions)
- **Built with**: OpenAI Codex demonstrating genuine agentic usage
- **Deadline**: 3rd August 2026

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete deployment and submission instructions
- [SETUP.md](SETUP.md) - Local development setup instructions

## 🌟 Impact

This tool helps make the web more accessible by:
- Reducing the manual effort required to add accessibility features
- Providing contextual, intelligent suggestions for improvements
- Enabling developers and content creators to implement accessibility quickly
- Supporting compliance with WCAG guidelines

## 📝 License

MIT License - feel free to use and modify for your accessibility initiatives.
