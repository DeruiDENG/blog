import { Fragment } from 'react';
import Link from 'next/link';

interface Props {
  current: number; // 1-based page index (1, 2, ...)
  total: number;   // Total pages count
}

export default function Pagination({ current, total }: Props) {
  if (total <= 1) {
    return null;
  }

  const pageNumbersToDisplay = Array.from(
    new Set(
      [
        1,
        ...[current - 1, current, current + 1],
        total,
      ].filter((pageNumber) => pageNumber >= 1 && pageNumber <= total)
    )
  ).sort((a, b) => a - b);

  const getPageHref = (page: number) => {
    return page === 1 ? '/' : `/page/${page}`;
  };

  return (
    <nav
      className="flex items-center justify-center gap-1.5 sm:gap-2 my-10"
      aria-label="Pagination"
    >
      {pageNumbersToDisplay.map((pageNumber, index) => {
        const isActive = pageNumber === current;
        return (
          <Fragment key={pageNumber}>
            {index > 0 && pageNumber - pageNumbersToDisplay[index - 1] > 1 && (
              <span className="w-8 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-zinc-400 dark:text-zinc-600 text-sm font-medium">
                ...
              </span>
            )}
            {isActive ? (
              <span
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-sm font-semibold bg-indigo-600 text-white shadow-sm shadow-indigo-500/25"
                aria-current="page"
              >
                {pageNumber}
              </span>
            ) : (
              <Link
                href={getPageHref(pageNumber)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                {pageNumber}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
