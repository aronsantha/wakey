import { useEffect, useState, useCallback, useRef } from "react";

export function useStickyState<T>(
  defaultValue: T,
  key: string,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? (JSON.parse(stickyValue) as T) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

type SwipeDirection = "LEFT" | "RIGHT" | "UP" | "DOWN";
type SwipeInput = {
  deltaX: number;
  deltaY: number;
  direction: SwipeDirection;
};

function getDirection(deltaX: number, deltaY: number): SwipeDirection {
  const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

  if (isHorizontal) {
    return deltaX < 0 ? "LEFT" : "RIGHT";
  }

  return deltaY > 0 ? "DOWN" : "UP";
}

export function useMobileSwipe(
  onSwipe: (input: SwipeInput) => void,
  triggerLengthPx: number = 10,
) {
  const ref = useRef<HTMLElement | null>(null);

  const startX = useRef(0);
  const startY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;

    startX.current = touch.clientX;
    startY.current = touch.clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      if (!touch) return;

      const endX = touch.clientX;
      const endY = touch.clientY;

      const deltaX = endX - startX.current;
      const deltaY = endY - startY.current;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Ignore tiny swipes
      if (absX < triggerLengthPx && absY < triggerLengthPx) return;

      onSwipe({ deltaX, deltaY, direction: getDirection(deltaX, deltaY) });
    },
    [onSwipe, triggerLengthPx],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return ref;
}
