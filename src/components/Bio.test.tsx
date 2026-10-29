import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Bio from './Bio';
import { author } from '../utils/meta';

describe('Bio Component', () => {
  it('renders author profile image, name with link, and description', () => {
    render(<Bio />);

    // Profile image
    const image = screen.getByRole('img', { name: author.name });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('profile-image.jpeg'));

    // Author link
    const authorLink = screen.getByRole('link', { name: author.name });
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', author.social.github);
    expect(authorLink).toHaveAttribute('target', '_blank');

    // Description
    expect(screen.getByText(author.description)).toBeInTheDocument();
  });
});
