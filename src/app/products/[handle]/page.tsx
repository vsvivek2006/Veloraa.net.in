"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PRODUCTS,
  Product,
  Variant,
} from "@/data/products";
import { useCart } from "@/context/CartContext";
import PincodeChecker from "@/components/PincodeChecker";
import ProductCard from "@/components/ProductCard";
import CustomerReviewsSection from "@/components/CustomerReviewsSection";
import InfluencerReviewsSection from "@/components/InfluencerReviewsSection";
import TrustooReviewsWidget from "@/components/TrustooReviewsWidget";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const handle = resolvedParams.handle;
  const product =
    PRODUCTS.find((p) => p.handle === handle) ||
    PRODUCTS.find((p) => handle === "5-in-1-bundle" && (p.handle === "ultimate-combo-10000mah" || p.handle === "5-in-1-ultimate-combo")) ||
    PRODUCTS.find((p) => handle.includes("watch-series-10") && p.handle.includes("watch-series-10")) ||
    PRODUCTS.find((p) => handle.includes("magsafe") && p.handle.includes("magsafe")) ||
    PRODUCTS[0];

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}



const FAQS_LIST = [
  {
    q: "What's included in the Ultimate Combo (₹1499)?",
    a: "The 5-in-1 Ultimate Combo includes: VPods Pro 2 (2nd Gen) ANC Earbuds, 10,000mAh MagSafe Power Bank, 4-in-1 Fast Charging Cable, Silicone Protective Case, and Sticky Pod. You get the complete combo for ₹1,499 (MRP ₹2,299).",
  },
  {
    q: "How long will my order take to arrive?",
    a: "Orders are generally delivered within 2-3 business days after dispatch across India via Express Courier (Bluedart, Delhivery). You will receive tracking details via SMS/WhatsApp once shipped.",
  },
  {
    q: "Can I track my order?",
    a: "Yes. Once your order is dispatched, you will receive live Shiprocket tracking details through SMS & WhatsApp. You can track anytime at /tracking.",
  },
  {
    q: "How's the sound quality, bass, and ANC?",
    a: "The sound quality is solid — 8/10, with powerful and punchy bass rated around 9/10. The ANC (Active Noise Cancellation) is very effective at reducing surrounding noise.",
  },
  {
    q: "Does Veloraa offer a warranty?",
    a: "Yes! We provide a 6-month replacement warranty on eligible products against manufacturing defects. The warranty is 100% hassle-free.",
  },
  {
    q: "What if I receive a damaged or defective product?",
    a: "Don't worry — if your product arrives damaged or defective, you are covered under our 7-Day Easy Replacement Policy. Simply submit the replacement form with your Order ID.",
  },
  {
    q: "How do I request a replacement or claim my warranty?",
    a: "Visit the Veloraa Replacement Assistance Form available in the website menu, enter your Order ID and photos/videos of the product. Or email SupportVeloraa@gmail.com.",
  },
  {
    q: "What does the 6-month warranty cover?",
    a: "The 6-month warranty covers all manufacturing defects and electronic performance issues. It does not cover physical accidental breakage or liquid spills.",
  },
  {
    q: "Can I get a refund?",
    a: "Veloraa follows a replacement-first policy. If a replacement cannot resolve the defect, a refund will be processed to your original payment method within 7–14 business days.",
  },
];

function ProductDetailContent({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white min-h-screen text-[#020b1f]">
      {/* 1. Main Product Section */}
      <section
        id="shopify-section-template--26661922308414__main"
        className="shopify-section section page-width max-w-[120rem] mx-auto px-4 sm:px-8 py-6 sm:py-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square w-full bg-[#f3f3f3] overflow-hidden rounded-xs border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
              {selectedVariant.compareAtPrice > selectedVariant.price && (
                <div className="absolute bottom-3 left-3">
                  <span className="badge badge--bottom-left color-scheme-5e4a0062-7ce9-4fee-a5d0-1152250d3943 bg-[#020b1f] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Sale
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pt-3 pb-1 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-[#f3f3f3] rounded-xs overflow-hidden border transition shrink-0 ${
                      selectedImage === idx
                        ? "border-[#020b1f] ring-1 ring-[#020b1f]"
                        : "border-gray-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Buy Box Information */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Vendor / Brand text */}
            <p className="product__text inline-richtext caption-with-letter-spacing text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
              VelorAa
            </p>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl font-medium text-[#020b1f] leading-snug mb-3">
              {product.title}
            </h1>

            {/* Price Box */}
            <div className="price price--large price--on-sale mb-2 flex items-baseline gap-3">
              <span className="price-item price-item--sale text-xl sm:text-2xl font-bold text-[#020b1f]">
                Rs. {selectedVariant.price.toLocaleString("en-IN")}.00
              </span>
              {selectedVariant.compareAtPrice > selectedVariant.price && (
                <s className="price-item price-item--regular text-sm sm:text-base text-gray-400">
                  Rs. {selectedVariant.compareAtPrice.toLocaleString("en-IN")}.00
                </s>
              )}
              <span className="badge color-scheme-5e4a0062-7ce9-4fee-a5d0-1152250d3943 bg-[#020b1f] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                Sale
              </span>
            </div>

            <div className="product__tax text-xs text-gray-500 mb-5">
              <Link href="/policies/shipping-policy" className="underline">
                Shipping
              </Link>{" "}
              calculated at checkout.
            </div>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="mb-4">
                <span className="text-xs font-semibold text-[#020b1f] block mb-2">
                  🎧 Variant: ANC
                </span>
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
                            : "bg-white text-[#020b1f] border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {v.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-4">
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

            {/* Selling Fast Pulsing Inventory Indicator */}
            <div className="flex items-center gap-2 mb-5 text-[13px] font-medium text-[#020b1f]">
              <span className="w-2.5 h-2.5 bg-[#020b1f] rounded-full animate-ping" />
              <span>
                🔥 Selling Fast <strong>📦 Limited Stock Left</strong>
              </span>
            </div>

            {/* Exact 3 Buy Box Buttons */}
            <div className="space-y-3 mb-6">
              {/* Button 1: Add to cart */}
              <button
                type="button"
                onClick={() => addToCart(product, selectedVariant, quantity)}
                className="w-full bg-white hover:bg-gray-50 text-[#020b1f] border border-[#020b1f] py-3.5 px-6 font-medium text-[14px] tracking-wide transition uppercase"
              >
                Add to cart
              </button>

              {/* Button 2: Fastrr / Shiprocket Order Now - Cash on Delivery */}
              <Link
                href={`/checkout?variantId=${selectedVariant.id}&productHandle=${product.handle}&prepaid=false`}
                className="relative block w-full bg-[#bc0808] hover:bg-[#a00707] text-white py-3.5 px-6 font-semibold text-[14px] text-center rounded-none transition border-2 border-white shadow-md group"
              >
                <span className="absolute -top-2.5 left-4 bg-[#53ff73] text-black text-[9px] font-extrabold px-2 py-0.5 rounded-sm">
                  Extra ₹200 Off on Prepaid Orders
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span>Order Now - Cash on Delivery</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/upi_options.svg"
                    alt="UPI"
                    className="h-4 inline-block ml-1"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/right_arrow.svg"
                    alt="→"
                    className="h-3 inline-block ml-1 transform group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>

              {/* Button 3: Fastrr / Shiprocket Pay Online & Get ₹200 off */}
              <Link
                href={`/checkout?variantId=${selectedVariant.id}&productHandle=${product.handle}&prepaid=true`}
                className="relative block w-full bg-black hover:bg-zinc-900 text-white py-3.5 px-6 font-semibold text-[14px] text-center rounded-none transition border-2 border-white shadow-md group"
              >
                <span className="absolute -top-2.5 left-4 bg-[#53ff73] text-black text-[9px] font-extrabold px-2 py-0.5 rounded-sm">
                  Extra ₹200 Off on Prepaid Orders
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span>Pay Online &amp; Get ₹200 off</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/upi_options.svg"
                    alt="UPI"
                    className="h-4 inline-block ml-1"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/right_arrow.svg"
                    alt="→"
                    className="h-3 inline-block ml-1 transform group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            </div>

            {/* Shiprocket Delivery Pincode Estimator */}
            <div className="mb-6">
              <PincodeChecker />
            </div>

            {/* Exact 3 Veloraa Trust Cards matching live classes */}
            <div className="veloraa-trust-section mb-6">
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

            {/* Description & Inclusions */}
            <div className="pt-4 border-t border-gray-200 text-xs text-gray-700 space-y-2 leading-relaxed">
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
      </section>

      {/* 2. Product Highlights Image Showcase (Exact cgrL4w) */}
      <section className="page-width max-w-[120rem] mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-2xl">
          <img
            src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_3_2026_at_11_40_05_PM.png?v=1783102248"
            alt="Hero Highlight"
            className="md:col-span-2 w-full rounded-2xl object-cover"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_3_2026_at_12_26_50_AM.png?v=1783102617"
            alt="Feature 1"
            className="w-full rounded-2xl object-cover"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_3_2026_at_01_10_52_AM.png?v=1783102806"
            alt="Feature 2"
            className="w-full rounded-2xl object-cover"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_3_2026_at_11_51_20_PM.png?v=1783102910"
            alt="Feature 3"
            className="w-full rounded-2xl object-cover"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_3_2026_at_11_53_52_PM.png?v=1783103052"
            alt="Feature 4"
            className="w-full rounded-2xl object-cover"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_3_2026_at_11_58_23_PM.png?v=1783103330"
            alt="Feature 5"
            className="md:col-span-2 w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* 3. Customer Reviews Section: "Hear It From Our Customers ❤️" (Exact K4grnV) */}
      <CustomerReviewsSection />

      {/* 4. Influencer Video UGC Section: "Your Favorite Influencers Trust Veloraa 🤍" (Exact YiiVN4) */}
      <InfluencerReviewsSection />

      {/* 5. High-Res Infographic Banner (Exact image_banner_hCj3Hc) */}
      <section id="shopify-section-template--26661922308414__image_banner_hCj3Hc" className="shopify-section section w-full">
        <div className="w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="//www.veloraa.co.in/cdn/shop/files/ChatGPT_Image_Jul_4_2026_at_01_00_35_AM.png?v=1783107099&width=3840"
            alt="Combo Breakdown Infographic"
            className="w-full h-auto block object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* 6. FAQ Jump Bar (Exact mUmtdr) */}
      <div className="w-full bg-[#F7F9FD] border-y border-[#E3EAF5]">
        <a
          href="#veloraa-faq"
          className="flex items-center justify-center gap-2 py-3.5 px-4 text-[#172238] hover:bg-[#F1F6FF] transition text-center no-underline"
        >
          <span className="text-[13px] font-bold">Have any questions in mind?</span>
          <small className="text-[12px] text-[#65758F]">
            All the frequently asked questions are below.
          </small>
          <span className="w-5 h-5 rounded-full bg-[#2868E8] text-white text-xs font-bold flex items-center justify-center ml-1">
            ↓
          </span>
        </a>
      </div>

      {/* 6. Full Trustoo Reviews Widget (Exact 17391977265eb60ca1) */}
      <TrustooReviewsWidget />

      {/* 6. "You May Also Like" Related Products */}
      <section className="page-width max-w-[120rem] mx-auto px-4 sm:px-8 py-10">
        <h2 className="text-xl sm:text-2xl font-medium text-[#020b1f] mb-6">
          You may also like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 7. Help & Support FAQ Section (Exact im8A6L) */}
      <section id="veloraa-faq" className="py-14 bg-[#081A3A] text-white">
        <div className="page-width max-w-[720px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold tracking-[1.8px] text-[#6EA8FF] uppercase block mb-2">
              HELP &amp; SUPPORT
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#B9C7DC]">
              Everything you need to know before placing your order.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS_LIST.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0D244D] border border-[#1A386D] rounded-lg overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left text-white text-[14px] font-semibold hover:text-[#6EA8FF] transition"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg text-[#6EA8FF] ml-3 shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#B9C7DC] border-t border-[#1A386D]/50 leading-relaxed">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Support Box */}
          <div className="mt-10 p-6 bg-[#0D244D] border border-[#1A386D] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#6EA8FF] block mb-1">
                STILL HAVE QUESTIONS?
              </span>
              <h3 className="text-lg font-bold text-white mb-1">
                We&apos;re here to help.
              </h3>
              <p className="text-xs text-[#B9C7DC]">
                Can&apos;t find what you&apos;re looking for? Our support team is happy to assist you.
              </p>
            </div>
            <a
              href="mailto:SupportVeloraa@gmail.com"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#2868E8] hover:bg-[#1f56c7] text-white text-xs font-bold rounded-lg transition shrink-0"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
