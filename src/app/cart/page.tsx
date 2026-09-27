"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const router = useRouter();

  const isEmpty = cart.length === 0;

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push("/checkout");
    }
  };

  // Recommended products for "You May Also Like...." section
  const recommendedProducts = PRODUCTS.slice(0, 4);

  return (
    <div id="MainContent" className="content-for-layout focus-none" role="main">
      {/* 1. Cart Items Section */}
      <div
        id="shopify-section-template--26661921816894__cart-items"
        className="shopify-section"
      >
        <div
          className={`gradient color-background-1 isolate ${
            isEmpty ? "is-empty" : ""
          } section-template--26661921816894__cart-items-padding`}
        >
          <div className="page-width max-w-[120rem] mx-auto px-4 sm:px-8">
            {isEmpty ? (
              <div className="cart__warnings py-16 text-center">
                <h1 className="cart__empty-text text-3xl font-medium mb-6">
                  Your cart is empty
                </h1>
                <Link href="/collections/all" className="button inline-block px-8 py-3">
                  Continue shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="title-wrapper-with-link flex justify-between items-center mb-8">
                  <h1 className="title title--primary text-3xl font-medium m-0">
                    Your cart
                  </h1>
                  <Link
                    href="/collections/all"
                    className="underlined-link text-sm text-[rgb(var(--color-foreground))] hover:underline"
                  >
                    Continue shopping
                  </Link>
                </div>

                <div className="cart__contents">
                  <div
                    className="cart__items"
                    id="main-cart-items"
                    data-id="template--26661921816894__cart-items"
                  >
                    <div className="js-contents">
                      <table className="cart-items w-full border-collapse">
                        <caption className="visually-hidden">Your cart</caption>
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th
                              className="caption-with-letter-spacing uppercase text-xs font-normal pb-4"
                              colSpan={2}
                              scope="col"
                            >
                              Product
                            </th>
                            <th
                              className="medium-hide large-up-hide right caption-with-letter-spacing uppercase text-xs font-normal pb-4 text-right"
                              colSpan={1}
                              scope="col"
                            >
                              Total
                            </th>
                            <th
                              className="cart-items__heading--wide cart-items__heading--quantity small-hide caption-with-letter-spacing uppercase text-xs font-normal pb-4"
                              colSpan={1}
                              scope="col"
                            >
                              Quantity
                            </th>
                            <th
                              className="small-hide right caption-with-letter-spacing uppercase text-xs font-normal pb-4 text-right"
                              colSpan={1}
                              scope="col"
                            >
                              Total
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {cart.map((item) => (
                            <tr
                              key={item.variant.id}
                              className="cart-item border-b border-gray-100"
                              id={`CartItem-${item.variant.id}`}
                            >
                              {/* Media Thumbnail */}
                              <td className="cart-item__media py-6 align-top">
                                <div className="cart-item__image-container gradient global-media-settings w-24 h-24 relative overflow-hidden bg-gray-50 border border-gray-100">
                                  <Image
                                    src={item.product.images[0]}
                                    alt={item.product.title}
                                    fill
                                    className="cart-item__image object-cover"
                                  />
                                </div>
                              </td>

                              {/* Details */}
                              <td className="cart-item__details py-6 align-top pl-6">
                                <Link
                                  href={`/products/${item.product.handle}`}
                                  className="cart-item__name h4 break text-base font-medium text-[rgb(var(--color-foreground))] hover:underline block leading-snug mb-2"
                                >
                                  {item.product.title}
                                </Link>
                                <div className="product-option text-sm text-gray-700 font-medium mb-1">
                                  Rs. {item.variant.price.toLocaleString()}.00
                                </div>
                                {item.variant.title && item.variant.title !== "Default Title" && (
                                  <dl className="text-xs text-gray-500 m-0">
                                    <div className="product-option">
                                      <dt className="font-semibold text-gray-700">Variant:</dt>
                                      <dd className="inline ml-1">{item.variant.title}</dd>
                                    </div>
                                  </dl>
                                )}
                              </td>

                              {/* Mobile Total */}
                              <td className="cart-item__totals right medium-hide large-up-hide py-6 align-top text-right">
                                <div className="cart-item__price-wrapper">
                                  <span className="price price--end font-medium">
                                    Rs. {(item.variant.price * item.quantity).toLocaleString()}.00
                                  </span>
                                </div>
                              </td>

                              {/* Quantity Selector */}
                              <td className="cart-item__quantity py-6 align-top pl-4">
                                <div className="cart-item__quantity-wrapper flex items-center">
                                  <div className="quantity-popover-container">
                                    <div className="quantity cart-quantity flex items-center border border-gray-300 rounded-sm">
                                      <button
                                        className="quantity__button w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black bg-transparent border-none cursor-pointer"
                                        name="minus"
                                        type="button"
                                        onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          focusable="false"
                                          className="icon icon-minus"
                                          fill="none"
                                          viewBox="0 0 10 2"
                                          width="10"
                                          height="2"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z"
                                            fill="currentColor"
                                          />
                                        </svg>
                                      </button>
                                      <input
                                        className="quantity__input w-10 text-center text-sm font-medium border-none focus:outline-none"
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => {
                                          const val = parseInt(e.target.value);
                                          if (!isNaN(val)) updateQuantity(item.variant.id, val);
                                        }}
                                        min="1"
                                      />
                                      <button
                                        className="quantity__button w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black bg-transparent border-none cursor-pointer"
                                        name="plus"
                                        type="button"
                                        onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          focusable="false"
                                          className="icon icon-plus"
                                          fill="none"
                                          viewBox="0 0 10 10"
                                          width="10"
                                          height="10"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z"
                                            fill="currentColor"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>

                                  {/* Trash / Remove Button */}
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(item.variant.id)}
                                    className="button button--tertiary ml-3 text-gray-500 hover:text-red-600 bg-transparent border-none cursor-pointer p-1"
                                    aria-label={`Remove ${item.product.title}`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 16 16"
                                      aria-hidden="true"
                                      focusable="false"
                                      className="icon icon-remove"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                    >
                                      <path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" />
                                      <path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" />
                                    </svg>
                                  </button>
                                </div>
                              </td>

                              {/* Desktop Total */}
                              <td className="cart-item__totals right small-hide py-6 align-top text-right">
                                <div className="cart-item__price-wrapper">
                                  <span className="price price--end font-medium text-base text-[rgb(var(--color-foreground))]">
                                    Rs. {(item.variant.price * item.quantity).toLocaleString()}.00
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. Cart Footer Section */}
      <div
        id="shopify-section-template--26661921816894__cart-footer"
        className="shopify-section cart__footer-wrapper"
      >
        <div
          className={`gradient color-background-1 ${isEmpty ? "is-empty hidden" : ""}`}
          id="main-cart-footer"
        >
          <div className="page-width max-w-[120rem] mx-auto px-4 sm:px-8">
            <div className="cart__footer isolate section-template--26661921816894__cart-footer-padding">
              <div className="cart__blocks max-w-[36rem] ml-auto">
                <div className="js-contents mb-4">
                  <div className="totals flex justify-between items-baseline mb-2">
                    <h2 className="totals__total text-lg font-medium">Estimated total</h2>
                    <p className="totals__total-value text-xl font-bold text-[#020b1f]">
                      Rs. {subtotal.toLocaleString()}.00
                    </p>
                  </div>
                  <small className="tax-note caption-large rte text-xs text-gray-500 block text-right">
                    Taxes, Discounts and{" "}
                    <Link href="/policies/shipping-policy" className="underline">
                      shipping
                    </Link>{" "}
                    calculated at checkout
                  </small>
                </div>

                {/* Fastrr Boost Checkout Button */}
                <div className="shiprocket-headless mb-4" data-type="cart">
                  <button
                    type="button"
                    className="sr-headless-checkout w-full"
                    name="sr-headless-button"
                    onClick={handleCheckout}
                  >
                    <div className="sr-d-flex flex-center flex-col">
                      <div className="sr-d-flex full-width flex-center">
                        <span className="sr-checkout-visible2 font-bold tracking-wider text-base">BUY NOW</span>
                        <img
                          src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/upi_options.svg"
                          alt="Google Pay | Phone Pay | UPI"
                          className="sr-pl-15 sr-checkout-visible inline-block ml-3 h-5"
                        />
                        <div className="loader5"></div>
                        <img
                          src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/right_arrow.svg"
                          className="sr-pl-15 sr-checkout-visible1 inline-block ml-2 h-3"
                          alt="right_arrow"
                        />
                      </div>
                      <div>
                        <span className="sr-discount-label">
                          Extra ₹200 Off on Prepaid Orders
                        </span>
                        <span className="sr-powered-by inline-block ml-1">
                          <img
                            src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/powered_by.svg"
                            alt="Powered by Fastrr"
                            className="h-2.5 inline"
                          />
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Featured Collection "You May Also Like...." Section */}
      <section
        id="shopify-section-template--26661921816894__featured_collection_EtpgWg"
        className="shopify-section section"
      >
        <div className="color-background-1 isolate gradient">
          <div className="collection section-template--26661921816894__featured_collection_EtpgWg-padding">
            <div className="collection__title title-wrapper title-wrapper--no-top-margin page-width max-w-[120rem] mx-auto px-4 sm:px-8 mb-8">
              <h2 className="title inline-richtext h1 text-3xl font-medium text-[#020b1f] m-0">
                You May Also Like....
              </h2>
            </div>

            <div className="page-width max-w-[120rem] mx-auto px-4 sm:px-8">
              <ul
                id="Slider-template--26661921816894__featured_collection_EtpgWg"
                className="grid product-grid contains-card contains-card--product contains-card--standard grid--4-col-desktop grid--2-col-tablet-down list-none p-0 m-0"
                role="list"
              >
                {recommendedProducts.map((product, idx) => (
                  <li
                    key={product.id}
                    id={`Slide-template--26661921816894__featured_collection_EtpgWg-${idx + 1}`}
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
      </section>
    </div>
  );
}
