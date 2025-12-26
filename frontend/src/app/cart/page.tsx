"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 py-20">
        <ShoppingBag className="w-16 h-16 text-[var(--text-muted)]" />
        <h1 className="text-2xl font-bold text-[var(--text)]">Your cart is empty</h1>
        <p className="text-[var(--text-muted)]">Add some beautiful verse posters!</p>
        <Link href="/catalog" className="btn btn-primary">
          Start Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const total = getTotal();
  const shippingFee = total >= 499 ? 0 : 49;
  const finalTotal = total + shippingFee;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[var(--text)]">Your Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-[var(--error)] hover:underline"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card flex gap-4 p-4"
              >
                <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-[var(--bg-light)] flex-shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl opacity-50">🖼️</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/product/${item.productId}`}
                      className="font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    <p className="text-[var(--accent)] font-semibold mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1.5 rounded border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1.5 rounded border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-2 text-[var(--error)] hover:bg-[var(--error)]/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-[var(--text)] mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-[var(--success)]">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-xs text-[var(--text-muted)]">
                    Free shipping on orders over ₹499
                  </p>
                )}
              </div>

              <div className="border-t border-[var(--border)] my-4" />

              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span className="text-[var(--accent)]">{formatPrice(finalTotal)}</span>
              </div>

              <Link href="/checkout" className="btn btn-primary w-full text-lg py-4">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/catalog"
                className="block text-center text-sm text-[var(--text-muted)] hover:text-[var(--text)] mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
