import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@/styles/shopify-dawn.css";
import { CartProvider } from "@/context/CartContext";
import TopCountdownBar from "@/components/TopCountdownBar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import FloatingReviewsTab from "@/components/FloatingReviewsTab";
import ScrollAnimationObserver from "@/components/ScrollAnimationObserver";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VelorAa.co.in | India's #1 Gadget & Audio Combos Store",
  description:
    "Shop 5-in-1 Ultimate Combos, Watch Series 10, VPods Pro ANC, and MagSafe Wireless Powerbanks with Flat ₹200 OFF on Prepaid + Free Express Delivery Across India.",
  keywords: [
    "Veloraa",
    "5 in 1 combo",
    "smartwatch combo",
    "vpods pro 2",
    "magsafe powerbank",
    "apple lookalike gadgets",
    "watch series 10",
  ],
  openGraph: {
    title: "VelorAa.co.in | Premium Tech Combos & Audio",
    description:
      "Get up to 70% off on 5-in-1 tech combos with Cash on Delivery & 1-Year Warranty across India.",
    url: "https://www.veloraa.co.in",
    siteName: "VelorAa.co.in",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 selection:bg-blue-600 selection:text-white">
        <CartProvider>
          <ScrollAnimationObserver />
          <TopCountdownBar />
          <AnnouncementBar />
          <Navbar />
          <div className="flex-grow">{children}</div>
          <CartDrawer />
          <Footer />
          <FloatingReviewsTab />
        </CartProvider>
      </body>
    </html>
  );
}
