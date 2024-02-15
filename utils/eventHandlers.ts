import { useEffect } from "react";

/**
 * Hook that triggers a callback when user clicks outside of the passed ref
 * @param ref the ref element
 * @param callback the function that will be called
 */
export function useOnClickOutsideEl(
  ref: React.RefObject<HTMLElement>,
  callback?: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target) && callback) {
        callback();
      }
    };

    if (ref.current) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, ref]);
}
