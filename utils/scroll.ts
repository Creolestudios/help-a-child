import { debounce } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

type Scrolloptions = {
  /** An page height offset */
  offset?: number;

  /** The time to wait before calling the function */
  waitTime?: number;

  /** The class name that will be given to the element when the user is scrolling to the left */
  scrollingLeftClassName?: string;

  /** The class name that will be given to the element when the user is scrolling to the right */
  scrollingRightClassName?: string;
};

/**
 * A hook that calls a function when it reaches the end of the page
 * @param callback the callback
 * @param options options to alter the offset of the page and the debounce value
 */
export const useCallbackWhenReachedBottom = (
  callback: () => void,
  options: Scrolloptions = {
    offset: 650,
    waitTime: 300,
  }
) => {
  const handleCallback = useCallback(() => {
    const scrollSource = window.innerHeight + window.scrollY;
    const height = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight
    );
    const scrollTarget = height - (options.offset ?? 0);

    if (
      scrollSource >= scrollTarget &&
      !document.body.classList.contains("prevent-scrolling")
    ) {
      document.body.classList.add("prevent-scrolling");
      callback();
      document.body.classList.remove("prevent-scrolling");
    }
  }, [callback, options.offset]);

  // Debounce the trigger
  const debouncedCallback = debounce(handleCallback, options.waitTime);

  useEffect(() => {
    window.onscroll = debouncedCallback;
  }, [debouncedCallback, handleCallback]);
};

/**
 * A hook to add hints to the sides of a horizontal scrollable item
 * @returns an array of 2 items, first item being the ref object and second is the scrollhandler
 */
export function useHorizontalScrollHints(
  options: Scrolloptions = {
    scrollingLeftClassName: "scrolling-left",
    scrollingRightClassName: "scrolling-right",
  }
): React.RefObject<HTMLDivElement> {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const newScrollLeft = elementRef?.current?.scrollLeft;
    const width = elementRef?.current?.getBoundingClientRect().width;
    const scrollWidth = elementRef?.current?.scrollWidth;

    if (newScrollLeft === 0) {
      elementRef?.current?.classList.remove(
        options.scrollingLeftClassName ?? ""
      );
    } else if (
      newScrollLeft &&
      scrollWidth &&
      width &&
      newScrollLeft >= scrollWidth - width
    ) {
      elementRef?.current?.classList.remove(
        options.scrollingRightClassName ?? ""
      );
    } else {
      elementRef?.current?.classList.add(options.scrollingRightClassName ?? "");
      elementRef?.current?.classList.add(options.scrollingLeftClassName ?? "");
    }
  }, [options.scrollingLeftClassName, options.scrollingRightClassName]);

  useEffect(() => {
    const el = elementRef.current;

    handleScroll();

    if (el) {
      el.onscroll = handleScroll;
    }

    return () => {
      if (el) {
        el.onscroll = null;
      }
    };
  }, [handleScroll]);

  return elementRef;
}
