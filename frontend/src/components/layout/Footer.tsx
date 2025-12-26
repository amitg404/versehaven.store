import Link from "next/link";
import { Heart, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { href: "/catalog", label: "All Posters" },
      { href: "/catalog?category=psalms", label: "Psalms Collection" },
      { href: "/catalog?category=proverbs", label: "Proverbs Collection" },
      { href: "/custom", label: "Custom Prints" },
    ],
    vibes: [
      { href: "/catalog?tag=peace-calm", label: "Peace & Calm" },
      { href: "/catalog?tag=strength-hard-times", label: "Strength" },
      { href: "/catalog?tag=hope-encouragement", label: "Hope" },
      { href: "/catalog?tag=faith-over-fear", label: "Faith Over Fear" },
    ],
    company: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  };

  return (
    <footer className="bg-[var(--bg-light)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[var(--text)]"
            >
              VerseHaven
            </Link>
            <p className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed">
              Premium Bible verse posters crafted with love. Bring the Word into your
              home.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5 text-[var(--text-muted)]" />
              </a>
              <a
                href="mailto:hello@versehaven.store"
                className="p-2 hover:bg-white rounded-full transition-colors"
              >
                <Mail className="w-5 h-5 text-[var(--text-muted)]" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-[var(--text)] mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vibes */}
          <div>
            <h3 className="font-semibold text-[var(--text)] mb-4">Shop by Vibe</h3>
            <ul className="space-y-2">
              {footerLinks.vibes.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-[var(--text)] mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {currentYear} VerseHaven. All rights reserved.
          </p>
          <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-[var(--error)] fill-current" /> for
            His glory
          </p>
        </div>
      </div>
    </footer>
  );
}
