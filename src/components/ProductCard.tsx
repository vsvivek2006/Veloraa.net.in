"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0] || "/placeholder.png";
  const isSale = product.compareAtPrice > product.price;

  return (
    <div className="card-wrapper product-card-wrapper underline-links-hover">
      <div
        className="card card--standard card--media"
        style={{ "--ratio-percent": "100.0%" } as React.CSSProperties}
      >
        <div
          className="card__inner color-background-2 gradient ratio"
          style={{
            "--ratio-percent": "100.0%",
            position: "relative",
            aspectRatio: "1 / 1",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          <div className="card__media" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
            <Link
              href={`/products/${product.handle}`}
              className="media media--transparent media--hover-effect block w-full h-full relative"
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mainImage}
                alt={product.title}
                className="motion-reduce"
                loading="eager"
                width="1080"
                height="1080"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </Link>
          </div>

          <div className="card__content" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, pointerEvents: "none" }}>
            <div className="card__information">
              <h3 className="card__heading">
                <Link
                  href={`/products/${product.handle}`}
                  className="full-unstyled-link"
                  style={{ pointerEvents: "auto" }}
                >
                  {product.title}
                </Link>
              </h3>
            </div>
            {isSale && (
              <div className="card__badge bottom left">
                <span className="badge badge--bottom-left color-scheme-5e4a0062-7ce9-4fee-a5d0-1152250d3943">
                  Sale
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="card__content">
          <div className="card__information">
            <h3 className="card__heading h5">
              <Link
                href={`/products/${product.handle}`}
                className="full-unstyled-link"
              >
                {product.title}
              </Link>
              {product.reviewCount > 0 && (
                <div
                  className="collection-icon-list vstar-star"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  data-review-num={product.reviewCount}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="star-item" style={{ display: "inline-flex", alignItems: "center" }}>
                      <svg
                        className="trustoo-rating-icon"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 18 17"
                        fill="none"
                      >
                        <path
                          fill="#FFA800"
                          d="M8.89062 0.565613L11.4299 6.07066L17.4501 6.78446L12.9992 10.9006L14.1807 16.8468L8.89062 13.8856L3.60056 16.8468L4.78206 10.9006L0.331117 6.78446L6.35139 6.07066L8.89062 0.565613Z"
                        />
                      </svg>
                    </div>
                  ))}
                  <div
                    className="tt-rating-text collection-reviews-num"
                    style={{
                      fontSize: "14px",
                      color: "#020b1f",
                      marginLeft: "4px",
                      fontFamily: "'Poppins', sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ({product.reviewCount})
                  </div>
                </div>
              )}
            </h3>
            <div className="card-information">
              <div className={`price ${isSale ? "price--on-sale" : ""}`}>
                <div className="price__container">
                  {isSale ? (
                    <div className="price__sale">
                      <span className="visually-hidden visually-hidden--inline">
                        Regular price
                      </span>
                      <span>
                        <s className="price-item price-item--regular">
                          Rs. {product.compareAtPrice.toLocaleString("en-IN")}.00
                        </s>
                      </span>
                      <span className="visually-hidden visually-hidden--inline">
                        Sale price
                      </span>
                      <span className="price-item price-item--sale price-item--last">
                        From Rs. {product.price.toLocaleString("en-IN")}.00
                      </span>
                    </div>
                  ) : (
                    <div className="price__regular">
                      <span className="visually-hidden visually-hidden--inline">
                        Regular price
                      </span>
                      <span className="price-item price-item--regular">
                        From Rs. {product.price.toLocaleString("en-IN")}.00
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isSale && (
            <div className="card__badge bottom left">
              <span className="badge badge--bottom-left color-scheme-5e4a0062-7ce9-4fee-a5d0-1152250d3943">
                Sale
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
