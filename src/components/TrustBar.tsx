import React from "react";
import { Truck, Banknote, RefreshCw, ShieldCheck } from "lucide-react";

export default function TrustBar() {
  const TRUST_ITEMS = [
    {
      icon: Truck,
      title: "FREE EXPRESS DELIVERY",
      desc: "Dispatched in 24 hrs across 19,000+ Indian pincodes",
    },
    {
      icon: Banknote,
      title: "CASH ON DELIVERY",
      desc: "Pay at your doorstep or get ₹200 off prepaid",
    },
    {
      icon: RefreshCw,
      title: "7 DAYS REPLACEMENT",
      desc: "No-questions-asked quick replacement support",
    },
    {
      icon: ShieldCheck,
      title: "1 YEAR WARRANTY",
      desc: "100% genuine quality & hassle-free warranty",
    },
  ];

  return (
    <section className="bg-white py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-3.5 p-3 rounded-lg hover:bg-gray-50/80 transition"
              >
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#020b1f] uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
