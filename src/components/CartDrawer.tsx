"use client";

import React from "react";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    addToCart,
  } = useCart();

  if (!isCartOpen) return null;

  // Find warranty upsell product
  const warrantyProduct = PRODUCTS.find((p) => p.id === "8");
  const isWarrantyInCart = cart.some((item) => item.product.id === "8");

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#020b1f]" />
              <h2 className="text-base font-bold text-gray-900">Your Cart</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Alert Bar */}
          <div className="bg-blue-50/80 px-4 py-2.5 border-b border-blue-100 flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span>
                <strong>Free Express Delivery</strong> unlocked for this order!
              </span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
                <p className="text-sm font-medium text-gray-500">
                  Your cart is currently empty.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#020b1f] text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-black transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.variant.id}
                  className="flex space-x-3.5 pb-4 border-b border-gray-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.images[0] || "/placeholder.png"}
                    alt={item.product.title}
                    className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate pr-2">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.variant.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {item.variant.title}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.variant.id, item.quantity - 1)
                          }
                          className="p-1 text-gray-500 hover:text-black"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.variant.id, item.quantity + 1)
                          }
                          className="p-1 text-gray-500 hover:text-black"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#020b1f]">
                        ₹{(item.variant.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* 1-Click Upsell: 2-Year Extended Warranty */}
            {warrantyProduct && !isWarrantyInCart && cart.length > 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-700">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">
                      Add 2-Year Extended Warranty
                    </h5>
                    <p className="text-[11px] text-gray-600">
                      Covers drop & liquid damage for only <strong>₹99</strong>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(warrantyProduct)}
                  className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-md transition shadow-xs shrink-0"
                >
                  + Add ₹99
                </button>
              </div>
            )}
          </div>

          {/* Footer Checkout Buttons */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-extrabold text-lg text-gray-900">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="space-y-2 pt-1">
                {/* Pay Online & Get ₹200 Off CTA */}
                <Link
                  href="/checkout?prepaid=true"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-[#020b1f] hover:bg-[#06153d] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-md transition group"
                >
                  <span>Pay Online & Get ₹200 OFF</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* COD Button */}
                <Link
                  href="/checkout?prepaid=false"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-white hover:bg-gray-100 border border-gray-300 text-gray-900 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center transition"
                >
                  Order via Cash on Delivery
                </Link>
              </div>

              <div className="text-center text-[10px] text-gray-400 flex items-center justify-center space-x-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>100% Safe & Encrypted 256-bit Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
