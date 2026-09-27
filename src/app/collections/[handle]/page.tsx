import React from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, Product } from "@/data/products";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

const FRONTPAGE_ITEMS = [
  {
    canonicalHandle: "5-in-1-bundle",
    sourceHandle: "ultimate-combo-10000mah",
    rating: 4.7,
    reviewCount: 636,
  },
  {
    canonicalHandle: "watch-series-10-free-pro-2nd-generation-anc-type-c-100-hassle-free-warranty",
    sourceHandle: "watch-series-10-free-pro-2nd-gen",
    rating: 4.9,
    reviewCount: 437,
  },
  {
    canonicalHandle: "veloraa-series10-cellular-49-mm-smart-watch",
    sourceHandle: "veloraa-watch-10-smartwatch",
    rating: 4.9,
    reviewCount: 221,
  },
  {
    canonicalHandle: "magsafe-battery-pack-wireless-power-bank",
    sourceHandle: "veloraa-magsafe-battery-pack",
    rating: 4.9,
    reviewCount: 221,
  },
  {
    canonicalHandle: "veloraa-watch-ultra-gps-cellular-49-mm-smart-watch",
    sourceHandle: "veloraa-watch-ultra-49mm",
    rating: 4.9,
    reviewCount: 215,
  },
  {
    canonicalHandle: "untitled-aug7_12-30",
    sourceHandle: "veloraa-foldaway-3-in-1-charger",
    rating: 5.0,
    reviewCount: 2,
  },
  {
    canonicalHandle: "vpods-pro-2nd-gen-usa-quality",
    sourceHandle: "vpods-pro-2nd-gen-usa-quality",
    rating: 4.7,
    reviewCount: 768,
  },
  {
    canonicalHandle: "vpods-max-anc",
    sourceHandle: "vpods-max-anc",
    rating: 4.8,
    reviewCount: 129,
  },
  {
    canonicalHandle: "5-in-1-ultimate-combo",
    sourceHandle: "5-in-1-ultimate-combo",
    rating: 4.7,
    reviewCount: 626,
  },
];

export default async function CollectionPage({ params }: CollectionPageProps) {
  const resolvedParams = await params;
  const isFrontpageOrAll =
    resolvedParams.handle === "frontpage" ||
    resolvedParams.handle === "all" ||
    !resolvedParams.handle;

  const collectionTitle = isFrontpageOrAll
    ? "Best Sellers"
    : resolvedParams.handle
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

  // Exact 9 products matching Veloraa's /collections/frontpage grid in live order
  const collectionProducts: Product[] = isFrontpageOrAll
    ? FRONTPAGE_ITEMS.map((item, idx) => {
        const found =
          PRODUCTS.find((p) => p.handle === item.sourceHandle) ||
          PRODUCTS.find((p) => p.handle === item.canonicalHandle) ||
          PRODUCTS[idx % PRODUCTS.length];
        return {
          ...found,
          handle: item.canonicalHandle,
          rating: item.rating,
          reviewCount: item.reviewCount,
        };
      })
    : PRODUCTS.slice(0, 9);

  return (
    <main
      id="MainContent"
      className="content-for-layout focus-none"
      role="main"
      tabIndex={-1}
    >
      <section
        id="shopify-section-template--26661921849662__featured_collection_JAhFHD"
        className="shopify-section section"
      >
        <div className="color-background-1 isolate gradient">
          <div className="collection section-template--26661921849662__featured_collection_JAhFHD-padding py-8 sm:py-11">
            <div className="collection__title title-wrapper title-wrapper--no-top-margin page-width mb-6 sm:mb-8">
              <h2
                className="title inline-richtext h1 scroll-trigger animate--slide-in"
                style={{
                  fontSize: "40px",
                  lineHeight: "52px",
                  margin: "0 0 30px",
                  color: "#020b1f",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                }}
              >
                {collectionTitle}
              </h2>
            </div>

            <div className="page-width page-width-desktop px-4 sm:px-6">
              <ul
                id="Slider-template--26661921849662__featured_collection_JAhFHD"
                className="grid product-grid contains-card contains-card--product contains-card--standard grid--5-col-desktop grid--2-col-tablet-down list-none p-0 m-0"
                role="list"
              >
                {collectionProducts.map((product, idx) => (
                  <li
                    key={product.id || idx}
                    id={`Slide-template--26661921849662__featured_collection_JAhFHD-${idx + 1}`}
                    className="grid__item scroll-trigger animate--slide-in"
                    data-cascade
                    style={{ "--animation-order": idx + 1 } as React.CSSProperties}
                  >
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

