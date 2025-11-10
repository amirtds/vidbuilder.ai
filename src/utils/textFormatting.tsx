import React from 'react';

/**
 * Text Formatting Utility
 * 
 * Supports markdown-style color formatting:
 * - **text** = primary color
 * - ***text*** = secondary color
 * - ****text**** = accent color
 */

interface FormatTextOptions {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  defaultColor: string;
}

/**
 * Parse and format text with color markers
 * 
 * Examples:
 * - "Hello **world**" → "Hello " + <span color=primary>world</span>
 * - "***Amazing*** product" → <span color=secondary>Amazing</span> + " product"
 * - "Mix **primary** and ***secondary***" → formatted with both colors
 */
export function parseFormattedText(
  text: string,
  colors: FormatTextOptions
): React.ReactNode[] {
  if (!text) return [];

  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let key = 0;

  // Regex to match ****text****, ***text***, or **text**
  // Order matters: check 4 stars first, then 3, then 2
  const regex = /(\*{2,4})(.*?)\1/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeText = text.slice(currentIndex, match.index);
    if (beforeText) {
      parts.push(
        <span key={`text-${key++}`} style={{ color: colors.defaultColor }}>
          {beforeText}
        </span>
      );
    }

    const markerCount = match[1].length;
    const content = match[2];
    let color = colors.defaultColor;

    if (markerCount === 4) {
      color = colors.accentColor;
    } else if (markerCount === 3) {
      color = colors.secondaryColor;
    } else if (markerCount === 2) {
      color = colors.primaryColor;
    }

    parts.push(
      <span key={`colored-${key++}`} style={{ color }}>
        {content}
      </span>
    );

    currentIndex = match.index + match[0].length;
  }

  // Add remaining text
  const remainingText = text.slice(currentIndex);
  if (remainingText) {
    parts.push(
      <span key={`text-${key++}`} style={{ color: colors.defaultColor }}>
        {remainingText}
      </span>
    );
  }

  return parts.length > 0 ? parts : [text];
}

/**
 * Helper to check if text contains formatting markers
 */
export function hasFormatting(text: string): boolean {
  return /\*{2,4}.*?\*{2,4}/.test(text);
}

/**
 * Strip all formatting markers from text (for plain text export)
 */
export function stripFormatting(text: string): string {
  return text.replace(/\*{2,4}(.*?)\*{2,4}/g, '$1');
}
