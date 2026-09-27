"use client";

import React, { useState } from "react";
import { MapPin, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    serviceable: boolean;
    edd: string;
    city?: string;
  } | null>(null);

  const checkPincode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) return;

    setLoading(true);
    // Simulate / Call internal API
    setTimeout(() => {
      // Calculate realistic EDD (2-3 business days)
      const date = new Date();
      date.setDate(date.getDate() + 3);
      const formattedDate = date.toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      setResult({
        serviceable: true,
        edd: `Delivery by ${formattedDate}`,
        city: "Verified Pincode",
      });
      setLoading(false);
    }, 400);
  };

  return (
    <div className="bg-gray-50/90 border border-gray-200/80 rounded-xl p-3.5 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-800 uppercase tracking-wide flex items-center space-x-1.5">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>Check Delivery Time</span>
        </span>
        <span className="text-[10px] text-gray-500 font-medium">
          Shiprocket Express
        </span>
      </div>

      <form onSubmit={checkPincode} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setPincode(val);
            if (result) setResult(null);
          }}
          placeholder="Enter 6-digit Pincode (e.g. 110001)"
          className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
        <button
          type="submit"
          disabled={loading || pincode.length !== 6}
          className="bg-[#020b1f] hover:bg-black disabled:bg-gray-300 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </form>

      {result && result.serviceable && (
        <div className="pt-1.5 border-t border-gray-200/60 space-y-1 text-xs animate-fade-in">
          <div className="flex items-center space-x-1.5 text-green-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
            <span>{result.edd} (Express Air)</span>
          </div>
          <p className="text-[11px] text-gray-500 pl-5.5">
            Express delivery available at pincode <strong>{pincode}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}
