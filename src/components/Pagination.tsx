import { Fragment } from 'react';
import paginationStyle from './Pagination.module.scss';
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
    <nav className={paginationStyle.pagination} aria-label="Pagination">
      {pageNumbersToDisplay.map((pageNumber, index) => {
        const isActive = pageNumber === current;
        return (
          <Fragment key={pageNumber}>
            {index > 0 && pageNumber - pageNumbersToDisplay[index - 1] > 1 && (
              <span className={paginationStyle.pagination__separator}>...</span>
            )}
            {isActive ? (
              <span
                className={`${paginationStyle.pagination__item} ${paginationStyle.active}`}
                aria-current="page"
              >
                {pageNumber}
              </span>
            ) : (
              <Link
                href={getPageHref(pageNumber)}
                className={paginationStyle.pagination__item}
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
