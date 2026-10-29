import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PostPage, {
  generateMetadata,
  generateStaticParams,
} from './page';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostData } from '../../../utils/api/posts';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

describe('PostPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('generateStaticParams', () => {
    it('returns all post slugs wrapped in params objects', async () => {
      const params = await generateStaticParams();
      const allSlugs = getAllPostSlugs();

      expect(params.length).toBe(allSlugs.length);
      expect(params[0]).toHaveProperty('slug');
    });
  });

  describe('generateMetadata', () => {
    it('returns post title and description when post exists', async () => {
      const allSlugs = getAllPostSlugs();
      const testSlug = allSlugs[0];

      const meta = await generateMetadata({
        params: Promise.resolve({ slug: testSlug }),
      });
      expect(meta.title).toBeTruthy();
      expect(meta.title).not.toBe('Post Not Found');
    });

    it('returns Post Not Found when post does not exist', async () => {
      const meta = await generateMetadata({
        params: Promise.resolve({ slug: 'non-existent-slug-xyz' }),
      });
      expect(meta.title).toBe('Post Not Found');
    });
  });

  describe('PostPage Component', () => {
    it('calls notFound when slug does not exist', async () => {
      await expect(
        PostPage({ params: Promise.resolve({ slug: 'non-existent-slug-xyz' }) })
      ).rejects.toThrow('NEXT_NOT_FOUND');
      expect(notFound).toHaveBeenCalled();
    });

    it('renders post title, content and comments when slug exists', async () => {
      const allSlugs = getAllPostSlugs();
      const testSlug = allSlugs[0];
      const post = await getPostData(testSlug);
      expect(post).not.toBeNull();

      const ui = await PostPage({
        params: Promise.resolve({ slug: testSlug }),
      });
      const { container } = render(ui);

      // Verify article title heading
      const heading = screen.getByRole('heading', { level: 1, name: post!.title });
      expect(heading).toBeInTheDocument();

      // Check Comments container is rendered
      expect(
        container.querySelector('#inject-comments-for-uterances')
      ).toBeInTheDocument();
    });
  });
});
