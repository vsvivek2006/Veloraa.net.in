"use client";

import React from "react";
import { Star, CheckCircle, ThumbsUp } from "lucide-react";
import { REVIEWS } from "@/data/products";

export default function ReviewsSection() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>VERIFIED BUYER EXPERIENCES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#020b1f] tracking-tight">
              Customer Reviews & Ratings
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Rated 4.9/5 based on 80,000+ happy customers across India.
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="text-center">
              <span className="text-2xl font-black text-[#020b1f]">4.9</span>
              <div className="flex justify-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="border-l border-gray-200 pl-3 text-xs text-gray-500">
              <p className="font-semibold text-gray-800">98% Recommendation</p>
              <p>Certified Orders</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-gray-50/70 border border-gray-200/70 rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400">{rev.date}</span>
                </div>

                <h4 className="text-sm font-bold text-gray-900 leading-snug">
                  {rev.title}
                </h4>

                <p className="text-xs text-gray-600 leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#020b1f] flex items-center space-x-1">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  </p>
                  <p className="text-[11px] text-gray-400">{rev.city}</p>
                </div>
                <div className="flex items-center space-x-1 text-gray-400 text-[11px]">
                  <ThumbsUp className="w-3 h-3 text-blue-500" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
