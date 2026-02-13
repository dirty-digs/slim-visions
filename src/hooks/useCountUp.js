import { useState, useEffect, useRef } from 'react';

export default function useCountUp(end, suffix = '', options = {}) {
  const { duration = 2000, threshold = 0.3 } = options;
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started, threshold]);

  useEffect(() => {
    if (!started) return;

    const numEnd = parseFloat(end);
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * numEnd));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setValue(numEnd);
      }
    };

    requestAnimationFrame(tick);
  }, [started, end, duration]);

  const display = `${value}${suffix}`;
  return { ref, display };
}
