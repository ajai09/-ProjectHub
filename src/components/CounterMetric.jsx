import { useEffect, useRef, useState } from "react";

function CounterMetric({ target, label }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const duration = 1200;
          const start = performance.now();

          const step = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            setValue(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="metric">
      <span ref={ref} className="metric-number">
        {value}
      </span>
      <span className="metric-label">{label}</span>
    </div>
  );
}

export default CounterMetric;
