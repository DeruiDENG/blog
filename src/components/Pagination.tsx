import { Fragment } from 'react';
import paginationStyle from './Pagination.module.scss';
import Link from 'next/link';

interface Props {
  current: number; // Start from 0
  total: number;
}

export default function Pagination({ current, total }: Props) {
  if (total <= 1) {
    return null;
  }

  const pageNumbersToDisplay = [
    ...Array.from(
      new Set(
        [
          ...[1, 2, 3],
          ...[current - 1, current, current + 1, current + 2, current + 3],
          total,
        ].filter(pageNumber => pageNumber >= 1 && pageNumber <= total)
      )
    ),
  ].sort((a, b) => a - b);

  return (
    <nav className={paginationStyle.pagination}>
      {pageNumbersToDisplay.map((pageNumber, index, pageNumbers) => {
        return (
          <Fragment key={pageNumber}>
            {index > 0 && pageNumber - pageNumbers[index - 1] > 1 && (
              <span className={paginationStyle.pagination__separator}>...</span>
            )}
            <span
              className={`${paginationStyle.pagination__item} ${
                pageNumber === current + 1 ? paginationStyle.active : ''
              }`}
            >
              {' '}
              {/*<Link href={pageNumber === 1 ? '/' : `/page/${pageNumber}`}>*/}
              {/*  {pageNumber}*/}
              {/*</Link>*/}
            </span>
          </Fragment>
        );
      })}
    </nav>
  );
}
