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
    <main id="MainContent" className="content-for-layout focus-none" role="main" tabIndex={-1}>
      {/* 1. Main Page Title & Content */}
      <section
        id="shopify-section-template--26661922210110__main"
        className="shopify-section section"
      >
        <div className="page-width page-width--narrow max-w-[750px] mx-auto px-4 sm:px-6 pt-7 sm:pt-9 pb-4">
          <h1
            className="main-page-title page-title h0 scroll-trigger animate--fade-in"
            style={{
              fontSize: "40px",
              lineHeight: "52px",
              color: "#020b1f",
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif",
              marginBottom: "20px",
            }}
          >
            Contact
          </h1>
          <div className="rte text-[14px] text-[#2c3e50] space-y-4 leading-[1.6]">
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
              <strong>Working Hours: (MON-SAT : 11: 00 AM TO 6:00 PM)</strong>
            </p>
            <p>
              <strong>Note:</strong> Please attach your Order ID or Phone Number at
              the time of filling this form so that we can easily track your order
              detail.
            </p>
            <div className="pt-4 border-t border-gray-100 text-[13px] text-[#475569] space-y-1">
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

      {/* 2. Contact Form */}
      <section
        id="shopify-section-template--26661922210110__form"
        className="shopify-section section pb-16"
      >
        <div className="contact page-width page-width--narrow max-w-[750px] mx-auto px-4 sm:px-6 pt-4">
          <h2 className="sr-only">Contact form</h2>
          {submitted ? (
            <div className="p-6 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg text-center text-[#166534]">
              <h3 className="font-semibold text-base mb-1">
                Thank you for contacting us!
              </h3>
              <p className="text-sm">
                We have received your message and will respond within 24–48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="ContactForm" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="field">
                  <input
                    type="text"
                    required
                    id="ContactForm-name"
                    name="contact[Name]"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Name"
                    className="field__input w-full h-[45px] px-4 rounded-[4px] border border-gray-300 text-[14px] text-[#020b1f] focus:outline-none focus:border-[#020b1f]"
                  />
                </div>
                <div className="field">
                  <input
                    type="email"
                    required
                    id="ContactForm-email"
                    name="contact[email]"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email *"
                    className="field__input w-full h-[45px] px-4 rounded-[4px] border border-gray-300 text-[14px] text-[#020b1f] focus:outline-none focus:border-[#020b1f]"
                  />
                </div>
              </div>

              <div className="field">
                <input
                  type="tel"
                  id="ContactForm-phone"
                  name="contact[Phone number]"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Phone number"
                  className="field__input w-full h-[45px] px-4 rounded-[4px] border border-gray-300 text-[14px] text-[#020b1f] focus:outline-none focus:border-[#020b1f]"
                />
              </div>

              <div className="field">
                <textarea
                  rows={8}
                  required
                  id="ContactForm-body"
                  name="contact[Comment]"
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  placeholder="Comment"
                  className="field__input text-area w-full p-4 rounded-[4px] border border-gray-300 text-[14px] text-[#020b1f] focus:outline-none focus:border-[#020b1f] resize-y min-h-[140px]"
                />
              </div>

              <div className="contact__button pt-2">
                <button
                  type="submit"
                  className="button inline-flex items-center justify-center px-8 py-3 bg-[#020b1f] text-white text-[15px] font-medium tracking-wide hover:opacity-90 transition rounded-[4px] min-h-[48px] min-w-[120px]"
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
