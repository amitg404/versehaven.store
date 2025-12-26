"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-[var(--text-muted)]">
            <p className="text-sm text-[var(--text-muted)] mb-8">
              Last updated: December 27, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">1. Introduction</h2>
              <p>
                Welcome to VerseHaven ("we," "our," or "us"). We are committed to protecting your personal 
                information and your right to privacy. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you visit our website versehaven.store and 
                make purchases from our store.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, billing address</li>
                <li><strong>Payment Information:</strong> Processed securely through Razorpay. We do not store your card details.</li>
                <li><strong>Account Information:</strong> Username, password (encrypted), order history</li>
                <li><strong>Communication Data:</strong> Messages you send us, customer service inquiries</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and services</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">4. Information Sharing</h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Payment processors (Razorpay), shipping partners, cloud hosting (Cloudinary, Neon)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="mt-4">We do not sell your personal information to third parties.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your 
                personal information. This includes encryption, secure servers, and regular security audits. 
                However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">6. Cookies</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, remember your preferences, 
                and analyze site traffic. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">7. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">8. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under 18. We do not knowingly collect 
                personal information from children. If you believe we have collected information from 
                a child, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> support@versehaven.store<br />
                <strong>Website:</strong> versehaven.store
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <Link href="/" className="text-[var(--accent)] hover:underline">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
