import React from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const resolvedParams = await params;
  const collectionTitle =
    resolvedParams.handle === "frontpage"
      ? "Products"
      : resolvedParams.handle
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

  return (
    <main id="MainContent" className="content-for-layout focus-none" role="main">
      <div className="page-width max-w-[120rem] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="title-wrapper mb-6 border-b border-gray-100 pb-4 flex items-baseline justify-between">
          <h1 className="title inline-richtext text-2xl sm:text-3xl font-medium text-[#020b1f]">
            {collectionTitle}
          </h1>
          <span className="text-xs text-gray-500 font-medium">
            {PRODUCTS.length} products
          </span>
        </div>

        <ul
          className="grid product-grid contains-card contains-card--product contains-card--standard grid--4-col-desktop grid--2-col-tablet-down list-none p-0 m-0"
          role="list"
        >
          {PRODUCTS.map((product, idx) => (
            <li
              key={product.id}
              className="grid__item scroll-trigger animate--slide-in"
              data-cascade
              style={{ "--animation-order": idx + 1 } as React.CSSProperties}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
