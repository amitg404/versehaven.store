"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg)]">
      <div className="card p-8 md:p-12 max-w-lg text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-red-500 mb-4">
          Oops!
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-4">
          Something went wrong
        </h2>
        <p className="text-[var(--text-muted)] mb-8">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-8 py-4 rounded-xl font-medium text-lg transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 rounded-xl font-medium text-lg transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
