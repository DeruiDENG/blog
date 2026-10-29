import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Comments from './Comment';

describe('Comments Component', () => {
  it('mounts and injects Utterances script with proper attributes into container', () => {
    const { container } = render(<Comments />);

    const commentsContainer = container.querySelector('#inject-comments-for-uterances');
    expect(commentsContainer).toBeInTheDocument();

    const script = commentsContainer?.querySelector('script');
    expect(script).toBeInTheDocument();
    expect(script?.getAttribute('src')).toBe('https://utteranc.es/client.js');
    expect(script?.getAttribute('repo')).toBe('DeruiDENG/blogs-comment');
    expect(script?.getAttribute('issue-term')).toBe('pathname');
    expect(script?.getAttribute('theme')).toBe('github-light');
    expect(script?.getAttribute('crossorigin')).toBe('anonymous');
    expect(script?.async).toBe(true);
  });
});

