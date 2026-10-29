import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PaginatedPage, {
  generateMetadata,
  generateStaticParams,
} from './page';
import { notFound, redirect } from 'next/navigation';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT: ${url}`);
  }),
}));

describe('PaginatedPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('generateStaticParams', () => {
    it('generates page params starting from page 2', () => {
      const params = generateStaticParams();
      expect(Array.isArray(params)).toBe(true);
      if (params.length > 0) {
        expect(params[0]).toEqual({ page: '2' });
      }
    });
  });

  describe('generateMetadata', () => {
    it('generates metadata title for requested page', async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ page: '3' }),
      });
      expect(metadata.title).toBe('All posts - Page 3');
    });
  });

  describe('Page Component', () => {
    it('calls notFound when page is NaN or less than 1', async () => {
      await expect(
        PaginatedPage({ params: Promise.resolve({ page: 'invalid' }) })
      ).rejects.toThrow('NEXT_NOT_FOUND');
      expect(notFound).toHaveBeenCalled();

      await expect(
        PaginatedPage({ params: Promise.resolve({ page: '0' }) })
      ).rejects.toThrow('NEXT_NOT_FOUND');
      expect(notFound).toHaveBeenCalled();
    });

    it('redirects to / when page is 1', async () => {
      await expect(
        PaginatedPage({ params: Promise.resolve({ page: '1' }) })
      ).rejects.toThrow('NEXT_REDIRECT: /');
      expect(redirect).toHaveBeenCalledWith('/');
    });

    it('calls notFound when page exceeds totalPages', async () => {
      await expect(
        PaginatedPage({ params: Promise.resolve({ page: '9999' }) })
      ).rejects.toThrow('NEXT_NOT_FOUND');
      expect(notFound).toHaveBeenCalled();
    });

    it('renders paginated posts list and navigation for valid page', async () => {
      const ui = await PaginatedPage({
        params: Promise.resolve({ page: '2' }),
      });
      render(ui);

      const headings = screen.getAllByRole('heading', { level: 2 });
      expect(headings.length).toBeGreaterThan(0);
      expect(
        screen.getByRole('navigation', { name: /pagination/i })
      ).toBeInTheDocument();
    });
  });
});

