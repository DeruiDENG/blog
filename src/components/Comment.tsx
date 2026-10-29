'use client';

import { useEffect, useRef } from 'react';

export function Comments() {
  const commentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = commentContainerRef.current;
    if (!container) return;

    // Clear any previous comments to avoid duplicates on route changes
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('repo', 'DeruiDENG/blogs-comment');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-light');

    container.appendChild(script);
  }, []);

  return <div ref={commentContainerRef} id="inject-comments-for-uterances" />;
}

export default Comments;
