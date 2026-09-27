"use client";

import React, { useState } from "react";
import { Play, X, Volume2, VolumeX, CheckCircle2, Eye } from "lucide-react";
import { VIDEO_REELS, VideoReel } from "@/data/products";

export default function VideoReels() {
  const [activeVideo, setActiveVideo] = useState<VideoReel | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">
            <Eye className="w-3.5 h-3.5" />
            <span>REAL UNBOXINGS & REVIEWS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#020b1f] tracking-tight">
            See What Our 80,000+ Customers Say
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Watch real customer unboxings, sound tests, and hands-on reviews.
          </p>
        </div>

        {/* Horizontal Reels Scroller */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none no-scrollbar">
          {VIDEO_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveVideo(reel)}
              className="flex-none w-44 sm:w-56 aspect-[9/16] rounded-2xl overflow-hidden relative cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 snap-start border border-gray-200/80 bg-black"
            >
              {/* Background Video Preview */}
              <video
                src={reel.videoUrl}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

              {/* Play Badge Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
                <Play className="w-6 h-6 fill-white ml-1" />
              </div>

              {/* Views Tag */}
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center space-x-1">
                <Eye className="w-3 h-3 text-blue-400" />
                <span>{reel.views}</span>
              </div>

              {/* Bottom Customer Info */}
              <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                <p className="text-xs font-bold line-clamp-1 leading-snug">
                  {reel.title}
                </p>
                <div className="flex items-center space-x-1 text-[11px] text-gray-300 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                  <span className="truncate">{reel.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Video Reel Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-sm w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col justify-between">
            {/* Top Close & Sound Controls */}
            <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center text-white">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-red-400" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Video Player */}
            <video
              src={activeVideo.videoUrl}
              autoPlay
              controls
              playsInline
              muted={isMuted}
              className="w-full h-full object-cover"
            />

            {/* Bottom Caption */}
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white">
              <h4 className="text-xs font-bold leading-tight">
                {activeVideo.title}
              </h4>
              <p className="text-[11px] text-gray-300 mt-0.5 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                <span>Verified Purchase • {activeVideo.author}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
