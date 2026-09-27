"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PRODUCTS,
  Product,
  Variant,
} from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import CustomerReviewsSection from "@/components/CustomerReviewsSection";
import InfluencerReviewsSection from "@/components/InfluencerReviewsSection";
import TrustooReviewsWidget from "@/components/TrustooReviewsWidget";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

const EXACT_HANDLE_MATCHES: Record<string, string> = {
  // 5-in-1 Combos
  "5-in-1-bundle": "ultimate-combo-10000mah",
  "5-in-1-ultimate-combo": "5-in-1-ultimate-combo",
  "ultimate-combo-10000mah": "ultimate-combo-10000mah",

  // Watch Series 10 + Free Pro 2nd
  "watch-series-10-free-pro-2nd-generation-anc-type-c-100-hassle-free-warranty": "watch-series-10-free-pro-2nd-gen",
  "watch-series-10-free-pro-2nd-gen": "watch-series-10-free-pro-2nd-gen",

  // Series 10 standalone
  "veloraa-series10-cellular-49-mm-smart-watch": "veloraa-watch-10-smartwatch",
  "veloraa-watch-10-smartwatch": "veloraa-watch-10-smartwatch",

  // MagSafe battery pack
  "magsafe-battery-pack-wireless-power-bank": "veloraa-magsafe-battery-pack",
  "veloraa-magsafe-battery-pack": "veloraa-magsafe-battery-pack",

  // Watch Ultra 49mm
  "veloraa-watch-ultra-gps-cellular-49-mm-smart-watch": "veloraa-watch-ultra-49mm",
  "veloraa-watch-ultra-49mm": "veloraa-watch-ultra-49mm",

  // 3-in-1 Foldaway Charger
  "untitled-aug7_12-30": "veloraa-foldaway-3-in-1-charger",
  "veloraa-foldaway-3-in-1-charger": "veloraa-foldaway-3-in-1-charger",

  // VPods Pro 2 USA Quality
  "vpods-pro-2nd-gen-usa-quality": "vpods-pro-2nd-gen-usa-quality",

  // VPods Max ANC
  "vpods-max-anc": "vpods-max-anc",
};

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const handle = resolvedParams.handle;
  const targetHandle = EXACT_HANDLE_MATCHES[handle] || handle;

  const product =
    PRODUCTS.find((p) => p.handle === targetHandle) ||
    PRODUCTS.find((p) => p.handle === handle) ||
    PRODUCTS.find((p) => handle.includes("watch-series-10") && p.handle.includes("watch-series-10")) ||
    PRODUCTS.find((p) => handle.includes("ultra") && p.handle.includes("ultra")) ||
    PRODUCTS.find((p) => handle.includes("magsafe") && p.handle.includes("magsafe")) ||
    PRODUCTS.find((p) => handle.includes("vpods-max") && p.handle.includes("vpods-max")) ||
    PRODUCTS[0];

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}

const FAQS_LIST = [
  {
    q: "What's included in the Ultimate Combo (₹1499)?",
    a: (
      <>
        <p>The <strong>5-in-1 Ultimate Combo</strong> includes:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>VPods Pro 2 (2nd Gen) ANC Earbuds</li>
          <li>10,000mAh MagSafe Power Bank</li>
          <li>4-in-1 Fast Charging Cable</li>
          <li>Silicone Protective Case</li>
          <li>Sticky Pod Mobile Mount</li>
        </ul>
        <p className="mt-2">You get the complete combo for ₹1,499 (MRP ₹2,299).</p>
      </>
    ),
  },
  {
    q: "How long will my order take to arrive?",
    a: (
      <p>
        Orders are generally delivered within <strong>2–3 business days</strong> across India via Express Courier (Bluedart, Delhivery). You will receive tracking details via SMS/WhatsApp once shipped.
      </p>
    ),
  },
  {
    q: "Can I track my order?",
    a: (
      <p>
        Yes! Once your order is dispatched, you will receive live Shiprocket tracking details through SMS &amp; WhatsApp. You can track anytime at <Link href="/pages/tracking" className="text-[#2868E8] underline font-semibold">Track Your Order</Link>.
      </p>
    ),
  },
  {
    q: "How's the sound quality, bass, and ANC?",
    a: (
      <p>
        The sound quality is solid — <strong>8/10</strong>, with powerful and punchy bass rated around <strong>9/10</strong>. The ANC (Active Noise Cancellation) is very effective at reducing surrounding noise.
      </p>
    ),
  },
  {
    q: "Does Veloraa offer a warranty?",
    a: (
      <p>
        Yes! We provide a <strong>6-month replacement warranty</strong> on eligible products against manufacturing defects. The warranty is 100% hassle-free.
      </p>
    ),
  },
  {
    q: "What if I receive a damaged or defective product?",
    a: (
      <p>
        Don&apos;t worry — if your product arrives damaged or defective, you are covered under our <strong>7-Day Easy Replacement Policy</strong>. Simply submit the replacement form with your Order ID.
      </p>
    ),
  },
  {
    q: "How do I request a replacement or claim my warranty?",
    a: (
      <p>
        Visit the <Link href="/pages/replacement-assistance" className="text-[#2868E8] underline font-semibold">Veloraa Replacement Assistance Form</Link> available in the website menu, enter your Order ID and photos/videos of the product. Or email <a href="mailto:SupportVeloraa@gmail.com" className="text-[#2868E8] underline font-semibold">SupportVeloraa@gmail.com</a>.
      </p>
    ),
  },
  {
    q: "What does the 6-month warranty cover?",
    a: (
      <p>
        The 6-month warranty covers all manufacturing defects and electronic performance issues. It does not cover physical accidental breakage or liquid spills.
      </p>
    ),
  },
  {
    q: "Can I get a refund?",
    a: (
      <p>
        Veloraa follows a <strong>replacement-first policy</strong>. If a replacement cannot resolve the defect, a refund will be processed to your original payment method within 7–14 business days.
      </p>
    ),
  },
];

function ProductDetailContent({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Live real-time Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: "03",
    minutes: "14",
    seconds: "23",
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = Math.max(0, endOfDay.getTime() - now.getTime());
      const h = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
      const m = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
      const s = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
      setTimeLeft({ hours: h, minutes: m, seconds: s });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white min-h-screen text-[#020b1f]">
      {/* 1. Main Product Section */}
      <section
        id="shopify-section-template--26661922308414__main"
        className="shopify-section section"
      >
        <div
          id="MainProduct-template--26661922308414__main"
          className="page-width section-template--26661922308414__main-padding max-w-[120rem] mx-auto px-4 sm:px-8 py-2 sm:py-3"
        >
          <div className="product product--large product--left product--stacked product--mobile-hide grid grid--1-col grid--2-col-tablet gap-8 lg:gap-12 items-start">
            {/* LEFT: Image Gallery */}
            <div className="grid__item product__media-wrapper w-full overflow-hidden">
              <div id="MediaGallery-template--26661922308414__main" className="product__column-sticky overflow-hidden">
                <ul
                  id="Slider-Gallery-template--26661922308414__main"
                  className="product__media-list contains-media list-unstyled"
                  role="list"
                >
                  {product.images.map((img, idx) => (
                    <li
                      key={idx}
                      id={`Slide-template--26661922308414__main-${idx + 1}`}
                      className="product__media-item grid__item"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${product.title} - ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                      {idx === 0 && selectedVariant.compareAtPrice > selectedVariant.price && (
                        <div className="absolute bottom-4 left-4">
                          <span className="badge badge--bottom-left bg-[#020b1f] text-white text-xs font-semibold px-3 py-1 rounded-full">
                            Sale
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT: Buy Box Information (Sticky on Desktop) */}
            <div className="product__info-wrapper grid__item flex flex-col justify-start">
              <div className="product__info-container space-y-4">
                {/* Vendor / Brand text */}
                <p className="product__text inline-richtext caption-with-letter-spacing text-xs text-gray-500 uppercase tracking-widest font-semibold mb-0">
                  VELORAA
                </p>

                {/* Rating Badge */}
                <div
                  className="product-icon-list vstar-star flex items-center cursor-pointer"
                  style={{ marginTop: "6px", marginBottom: "10px" }}
                  onClick={() => {
                    const el = document.getElementById("shopify-section-template--26661922308414__17391977265eb60ca1");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <div className="flex items-center">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="star-item inline-flex w-[18px] h-[17px] mr-[2px]">
                        <svg className="w-full h-full" viewBox="0 0 18 17" fill="none">
                          <path fill="#FFA800" d="M8.89062 0.565613L11.4299 6.07066L17.4501 6.78446L12.9992 10.9006L14.1807 16.8468L8.89062 13.8856L3.60056 16.8468L4.78206 10.9006L0.331117 6.78446L6.35139 6.07066L8.89062 0.565613Z" />
                        </svg>
                      </div>
                    ))}
                    <div className="star-item inline-flex relative w-[18px] h-[17px] mr-[2px]">
                      <svg className="w-full h-full" viewBox="0 0 18 17" fill="none">
                        <path fill="#E2E8F0" d="M8.89062 0.565613L11.4299 6.07066L17.4501 6.78446L12.9992 10.9006L14.1807 16.8468L8.89062 13.8856L3.60056 16.8468L4.78206 10.9006L0.331117 6.78446L6.35139 6.07066L8.89062 0.565613Z" />
                      </svg>
                      <div className="absolute top-0 left-0 w-[70%] overflow-hidden h-full">
                        <svg className="w-[18px] h-[17px]" viewBox="0 0 18 17" fill="none">
                          <path fill="#FFA800" d="M8.89062 0.565613L11.4299 6.07066L17.4501 6.78446L12.9992 10.9006L14.1807 16.8468L8.89062 13.8856L3.60056 16.8468L4.78206 10.9006L0.331117 6.78446L6.35139 6.07066L8.89062 0.565613Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="tt-rating-text ml-2 text-xs sm:text-[13px] text-gray-500 font-medium hover:underline">
                    636 Reviews
                  </div>
                </div>

                {/* Product Title */}
                <h1 className="product__title text-xl sm:text-2xl font-medium text-[#020b1f] leading-snug">
                  {product.title}
                </h1>

                {/* Price Box */}
                <div
                  id="price-template--26661922308414__main"
                  className="price price--large price--on-sale price--show-badge flex items-baseline gap-3 pt-1"
                >
                  <span className="price-item price-item--sale text-2xl sm:text-3xl font-bold text-[#020b1f]">
                    Rs. {selectedVariant.price.toLocaleString("en-IN")}.00
                  </span>
                  {selectedVariant.compareAtPrice > selectedVariant.price && (
                    <s className="price-item price-item--regular text-base text-gray-400">
                      Rs. {selectedVariant.compareAtPrice.toLocaleString("en-IN")}.00
                    </s>
                  )}
                  <span className="badge bg-[#020b1f] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    Sale
                  </span>
                </div>

                <div className="product__tax text-xs text-gray-500">
                  <Link href="/policies/shipping-policy" className="underline hover:text-gray-800">
                    Shipping
                  </Link>{" "}
                  calculated at checkout.
                </div>

                {/* Variant Selectors */}
                <div className="space-y-3 pt-2">
                  <fieldset className="js product-form__input m-0 p-0 border-0">
                    <legend className="form__label text-xs font-semibold text-[#020b1f] mb-2 block">
                      🎧Variant: ANC
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => {
                        const isSelected = selectedVariant.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariant(v)}
                            className={`px-4 py-2 text-xs font-medium rounded-full border transition ${
                              isSelected
                                ? "bg-[#020b1f] text-white border-[#020b1f]"
                                : "bg-white text-[#020b1f] border-gray-300 hover:border-gray-500"
                            }`}
                          >
                            {v.title.includes("Superior") ? "Superior Premium ANC" : "Standard ANC"}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset className="js product-form__input m-0 p-0 border-0">
                    <legend className="form__label text-xs font-semibold text-[#020b1f] mb-2 block">
                      ⚡Combo Offer:
                    </legend>
                    <button
                      type="button"
                      className="px-4 py-2 text-xs font-medium rounded-full bg-[#020b1f] text-white border border-[#020b1f]"
                    >
                      5-in-1 Combo
                    </button>
                  </fieldset>
                </div>

                {/* Quantity Selector */}
                <div className="pt-2">
                  <label className="text-xs font-semibold text-[#020b1f] block mb-2">
                    Quantity
                  </label>
                  <div className="quantity flex items-center border border-gray-300 rounded-none w-32 justify-between px-2 py-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="quantity__button text-base px-2 py-1 hover:opacity-75"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      readOnly
                      className="quantity__input text-center text-sm font-semibold w-10 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="quantity__button text-base px-2 py-1 hover:opacity-75"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Stock Urgency Bar */}
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#020B1F",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background: "#020B1F",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                  <span>
                    🔥 Selling Fast <strong>📦 Limited Stock Left</strong>
                  </span>
                </div>

                {/* Buy Box Action Buttons */}
                <div className="space-y-3 pt-2">
                  {/* Button 1: Add to cart */}
                  <button
                    id="ProductSubmitButton-template--26661922308414__main"
                    type="button"
                    onClick={() => addToCart(product, selectedVariant, quantity)}
                    className="product-form__submit button button--full-width button--secondary w-full bg-white hover:bg-gray-50 text-[#020b1f] border border-[#020b1f] py-3.5 px-6 font-semibold text-[14px] tracking-wide transition uppercase text-center"
                  >
                    <span>Add to cart</span>
                  </button>

                  {/* Button 2: Fastrr Boost BUY NOW */}
                  <div id="sr_one" className="shiprocket-headless w-full" data-type="product">
                    <button
                      type="button"
                      name="sr-headless-button"
                      onClick={() => {
                        addToCart(product, selectedVariant, quantity);
                        window.location.href = `/checkout?variantId=${selectedVariant.id}&productHandle=${product.handle}`;
                      }}
                      className="sr-headless-checkout relative w-full bg-black hover:bg-neutral-900 text-white rounded-none py-3.5 px-4 font-semibold transition group shadow-md"
                    >
                      <span className="absolute -top-2.5 left-4 bg-[#53ff73] text-black text-[9px] font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        Extra ₹200 Off on Prepaid Orders
                      </span>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-[15px] font-bold tracking-wide">BUY NOW</span>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/upi_options.svg"
                            alt="Google Pay | Phone Pay | UPI"
                            className="h-4 inline-block ml-1"
                          />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/right_arrow.svg"
                            alt="→"
                            className="h-3.5 inline-block transform group-hover:translate-x-1 transition-transform ml-1"
                          />
                        </div>
                        <div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/powered_by.svg"
                            alt="powered by Fastrr"
                            className="h-3.5 inline-block opacity-85"
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>


                {/* Veloraa Trust Section (Exact 3 Cards) */}
                <div className="veloraa-trust-section my-4">
                  {/* 6 MONTHS WARRANTY */}
                  <div className="veloraa-trust-card veloraa-warranty">
                    <div className="veloraa-trust-icon">🛡️</div>
                    <div className="veloraa-trust-text">
                      <h3>6 Months Warranty</h3>
                      <p>Coverage against manufacturing defects for 6 months.</p>
                    </div>
                    <div className="veloraa-trust-badge">Warranty Covered</div>
                  </div>

                  {/* 7 DAY REPLACEMENT */}
                  <div className="veloraa-trust-card veloraa-replacement">
                    <div className="veloraa-trust-icon">🔄</div>
                    <div className="veloraa-trust-text">
                      <h3>7 Days Easy Replacement</h3>
                      <p>7-day replacement for products received damaged.</p>
                    </div>
                    <div className="veloraa-trust-badge">Damage Covered</div>
                  </div>

                  {/* QUALITY CHECK */}
                  <div className="veloraa-trust-card veloraa-quality">
                    <div className="veloraa-trust-icon">✅</div>
                    <div className="veloraa-trust-text">
                      <h3>Quality Checked Before Dispatch</h3>
                      <p>Every product is carefully inspected before dispatch.</p>
                    </div>
                    <div className="veloraa-trust-badge">Quality Checked</div>
                  </div>
                </div>

                {/* Two Trust Images below trust cards */}
                <div className="my-5 space-y-4">
                  <div className="text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/Codex_Image_27_Aug_2026_23_00_22_-_Edited.png?v=1787853204"
                      alt="Fulfilled by Amazon"
                      className="max-w-[380px] w-full h-auto mx-auto block"
                    />
                  </div>
                  <div className="text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_4_2026_at_01_42_06_AM.png?v=1783109620"
                      alt="100% Genuine, Free Delivery, 7 Days Replacement"
                      className="max-w-[380px] w-full h-auto mx-auto block"
                    />
                  </div>
                </div>

                {/* In-Page 3rd Anniversary Sale Countdown Box */}
                <div
                  id="shopify-block-ARGhBR1RPUUdNelJRY__gsc_countdown_timer_countdown_aUfXDF"
                  className="shopify-block shopify-app-block my-5"
                >
                  <div className="bg-[#0c1832] rounded-[20px] p-5 sm:p-6 text-center text-white shadow-xl backdrop-blur-md">
                    <div className="text-xl sm:text-2xl font-bold leading-tight mb-1 text-white">
                      3rd Anniversary Sale! – Biggest Sale Yet! 🔥
                    </div>
                    <div className="text-sm text-[#d6d6d6] mb-3">
                      Sale ends in:
                    </div>
                    <div className="w-[85%] max-w-[380px] mx-auto">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 text-center">
                        <div className="flex flex-col items-center min-w-[50px] sm:min-w-[65px]">
                          <span className="text-3xl sm:text-4xl font-semibold leading-none text-white">00</span>
                          <span className="text-xs text-[#9e9e9e] font-medium mt-1">Days</span>
                        </div>
                        <span className="text-2xl font-light text-white -mt-4">:</span>
                        <div className="flex flex-col items-center min-w-[50px] sm:min-w-[65px]">
                          <span className="text-3xl sm:text-4xl font-semibold leading-none text-white">{timeLeft.hours}</span>
                          <span className="text-xs text-[#9e9e9e] font-medium mt-1">Hours</span>
                        </div>
                        <span className="text-2xl font-light text-white -mt-4">:</span>
                        <div className="flex flex-col items-center min-w-[50px] sm:min-w-[65px]">
                          <span className="text-3xl sm:text-4xl font-semibold leading-none text-white">{timeLeft.minutes}</span>
                          <span className="text-xs text-[#9e9e9e] font-medium mt-1">Minutes</span>
                        </div>
                        <span className="text-2xl font-light text-white -mt-4">:</span>
                        <div className="flex flex-col items-center min-w-[50px] sm:min-w-[65px]">
                          <span className="text-3xl sm:text-4xl font-semibold leading-none text-white">{timeLeft.seconds}</span>
                          <span className="text-xs text-[#9e9e9e] font-medium mt-1">Seconds</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Full Details Link */}
                <div className="pt-1">
                  <a
                    href="#product-details"
                    className="link product__view-details animate-arrow inline-flex items-center gap-1.5 text-xs text-[#020b1f] hover:underline font-medium"
                  >
                    <span>View full details</span>
                    <svg viewBox="0 0 14 10" fill="none" aria-hidden="true" className="w-3.5 h-2.5">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>

                {/* Description & Inclusions */}
                <div id="product-details" className="pt-4 border-t border-gray-200 text-xs text-gray-700 space-y-3 leading-relaxed">
                  <p>{product.description}</p>
                  {product.includes.length > 0 && (
                    <div className="pt-1">
                      <strong className="text-[#020b1f] block mb-1">
                        What&apos;s included in the box:
                      </strong>
                      <ul className="list-disc pl-4 space-y-0.5 text-gray-600">
                        {product.includes.map((it, i) => (
                          <li key={i}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Product Highlights Image Showcase (Exact cgrL4w) */}
      <section
        id="shopify-section-template--26661922308414__custom_liquid_cgrL4w"
        className="shopify-section section"
      >
        <div className="color-background-1 gradient">
          <div className="section-template--26661922308414__custom_liquid_cgrL4w-padding">
            <div
              className="product-highlights"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                padding: "16px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_3_2026_at_11_40_05_PM.png?v=1783102248"
                alt="Hero Highlight"
                className="hero"
                style={{ gridColumn: "1 / 3", width: "100%", display: "block", borderRadius: "18px" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_3_2026_at_12_26_50_AM.png?v=1783102617"
                alt="Feature 1"
                style={{ width: "100%", display: "block", borderRadius: "18px" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_3_2026_at_01_10_52_AM.png?v=1783102806"
                alt="Feature 2"
                style={{ width: "100%", display: "block", borderRadius: "18px" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_3_2026_at_11_51_20_PM.png?v=1783102910"
                alt="Feature 3"
                style={{ width: "100%", display: "block", borderRadius: "18px" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_3_2026_at_11_53_52_PM.png?v=1783103052"
                alt="Feature 4"
                style={{ width: "100%", display: "block", borderRadius: "18px" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_3_2026_at_11_58_23_PM.png?v=1783103330"
                alt="Bottom Hero Highlight"
                className="hero"
                style={{ gridColumn: "1 / 3", width: "100%", display: "block", borderRadius: "18px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Customer Reviews Section: "Hear It From Our Customers ❤️" (Exact K4grnV) */}
      <CustomerReviewsSection />

      {/* 4. Influencer Video UGC Section: "Your Favorite Influencers Trust Veloraa 🤍" (Exact YiiVN4) */}
      <InfluencerReviewsSection />

      {/* 5. High-Res Infographic Banner (Exact image_banner_hCj3Hc) */}
      <section
        id="shopify-section-template--26661922308414__image_banner_hCj3Hc"
        className="shopify-section section w-full"
      >
        <div className="w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.veloraa.co.in/cdn/shop/files/ChatGPT_Image_Jul_4_2026_at_01_00_35_AM.png?v=1783107099&width=3840"
            alt="Combo Breakdown Infographic"
            className="w-full h-auto block object-cover"
            width={1024}
            height={1536}
            style={{ width: "100%", height: "auto", display: "block" }}
            loading="eager"
          />
        </div>
      </section>

      {/* 6. FAQ Jump Bar (Exact mUmtdr) */}
      <section
        id="shopify-section-template--26661922308414__custom_liquid_mUmtdr"
        className="shopify-section section"
      >
        <div className="color-background-1 gradient">
          <div
            className="section-template--26661922308414__custom_liquid_mUmtdr-padding"
            style={{ paddingTop: "40px", paddingBottom: "52px" }}
          >
            <div className="veloraa-faq-jump">
              <a href="#veloraa-faq">
                <span>Have any questions in mind?</span>
                <small>All the frequently asked questions are below.</small>
                <span className="veloraa-faq-arrow">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Full Trustoo Reviews Widget (Exact 17391977265eb60ca1) */}
      <TrustooReviewsWidget />

      {/* 8. "You May Also Like" Related Products (Exact 4Q3YAU) */}
      <section
        id="shopify-section-template--26661922308414__featured_collection_4Q3YAU"
        className="shopify-section section"
      >
        <div className="color-background-1 isolate gradient">
          <div
            className="collection section-template--26661922308414__featured_collection_4Q3YAU-padding page-width"
            style={{ paddingTop: "36px", paddingBottom: "36px" }}
          >
            <div className="collection__title title-wrapper title-wrapper--no-top-margin page-width mb-6">
              <h2 className="title inline-richtext h1 text-xl sm:text-2xl font-medium text-[#020b1f]">
                You may also like
              </h2>
            </div>

            <div className="page-width">
              <ul
                id="Slider-template--26661922308414__featured_collection_4Q3YAU"
                className="grid product-grid contains-card contains-card--product grid--4-col-desktop grid--2-col-tablet-down list-unstyled"
                role="list"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "16px",
                }}
              >
                {relatedProducts.map((p, idx) => (
                  <li
                    key={p.id}
                    id={`Slide-template--26661922308414__featured_collection_4Q3YAU-${idx + 1}`}
                    className="grid__item"
                  >
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Help & Support FAQ Section (Exact im8A6L) */}
      <section
        id="shopify-section-template--26661922308414__custom_liquid_im8A6L"
        className="shopify-section section"
      >
        <div className="color-background-1 gradient">
          <div className="veloraa-faq-section" id="veloraa-faq">
            <div className="veloraa-faq-heading">
              <span className="veloraa-faq-eyebrow">HELP &amp; SUPPORT</span>
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know before placing your order.</p>
            </div>

            <div className="veloraa-faq-list">
              {FAQS_LIST.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`veloraa-faq-item ${isOpen ? "active" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="veloraa-faq-question"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <span className="veloraa-faq-icon">+</span>
                    </button>

                    <div className="veloraa-faq-answer">
                      {faq.a}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Support Box */}
            <div className="veloraa-faq-support">
              <div className="veloraa-support-content">
                <span className="veloraa-support-label">STILL HAVE QUESTIONS?</span>
                <h3>We&apos;re here to help.</h3>
                <p>
                  Can&apos;t find what you&apos;re looking for? Our support team is
                  happy to assist you.
                </p>
              </div>

              <a
                href="mailto:SupportVeloraa@gmail.com"
                className="veloraa-support-button"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
