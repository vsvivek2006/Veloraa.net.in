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
    <main
      id="MainContent"
      className="content-for-layout focus-none"
      role="main"
      tabIndex={-1}
    >
      <section
        id="shopify-section-template--26661922210110__main"
        className="shopify-section section"
      >
        <div
          className="page-width page-width--narrow section-template--26661922210110__main-padding"
          style={{ maxWidth: "750px", margin: "0 auto", padding: "36px 15px 15px" }}
        >
          <h1
            className="main-page-title page-title h0 scroll-trigger animate--fade-in"
            style={{
              fontSize: "40px",
              lineHeight: "52px",
              color: "#020b1f",
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif",
              marginBottom: "15px",
            }}
          >
            Contact
          </h1>
          <div
            className="rte scroll-trigger animate--slide-in"
            style={{
              fontSize: "14px",
              lineHeight: "1.7",
              color: "#2c3e50",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <p>&nbsp;</p>
            <p>
              Got a question? We are happy to help you.&nbsp;Please contact us using the form below or you can&nbsp;
            </p>
            <p>
              <span>
                Write us at 📩{" "}
                <strong data-start="3551" data-end="3579">
                  <a
                    href="mailto:SuppportVeloraa@gmail.com"
                    className="decorated-link cursor-pointer"
                    style={{ color: "#020b1f", textDecoration: "underline" }}
                  >
                    SuppportVeloraa@gmail.com
                  </a>
                </strong>
              </span>
            </p>
            <p>
              <strong>Please expect our reply&nbsp;within 24 to 48 hours.&nbsp;</strong>
            </p>
            <p>
              <span>
                <strong>Working Hours: (MON-SAT : 11: 00 AM TO 6:00 PM)</strong>
              </span>
            </p>
            <p>
              <strong>Note:&nbsp;</strong>Please attach your Order ID or Phone Number at the time of filling this form so that we can easily track your order detail.
            </p>
            <p>&nbsp;</p>
            <p>
              <strong>
                Legal Name: MONIKA&nbsp;ENTERPRISES<br />
                GST: 20DIZTM4361F1ZP<br />
                Address:&nbsp;<span>Plot No. 6-B, Sobhagpura, Main Road,&nbsp; Udaipur-Rajasthan - 313004</span>
              </strong>
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
      </section>

      <section
        id="shopify-section-template--26661922210110__form"
        className="shopify-section section"
      >
        <div className="color-background-1 gradient">
          <div
            className="contact page-width page-width--narrow section-template--26661922210110__form-padding"
            style={{ maxWidth: "750px", margin: "0 auto", padding: "0 15px 60px" }}
          >
            <h2 className="visually-hidden" style={{ display: "none" }}>Contact form</h2>
            {submitted ? (
              <div
                style={{
                  padding: "20px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "4px",
                  textAlign: "center",
                  color: "#166534",
                }}
              >
                <h3 style={{ fontWeight: 600, fontSize: "16px", marginBottom: "4px" }}>
                  Thank you for contacting us!
                </h3>
                <p style={{ fontSize: "14px" }}>
                  We have received your message and will respond within 24–48 hours.
                </p>
              </div>
            ) : (
              <form
                method="post"
                onSubmit={handleSubmit}
                id="ContactForm"
                className="isolate scroll-trigger animate--slide-in"
              >
                <div className="contact__fields">
                  <div className="field">
                    <input
                      className="field__input"
                      autoComplete="name"
                      type="text"
                      id="ContactForm-name"
                      name="contact[Name]"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name"
                    />
                    <label className="field__label" htmlFor="ContactForm-name">
                      Name
                    </label>
                  </div>
                  <div className="field">
                    <input
                      autoComplete="email"
                      type="email"
                      id="ContactForm-email"
                      className="field__input"
                      name="contact[email]"
                      spellCheck="false"
                      autoCapitalize="off"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      aria-required="true"
                      placeholder="Email"
                      required
                    />
                    <label className="field__label" htmlFor="ContactForm-email">
                      Email <span aria-hidden="true">*</span>
                    </label>
                  </div>
                </div>

                <div className="field">
                  <input
                    type="tel"
                    id="ContactForm-phone"
                    className="field__input"
                    autoComplete="tel"
                    name="contact[Phone number]"
                    pattern="[0-9\-]*"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone number"
                  />
                  <label className="field__label" htmlFor="ContactForm-phone">
                    Phone number
                  </label>
                </div>

                <div className="field">
                  <textarea
                    rows={10}
                    id="ContactForm-body"
                    className="text-area field__input"
                    name="contact[Comment]"
                    placeholder="Comment"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  />
                  <label className="form__label field__label" htmlFor="ContactForm-body">
                    Comment
                  </label>
                </div>

                <div className="contact__button">
                  <button type="submit" className="button">
                    Send
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
