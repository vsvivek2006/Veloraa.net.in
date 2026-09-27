import React from "react";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import SecondaryBanner from "@/components/SecondaryBanner";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  // Exact 8 products displayed on Veloraa's homepage grid
  const featuredHandles = [
    "ultimate-combo-10000mah",
    "watch-series-10-free-pro-2nd-gen",
    "veloraa-watch-10-smartwatch",
    "veloraa-magsafe-battery-pack",
    "veloraa-watch-ultra-49mm",
    "veloraa-foldaway-3-in-1-charger",
    "vpods-pro-2nd-gen-usa-quality",
    "vpods-max-anc",
  ];

  const featuredProducts = featuredHandles
    .map((handle) => PRODUCTS.find((p) => p.handle === handle))
    .filter(Boolean) as typeof PRODUCTS;

  return (
    <main
      id="MainContent"
      className="content-for-layout focus-none"
      role="main"
      tabIndex={-1}
    >
      {/* 1. Exact Veloraa Hero Banner */}
      <HeroBanner />

      {/* 2. Featured Collection Section */}
      <section
        id="shopify-section-template--26661922144574__featured_collection_DMqcQx"
        className="shopify-section section"
      >
        <div className="color-background-1 isolate gradient">
          <div className="collection section-template--26661922144574__featured_collection_DMqcQx-padding py-8 sm:py-11">
            <div className="collection__title title-wrapper title-wrapper--no-top-margin page-width mb-6 sm:mb-8">
              <h2 className="title inline-richtext h1 scroll-trigger animate--slide-in">Featured Products</h2>
            </div>

            <div className="page-width page-width-desktop">
              <ul
                id="Slider-template--26661922144574__featured_collection_DMqcQx"
                className="grid product-grid contains-card contains-card--product contains-card--standard grid--4-col-desktop grid--2-col-tablet-down list-none p-0 m-0"
                role="list"
              >
                {featuredProducts.map((product, idx) => (
                  <li
                    key={product.id}
                    id={`Slide-template--26661922144574__featured_collection_DMqcQx-${idx + 1}`}
                    className="grid__item scroll-trigger animate--slide-in"
                    data-cascade
                    style={{ "--animation-order": idx + 1 } as React.CSSProperties}
                  >
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="center collection__view-all text-center mt-8 sm:mt-10 scroll-trigger animate--slide-in">
              <Link
                href="/collections/all"
                className="button inline-flex items-center justify-center px-8 py-3 bg-[#020b1f] text-white text-[15px] font-medium tracking-[0.1rem] hover:opacity-90 transition min-w-[122px] min-h-[47px]"
                aria-label="View all products in the Home page collection"
              >
                View all
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Exact Veloraa Secondary Image Banner */}
      <SecondaryBanner />
    </main>
  );
}
