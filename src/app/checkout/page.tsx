"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Lock, CreditCard, CheckCircle } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = getCartTotal();
  const shipping = subtotal >= 250 ? 0 : 9.95;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderNumber(`LUXE-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-light text-navy mb-3">
            Order Confirmed!
          </h1>
          <p className="text-zinc-light text-sm mb-2">
            Thank you for your purchase. Your order number is:
          </p>
          <p className="text-xl font-semibold text-navy mb-6">
            #{orderNumber}
          </p>
          <p className="text-sm text-zinc-light mb-8">
            You will receive an email confirmation shortly with your order
            details and tracking information.
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

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-light text-navy mb-4">
            Your cart is empty
          </h1>
          <Link
            href="/shop"
            className="text-gold hover:text-gold-light transition-colors"
          >
            ← Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-light text-navy mb-8">
          Secure Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 border border-cream-dark">
              <h2 className="text-lg font-medium text-navy mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 border border-cream-dark">
              <h2 className="text-lg font-medium text-navy mb-4">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 border border-cream-dark">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard size={20} className="text-navy" />
                <h2 className="text-lg font-medium text-navy">
                  Payment Details
                </h2>
                <Lock size={14} className="text-green-600 ml-auto" />
                <span className="text-xs text-green-600">SSL Secured</span>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    required
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={form.cardName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                      Expiry
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={form.expiry}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={form.cvv}
                      onChange={handleChange}
                      required
                      placeholder="123"
                      className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-cream-dark sticky top-28">
              <h2 className="text-lg font-medium text-navy mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-3"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-navy text-white text-[10px] rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-zinc-light">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedColor &&
                          ` · ${item.selectedColor}`}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-navy flex-shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm border-t border-cream-dark pt-4">
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
                <div className="flex justify-between text-zinc-custom">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-cream-dark pt-2">
                  <div className="flex justify-between font-semibold text-navy text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gold hover:bg-gold-light text-white font-medium tracking-wider uppercase text-sm rounded-lg transition-colors mt-6 flex items-center justify-center gap-2"
              >
                <ShieldCheck size={18} />
                Place Order
              </button>

              <p className="text-xs text-zinc-light text-center mt-3">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
