"use client";

import React, { useState, useEffect } from "react";
import modalReviewsData from "@/data/modalReviews.json";

export default function FloatingReviewsTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const reviews = modalReviewsData || [];

  return (
    <>
      {/* Exact Live Veloraa #vstar-tab Trigger Button */}
      <div
        id="vstar-tab"
        role="button"
        tabIndex={0}
        aria-label="Customer Reviews"
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
        style={{
          position: "fixed",
          top: "450px",
          right: "0px",
          width: "112.094px",
          height: "33.625px",
          backgroundColor: "#000000",
          color: "#ffffff",
          fontSize: "16px",
          lineHeight: "28.8px",
          padding: "0 15px",
          borderRadius: "0 0 8px 8px",
          boxShadow: "none",
          cursor: "pointer",
          zIndex: 11000,
          transform: "matrix(0, 1, -1, 0, 0, 56.0469)",
          transformOrigin: "112.094px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 400,
          userSelect: "none",
        }}
      >
        ★Reviews
      </div>

      {/* Reviews Modal Popup matching live #vstar-window-review */}
      {isOpen && (
        <div className="fixed inset-0 z-[12000] flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop Mask */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <div
            id="vstar-window-review"
            className="relative w-full max-w-[1040px] max-h-[90vh] bg-white rounded-xl shadow-2xl z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold text-[#020b1f] leading-none">
                    4.8
                  </span>
                  <div className="flex items-center gap-0.5 text-[#FFA800]">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-[#FFA800]"
                        viewBox="0 0 18 17"
                      >
                        <path d="M8.89062 0.565613L11.4299 6.07066L17.4501 6.78446L12.9992 10.9006L14.1807 16.8468L8.89062 13.8856L3.60056 16.8468L4.78206 10.9006L0.331117 6.78446L6.35139 6.07066L8.89062 0.565613Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  3255 reviews
                </span>
              </div>

              <div className="flex items-center gap-2.5 mt-2 sm:mt-0">
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium text-[#111] hover:bg-gray-50 rounded transition"
                  onClick={() => alert("Review submitted successfully!")}
                >
                  Write a store review
                </button>

                {/* Sort / Filter Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="p-2 border border-gray-300 hover:bg-gray-50 rounded flex items-center justify-center text-gray-700 transition"
                    aria-label="Sort reviews"
                  >
                    <svg width="19" height="18" fill="none" viewBox="0 0 19 18">
                      <path
                        d="M17.905 8.274H7.675a2.609 2.609 0 0 0-5.018 0H.714a.714.714 0 0 0 0 1.429h1.943a2.609 2.609 0 0 0 5.018 0h10.23a.714.714 0 0 0 0-1.429zM5.165 10.17a1.181 1.181 0 1 1-.001-2.363 1.181 1.181 0 0 1 .002 2.363zm12.74-8.296h-1.381a2.609 2.609 0 0 0-5.006 0H.718a.714.714 0 0 0 0 1.428h10.79a2.609 2.609 0 0 0 5.027 0h1.372a.714.714 0 1 0-.002-1.428zM14.02 3.79a1.18 1.18 0 1 1 .003 0h-.003zm3.885 10.886h-3.344a2.609 2.609 0 0 0-5.019 0H.718a.714.714 0 0 0 0 1.429h8.824a2.61 2.61 0 0 0 5.019 0h3.344a.714.714 0 0 0 0-1.429zm-5.853 1.895a1.181 1.181 0 1 1-.003-2.363 1.181 1.181 0 0 1 .003 2.363z"
                        fill="#333333"
                      />
                    </svg>
                  </button>

                  {showSortDropdown && (
                    <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20 text-xs">
                      <div className="px-3 py-1 font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                        Sort by
                      </div>
                      {[
                        { id: "featured", label: "Featured" },
                        { id: "photo", label: "Photo priority" },
                        { id: "newest", label: "Newest" },
                        { id: "highest", label: "Highest Ratings" },
                        { id: "lowest", label: "Lowest Ratings" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSortOption(opt.id);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center justify-between ${
                            sortOption === opt.id
                              ? "font-semibold text-black bg-gray-50"
                              : "text-gray-700"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {sortOption === opt.id && <span>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  aria-label="Close reviews"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-black transition text-2xl leading-none ml-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Masonry Review Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto bg-[#fafafa] flex-1">
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="break-inside-avoid bg-white rounded-lg overflow-hidden border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition duration-200 flex flex-col"
                  >
                    {/* Customer Photo */}
                    {rev.image && (
                      <div className="w-full bg-gray-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rev.image}
                          alt={rev.author}
                          className="w-full h-auto object-cover block"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Review Content */}
                    <div className="p-3.5 flex flex-col flex-1">
                      {/* 5 Stars */}
                      <div className="flex items-center gap-0.5 text-[#FFA800] mb-1.5">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-3.5 h-3.5 fill-[#FFA800]"
                            viewBox="0 0 18 17"
                          >
                            <path d="M8.89062 0.565613L11.4299 6.07066L17.4501 6.78446L12.9992 10.9006L14.1807 16.8468L8.89062 13.8856L3.60056 16.8468L4.78206 10.9006L0.331117 6.78446L6.35139 6.07066L8.89062 0.565613Z" />
                          </svg>
                        ))}
                      </div>

                      {/* Author & Verified */}
                      <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                        <span className="text-[13px] font-bold text-[#111]">
                          {rev.author}
                        </span>
                        {rev.verified && (
                          <div className="flex items-center gap-1 text-[11px] text-gray-500">
                            <svg
                              className="w-3 h-3 text-gray-600 fill-current"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.21017 11.4497C6.36872 11.6094 6.57573 11.6896 6.78357 11.6896C6.99058 11.6896 7.19842 11.6094 7.35697 11.4497L12.5 6.5C12.8163 6.17988 12.8163 5.66125 12.5 5.34113C12.1829 5.02019 11.6695 5.02019 11.3532 5.34113L6.78357 9.71017L4.11293 7.01029C3.79665 6.69018 3.28323 6.69018 2.96613 7.01029C2.64986 7.33041 2.64986 7.84987 2.96613 8.16998L6.21017 11.4497Z"
                              />
                            </svg>
                            <span>Verified purchase</span>
                          </div>
                        )}
                      </div>

                      {/* Comment */}
                      <p className="text-[12px] text-gray-700 leading-relaxed mb-3">
                        {rev.comment}
                      </p>

                      {/* Product Thumbnail Pill */}
                      {rev.productTitle && (
                        <div className="mt-auto pt-2.5 border-t border-gray-100 flex items-center gap-2">
                          {rev.productImage && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={rev.productImage}
                              alt={rev.productTitle}
                              className="w-7 h-7 rounded shrink-0 object-cover border border-gray-200"
                              loading="lazy"
                            />
                          )}
                          <span className="text-[10px] text-gray-500 truncate">
                            {rev.productTitle}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
