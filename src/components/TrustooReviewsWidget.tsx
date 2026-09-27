"use client";

import React, { useState } from "react";
import modalReviewsData from "@/data/modalReviews.json";

export default function TrustooReviewsWidget() {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const reviews = modalReviewsData || [];

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  return (
    <section
      id="shopify-section-template--26661922308414__17391977265eb60ca1"
      className="shopify-section section py-12 bg-white"
    >
      <div className="page-width max-w-[1200px] mx-auto px-4 sm:px-6">
        <div id="seal-review-widget" data-app="trustoo" className="w-full">
          <div id="trustoo-widget-wrapper" className="w-full flex flex-col">
            <div id="reviews-wrapper" className="trustoo-reviews-wrapper w-full">
              <div id="vstar-reviews" className="trustoo-widget w-full">
                {/* Trustoo Header */}
                <div
                  id="reviews-head"
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-[#020b1f]">4.7</span>
                      <div className="flex text-[#FFA800] text-xl">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">636 reviews</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="px-5 py-2.5 bg-white border border-gray-300 text-sm font-semibold text-[#020b1f] hover:bg-gray-50 rounded transition"
                      onClick={() => alert("Thank you for your feedback!")}
                    >
                      Write a review
                    </button>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setFilterRating(null)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      filterRating === null
                        ? "bg-[#020b1f] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Reviews
                  </button>
                  {[5, 4, 3].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFilterRating(star)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-1 ${
                        filterRating === star
                          ? "bg-[#020b1f] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span>{star} Stars</span>
                      <span className="text-[#FFA800]">★</span>
                    </button>
                  ))}
                </div>

                {/* Reviews Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4 pt-4">
                  {filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="grid-review break-inside-avoid bg-white rounded-lg overflow-hidden border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-md transition duration-200 flex flex-col"
                    >
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

                      <div className="p-3.5 flex flex-col flex-1">
                        <div className="flex text-[#FFA800] text-sm mb-1.5">
                          {"★".repeat(rev.rating || 5)}
                        </div>

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

                        <p className="text-[12px] text-gray-700 leading-relaxed mb-3">
                          {rev.comment}
                        </p>

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
        </div>
      </div>
    </section>
  );
}
