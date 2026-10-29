import { describe, it, expect } from 'vitest';
import {
  getAllPostSlugs,
  getAllPosts,
  getPaginatedPosts,
  getPostData,
} from './posts';

describe('posts api utils', () => {
  describe('getAllPostSlugs', () => {
    it('returns a non-empty array of slugs without .md extension', () => {
      const slugs = getAllPostSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs.length).toBeGreaterThan(0);
      slugs.forEach((slug) => {
        expect(slug).not.toContain('.md');
        expect(typeof slug).toBe('string');
      });
    });
  });

  describe('getAllPosts', () => {
    it('returns posts sorted by date descending', () => {
      const posts = getAllPosts();
      expect(posts.length).toBeGreaterThan(0);

      // Verify required Post properties
      posts.forEach((post) => {
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('date');
        expect(post).toHaveProperty('description');
        expect(post).toHaveProperty('excerpt');
      });

      // Verify descending date order
      for (let i = 0; i < posts.length - 1; i++) {
        const currentDate = new Date(posts[i].date).getTime();
        const nextDate = new Date(posts[i + 1].date).getTime();
        expect(currentDate).toBeGreaterThanOrEqual(nextDate);
      }
    });
  });

  describe('getPaginatedPosts', () => {
    it('paginates correctly for page 1 with custom page size', () => {
      const allPosts = getAllPosts();
      const pageSize = 3;
      const result = getPaginatedPosts(1, pageSize);

      expect(result.currentPage).toBe(1);
      expect(result.totalPosts).toBe(allPosts.length);
      expect(result.totalPages).toBe(Math.ceil(allPosts.length / pageSize));
      expect(result.posts.length).toBe(Math.min(pageSize, allPosts.length));
      expect(result.posts[0].slug).toBe(allPosts[0].slug);
    });

    it('handles out of bounds page numbers gracefully', () => {
      const pageSize = 2;
      const result = getPaginatedPosts(9999, pageSize);
      expect(result.currentPage).toBe(9999);
      expect(result.posts).toEqual([]);
    });

    it('handles negative or zero page by clamping to page 1', () => {
      const resultZero = getPaginatedPosts(0);
      expect(resultZero.currentPage).toBe(1);

      const resultNeg = getPaginatedPosts(-5);
      expect(resultNeg.currentPage).toBe(1);
    });
  });

  describe('getPostData', () => {
    it('returns null for non-existent post slug', async () => {
      const post = await getPostData('non-existent-slug-123456');
      expect(post).toBeNull();
    });

    it('parses existing markdown post into HTML and includes navigation links', async () => {
      const slugs = getAllPostSlugs();
      expect(slugs.length).toBeGreaterThan(0);
      const testSlug = slugs[0];

      const post = await getPostData(testSlug);
      expect(post).not.toBeNull();
      if (!post) return;

      expect(post.slug).toBe(testSlug);
      expect(post.title).toBeTruthy();
      expect(post.html).toBeTruthy();
      expect(typeof post.html).toBe('string');
      // Verify HTML content was generated from markdown
      expect(post.html).toMatch(/<[a-z][\s\S]*>/i);

      // Verify navigation structure
      expect(post).toHaveProperty('prevPost');
      expect(post).toHaveProperty('nextPost');
      if (post.prevPost) {
        expect(post.prevPost).toHaveProperty('slug');
        expect(post.prevPost).toHaveProperty('title');
      }
      if (post.nextPost) {
        expect(post.nextPost).toHaveProperty('slug');
        expect(post.nextPost).toHaveProperty('title');
      }
    });

    it('correctly handles URL encoded slug', async () => {
      // Find a slug with chinese or special characters if available
      const slugs = getAllPostSlugs();
      const specialSlug = slugs.find((s) => /[^\x00-\x7F]/.test(s)) || slugs[0];
      const encodedSlug = encodeURIComponent(specialSlug);

      const post = await getPostData(encodedSlug);
      expect(post).not.toBeNull();
      expect(post?.slug).toBe(specialSlug);
    });

    it('renders code blocks with Shiki syntax highlighting classes and styles', async () => {
      const post = await getPostData('2020-11-05-理解几种常见的global-css-keyword');
      expect(post).not.toBeNull();
      if (!post) return;

      // Check for shiki pre tag and highlighted spans
      expect(post.html).toContain('class="shiki one-dark-pro"');
      expect(post.html).toMatch(/<span style="color:\s*#[0-9a-fA-F]+/i);
    });

    it('preserves raw HTML such as embedded iframe', async () => {
      const post = await getPostData('2020-12-30-登陆表单的最佳实践');
      expect(post).not.toBeNull();
      if (!post) return;

      expect(post.html).toContain('<iframe');
      expect(post.html).toContain('youtube.com/embed');
    });
  });
});

