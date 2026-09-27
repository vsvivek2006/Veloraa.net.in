import React from "react";
import Link from "next/link";

export default function SecondaryBanner() {
  return (
    <section
      id="shopify-section-template--26661922144574__image_banner_qQ84mg"
      className="shopify-section section w-full"
    >
      <div
        id="Banner-template--26661922144574__image_banner_qQ84mg"
        className="banner banner--content-align-center banner--content-align-mobile-center banner--small banner--mobile-bottom w-full overflow-hidden scroll-trigger animate--fade-in"
      >
        <div className="banner__media media w-full relative scroll-trigger animate--fade-in">
          <Link
            href="/products/watch-series-10-free-pro-2nd-generation-anc-type-c-100-hassle-free-warranty"
            className="block w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="//www.veloraa.co.in/cdn/shop/files/Websites_banner_images-2.png?v=1756378974&width=3840"
              alt="Veloraa Special Tech Offers"
              srcSet="//www.veloraa.co.in/cdn/shop/files/Websites_banner_images-2.png?v=1756378974&width=375 375w, //www.veloraa.co.in/cdn/shop/files/Websites_banner_images-2.png?v=1756378974&width=750 750w, //www.veloraa.co.in/cdn/shop/files/Websites_banner_images-2.png?v=1756378974&width=1500 1500w, //www.veloraa.co.in/cdn/shop/files/Websites_banner_images-2.png?v=1756378974&width=2000 2000w, //www.veloraa.co.in/cdn/shop/files/Websites_banner_images-2.png?v=1756378974&width=3840 3840w"
              width={1378}
              height={589}
              sizes="100vw"
              className="w-full h-auto block object-cover"
              loading="lazy"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
