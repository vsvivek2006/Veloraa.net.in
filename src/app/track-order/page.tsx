"use client";

import React, { useState } from "react";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, ArrowRight } from "lucide-react";

export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<{
    status: string;
    courier: string;
    origin: string;
    destination: string;
    activities: { date: string; status: string; location: string }[];
  } | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/shiprocket/track?awb=${encodeURIComponent(query)}`);
      const data = await res.json();
      
      const track = data.shipment_track?.[0] || {};
      const acts = (data.shipment_track_activities || []).map((a: { date: string; status: string; location: string }) => ({
        date: a.date,
        status: a.status,
        location: a.location,
      }));

      setTrackingData({
        status: track.current_status || "IN TRANSIT",
        courier: track.courier_name || "Delhivery Air Express",
        origin: track.origin || "Udaipur Hub, RJ",
        destination: track.destination || "Destination Hub",
        activities: acts,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-100 rounded-2xl text-blue-700 mb-3">
            <Truck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#020b1f]">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Enter your Order ID (e.g. VEL-847291) or Shiprocket AWB number to check real-time status.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200/80 mb-8">
          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Order ID or 10-digit AWB"
              className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#020b1f]"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#020b1f] hover:bg-black text-white font-bold px-6 py-3 rounded-xl text-sm transition flex items-center space-x-1.5"
            >
              {loading ? (
                <span>Tracking...</span>
              ) : (
                <>
                  <span>Track</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tracking Result Card */}
        {trackingData && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden animate-fade-in">
            {/* Top Bar Status */}
            <div className="bg-[#020b1f] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider block">
                  Current Status
                </span>
                <h3 className="text-lg font-black tracking-wide text-white">
                  {trackingData.status}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-gray-400 block">Courier Partner</span>
                <span className="text-xs font-bold text-gray-200">
                  {trackingData.courier}
                </span>
              </div>
            </div>

            {/* Stepper Progress */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-600 relative">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mb-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span>Ordered</span>
                </div>
                <div className="flex-1 h-1 bg-green-500 mx-2" />
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mb-1">
                    <Package className="w-4 h-4" />
                  </div>
                  <span>Packed</span>
                </div>
                <div className="flex-1 h-1 bg-blue-600 mx-2" />
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mb-1 animate-pulse">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-blue-600 font-bold">In Transit</span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-2" />
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center mb-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-gray-400">Delivered</span>
                </div>
              </div>
            </div>

            {/* Detailed Timeline Activities */}
            <div className="p-6 space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Live Shipment Milestones
              </h4>
              <div className="space-y-4">
                {trackingData.activities.map((act, i) => (
                  <div key={i} className="flex space-x-3 items-start">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <div className="text-xs">
                      <p className="font-bold text-gray-900">{act.status}</p>
                      <p className="text-gray-500">{act.location}</p>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {act.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
