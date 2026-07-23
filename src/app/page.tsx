'use client';

import { useState } from 'react';

interface ImageResult {
  src: string;
  alt: string;
  suggestedAlt: string;
}

interface InteractiveResult {
  tag: string;
  text: string;
  ariaLabel: string;
  suggestedAria: string;
}

interface AnalysisResult {
  images: ImageResult[];
  interactive: InteractiveResult[];
  improvedHtml: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const analyzeUrl = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to analyze URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const runDemo = () => {
    const demoResult: AnalysisResult = {
      images: [
        {
          src: '/example1.jpg',
          alt: '',
          suggestedAlt: 'A person using a wheelchair accessing a modern building with a ramp'
        },
        {
          src: '/example2.jpg',
          alt: 'photo',
          suggestedAlt: 'Team of diverse professionals collaborating in an accessible office space'
        }
      ],
      interactive: [
        {
          tag: 'button',
          text: 'Click here',
          ariaLabel: '',
          suggestedAria: 'Submit the contact form to send your message'
        },
        {
          tag: 'a',
          text: 'Learn more',
          ariaLabel: '',
          suggestedAria: 'Navigate to the about us page to learn more about our services'
        }
      ],
      improvedHtml: `<!DOCTYPE html>
<html>
<head>
  <title>Improved Accessibility Demo</title>
</head>
<body>
  <img src="/example1.jpg" alt="A person using a wheelchair accessing a modern building with a ramp">
  <img src="/example2.jpg" alt="Team of diverse professionals collaborating in an accessible office space">
  <button aria-label="Submit the contact form to send your message">Click here</button>
  <a href="/about" aria-label="Navigate to the about us page to learn more about our services">Learn more</a>
</body>
</html>`
    };
    setResult(demoResult);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ♿ Accessibility Agent
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            AI-powered web accessibility improvement tool
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter URL to analyze
            </label>
            <div className="flex gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={analyzeUrl}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
              <button
                onClick={runDemo}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Run Demo
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
        </div>

        {result && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Analysis Results
              </h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Images Found: {result.images.length}
                </h3>
                {result.images.length > 0 ? (
                  <div className="space-y-3">
                    {result.images.map((img: any, index: number) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <strong>Original:</strong> {img.src.substring(0, 50)}...
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <strong>Current Alt:</strong> {img.alt || 'None'}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          <strong>Suggested Alt:</strong> {img.suggestedAlt}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No images found</p>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Interactive Elements: {result.interactive.length}
                </h3>
                {result.interactive.length > 0 ? (
                  <div className="space-y-3">
                    {result.interactive.map((el: any, index: number) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <strong>Tag:</strong> {el.tag}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <strong>Current ARIA:</strong> {el.ariaLabel || 'None'}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          <strong>Suggested ARIA:</strong> {el.suggestedAria}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No interactive elements found</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    const htmlContent = result.improvedHtml;
                    const blob = new Blob([htmlContent], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'improved-accessibility.html';
                    a.click();
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Download Improved HTML
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
