import { useCallback, useEffect, useRef } from "react";

interface UseAccessibilityOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onSpace?: () => void;
  announceToScreenReader?: (message: string) => void;
}

export const useAccessibility = ({
  onEscape,
  onEnter,
  onSpace,
  announceToScreenReader,
}: UseAccessibilityOptions = {}) => {
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const announce = useCallback(
    (message: string) => {
      if (announceToScreenReader) {
        announceToScreenReader(message);
      } else if (liveRegionRef.current) {
        liveRegionRef.current.textContent = message;
      }
    },
    [announceToScreenReader],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          if (onEscape) {
            event.preventDefault();
            onEscape();
          }
          break;
        case "Enter":
          if (onEnter) {
            event.preventDefault();
            onEnter();
          }
          break;
        case " ":
          if (onSpace) {
            event.preventDefault();
            onSpace();
          }
          break;
      }
    },
    [onEscape, onEnter, onSpace],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const focusFirstElement = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    if (firstElement) {
      firstElement.focus();
    }
  }, []);

  const focusLastElement = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]',
    );
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;
    if (lastElement) {
      lastElement.focus();
    }
  }, []);

  return {
    announce,
    focusFirstElement,
    focusLastElement,
    liveRegionRef,
  };
};
