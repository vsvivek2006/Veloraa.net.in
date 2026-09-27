"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  Zap,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Smartphone,
  CreditCard,
  Banknote,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const variantId = searchParams.get("variantId");
  const productHandle = searchParams.get("productHandle");
  const isPrepaidDefault = searchParams.get("prepaid") === "true";

  // If user came via "Direct Buy Now", use that product; otherwise use Cart items
  let checkoutItems = [...cart];
  if (variantId && productHandle) {
    const directProduct = PRODUCTS.find((p) => p.handle === productHandle);
    if (directProduct) {
      const v = directProduct.variants.find((v) => v.id === variantId) || directProduct.variants[0];
      checkoutItems = [{ product: directProduct, variant: v, quantity: 1 }];
    }
  }

  // Form State
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"PREPAID" | "COD">(
    isPrepaidDefault ? "PREPAID" : "COD"
  );
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{
    orderId: string;
    awb: string;
    paymentMethod: string;
    amount: number;
  } | null>(null);

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );
  // ₹200 instant discount on prepaid orders
  const prepaidDiscount = paymentMethod === "PREPAID" && subtotal > 500 ? 200 : 0;
  const finalTotal = Math.max(0, subtotal - prepaidDiscount);

  const handlePincodeChange = (pin: string) => {
    const clean = pin.replace(/\D/g, "");
    setPincode(clean);
    if (clean.length === 6) {
      // Auto-detect common cities / simulated
      if (clean.startsWith("11")) {
        setCity("New Delhi");
        setState("Delhi");
      } else if (clean.startsWith("40")) {
        setCity("Mumbai");
        setState("Maharashtra");
      } else if (clean.startsWith("56")) {
        setCity("Bengaluru");
        setState("Karnataka");
      } else if (clean.startsWith("31")) {
        setCity("Udaipur");
        setState("Rajasthan");
      } else if (clean.startsWith("30")) {
        setCity("Jaipur");
        setState("Rajasthan");
      }
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !pincode) {
      alert("Please fill in all required shipping details.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/shiprocket/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          phone,
          email,
          address,
          city,
          state,
          pincode,
          paymentMethod,
          items: checkoutItems.map((i) => ({
            title: i.product.title,
            variantTitle: i.variant.title,
            price: i.variant.price,
            quantity: i.quantity,
          })),
          totalAmount: finalTotal,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrderComplete({
          orderId: data.orderId,
          awb: data.awbCode || "Allocating...",
          paymentMethod,
          amount: finalTotal,
        });
        clearCart();
      } else {
        alert("Failed to place order: " + (data.error || "Unknown error"));
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong placing your order.");
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest block">
              Order Confirmed
            </span>
            <h2 className="text-2xl font-black text-[#020b1f] mt-1">
              Thank You, {name}!
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Your order has been registered and pushed to Shiprocket for dispatch.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl text-left text-xs space-y-2 border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-bold text-gray-900">{orderComplete.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shiprocket AWB:</span>
              <span className="font-mono font-bold text-blue-600">{orderComplete.awb}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Mode:</span>
              <span className="font-semibold text-gray-900">
                {orderComplete.paymentMethod === "PREPAID" ? "Prepaid (UPI/Card)" : "Cash On Delivery (COD)"}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-gray-200">
              <span className="font-bold text-gray-800">Total Amount:</span>
              <span className="font-bold text-sm text-[#020b1f]">₹{orderComplete.amount.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Link
              href={`/track-order?awb=${orderComplete.orderId}`}
              className="w-full bg-[#020b1f] text-white py-3 rounded-xl font-bold text-xs sm:text-sm block transition hover:bg-black"
            >
              Track Order Status
            </Link>
            <Link
              href="/"
              className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-xl font-medium text-xs block transition hover:bg-gray-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-8">
          <Link href="/" className="flex items-center space-x-1.5 text-xs font-semibold text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Store</span>
          </Link>
          <div className="flex items-center space-x-1.5 text-xs text-green-700 font-semibold bg-green-50 border border-green-200 px-3 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Fastrr Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Contact & Shipping */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Step 1: Mobile Number */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#020b1f] uppercase tracking-wide flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <span>1. Contact Information</span>
                  </h3>
                  <span className="text-[11px] text-green-600 font-semibold">Fastrr 1-Click</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile (e.g. 9876543210)"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="For invoice & tracking updates"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-[#020b1f] uppercase tracking-wide flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>2. Delivery Address</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter receiver's full name"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      House / Flat / Building No. &amp; Street Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Near landmark, building name, flat number..."
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        placeholder="6-digit pin"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Options (Prepaid vs COD) */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-[#020b1f] uppercase tracking-wide flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>3. Payment Method</span>
                </h3>

                <div className="space-y-3">
                  {/* Prepaid Option with ₹200 OFF badge */}
                  <label
                    className={`block p-4 rounded-xl border cursor-pointer transition ${
                      paymentMethod === "PREPAID"
                        ? "border-[#020b1f] bg-blue-50/40 ring-2 ring-[#020b1f]"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === "PREPAID"}
                          onChange={() => setPaymentMethod("PREPAID")}
                          className="mt-1"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-gray-900">
                              Pay Online (UPI / GPay / PhonePe / Cards)
                            </span>
                            <span className="bg-green-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              FLAT ₹200 OFF
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-1">
                            Save ₹200 instantly + Free Surprise Gift + Zero contact delivery.
                          </p>
                        </div>
                      </div>
                      <Zap className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
                    </div>
                  </label>

                  {/* Cash On Delivery Option */}
                  <label
                    className={`block p-4 rounded-xl border cursor-pointer transition ${
                      paymentMethod === "COD"
                        ? "border-[#020b1f] bg-blue-50/40 ring-2 ring-[#020b1f]"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="mt-1"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-gray-900">
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            Standard
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1">
                          Pay cash or UPI to the delivery courier when your order arrives at your door.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Complete Order CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#020b1f] hover:bg-[#06153d] text-white py-4 rounded-xl font-extrabold text-sm sm:text-base shadow-xl transition flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Processing Shipment...</span>
                ) : (
                  <span>
                    {paymentMethod === "PREPAID"
                      ? `CONFIRM & PAY ₹${finalTotal.toLocaleString("en-IN")}`
                      : `PLACE COD ORDER (₹${finalTotal.toLocaleString("en-IN")})`}
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4 sticky top-24">
              <h3 className="text-sm font-bold text-[#020b1f] uppercase tracking-wide border-b border-gray-100 pb-3">
                Order Summary ({checkoutItems.length} items)
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {checkoutItems.map((item, idx) => (
                  <div key={idx} className="flex space-x-3 items-center text-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {item.product.title}
                      </p>
                      <p className="text-gray-400 text-[11px]">
                        Qty: {item.quantity} • {item.variant.title}
                      </p>
                    </div>
                    <span className="font-bold text-gray-900 shrink-0">
                      ₹{(item.variant.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Items Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span className="text-green-600 font-semibold">FREE (Express Air)</span>
                </div>

                {prepaidDiscount > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold bg-green-50 p-2 rounded-lg">
                    <span>Prepaid Instant Discount</span>
                    <span>- ₹200.00</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-extrabold text-[#020b1f] pt-2 border-t border-gray-100">
                  <span>Grand Total</span>
                  <span className="text-base">₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Safe Checkout Badges */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-[11px] text-gray-500 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-gray-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>1-Year Complete Replacement Warranty</span>
                </div>
                <div className="flex items-center space-x-1.5 text-gray-700 font-medium">
                  <Truck className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Doorstep Delivery via Shiprocket Logistics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
