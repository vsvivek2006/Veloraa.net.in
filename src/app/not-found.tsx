import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found – VelorAa.co.in",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <div id="MainContent" className="content-for-layout focus-none" role="main">
      <div
        id="shopify-section-template--26661921718590__main"
        className="shopify-section"
      >
        <div className="template-404 page-width page-margin center text-center py-28 sm:py-36">
          <p className="text-base font-normal text-gray-500 m-0 mb-2">
            404
          </p>
          <h1 className="title text-3xl sm:text-4xl font-medium text-[#020b1f] m-0 mb-8">
            Page not found
          </h1>
          <Link
            href="/collections/all"
            className="button inline-block px-8 py-3 text-sm font-medium tracking-wide uppercase"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
