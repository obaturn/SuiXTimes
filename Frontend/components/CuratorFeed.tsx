"use client";

import { useEffect } from 'react';
import Script from 'next/script';

export default function CuratorFeed() {
  useEffect(() => {
    // Cleanup function to remove any existing Curator instances
    return () => {
      // Remove any Curator-injected elements if component unmounts
      const curatorElements = document.querySelectorAll('[class*="crt-"]');
      curatorElements.forEach((el) => {
        if (el.id !== 'curator-feed-default-feed-layout') {
          el.remove();
        }
      });
    };
  }, []);

  return (
    <div>
      {/* Place this div where you want the feed to appear */}
      <div id="curator-feed-default-feed-layout" className="min-h-[600px]">
        <a
          href="https://curator.io"
          target="_blank"
          rel="noopener noreferrer"
          className="crt-logo crt-tag"
        >
          Powered by Curator.io
        </a>
      </div>

      {/* Load the Curator script */}
      <Script
        id="curator-feed-script"
        strategy="lazyOnload"
        src="https://cdn.curator.io/published/245d3642-0b89-4445-b282-89f3a7a45a56.js"
        onLoad={() => {
          console.log('Curator feed loaded successfully');
        }}
        onError={() => {
          console.error('Failed to load Curator feed');
        }}
      />
    </div>
  );
}