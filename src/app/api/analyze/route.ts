import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Fetch the webpage content
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract images
    const images: any[] = [];
    $('img').each((index, element) => {
      const src = $(element).attr('src');
      const alt = $(element).attr('alt');
      if (src) {
        images.push({
          src,
          alt: alt || '',
          suggestedAlt: '', // Will be filled by AI
        });
      }
    });

    // Extract interactive elements
    const interactive: any[] = [];
    $('button, a, input, select, textarea').each((index, element) => {
      const tag = (element as any).tagName || (element as any).name || 'unknown';
      const ariaLabel = $(element).attr('aria-label');
      const text = $(element).text().trim().substring(0, 100);
      
      if (!ariaLabel && text) {
        interactive.push({
          tag,
          text,
          ariaLabel: ariaLabel || '',
          suggestedAria: '', // Will be filled by AI
        });
      }
    });

    // Use OpenAI to generate accessibility improvements
    const imagePrompt = images.length > 0 
      ? `Generate descriptive alt text for these ${images.length} images. Return a JSON object with a "suggestions" array containing objects with "suggestedAlt" field. Images: ${JSON.stringify(images.map(img => ({ src: img.src, currentAlt: img.alt })))}`
      : null;

    const interactivePrompt = interactive.length > 0
      ? `Generate ARIA labels for these ${interactive.length} interactive elements. Return a JSON object with a "suggestions" array containing objects with "suggestedAria" field. Elements: ${JSON.stringify(interactive.map(el => ({ tag: el.tag, text: el.text })))}`
      : null;

    let imageSuggestions: any[] = [];
    let interactiveSuggestions: any[] = [];

    if (imagePrompt) {
      try {
        const imageCompletion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "You are an accessibility expert. Generate descriptive alt text for images to improve web accessibility. Return only valid JSON." },
            { role: "user", content: imagePrompt }
          ],
          response_format: { type: "json_object" },
        });

        const imageResponse = JSON.parse(imageCompletion.choices[0].message.content || '{"suggestions":[]}');
        imageSuggestions = imageResponse.suggestions || [];
      } catch (e) {
        console.error('Image analysis error:', e);
        imageSuggestions = images.map(() => ({ suggestedAlt: 'Descriptive alt text needed' }));
      }
    }

    if (interactivePrompt) {
      try {
        const interactiveCompletion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "You are an accessibility expert. Generate ARIA labels for interactive elements to improve web accessibility. Return only valid JSON." },
            { role: "user", content: interactivePrompt }
          ],
          response_format: { type: "json_object" },
        });

        const interactiveResponse = JSON.parse(interactiveCompletion.choices[0].message.content || '{"suggestions":[]}');
        interactiveSuggestions = interactiveResponse.suggestions || [];
      } catch (e) {
        console.error('Interactive analysis error:', e);
        interactiveSuggestions = interactive.map(() => ({ suggestedAria: 'Descriptive ARIA label needed' }));
      }
    }

    // Merge suggestions with original data
    const imagesWithSuggestions = images.map((img, index) => {
      const suggestion = imageSuggestions[index]?.suggestedAlt;
      return {
        ...img,
        suggestedAlt: suggestion && suggestion !== 'Descriptive alt text needed' ? suggestion : (img.alt || 'No alt text provided'),
      };
    });

    const interactiveWithSuggestions = interactive.map((el, index) => {
      const suggestion = interactiveSuggestions[index]?.suggestedAria;
      return {
        ...el,
        suggestedAria: suggestion && suggestion !== 'Descriptive ARIA label needed' ? suggestion : (el.ariaLabel || el.text || 'No ARIA label provided'),
      };
    });

    // Generate improved HTML
    let improvedHtml = html;
    imagesWithSuggestions.forEach((img) => {
      if (img.suggestedAlt && img.suggestedAlt !== 'No alt text provided' && !img.alt) {
        improvedHtml = improvedHtml.replace(
          new RegExp(`<img[^>]*src="${img.src}"[^>]*>`, 'i'),
          (match) => {
            if (match.includes('alt=')) {
              return match.replace(/alt="[^"]*"/, `alt="${img.suggestedAlt}"`);
            }
            return match.replace('>', ` alt="${img.suggestedAlt}">`);
          }
        );
      }
    });

    interactiveWithSuggestions.forEach((el) => {
      if (el.suggestedAria && el.suggestedAria !== 'No ARIA label provided' && !el.ariaLabel) {
        const regex = new RegExp(`<${el.tag}([^>]*)>`, 'gi');
        improvedHtml = improvedHtml.replace(regex, (match, attrs) => {
          if (!attrs.toLowerCase().includes('aria-label')) {
            return `<${el.tag}${attrs} aria-label="${el.suggestedAria}">`;
          }
          return match;
        });
      }
    });

    return NextResponse.json({
      images: imagesWithSuggestions,
      interactive: interactiveWithSuggestions,
      improvedHtml,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze URL' },
      { status: 500 }
    );
  }
}