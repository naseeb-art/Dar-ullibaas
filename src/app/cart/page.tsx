"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } =
    useStore();

  const subtotal = getCartTotal();
  const shipping = subtotal >= 250 ? 0 : 9.95;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShoppingBag size={32} className="text-zinc-light" />
          </div>
          <h1 className="text-2xl font-light text-navy mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-zinc-light text-sm mb-8">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3.5 bg-navy hover:bg-navy-light text-white text-sm font-medium tracking-wider uppercase rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-light text-navy">
            Shopping Cart ({cart.length})
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-zinc-light hover:text-red-500 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="bg-white rounded-2xl p-4 md:p-6 border border-cream-dark flex gap-4 md:gap-6"
              >
                <Link
                  href={`/product/${item.product.id}`}
                  className="relative w-24 h-32 md:w-32 md:h-40 rounded-xl overflow-hidden bg-cream flex-shrink-0"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/product/${item.product.id}`}
                        className="font-medium text-navy hover:text-navy-light transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-zinc-light mt-1">
                        {item.product.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-zinc-light hover:text-red-500 transition-colors flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-zinc-light">
                    {item.selectedSize && (
                      <span>Size: {item.selectedSize}</span>
                    )}
                    {item.selectedColor && (
                      <span>Color: {item.selectedColor}</span>
                    )}
                    <span className="capitalize">
                      Per {item.selectedUnit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 bg-cream rounded-lg">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center text-zinc-light hover:text-navy transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-navy">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center text-zinc-light hover:text-navy transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-semibold text-navy">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-zinc-light hover:text-navy transition-colors mt-4"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-cream-dark sticky top-28">
              <h2 className="text-lg font-medium text-navy mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-zinc-custom">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-custom">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 250 && (
                  <p className="text-xs text-gold">
                    Add ${(250 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="border-t border-cream-dark pt-3">
                  <div className="flex justify-between font-semibold text-navy text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full py-3.5 bg-gold hover:bg-gold-light text-white text-center font-medium tracking-wider uppercase text-sm rounded-lg transition-colors mt-6"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 p-3 bg-cream rounded-lg">
                <p className="text-xs text-zinc-light text-center">
                  Secure checkout powered by SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
