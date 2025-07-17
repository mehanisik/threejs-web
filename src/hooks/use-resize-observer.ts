import { useEffect, useRef, useState } from "react";

type ObserverRect = Omit<DOMRectReadOnly, "toJSON">;

export default function useResizeObserver(): [
  React.RefObject<Element | null>,
  ObserverRect | undefined,
] {
  const ref = useRef<Element | null>(null);
  const [rect, setRect] = useState<ObserverRect>();

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, rect];
}
