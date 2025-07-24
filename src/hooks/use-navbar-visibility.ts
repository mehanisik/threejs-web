import { useEffect, useState } from "react";
import { useMousePosition } from "./use-mouse-position";

export function useNavbarVisibility(triggerHeight = 80) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (mousePosition.y <= triggerHeight) {
      setIsVisible(true);
    }
  }, [mousePosition.y, triggerHeight]);

  return isVisible;
}
