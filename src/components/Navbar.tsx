"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "All Products", href: "/collections/frontpage" },
  { name: "5-in-1 Ultimate Combo", href: "/products/5-in-1-bundle" },
  {
    name: "Watch Series 10 | Free Pro 2nd",
    href: "/products/watch-series-10-free-pro-2nd-generation-anc-type-c-100-hassle-free-warranty",
  },
  { name: "Vpods Max", href: "/products/vpods-max-anc" },
  {
    name: "VelorAa MagSafe charger",
    href: "/products/magsafe-battery-pack-wireless-power-bank",
  },
  { name: "VelorAa Vpods Max", href: "/products/vpods-max-anc" },
  {
    name: "VelorAa Watch Ultra",
    href: "/products/veloraa-watch-ultra-gps-cellular-49-mm-smart-watch",
  },
  {
    name: "VelorAa Series 9",
    href: "/products/veloraa-series10-cellular-49-mm-smart-watch",
  },
  {
    name: "Replacement Assistance",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSeZOe_8EyjATHK6vrABFlqzRZJuS0LNcmksJqxxnSaLb6qMWw/viewform",
    external: true,
  },
  {
    name: "Track Order",
    href: "https://veloraa.shiprocket.co/tracking",
    external: true,
  },
  { name: "Contact Us", href: "/pages/contact-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Lock body scroll when mobile menu or search modal is open
  useEffect(() => {
    if (mobileMenuOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, searchOpen]);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <div
        id="shopify-section-sections--26661918277950__header"
        className="shopify-section shopify-section-group-header-group section-header relative bg-white"
      >
        <div className="header-wrapper color-background-1 gradient border-b border-[#020b1f]/10">
          <header
            className="header header--middle-left header--mobile-center page-width header--has-menu relative flex items-center justify-between"
            style={{ padding: "20px 50px 36px 50px" }}
          >
            {/* Mobile Hamburger Drawer Button — hidden on desktop ≥990px like live site */}
            <div className="mobile-drawer-btn items-center" style={{ display: "none" }} id="header-drawer">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="header__icon header__icon--menu p-2 text-[#020b1f]"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  className="icon icon-hamburger"
                  fill="none"
                  viewBox="0 0 18 16"
                  width="18"
                  height="16"
                >
                  <path
                    d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <h1 className="header__heading my-0 leading-none">
              <Link
                href="/"
                className="header__heading-link link link--text focus-inset inline-block"
              >
                <div className="header__heading-logo-wrapper">
                  <img
                    src="//www.veloraa.co.in/cdn/shop/files/landscape_logos-24_df240052-1c5d-4ebd-bb39-dca282252d2f.png?v=1783110378&width=600"
                    alt="VelorAa.co.in"
                    srcSet="//www.veloraa.co.in/cdn/shop/files/landscape_logos-24_df240052-1c5d-4ebd-bb39-dca282252d2f.png?v=1783110378&width=110 110w, //www.veloraa.co.in/cdn/shop/files/landscape_logos-24_df240052-1c5d-4ebd-bb39-dca282252d2f.png?v=1783110378&width=165 165w, //www.veloraa.co.in/cdn/shop/files/landscape_logos-24_df240052-1c5d-4ebd-bb39-dca282252d2f.png?v=1783110378&width=220 220w"
                    width="110"
                    height="36.66"
                    className="header__heading-logo motion-reduce object-contain"
                    style={{ width: "110px", height: "auto" }}
                  />
                </div>
              </Link>
            </h1>

            {/* Desktop Navigation Menu */}
            <nav className="header__inline-menu desktop-menu items-center ml-6">
              <ul className="list-menu list-menu--inline flex items-center flex-wrap list-none m-0 p-0" role="list">
                {NAV_LINKS.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={idx} className="inline-flex">
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="header__menu-item list-menu__item link link--text text-[14px] font-normal tracking-[0.6px] text-[rgba(2,11,31,0.75)] hover:underline transition-colors px-3 py-3 inline-flex items-center"
                        >
                          <span>{link.name}</span>
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="header__menu-item list-menu__item link link--text text-[14px] font-normal tracking-[0.6px] text-[rgba(2,11,31,0.75)] hover:underline transition-colors px-3 py-3 inline-flex items-center"
                        >
                          <span className={isActive ? "header__active-menu-item underline underline-offset-[0.3rem]" : ""}>
                            {link.name}
                          </span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Icons: Search & Cart */}
            <div className="header__icons flex items-center gap-2">
              {/* Search Icon Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="header__icon header__icon--search p-2 text-[#020b1f] hover:opacity-75 transition"
                aria-label="Search"
              >
                <svg
                  className="modal__toggle-open icon icon-search"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 18 19"
                  fill="none"
                  width="18"
                  height="19"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              {/* Cart Icon Trigger with Bubble */}
              <Link
                href="/cart"
                id="cart-icon-bubble"
                className="header__icon header__icon--cart link focus-inset relative p-2 text-[#020b1f] hover:opacity-75 transition inline-flex items-center"
                aria-label="Cart"
              >
                <svg
                  className="icon icon-cart-empty"
                  aria-hidden="true"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 40 40"
                  fill="none"
                  width="22"
                  height="22"
                >
                  <path
                    d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
                <span className="visually-hidden">Cart</span>
                {totalItems > 0 && (
                  <div className="cart-count-bubble absolute -top-0.5 -right-0.5 bg-[#020b1f] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    <span aria-hidden="true">{totalItems}</span>
                    <span className="visually-hidden">{totalItems} items</span>
                  </div>
                )}
              </Link>
            </div>
          </header>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-sm font-semibold tracking-wider text-[#020b1f] uppercase">
                Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-gray-500 hover:text-black"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-close"
                  fill="none"
                  viewBox="0 0 18 17"
                  width="18"
                  height="17"
                >
                  <path
                    d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-2">
              <ul className="list-menu divide-y divide-gray-100">
                {NAV_LINKS.map((link, idx) => (
                  <li key={idx}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-5 py-3 text-sm text-[#020b1f] hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={`block px-5 py-3 text-sm text-[#020b1f] hover:bg-gray-50 ${
                          pathname === link.href ? "font-semibold bg-gray-50" : ""
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSearchOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl p-6 z-10 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setSearchOpen(false);
                    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
                className="flex items-center flex-1"
              >
                <svg
                  className="icon icon-search mr-3 text-gray-400"
                  viewBox="0 0 18 19"
                  fill="none"
                  width="18"
                  height="19"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z"
                    fill="currentColor"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="w-full text-base sm:text-lg focus:outline-none"
                />
              </form>

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-gray-400 hover:text-black ml-3"
                aria-label="Close search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-close"
                  fill="none"
                  viewBox="0 0 18 17"
                  width="16"
                  height="16"
                >
                  <path
                    d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            {searchQuery.trim() !== "" && (
              <div className="mt-4 max-h-96 overflow-y-auto divide-y divide-gray-100">
                {searchResults.length === 0 ? (
                  <p className="text-sm text-gray-500 py-6 text-center">
                    No products found matching &ldquo;{searchQuery}&rdquo;.
                  </p>
                ) : (
                  searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.handle}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 py-3 hover:bg-gray-50 px-2 rounded-md transition"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded bg-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-500 font-semibold">
                          Rs. {product.price.toLocaleString("en-IN")}.00
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
