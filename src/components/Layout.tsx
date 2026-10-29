import { ReactNode } from 'react';
import Link from 'next/link';
import { siteTitle } from '../utils/meta';

interface Props {
  isHomePage?: boolean;
  children: ReactNode;
}

const Layout = ({ isHomePage, children }: Props) => {
  const headerClass = isHomePage
    ? 'mb-8 sm:mb-10 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50'
    : 'mb-6 text-xl sm:text-2xl font-bold tracking-tight text-zinc-700 dark:text-zinc-300 smaller';

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 sm:py-16 flex flex-col min-h-screen">
      <header>
        <h1 className={headerClass}>
          <Link
            href="/"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {siteTitle}
          </Link>
        </h1>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-16 sm:mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 dark:text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>
          © {new Date().getFullYear()}, built with{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 transition-colors"
          >
            Next.js
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Layout;
