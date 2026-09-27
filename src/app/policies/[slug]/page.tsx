import React from "react";
import Link from "next/link";

interface PolicyPageProps {
  params: Promise<{ slug: string }>;
}

const POLICIES: Record<string, { title: string; content: string[] }> = {
  "shipping-policy": {
    title: "Shipping & Delivery Policy",
    content: [
      "Orders placed on VelorAa.co.in are dispatched within 24 hours from our fulfillment hub in Rajasthan.",
      "We partner with top-tier courier aggregators (Delhivery, Bluedart, Shadowfax) through Shiprocket Express Logistics to ensure fast and reliable delivery.",
      "Standard delivery timeline across Tier 1, Tier 2, and Tier 3 Indian cities is 2 to 4 business days.",
      "Real-time SMS and WhatsApp notifications with tracking links are shared as soon as your shipment is manifested.",
      "Free express shipping is applicable on all orders across India.",
    ],
  },
  "refund-policy": {
    title: "Replacement & Refund Policy",
    content: [
      "We offer a 7-Day Hassle-Free Replacement Policy on all electronics accessories and smartwatches.",
      "If you receive a product with physical transit damage, missing box contents, or technical defect, we provide a 100% free doorstep replacement.",
      "To initiate a replacement, submit a request through the Veloraa Replacement Form with your Order ID and phone number.",
      "Once approved, our courier partner will arrange a doorstep reverse pickup and deliver your brand new replacement unit within 3 to 5 business days.",
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    content: [
      "Welcome to VelorAa.co.in, operated under legal trade name MONIKA ENTERPRISES (GSTIN: 20DIZTM4361F1ZP).",
      "By visiting our site and purchasing our products, you agree to be bound by the terms and conditions outlined herein.",
      "All product pricing, promotional discounts, and prepaid offers are subject to change without prior notice.",
      "Disputes are subject to the exclusive jurisdiction of the competent courts in Udaipur, Rajasthan.",
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    content: [
      "At VelorAa.co.in, we respect and safeguard your personal information.",
      "We collect customer shipping information (Name, Delivery Address, Pincode, Mobile Number) strictly for order fulfillment, courier delivery via Shiprocket, and transactional SMS/WhatsApp updates.",
      "We do not sell, rent, or trade your personal information to third parties.",
      "Payment transactions are secured via 256-bit SSL encryption and processed directly through licensed RBI-compliant payment gateways.",
    ],
  },
  "contact-information": {
    title: "Contact Information",
    content: [
      "Got a question? We are happy to help you. Write to us at SuppportVeloraa@gmail.com.",
      "Please expect our reply within 24 to 48 hours.",
      "Working Hours: Monday to Saturday, 11:00 AM to 6:00 PM.",
      "Legal Name: MONIKA ENTERPRISES",
      "GSTIN: 20DIZTM4361F1ZP",
      "Address: Plot No. 6-B, Sobhagpura, Main Road, Udaipur-Rajasthan - 313004",
    ],
  },
};

export default async function PolicyPage({ params }: PolicyPageProps) {
  const resolved = await params;
  const policy = POLICIES[resolved.slug] || {
    title: "Store Policy",
    content: ["Please contact customer support for further information."],
  };

  return (
    <main id="MainContent" className="content-for-layout focus-none" role="main">
      <div className="page-width page-width--narrow max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/"
          className="link link--text text-xs text-gray-500 hover:text-black mb-6 inline-block"
        >
          ← Back to store
        </Link>

        <h1 className="main-page-title page-title h0 text-3xl font-medium text-[#020b1f] mb-6">
          {policy.title}
        </h1>

        <div className="rte space-y-4 text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-6">
          {policy.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-10 p-5 bg-gray-50 border border-gray-200 text-xs text-gray-500 space-y-1">
          <p className="font-semibold text-gray-900">
            Legal Entity: MONIKA ENTERPRISES
          </p>
          <p>
            Registered Address: Plot No. 6-B, Sobhagpura, Main Road, Udaipur,
            Rajasthan - 313004
          </p>
          <p>GSTIN: 20DIZTM4361F1ZP • Email: SuppportVeloraa@gmail.com</p>
        </div>
      </div>
    </main>
  );
}
