import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from './Layout';
import { siteTitle } from '../utils/meta';

describe('Layout Component', () => {
  it('renders site title link and children content', () => {
    render(
      <Layout>
        <div data-testid="child-content">Hello Layout</div>
      </Layout>
    );

    const titleLink = screen.getByRole('link', { name: siteTitle });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', '/');

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Hello Layout')).toBeInTheDocument();

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('renders different header styling based on isHomePage prop', () => {
    const { container: homeContainer } = render(
      <Layout isHomePage={true}>
        <div>Home content</div>
      </Layout>
    );
    const homeH1 = homeContainer.querySelector('h1');
    expect(homeH1?.className).not.toContain('smaller');

    const { container: subContainer } = render(
      <Layout isHomePage={false}>
        <div>Subpage content</div>
      </Layout>
    );
    const subH1 = subContainer.querySelector('h1');
    expect(subH1?.className).toContain('smaller');
  });
});

