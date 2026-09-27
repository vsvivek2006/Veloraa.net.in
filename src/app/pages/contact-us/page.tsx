"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="MainContent" className="content-for-layout focus-none" role="main">
      <section
        id="shopify-section-template--26661922210110__main"
        className="shopify-section section"
      >
        <div className="page-width page-width--narrow max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <h1 className="main-page-title page-title h0 text-3xl sm:text-4xl font-normal text-[#020b1f] mb-6">
            Contact
          </h1>
          <div className="rte text-sm text-gray-700 space-y-3 leading-relaxed">
            <p>
              Got a question? We are happy to help you. Please contact us using the
              form below or you can
            </p>
            <p>
              Write us at 📩{" "}
              <a
                href="mailto:SuppportVeloraa@gmail.com"
                className="font-bold underline text-[#020b1f]"
              >
                SuppportVeloraa@gmail.com
              </a>
            </p>
            <p>
              <strong>Please expect our reply within 24 to 48 hours.</strong>
            </p>
            <p>
              <strong>Working Hours: (MON-SAT : 11:00 AM TO 6:00 PM)</strong>
            </p>
            <p>
              <strong>Note:</strong> Please attach your Order ID or Phone Number at
              the time of filling this form so that we can easily track your order
              detail.
            </p>
            <div className="pt-4 border-t border-gray-100 text-xs text-gray-600 space-y-1">
              <p>
                <strong>Legal Name:</strong> MONIKA ENTERPRISES
              </p>
              <p>
                <strong>GST:</strong> 20DIZTM4361F1ZP
              </p>
              <p>
                <strong>Address:</strong> Plot No. 6-B, Sobhagpura, Main Road,
                Udaipur-Rajasthan - 313004
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="shopify-section-template--26661922210110__form"
        className="shopify-section section pb-16"
      >
        <div className="page-width page-width--narrow max-w-3xl mx-auto px-4 sm:px-6">
          {submitted ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center text-green-800">
              <h3 className="font-semibold text-base mb-1">
                Thank you for contacting us!
              </h3>
              <p className="text-sm">
                We have received your message and will respond within 24–48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-none px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-none px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Phone number"
                  className="w-full border border-gray-300 rounded-none px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  placeholder="Comment"
                  className="w-full border border-gray-300 rounded-none px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-black resize-y"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="button inline-flex items-center justify-center px-8 py-3.5 bg-[#020b1f] text-white text-sm font-medium tracking-wide hover:opacity-90 transition"
                >
                  Send
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
