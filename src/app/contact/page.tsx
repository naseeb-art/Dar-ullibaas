"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["123 Fashion Avenue", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+1 (212) 555-1234", "Mon - Fri: 9AM - 6PM EST"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@luxeclothing.com", "support@luxeclothing.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-navy text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
            Get in Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-light mt-3">Contact Us</h1>
          <p className="text-cream/60 mt-3 text-sm max-w-md mx-auto">
            We&apos;d love to hear from you. Reach out for any questions,
            feedback, or assistance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className="bg-white rounded-2xl p-6 border border-cream-dark text-center"
            >
              <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center mx-auto mb-4">
                <info.icon size={22} className="text-navy" />
              </div>
              <h3 className="font-medium text-navy mb-2">{info.title}</h3>
              {info.lines.map((line) => (
                <p key={line} className="text-sm text-zinc-light">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-cream-dark">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h2 className="text-xl font-medium text-navy mb-2">
                  Message Sent!
                </h2>
                <p className="text-sm text-zinc-light mb-6">
                  We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="text-gold hover:text-gold-light transition-colors text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-medium text-navy mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
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
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-custom mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-navy hover:bg-navy-light text-white font-medium tracking-wider uppercase text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
