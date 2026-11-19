import { useEffect, useRef, ReactElement, memo } from "react";

const ObserverAnimate = ({
  children,
  className,
  once = true,
  threshold = 0.2,
  rootMargin = "0px",
}: {
  children: ReactElement;
  className?: string;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef || !elementRef.current) return;

    const element = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("visible");

          if (once) {
            observer.unobserve(element);
            observer.disconnect();
          }
        } else if (!once) {
          element.classList.remove("visible");
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default memo(ObserverAnimate);
