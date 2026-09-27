"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";
  
  const [inputValue, setInputValue] = useState(queryParam);
  const [activeQuery, setActiveQuery] = useState(queryParam);
  const [sortBy, setSortBy] = useState<"relevance" | "price-ascending" | "price-descending">("relevance");
  const [filterInStock, setFilterInStock] = useState<boolean>(false);
  const [priceGte, setPriceGte] = useState<string>("");
  const [priceLte, setPriceLte] = useState<string>("");
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  // Sync with URL query param if it changes externally
  React.useEffect(() => {
    setActiveQuery(queryParam);
    setInputValue(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    setActiveQuery(trimmed);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleClear = () => {
    setInputValue("");
    setActiveQuery("");
    router.push("/search");
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    if (!activeQuery.trim()) return [];

    let list = PRODUCTS.filter((p) => {
      const q = activeQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    });

    if (priceGte) {
      const min = parseFloat(priceGte);
      if (!isNaN(min)) {
        list = list.filter((p) => p.price >= min);
      }
    }

    if (priceLte) {
      const max = parseFloat(priceLte);
      if (!isNaN(max)) {
        list = list.filter((p) => p.price <= max);
      }
    }

    if (sortBy === "price-ascending") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-descending") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [activeQuery, sortBy, priceGte, priceLte]);

  const isQueryEmpty = !activeQuery.trim();
  const hasNoResults = !isQueryEmpty && filteredProducts.length === 0;

  return (
    <div id="MainContent" className="content-for-layout focus-none" role="main">
      <section
        id="shopify-section-template--26661922341182__main"
        className="shopify-section section"
      >
        <div
          className={`template-search ${
            isQueryEmpty || hasNoResults ? "template-search--empty" : ""
          } section-template--26661922341182__main-padding`}
        >
          <div className="template-search__header page-width scroll-trigger animate--fade-in">
            <h1 className="h2 center">
              {isQueryEmpty ? "Search" : "Search results"}
            </h1>
            <div className="template-search__search">
              <form
                onSubmit={handleSearchSubmit}
                action="/search"
                method="get"
                role="search"
                className="search"
              >
                <div className="field">
                  <input
                    className="search__input field__input"
                    id="Search-In-Template"
                    type="search"
                    name="q"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search"
                    role="combobox"
                    aria-expanded="false"
                    autoCorrect="off"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <label className="field__label" htmlFor="Search-In-Template">
                    Search
                  </label>
                  <input name="options[prefix]" type="hidden" value="last" />

                  {inputValue && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="reset__button field__button"
                      aria-label="Clear search term"
                    >
                      <svg
                        className="icon icon-close"
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 18 17"
                        fill="none"
                      >
                        <path
                          d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  )}

                  <button
                    type="submit"
                    className="search__button field__button"
                    aria-label="Search"
                  >
                    <svg
                      className="icon icon-search"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.71l4.71 4.7a.5.5 0 01-.7.71l-4.73-4.7z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {hasNoResults && (
              <p role="status">
                No results found for “{activeQuery}”. Check the spelling or use a different word or phrase.
              </p>
            )}
          </div>

          {!isQueryEmpty && filteredProducts.length > 0 && (
            <div>
              {/* Facets & Filter Bar */}
              <aside
                aria-labelledby="verticalTitle"
                className="facets-wrapper page-width"
                id="main-search-filters"
              >
                <div className="facets-container scroll-trigger animate--fade-in">
                  <div className="facets small-hide">
                    <form id="FacetFiltersForm" className="facets__form" onSubmit={(e) => e.preventDefault()}>
                      <div id="FacetsWrapperDesktop" className="facets__wrapper">
                        <h2 className="facets__heading caption-large text-body" id="verticalTitle" tabIndex={-1}>
                          Filter:
                        </h2>

                        {/* Availability Filter */}
                        <div className="facets__disclosure js-filter relative">
                          <button
                            type="button"
                            onClick={() => {
                              setAvailabilityOpen(!availabilityOpen);
                              setPriceOpen(false);
                            }}
                            className="facets__summary caption-large focus-offset flex items-center bg-transparent border-none cursor-pointer"
                            aria-expanded={availabilityOpen}
                          >
                            <span className="facets__summary-label">Availability</span>
                            <svg aria-hidden="true" focusable="false" className="icon icon-caret ml-2" viewBox="0 0 10 6" width="10" height="6">
                              <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor" />
                            </svg>
                          </button>

                          {availabilityOpen && (
                            <div className="facets__display shadow-lg border rounded-sm" style={{ top: "100%", left: 0 }}>
                              <div className="facets__header">
                                <span className="facets__selected">{filterInStock ? "1 selected" : "0 selected"}</span>
                                <button
                                  type="button"
                                  onClick={() => setFilterInStock(false)}
                                  className="facets__reset link underlined-link bg-transparent border-none cursor-pointer text-xs"
                                >
                                  Reset
                                </button>
                              </div>
                              <ul className="facets-layout-list facets__list list-unstyled" role="list">
                                <li className="list-menu__item facets__item">
                                  <label className="facets__label facet-checkbox cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={filterInStock}
                                      onChange={(e) => setFilterInStock(e.target.checked)}
                                    />
                                    <span className="facet-checkbox__text">In stock ({filteredProducts.length})</span>
                                  </label>
                                </li>
                                <li className="list-menu__item facets__item">
                                  <label className="facets__label facet-checkbox facet-checkbox--disabled">
                                    <input type="checkbox" disabled />
                                    <span className="facet-checkbox__text">Out of stock (0)</span>
                                  </label>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Price Filter */}
                        <div className="facets__disclosure js-filter relative">
                          <button
                            type="button"
                            onClick={() => {
                              setPriceOpen(!priceOpen);
                              setAvailabilityOpen(false);
                            }}
                            className="facets__summary caption-large focus-offset flex items-center bg-transparent border-none cursor-pointer"
                            aria-expanded={priceOpen}
                          >
                            <span>Price</span>
                            <svg aria-hidden="true" focusable="false" className="icon icon-caret ml-2" viewBox="0 0 10 6" width="10" height="6">
                              <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor" />
                            </svg>
                          </button>

                          {priceOpen && (
                            <div className="facets__display shadow-lg border rounded-sm" style={{ top: "100%", left: 0 }}>
                              <div className="facets__header">
                                <span className="facets__selected">The highest price is Rs. 2,199.00</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPriceGte("");
                                    setPriceLte("");
                                  }}
                                  className="facets__reset link underlined-link bg-transparent border-none cursor-pointer text-xs"
                                >
                                  Reset
                                </button>
                              </div>
                              <div className="facets__price">
                                <span className="field-currency">₹</span>
                                <div className="field">
                                  <input
                                    className="field__input"
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    max="2199"
                                    value={priceGte}
                                    onChange={(e) => setPriceGte(e.target.value)}
                                  />
                                  <label className="field__label">From</label>
                                </div>
                                <span className="field-currency">₹</span>
                                <div className="field">
                                  <input
                                    className="field__input"
                                    type="number"
                                    placeholder="2199.00"
                                    min="0"
                                    max="2199"
                                    value={priceLte}
                                    onChange={(e) => setPriceLte(e.target.value)}
                                  />
                                  <label className="field__label">To</label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Sort By Dropdown */}
                      <div className="facet-filters sorting caption">
                        <div className="facet-filters__field">
                          <h2 className="facet-filters__label caption-large text-body">
                            <label htmlFor="SortBy">Sort by:</label>
                          </h2>
                          <div className="select">
                            <select
                              name="sort_by"
                              className="facet-filters__sort select__select caption-large"
                              id="SortBy"
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value as any)}
                            >
                              <option value="relevance">Relevance</option>
                              <option value="price-ascending">Price, low to high</option>
                              <option value="price-descending">Price, high to low</option>
                            </select>
                            <svg aria-hidden="true" focusable="false" className="icon icon-caret" viewBox="0 0 10 6">
                              <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Product Count */}
                      <div className="product-count light" role="status">
                        <h2 className="product-count__text text-body">
                          <span id="ProductCountDesktop">{filteredProducts.length} results</span>
                        </h2>
                      </div>
                    </form>
                  </div>
                </div>
              </aside>

              {/* Product Grid */}
              <div className="product-grid-container" id="ProductGridContainer">
                <div
                  className="template-search__results collection page-width"
                  id="product-grid"
                >
                  <ul
                    className="grid product-grid grid--2-col-tablet-down grid--4-col-desktop list-none p-0 m-0"
                    role="list"
                  >
                    {filteredProducts.map((product, idx) => (
                      <li
                        key={product.id}
                        className="grid__item scroll-trigger animate--slide-in"
                        data-cascade=""
                        style={{ "--animation-order": idx + 1 } as React.CSSProperties}
                      >
                        <ProductCard product={product} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
