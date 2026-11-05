import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Comments from './Comment';
import * as giscusConfig from '../config/giscus';

describe('Comments Component', () => {
  const originalConfig = { ...giscusConfig.GISCUS_CONFIG };

  beforeEach(() => {
    // Ensure config has values for standard test
    vi.spyOn(giscusConfig, 'GISCUS_CONFIG', 'get').mockReturnValue({
      ...originalConfig,
      repoId: 'test-repo-id-123',
      categoryId: 'test-category-id-456',
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mounts and injects Giscus script with specific slug and proper attributes', () => {
    const testSlug = '2020-04-23-头七';
    const { container } = render(<Comments slug={testSlug} />);

    const commentsContainer = container.querySelector('#comments-container');
    expect(commentsContainer).toBeInTheDocument();

    const script = commentsContainer?.querySelector('script');
    expect(script).toBeInTheDocument();
    expect(script?.getAttribute('src')).toBe('https://giscus.app/client.js');
    expect(script?.getAttribute('data-repo')).toBe('DeruiDENG/blog-comment');
    expect(script?.getAttribute('data-repo-id')).toBe('test-repo-id-123');
    expect(script?.getAttribute('data-category')).toBe('Announcements');
    expect(script?.getAttribute('data-category-id')).toBe('test-category-id-456');
    expect(script?.getAttribute('data-mapping')).toBe('specific');
    expect(script?.getAttribute('data-term')).toBe(testSlug);
    expect(script?.getAttribute('data-strict')).toBe('1');
    expect(script?.getAttribute('data-reactions-enabled')).toBe('1');
    expect(script?.getAttribute('data-emit-metadata')).toBe('0');
    expect(script?.getAttribute('data-input-position')).toBe('bottom');
    expect(script?.getAttribute('data-theme')).toBe('preferred_color_scheme');
    expect(script?.getAttribute('data-lang')).toBe('zh-CN');
    expect(script?.getAttribute('data-loading')).toBe('lazy');
    expect(script?.getAttribute('crossorigin')).toBe('anonymous');
    expect(script?.async).toBe(true);
  });

  it('cleans up container on unmount', () => {
    const { container, unmount } = render(<Comments slug="test-post" />);
    const commentsContainer = container.querySelector('#comments-container');
    expect(commentsContainer?.querySelector('script')).toBeInTheDocument();

    unmount();
    expect(commentsContainer?.innerHTML).toBe('');
  });

  it('updates comment script when slug prop changes', () => {
    const { container, rerender } = render(<Comments slug="first-post" />);
    const commentsContainer = container.querySelector('#comments-container');
    expect(commentsContainer?.querySelector('script')?.getAttribute('data-term')).toBe('first-post');

    rerender(<Comments slug="second-post" />);
    expect(commentsContainer?.querySelector('script')?.getAttribute('data-term')).toBe('second-post');
  });

  it('does not inject script and warns when repoId or categoryId is missing', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(giscusConfig, 'GISCUS_CONFIG', 'get').mockReturnValue({
      ...originalConfig,
      repoId: '',
      categoryId: '',
    });

    const { container } = render(<Comments slug="test-post" />);
    const commentsContainer = container.querySelector('#comments-container');
    expect(commentsContainer?.querySelector('script')).not.toBeInTheDocument();
    expect(warnSpy).toHaveBeenCalled();
  });
});
