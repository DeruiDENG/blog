import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

describe('Home Page', () => {
  it('renders bio, first page posts list and pagination', () => {
    render(<Home />);

    // Bio is rendered
    expect(screen.getByRole('img', { name: /Derui Deng/i })).toBeInTheDocument();

    // Blog articles are rendered
    const articleHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(articleHeadings.length).toBeGreaterThan(0);
    expect(articleHeadings.length).toBeLessThanOrEqual(5);

    // Pagination is rendered
    expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
  });
});

