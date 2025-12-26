"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User, Search, Moon, Sun, Globe, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage, languageNames } from "@/components/LanguageProvider";
import { Language } from "@/lib/translations";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/catalog", label: t.nav.shopAll },
    { href: "/catalog?vibe=life-context", label: t.nav.shopByVibe },
    { href: "/catalog?category=psalms", label: t.nav.psalms },
    { href: "/custom", label: t.nav.customPrint },
  ];

  const languages: Language[] = ["en", "hi", "kn", "ta", "te"];

  return (
    <header className="sticky top-0 z-50 glass border-b border-[var(--border)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="VerseHaven"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="hidden sm:inline font-[family-name:var(--font-playfair)] text-lg md:text-xl font-semibold text-[var(--text)]">
              VerseHaven
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors text-sm font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              className="p-2.5 md:p-3 hover:bg-[var(--bg-light)] rounded-full transition-colors"
              aria-label={t.nav.search}
            >
              <Search className="w-5 h-5 text-[var(--text-muted)]" />
            </button>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-2.5 md:p-3 hover:bg-[var(--bg-light)] rounded-full transition-colors flex items-center gap-1"
                aria-label="Change language"
              >
                <Globe className="w-5 h-5 text-[var(--text-muted)]" />
                <span className="hidden md:inline text-xs text-[var(--text-muted)] uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-[var(--text-muted)] hidden md:inline" />
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 bg-[var(--bg-light)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden min-w-[140px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLangOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-[var(--bg)] transition-colors flex items-center justify-between ${
                          language === lang ? "text-[var(--accent)] font-medium" : "text-[var(--text)]"
                        }`}
                      >
                        {languageNames[lang]}
                        {language === lang && <span>✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 md:p-3 hover:bg-[var(--bg-light)] rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-[var(--text-muted)]" />
              ) : (
                <Sun className="w-5 h-5 text-[var(--text-muted)]" />
              )}
            </button>
            
            <Link
              href="/cart"
              className="p-2.5 md:p-3 hover:bg-[var(--bg-light)] rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5 text-[var(--text-muted)]" />
            </Link>
            <Link
              href="/login"
              className="hidden sm:flex p-2.5 md:p-3 hover:bg-[var(--bg-light)] rounded-full transition-colors"
            >
              <User className="w-5 h-5 text-[var(--text-muted)]" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2.5 md:p-3 hover:bg-[var(--bg-light)] rounded-full transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-[var(--text)]" />
              ) : (
                <Menu className="w-5 h-5 text-[var(--text)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-3 px-4 text-base text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-light)] rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="block py-3 px-4 text-base text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-light)] rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t.nav.login}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
