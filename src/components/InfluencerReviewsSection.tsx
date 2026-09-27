"use client";

import React, { useRef, useState, useEffect } from "react";

const INFLUENCER_VIDEOS = [
  "https://cdn.shopify.com/videos/c/o/v/ea79f6ffe6904256a6744f7e79a5d140.mp4",
  "https://cdn.shopify.com/videos/c/o/v/3f76cfffe66a46cfb6df6b7560ca9703.mp4",
  "https://cdn.shopify.com/videos/c/o/v/91d89a2103c84f2f85df54115f3bcb23.mp4",
  "https://cdn.shopify.com/videos/c/o/v/d2ef613c759b48d5af44ecd17c519d07.mp4",
  "https://cdn.shopify.com/videos/c/o/v/51021ddde2b947a6b9dd88e8bd265a56.mp4",
  "https://cdn.shopify.com/videos/c/o/v/2c84065e70144af290f96dd788b73dba.mp4",
];

export default function InfluencerReviewsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startPosRef = useRef(0);
  const positionRef = useRef(0);
  const autoScrollRef = useRef(true);

  // Duplicate video list for infinite loop
  const duplicatedVideos = [...INFLUENCER_VIDEOS, ...INFLUENCER_VIDEOS];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animId: number;
    const speed = 0.45;

    const animate = () => {
      if (autoScrollRef.current && !isDraggingRef.current && !activeVideo) {
        positionRef.current += speed;
        const loopWidth = slider.scrollWidth / 2;
        if (positionRef.current >= loopWidth) {
          positionRef.current = 0;
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
  }, [activeVideo]);

  return (
    <section
      id="shopify-section-template--26661922308414__custom_liquid_YiiVN4"
      className="shopify-section section veloraa-video-section py-14 bg-[#081A3A] overflow-hidden"
    >
      <div className="veloraa-heading text-center mb-8 px-5">
        <h2
          className="text-white text-2xl sm:text-[34px] font-bold leading-tight"
          style={{
            color: "#ffffff",
            fontSize: "34px",
            fontWeight: 700,
            fontFamily: "Poppins, sans-serif",
            margin: 0,
          }}
        >
          Your Favorite Influencers Trust Veloraa 🤍
        </h2>
        <p
          className="mt-2 text-[#999] text-xs sm:text-base"
          style={{
            color: "#999999",
            fontSize: "16px",
            fontFamily: "Poppins, sans-serif",
            marginTop: "10px",
          }}
        >
          Loved by creators. Trusted by 80,000+ customers across India.
        </p>
      </div>

      <div className="veloraa-slider-wrapper overflow-hidden relative pl-6">
        <div
          ref={sliderRef}
          className="veloraa-slider flex gap-5 w-max select-none cursor-grab active:cursor-grabbing will-change-transform"
        >
          {duplicatedVideos.map((vidUrl, idx) => (
            <div
              key={idx}
              onClick={() => setActiveVideo(vidUrl)}
              className="veloraa-card shrink-0 w-[180px] sm:w-[220px] lg:w-[260px] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer relative group"
            >
              <video
                src={vidUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full aspect-[9/16] object-cover bg-[#f5f5f5] block pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition flex items-center justify-center pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-white/40 backdrop-blur-xs flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform shadow-md">
                  ▶
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Popup Modal */}
      {activeVideo && (
        <div className="veloraa-video-popup fixed inset-0 bg-black/90 z-[999999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0"
            onClick={() => setActiveVideo(null)}
          />
          <div className="veloraa-popup-content relative h-[90vh] max-h-[850px] aspect-[9/16] bg-black rounded-[18px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)] z-10">
            <button
              type="button"
              className="veloraa-popup-close absolute top-2.5 right-2.5 w-10 h-10 rounded-full bg-black/60 text-white text-2xl flex items-center justify-center hover:bg-black transition z-20 cursor-pointer"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              ×
            </button>
            <video
              src={activeVideo}
              autoPlay
              controls
              playsInline
              preload="auto"
              className="w-full h-full object-contain bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
}
