import React from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

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

  // Exact 9 products matching Veloraa's /collections/frontpage grid
  const collectionProducts = PRODUCTS.slice(0, 9);

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

            <div className="page-width page-width-desktop">
              <ul
                id="Slider-template--26661921849662__featured_collection_JAhFHD"
                className="grid product-grid contains-card contains-card--product contains-card--standard grid--5-col-desktop grid--2-col-tablet-down list-none p-0 m-0"
                role="list"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {collectionProducts.map((product, idx) => (
                  <li
                    key={product.id}
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
