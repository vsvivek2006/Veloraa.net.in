"use client";

import React, { useRef, useEffect } from "react";
import customerReviewImages from "@/data/customerReviewImages.json";

export default function CustomerReviewsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startPosRef = useRef(0);
  const positionRef = useRef(0);
  const autoScrollRef = useRef(true);

  const images = customerReviewImages && customerReviewImages.length > 0
    ? customerReviewImages
    : [
        "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/WhatsApp_Image_2026-08-28_at_15.37.21_3.jpg?v=1787912277",
        "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/WhatsApp_Image_2026-08-28_at_15.37.22.jpg?v=1787912277",
        "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/WhatsApp_Image_2026-08-28_at_15.37.21.jpg?v=1787912277",
        "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/WhatsApp_Image_2026-08-28_at_15.37.51_1.jpg?v=1787912277",
        "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/WhatsApp_Image_2026-08-28_at_15.37.52.jpg?v=1787912277",
        "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/WhatsApp_Image_2026-02-21_at_18.07.37.jpg?v=1771678849",
        "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/WhatsApp_Image_2025-08-28_at_10.54.34_1.jpg?v=1756878761",
        "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/WhatsApp_Image_2025-08-28_at_10.54.32_1.jpg?v=1756878760",
      ];

  // Double the images for seamless infinite scroll
  const duplicatedImages = [...images, ...images];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animId: number;
    const speed = 0.55;

    const animate = () => {
      if (autoScrollRef.current && !isDraggingRef.current) {
        positionRef.current += speed;
        const loopWidth = slider.scrollWidth / 2;
        if (positionRef.current >= loopWidth) {
          positionRef.current -= loopWidth;
        }
        slider.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const onMouseEnter = () => {
      autoScrollRef.current = false;
    };

    const onMouseLeave = () => {
      if (!isDraggingRef.current) {
        autoScrollRef.current = true;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      startPosRef.current = positionRef.current;
      slider.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - startXRef.current;
      positionRef.current = startPosRef.current - dx;
      const loopWidth = slider.scrollWidth / 2;
      if (positionRef.current >= loopWidth) positionRef.current -= loopWidth;
      if (positionRef.current < 0) positionRef.current += loopWidth;
      slider.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;
    };

    const onMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        slider.style.cursor = "grab";
        autoScrollRef.current = true;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.touches[0].clientX;
      startPosRef.current = positionRef.current;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.touches[0].clientX - startXRef.current;
      positionRef.current = startPosRef.current - dx;
      const loopWidth = slider.scrollWidth / 2;
      if (positionRef.current >= loopWidth) positionRef.current -= loopWidth;
      if (positionRef.current < 0) positionRef.current += loopWidth;
      slider.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      autoScrollRef.current = true;
    };

    slider.addEventListener("mouseenter", onMouseEnter);
    slider.addEventListener("mouseleave", onMouseLeave);
    slider.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    slider.addEventListener("touchstart", onTouchStart, { passive: true });
    slider.addEventListener("touchmove", onTouchMove, { passive: true });
    slider.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(animId);
      slider.removeEventListener("mouseenter", onMouseEnter);
      slider.removeEventListener("mouseleave", onMouseLeave);
      slider.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("touchstart", onTouchStart);
      slider.removeEventListener("touchmove", onTouchMove);
      slider.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section
      id="shopify-section-template--26661922308414__custom_liquid_K4grnV"
      className="shopify-section section veloraa-reviews-section w-full py-12 bg-[#081A3A] overflow-hidden box-border font-sans"
    >
      <div className="veloraa-reviews-heading text-center px-5 mb-7">
        <h2 className="m-0 text-white text-2xl sm:text-[30px] font-bold leading-tight">
          Hear It From Our Customers ❤️
        </h2>
        <p className="mt-2 text-[#b9c7dc] text-xs sm:text-sm">
          Loved by 80,000+ customers across India.
        </p>
      </div>

      <div className="veloraa-reviews-wrapper w-full overflow-hidden relative">
        <div
          ref={sliderRef}
          className="veloraa-reviews-slider flex items-stretch gap-[18px] w-max px-6 py-1 select-none cursor-grab active:cursor-grabbing will-change-transform"
        >
          {duplicatedImages.map((imgUrl, idx) => (
            <div
              key={idx}
              className="veloraa-review-card shrink-0 w-[210px] h-[337px] sm:w-[270px] sm:h-[420px] rounded-[15px] sm:rounded-[18px] overflow-hidden bg-white border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.20)] cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgUrl}
                alt="Veloraa Customer Review"
                className="w-full h-full object-cover block select-none pointer-events-none"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
