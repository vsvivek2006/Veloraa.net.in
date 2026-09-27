import React from "react";
import { POLICIES } from "@/data/policies";
import { notFound } from "next/navigation";

interface PolicyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const resolved = await params;
  const policy = POLICIES[resolved.slug];

  if (!policy) {
    notFound();
  }

  return (
    <main
      id="MainContent"
      className="content-for-layout focus-none"
      role="main"
      tabIndex={-1}
    >
      <div
        className="shopify-policy__container"
        style={{
          maxWidth: "653.12px",
          margin: "0 auto",
          padding: "36px 20px 60px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div className="shopify-policy__title">
          <h1
            style={{
              fontSize: "40px",
              lineHeight: "52px",
              fontWeight: 500,
              color: "#020b1f",
              margin: "26px 0",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {policy.title}
          </h1>
        </div>

        <div className="shopify-policy__body">
          <div
            className="rte"
            suppressHydrationWarning
            style={{
              fontSize: "16px",
              lineHeight: "1.8",
              color: "rgba(2, 11, 31, 0.75)",
              fontFamily: "'Poppins', sans-serif",
            }}
            dangerouslySetInnerHTML={{ __html: policy.html.replace(/\r\n/g, "\n") }}
          />
        </div>
      </div>
    </main>
  );
}
