'use client';

import { useEffect, useRef } from 'react';
import { GISCUS_CONFIG } from '../config/giscus';

interface CommentsProps {
  slug: string;
}

export function Comments({ slug }: CommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any previous comments to avoid duplicates on route changes
    container.innerHTML = '';

    // Guard check: do not load script if environment variables are not configured
    if (!GISCUS_CONFIG.repoId || !GISCUS_CONFIG.categoryId) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          'Giscus repoId or categoryId is missing in environment variables. Please check your .env.local file.'
        );
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', GISCUS_CONFIG.repo);
    script.setAttribute('data-repo-id', GISCUS_CONFIG.repoId);
    script.setAttribute('data-category', GISCUS_CONFIG.category);
    script.setAttribute('data-category-id', GISCUS_CONFIG.categoryId);
    script.setAttribute('data-mapping', GISCUS_CONFIG.mapping);
    script.setAttribute('data-term', slug);
    script.setAttribute('data-strict', GISCUS_CONFIG.strict);
    script.setAttribute('data-reactions-enabled', GISCUS_CONFIG.reactionsEnabled);
    script.setAttribute('data-emit-metadata', GISCUS_CONFIG.emitMetadata);
    script.setAttribute('data-input-position', GISCUS_CONFIG.inputPosition);
    script.setAttribute('data-theme', GISCUS_CONFIG.theme);
    script.setAttribute('data-lang', GISCUS_CONFIG.lang);
    script.setAttribute('data-loading', GISCUS_CONFIG.loading);

    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [slug]);

  return (
    <div className="mt-10 min-h-[280px]">
      <div ref={containerRef} id="comments-container" />
    </div>
  );
}

export default Comments;
