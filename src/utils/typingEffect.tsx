import React from 'react';

/**
 * Typing Effect Utility
 * 
 * Creates a typewriter effect for text with support for color formatting
 */

interface TypingEffectOptions {
  text: string;
  progress: number; // 0 to 1
  formattedParts?: React.ReactNode[];
}

/**
 * Calculate visible text based on typing progress
 * Works with both plain text and formatted React nodes
 */
export function getTypedText(options: TypingEffectOptions): React.ReactNode {
  const { text, progress, formattedParts } = options;

  if (!text) return '';

  const totalLength = text.length;
  const visibleLength = Math.floor(totalLength * progress);

  // If we have formatted parts, we need to handle them specially
  if (formattedParts && formattedParts.length > 0) {
    return getTypedFormattedText(text, formattedParts, visibleLength);
  }

  // Simple case: plain text
  return text.substring(0, visibleLength);
}

/**
 * Handle typing effect for formatted text (with color spans)
 */
function getTypedFormattedText(
  originalText: string,
  formattedParts: React.ReactNode[],
  visibleLength: number
): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let currentPosition = 0;

  for (let i = 0; i < formattedParts.length; i++) {
    const part = formattedParts[i];

    if (typeof part === 'string') {
      const partLength = part.length;
      const endPosition = currentPosition + partLength;

      if (currentPosition >= visibleLength) {
        // Haven't reached this part yet
        break;
      } else if (endPosition <= visibleLength) {
        // Show entire part
        result.push(<span key={`part-${i}`}>{part}</span>);
      } else {
        // Show partial part
        const visiblePart = part.substring(0, visibleLength - currentPosition);
        result.push(<span key={`part-${i}`}>{visiblePart}</span>);
        break;
      }

      currentPosition = endPosition;
    } else if (React.isValidElement(part)) {
      // Handle React elements (colored spans)
      const textContent = getTextContent(part);
      const partLength = textContent.length;
      const endPosition = currentPosition + partLength;

      if (currentPosition >= visibleLength) {
        break;
      } else if (endPosition <= visibleLength) {
        // Show entire colored part
        result.push(React.cloneElement(part as React.ReactElement, { key: `part-${i}` }));
      } else {
        // Show partial colored part
        const visiblePart = textContent.substring(0, visibleLength - currentPosition);
        const clonedElement = React.cloneElement(part as React.ReactElement, {
          key: `part-${i}`,
          children: visiblePart,
        });
        result.push(clonedElement);
        break;
      }

      currentPosition = endPosition;
    }
  }

  return result;
}

/**
 * Extract text content from React element
 */
function getTextContent(element: React.ReactNode): string {
  if (typeof element === 'string') {
    return element;
  }
  if (React.isValidElement(element)) {
    const children = (element.props as any).children;
    if (typeof children === 'string') {
      return children;
    }
    if (Array.isArray(children)) {
      return children.map(getTextContent).join('');
    }
  }
  return '';
}

/**
 * Calculate typing progress with easing
 */
export function getTypingProgress(
  frame: number,
  startFrame: number,
  duration: number,
  easing: 'linear' | 'ease-out' | 'ease-in-out' = 'linear'
): number {
  if (frame < startFrame) return 0;
  if (frame >= startFrame + duration) return 1;

  const progress = (frame - startFrame) / duration;

  switch (easing) {
    case 'ease-out':
      return 1 - Math.pow(1 - progress, 3);
    case 'ease-in-out':
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    default:
      return progress;
  }
}

/**
 * Typing cursor component
 */
export const TypingCursor: React.FC<{
  visible: boolean;
  color?: string;
}> = ({ visible, color = 'currentColor' }) => {
  if (!visible) return null;

  return (
    <span
      style={{
        display: 'inline-block',
        width: 3,
        height: '0.9em',
        backgroundColor: color,
        marginLeft: 4,
        animation: 'blink 1s step-end infinite',
      }}
    >
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};
