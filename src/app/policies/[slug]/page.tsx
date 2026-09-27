import React from "react";

interface PolicyPageProps {
  params: Promise<{ slug: string }>;
}

const POLICIES: Record<string, { title: string; content: string[] }> = {
  "shipping-policy": {
    title: "Shipping policy",
    content: [
      "All orders are processed within 1-2 business days. During peak periods such as Festival season, processing may take longer, but we will make every effort to ship your order as quickly as possible.",
      "Delivery times may vary depending on your location. Typically, orders placed on VelorAa.co.in are delivered within 2-4 business days across India via Express Delivery (Delhivery, Bluedart).",
      "Free express shipping is applicable on all orders across India.",
      "Real-time SMS and WhatsApp notifications with tracking links are shared as soon as your shipment is manifested.",
    ],
  },
  "refund-policy": {
    title: "Refund policy",
    content: [
      "We offer a 7-Day Hassle-Free Replacement Policy on all electronics accessories and smartwatches.",
      "If you receive a product with physical transit damage, missing box contents, or technical defect, we provide a 100% free doorstep replacement.",
      "To initiate a replacement, submit a request through the Veloraa Replacement Form with your Order ID and phone number.",
      "Once approved, our courier partner will arrange a doorstep reverse pickup and deliver your brand new replacement unit within 3 to 5 business days.",
      "Veloraa follows a replacement-first policy. If a replacement cannot resolve the defect, a refund will be processed to your original payment method.",
    ],
  },
  "terms-of-service": {
    title: "Terms of service",
    content: [
      "Welcome to VelorAa.co.in, operated under legal trade name MONIKA ENTERPRISES (GSTIN: 20DIZTM4361F1ZP).",
      "By visiting our site and purchasing our products, you agree to be bound by the terms and conditions outlined herein.",
      "All product pricing, promotional discounts, and prepaid offers are subject to change without prior notice.",
      "Disputes are subject to the exclusive jurisdiction of the competent courts in Udaipur, Rajasthan.",
    ],
  },
  "privacy-policy": {
    title: "Privacy policy",
    content: [
      "At VelorAa.co.in, we respect and safeguard your personal information.",
      "We collect customer shipping information (Name, Delivery Address, Pincode, Mobile Number) strictly for order fulfillment, courier delivery via Shiprocket, and transactional SMS/WhatsApp updates.",
      "We do not sell, rent, or trade your personal information to third parties.",
      "Payment transactions are secured via 256-bit SSL encryption and processed directly through licensed RBI-compliant payment gateways.",
    ],
  },
  "contact-information": {
    title: "Contact information",
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
    title: "Store policy",
    content: ["Please contact customer support for further information."],
  };

  return (
    <main id="MainContent" className="content-for-layout focus-none" role="main" tabIndex={-1}>
      <div className="shopify-policy__container max-w-[653px] mx-auto px-5 py-10 sm:py-14">
        <div className="shopify-policy__title mb-8">
          <h1
            style={{
              fontSize: "36px",
              lineHeight: "44px",
              fontWeight: 500,
              color: "#020b1f",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {policy.title}
          </h1>
        </div>

        <div className="shopify-policy__body">
          <div className="rte text-[14px] text-[#2c3e50] space-y-4 leading-[1.7]">
            {policy.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 p-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-gray-600 space-y-1">
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
      </div>
    </main>
  );
}
