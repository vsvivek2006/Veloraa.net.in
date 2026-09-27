"use client";

import React, { useState } from "react";
import { Mail, Clock, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-[#020b1f]">Contact Us</h1>
          <p className="text-sm text-gray-500 mt-2">
            Got a question? We are happy to help you. Our customer care team replies within 24 to 48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Contact Form */}
          <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                <h3 className="text-lg font-bold text-gray-900">Message Sent!</h3>
                <p className="text-xs text-gray-500">
                  Thank you for reaching out. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Phone / Order ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Attach your Order ID if contacting regarding a purchase"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist you?"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#020b1f] hover:bg-black text-white text-xs sm:text-sm font-bold py-3 rounded-xl transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Business Details */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#020b1f] uppercase tracking-wide border-b border-gray-100 pb-2">
                Business Information
              </h3>

              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex items-start space-x-2.5">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900 block">Support Email:</span>
                    <span>support@veloraa.co.in</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900 block">Working Hours:</span>
                    <span>Mon - Sat : 11:00 AM to 6:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900 block">Registered Address:</span>
                    <span>Plot No. 6-B, Sobhagpura, Main Road, Udaipur, Rajasthan - 313004</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 text-xs text-blue-900 space-y-1">
              <p className="font-bold">Legal Name: MONIKA ENTERPRISES</p>
              <p>GSTIN: 20DIZTM4361F1ZP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
