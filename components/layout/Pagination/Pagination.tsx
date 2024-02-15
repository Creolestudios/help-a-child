import React, { useState } from "react";

import { PaginationProps } from "./Pagination.types";
import { PaginationWrapper } from "./Pagination.styled";

const getRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const clamp = (number: number, lower: number, upper: number) => {
  return Math.min(Math.max(number, lower), upper);
};

const pagination = (
  currentPage: number,
  pageTotal: number,
  pagesToShow: number,
  MINIMUM_PAGE_SIZE: number = 5
) => {
  let delta: number;
  currentPage = clamp(currentPage, 1, pageTotal);
  pagesToShow = clamp(pagesToShow, MINIMUM_PAGE_SIZE, pageTotal);

  const centerPagesToShow = pagesToShow - 5;
  const boundaryPagesToShow = pagesToShow - 3;

  if (pageTotal <= pagesToShow) {
    delta = pagesToShow;
  } else {
    delta =
      currentPage < boundaryPagesToShow ||
      currentPage > pageTotal - boundaryPagesToShow
        ? boundaryPagesToShow
        : centerPagesToShow;
  }

  const range = {
    start: Math.round(currentPage - delta / 2),
    end: Math.round(currentPage + delta / 2),
  };

  if (range.start - 1 === 1 || range.end + 1 === pageTotal) {
    range.start += 1;
    range.end += 1;
  }
  let pages: (string | number)[] =
    currentPage > delta
      ? getRange(
          Math.min(range.start, pageTotal - delta),
          Math.min(range.end, pageTotal)
        )
      : getRange(1, Math.min(pageTotal, delta + 1));

  if (
    currentPage > pageTotal - boundaryPagesToShow &&
    pageTotal > pagesToShow
  ) {
    pages = getRange(pageTotal - delta, pageTotal);
  }

  const withDots = (value: number, pair: (string | number)[]) =>
    pages.length + 1 !== pageTotal ? pair : [value];
  const lastPage = pages[pages.length - 1];

  if (pages[0] !== 1) {
    pages = withDots(1, [1, "..."]).concat(pages);
  }

  if (lastPage && Number(lastPage) < pageTotal) {
    pages = pages.concat(withDots(pageTotal, ["...", pageTotal]));
  }

  return pages;
};

export default function Pagination({
  truncated = false,
  total = 1,
  onChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  let pages: (number | string)[] = Array.from(
    { length: total },
    (v, i) => i
  ).map((i) => i + 1);

  if (truncated) {
    pages =
      globalThis.innerWidth < 768
        ? pagination(currentPage, total, 3, 5)
        : pagination(currentPage, total, 5, 7);
  }

  const handleChangePage = (page: number | string) => {
    if (typeof page === "number") {
      setCurrentPage(page);
      if (onChange) onChange(page);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      if (onChange) onChange(newPage);
    }
  };

  const handleNext = () => {
    if (currentPage < total) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      if (onChange) onChange(newPage);
    }
  };

  const generateClassName = (index: number) => {
    let classes = "";

    if (currentPage === index) {
      classes = `${classes} active`;
    }

    return classes;
  };

  return (
    <PaginationWrapper>
      <button
        onClick={handlePrev}
        className="text-[16px] font-[300] md:text-[18px]"
      >
        Vorige
      </button>
      <nav>
        <ol>
          {pages.map((page, index) => (
            <li key={index}>
              <button
                onClick={() => handleChangePage(page)}
                className={generateClassName(page as number)}
              >
                {page}
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <button
        onClick={handleNext}
        className="text-[16px] font-[300] md:text-[18px]"
      >
        Volgende
      </button>
    </PaginationWrapper>
  );
}
