import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  it('renders nothing when total pages is 0 or 1', () => {
    const { container: container0 } = render(<Pagination current={1} total={0} />);
    expect(container0).toBeEmptyDOMElement();

    const { container: container1 } = render(<Pagination current={1} total={1} />);
    expect(container1).toBeEmptyDOMElement();
  });

  it('renders correctly for multiple pages on page 1', () => {
    render(<Pagination current={1} total={5} />);

    const nav = screen.getByRole('navigation', { name: /pagination/i });
    expect(nav).toBeInTheDocument();

    // Current page 1 is active span with aria-current="page"
    const activeItem = screen.getByText('1');
    expect(activeItem).toHaveAttribute('aria-current', 'page');
    expect(activeItem.tagName).toBe('SPAN');

    // Page 2 should be a link pointing to /page/2
    const page2Link = screen.getByRole('link', { name: '2' });
    expect(page2Link).toHaveAttribute('href', '/page/2');

    // Ellipsis separator should be displayed
    expect(screen.getByText('...')).toBeInTheDocument();

    // Last page 5 should be a link
    const page5Link = screen.getByRole('link', { name: '5' });
    expect(page5Link).toHaveAttribute('href', '/page/5');
  });

  it('renders link to root path / for page 1 when on another page', () => {
    render(<Pagination current={3} total={5} />);

    // Page 1 should link to /
    const page1Link = screen.getByRole('link', { name: '1' });
    expect(page1Link).toHaveAttribute('href', '/');

    // Current page 3 is active
    const activeItem = screen.getByText('3');
    expect(activeItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders ellipsis on both sides when current page is in the middle of many pages', () => {
    render(<Pagination current={10} total={20} />);

    // Should display [1, ..., 9, 10, 11, ..., 20]
    const separators = screen.getAllByText('...');
    expect(separators.length).toBe(2);

    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: '9' })).toHaveAttribute('href', '/page/9');
    expect(screen.getByText('10')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: '11' })).toHaveAttribute('href', '/page/11');
    expect(screen.getByRole('link', { name: '20' })).toHaveAttribute('href', '/page/20');
  });
});

