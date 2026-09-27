"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const filtered = query.trim()
    ? PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS;

  return (
    <main id="MainContent" className="content-for-layout focus-none" role="main">
      <div className="page-width max-w-[120rem] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="title-wrapper mb-8 text-center max-w-xl mx-auto">
          <h1 className="title inline-richtext text-3xl font-medium text-[#020b1f] mb-4">
            Search
          </h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative flex items-center"
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search our store..."
              className="w-full border border-gray-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-black"
            />
          </form>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-6 font-medium">
            {filtered.length} results {query && `for "${query}"`}
          </p>

          <ul
            className="grid product-grid contains-card contains-card--product contains-card--standard grid--4-col-desktop grid--2-col-tablet-down list-none p-0 m-0"
            role="list"
          >
            {filtered.map((product, idx) => (
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
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
