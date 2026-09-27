"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimationObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const SCROLL_ANIMATION_TRIGGER_CLASSNAME = "scroll-trigger";
    const SCROLL_ANIMATION_OFFSCREEN_CLASSNAME = "scroll-trigger--offscreen";

    const elements = Array.from(
      document.getElementsByClassName(SCROLL_ANIMATION_TRIGGER_CLASSNAME)
    ) as HTMLElement[];

    if (elements.length === 0) return;

    const onIntersection: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.remove(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersection, {
      rootMargin: "0px 0px -50px 0px",
    });

    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        el.classList.add(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
      } else {
        el.classList.remove(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
      }
      if (el.hasAttribute("data-cascade") && !el.style.getPropertyValue("--animation-order")) {
        el.style.setProperty("--animation-order", `${(index % 8) + 1}`);
      }
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
