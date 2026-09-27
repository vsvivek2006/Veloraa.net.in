import React from "react";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section
      id="shopify-section-template--26661922144574__image_banner_DRWVBa"
      className="shopify-section section w-full"
    >
      <div
        id="Banner-template--26661922144574__image_banner_DRWVBa"
        className="banner banner--content-align-center banner--content-align-mobile-center banner--medium banner--mobile-bottom w-full overflow-hidden scroll-trigger animate--fade-in"
      >
        <div className="banner__media media w-full relative scroll-trigger animate--fade-in">
          <Link href="/products/5-in-1-bundle" className="block w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="//www.veloraa.co.in/cdn/shop/files/Websites_banner_images_14fc5cdd-28f4-4a38-b0d2-6f1158402efa.png?v=1756378519&width=3840"
              alt="Veloraa Anniversary Sale 5-in-1 Combo"
              srcSet="//www.veloraa.co.in/cdn/shop/files/Websites_banner_images_14fc5cdd-28f4-4a38-b0d2-6f1158402efa.png?v=1756378519&width=375 375w, //www.veloraa.co.in/cdn/shop/files/Websites_banner_images_14fc5cdd-28f4-4a38-b0d2-6f1158402efa.png?v=1756378519&width=750 750w, //www.veloraa.co.in/cdn/shop/files/Websites_banner_images_14fc5cdd-28f4-4a38-b0d2-6f1158402efa.png?v=1756378519&width=1500 1500w, //www.veloraa.co.in/cdn/shop/files/Websites_banner_images_14fc5cdd-28f4-4a38-b0d2-6f1158402efa.png?v=1756378519&width=2000 2000w, //www.veloraa.co.in/cdn/shop/files/Websites_banner_images_14fc5cdd-28f4-4a38-b0d2-6f1158402efa.png?v=1756378519&width=3840 3840w"
              width={1378}
              height={589}
              sizes="100vw"
              className="w-full h-auto block object-cover"
              loading="eager"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
