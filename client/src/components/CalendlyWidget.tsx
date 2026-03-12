'use client';

import { useEffect } from 'react';

interface CalendlyWidgetProps {
  url: string;
  height?: number;
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: Element;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

export default function CalendlyWidget({
  url,
  height = 700,
}: CalendlyWidgetProps) {
  useEffect(() => {
    // Inject Calendly script once
    const existing = document.getElementById('calendly-script');
    if (!existing) {
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Inject Calendly CSS once
    const existingCss = document.getElementById('calendly-css');
    if (!existingCss) {
      const link = document.createElement('link');
      link.id = 'calendly-css';
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
      data-url={url}
      style={{ minWidth: '320px', height: `${height}px` }}
    />
  );
}
