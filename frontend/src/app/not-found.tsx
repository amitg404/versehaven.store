"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg)]">
      <div className="card p-8 md:p-12 max-w-lg text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-[var(--accent)] mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-4">
          Page Not Found
        </h2>
        <p className="text-[var(--text-muted)] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-8 py-4 rounded-xl font-medium text-lg transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
