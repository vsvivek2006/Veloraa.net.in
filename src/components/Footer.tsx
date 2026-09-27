"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const FOOTER_LINKS = [
    { label: "Search", href: "/search" },
    { label: "Shipping Policy", href: "/policies/shipping-policy" },
    { label: "Refund Policy", href: "/policies/refund-policy" },
    { label: "Terms of Service", href: "/policies/terms-of-service" },
    { label: "Privacy Policy", href: "/policies/privacy-policy" },
    { label: "Contact Information", href: "/pages/contact-us" },
  ];

  const BOTTOM_POLICIES = [
    { label: "Shipping policy", href: "/policies/shipping-policy" },
    { label: "Terms of service", href: "/policies/terms-of-service" },
    { label: "Privacy policy", href: "/policies/privacy-policy" },
    { label: "Contact information", href: "/policies/contact-information" },
    { label: "Refund policy", href: "/policies/refund-policy" },
  ];

  return (
    <footer
      className="footer color-scheme-5e4a0062-7ce9-4fee-a5d0-1152250d3943 gradient"
      style={{
        backgroundColor: "#020b1f",
        padding: "36px 0px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Top content: Menu & Newsletter */}
      <div
        className="footer__content-top page-width"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 50px 50px",
        }}
      >
        {/* Quick Links Row (Centered, inline-blocks) */}
        <div className="footer-block footer-block--menu" style={{ textAlign: "center", marginBottom: "0px" }}>
          <ul
            className="footer-block__details-content list-unstyled"
            style={{
              display: "block",
              textAlign: "center",
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {FOOTER_LINKS.map((link, idx) => (
              <li
                key={idx}
                style={{
                  display: "inline",
                  margin: "0 15px 0 0",
                }}
              >
                <Link
                  href={link.href}
                  className="link link--text list-menu__item list-menu__item--link"
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.75)",
                    letterSpacing: "0.6px",
                    lineHeight: "25.2px",
                    padding: "0 0 5px",
                    display: "inline-block",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div
          className="footer-block--newsletter"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            marginTop: "30px",
          }}
        >
          <div className="footer-block__newsletter" style={{ textAlign: "center", width: "100%" }}>
            <h2
              className="footer-block__heading inline-richtext"
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#ffffff",
                letterSpacing: "0.6px",
                lineHeight: "23.4px",
                margin: "0 0 20px",
                textAlign: "center",
              }}
            >
              Subscribe to our emails
            </h2>

            {subscribed ? (
              <p
                style={{
                  fontSize: "14px",
                  color: "#4ade80",
                  fontWeight: 500,
                  padding: "12px 0",
                }}
              >
                ✓ Thank you for subscribing!
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="footer__newsletter newsletter-form"
                style={{
                  maxWidth: "360px",
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                <input type="hidden" name="form_type" value="customer" />
                <input type="hidden" name="utf8" value="✓" />
                <input type="hidden" name="contact[tags]" value="newsletter" />
                <div
                  className="newsletter-form__field-wrapper"
                  style={{
                    width: "100%",
                  }}
                >
                  <div className="field">
                    <input
                      id="NewsletterForm--footer"
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="field__input"
                      autoCorrect="off"
                      autoCapitalize="off"
                      autoComplete="email"
                    />
                    <label className="field__label" htmlFor="NewsletterForm--footer">
                      Email
                    </label>
                    <button
                      type="submit"
                      className="newsletter-form__button field__button"
                      aria-label="Subscribe"
                    >
                      <svg
                        viewBox="0 0 14 10"
                        fill="none"
                        aria-hidden="true"
                        focusable="false"
                        className="icon icon-arrow"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright and Policy Links inline */}
      <div
        className="footer__content-bottom"
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: "30px",
        }}
      >
        <div
          className="footer__content-bottom-wrapper page-width"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 50px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            className="footer__copyright caption"
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.75)",
              letterSpacing: "0.7px",
              textAlign: "left",
              margin: 0,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              columnGap: "0px",
              rowGap: "6px",
            }}
          >
            <small className="copyright__content" style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.75)" }}>
              © 2026,{" "}
              <Link href="/" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }} className="hover:underline">
                VelorAa.co.in
              </Link>
            </small>
            <small className="copyright__content" style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.75)", marginLeft: "4px" }}>
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href="https://www.shopify.com?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore"
                style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}
                className="hover:underline"
              >
                Powered by Shopify
              </a>
            </small>

            <ul
              className="policies list-unstyled"
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                alignItems: "center",
                margin: 0,
                padding: 0,
                listStyle: "none",
              }}
            >
              {BOTTOM_POLICIES.map((policy, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ padding: "0 8px", color: "rgba(255, 255, 255, 0.75)", fontSize: "11px" }}>·</span>
                  <Link
                    href={policy.href}
                    style={{
                      fontSize: "11px",
                      color: "rgba(255, 255, 255, 0.75)",
                      letterSpacing: "0.7px",
                      textDecoration: "none",
                    }}
                    className="hover:underline"
                  >
                    {policy.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
