"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none text-[var(--text-muted)]">
            <p className="text-sm text-[var(--text-muted)] mb-8">
              Last updated: December 27, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using VerseHaven (versehaven.store), you agree to be bound by these Terms 
                of Service. If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">2. Products and Services</h2>
              <p className="mb-4">VerseHaven offers:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Premium A3 Bible Verse Posters:</strong> High-quality printed posters featuring Scripture verses</li>
                <li><strong>Custom Poster Printing:</strong> Upload your own designs for printing on A3 format</li>
              </ul>
              <p className="mt-4">
                All posters are printed on 300gsm matte art paper and shipped within 3-5 business days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">3. Pricing and Payment</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are displayed in Indian Rupees (INR) and include applicable taxes</li>
                <li>Payments are processed securely through Razorpay</li>
                <li>We accept major credit cards, debit cards, UPI, and net banking</li>
                <li>Orders are confirmed only after successful payment</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">4. Shipping and Delivery</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We ship across India</li>
                <li>Standard delivery: 5-7 business days</li>
                <li>Shipping charges are calculated at checkout based on your location</li>
                <li>You will receive a tracking number once your order is shipped</li>
                <li>Risk of loss passes to you upon delivery</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">5. Returns and Refunds</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We accept returns within 7 days of delivery for defective or damaged products</li>
                <li>Custom printed posters are non-refundable unless there is a printing defect</li>
                <li>To initiate a return, contact us at support@versehaven.store with your order details</li>
                <li>Refunds will be processed within 5-7 business days after we receive the returned item</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">6. Intellectual Property</h2>
              <p className="mb-4">
                All content on this website, including but not limited to text, graphics, logos, images, 
                and software, is the property of VerseHaven and is protected by intellectual property laws.
              </p>
              <p>
                The Bible verses featured on our posters are from the public domain. The artistic designs 
                and typography are proprietary to VerseHaven.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">7. User Accounts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for all activities under your account</li>
                <li>We reserve the right to terminate accounts that violate these terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">8. Custom Upload Policy</h2>
              <p className="mb-4">When uploading custom images for printing:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must have the rights to use the uploaded content</li>
                <li>Uploaded content must not violate any laws or third-party rights</li>
                <li>We reserve the right to refuse printing content we deem inappropriate</li>
                <li>We are not responsible for the quality of user-uploaded images</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, VerseHaven shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages arising from your use of our 
                services. Our total liability shall not exceed the amount paid by you for the specific 
                product or service in question.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">10. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of 
                India. Any disputes shall be subject to the exclusive jurisdiction of the courts in 
                Bangalore, Karnataka.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">11. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> support@versehaven.store<br />
                <strong>Website:</strong> versehaven.store
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">12. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective upon 
                posting to the website. Your continued use of the website constitutes acceptance of 
                the modified terms.
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
