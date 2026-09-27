"use client";

import React, { useState, useEffect } from "react";

const ANNOUNCEMENTS = [
  "🎉Anniversary Sale • 5-in-1 Combo @ ₹1499🚀  This Week Only!",
  "🔥 Flat ₹200 OFF on Prepaid Orders + FREE Gift 🎁",
  "💎 Trusted by 80,000+ Customers Across India",
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);

  const transitionTo = (newIndex: number, dir: "next" | "prev") => {
    if (animating) return;
    setPrevIndex(currentIndex);
    setDirection(dir);
    setAnimating(true);
    setCurrentIndex(newIndex);
  };

  const next = () => {
    const nextIdx = (currentIndex + 1) % ANNOUNCEMENTS.length;
    transitionTo(nextIdx, "next");
  };

  const prev = () => {
    const prevIdx = (currentIndex - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length;
    transitionTo(prevIdx, "prev");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIdx = (currentIndex + 1) % ANNOUNCEMENTS.length;
      transitionTo(nextIdx, "next");
    }, 3500);
    return () => clearInterval(timer);
  }, [currentIndex, animating]);

  useEffect(() => {
    if (animating) {
      const t = setTimeout(() => {
        setAnimating(false);
        setPrevIndex(null);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [animating]);

  return (
    <div
      id="shopify-section-sections--26661918277950__announcement-bar"
      className="shopify-section shopify-section-group-header-group announcement-bar-section"
    >
      <div className="utility-bar color-scheme-2327330c-c4c5-46c2-92d5-0c4a4b070e72 gradient utility-bar--bottom-border">
        <div className="page-width utility-bar__grid">
          <div
            className="announcement-bar"
            role="region"
            aria-roledescription="Carousel"
            aria-label="Announcement bar"
          >
            <div className="announcement-bar-slider slider-buttons flex items-center justify-between w-full">
              <button
                type="button"
                className="slider-button slider-button--prev"
                name="previous"
                aria-label="Previous announcement"
                onClick={prev}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="icon icon-caret"
                  viewBox="0 0 10 6"
                  style={{ transform: "rotate(90deg)", width: "10px", height: "6px" }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <div
                className="grid grid--1-col slider slider--everywhere flex-1 text-center relative overflow-hidden"
                aria-live="polite"
                aria-atomic="true"
              >
                {/* Outgoing Slide during transition */}
                {animating && prevIndex !== null && (
                  <div
                    className={`slideshow__slide slider__slide grid__item grid--1-col absolute inset-0 ${
                      direction === "next"
                        ? "announcement-bar-slider--fade-out-next"
                        : "announcement-bar-slider--fade-out-previous"
                    }`}
                    role="group"
                    aria-roledescription="Announcement"
                  >
                    <div className="announcement-bar__announcement" role="region" aria-label="Announcement">
                      <p className="announcement-bar__message h5 m-0 py-2.5">
                        <span className="inline-block text-[13px] font-medium text-[#020b1f] tracking-[0.1rem]">
                          {ANNOUNCEMENTS[prevIndex]}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Current Active Slide */}
                <div
                  className={`slideshow__slide slider__slide grid__item grid--1-col ${
                    animating
                      ? direction === "next"
                        ? "announcement-bar-slider--fade-in-next"
                        : "announcement-bar-slider--fade-in-previous"
                      : ""
                  }`}
                  role="group"
                  aria-roledescription="Announcement"
                  aria-label={`${currentIndex + 1} of ${ANNOUNCEMENTS.length}`}
                >
                  <div className="announcement-bar__announcement" role="region" aria-label="Announcement">
                    <p className="announcement-bar__message h5 m-0 py-2.5">
                      <span className="inline-block text-[13px] font-medium text-[#020b1f] tracking-[0.1rem]">
                        {ANNOUNCEMENTS[currentIndex]}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="slider-button slider-button--next"
                name="next"
                aria-label="Next announcement"
                onClick={next}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="icon icon-caret"
                  viewBox="0 0 10 6"
                  style={{ transform: "rotate(-90deg)", width: "10px", height: "6px" }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
