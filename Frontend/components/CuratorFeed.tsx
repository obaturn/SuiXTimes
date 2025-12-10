"use client";

import { useEffect } from 'react';

export default function CuratorFeed() {
  useEffect(() => {
    // Load Curator script fresh each time component mounts
    const loadCuratorScript = () => {
      // Remove any existing Curator script first
      const existingScript = document.querySelector(
        'script[src="https://cdn.curator.io/published/c64ea9d1-6220-46ae-90ad-33641fa5231c.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      // Create and load new script
      const script = document.createElement('script');
      script.async = true;
      script.charset = 'UTF-8';
      script.src = 'https://cdn.curator.io/published/c64ea9d1-6220-46ae-90ad-33641fa5231c.js';

      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
    };

    loadCuratorScript();
  }, []);

  return (
    <div id="curator-feed-default-feed-layout" style={{ minHeight: '600px' }}>
      <a
        href="https://curator.io"
        target="_blank"
        rel="noopener noreferrer"
        className="crt-logo crt-tag"
      >
        Powered by Curator.io
      </a>
    </div>
  );
}