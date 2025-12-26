import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VerseHaven | Premium A3 Bible Verse Posters",
  description: "Premium A3 Bible verse posters for your home, office, and sanctuary. Find peace, strength, and hope in beautiful wall art.",
  keywords: ["bible verse posters", "christian wall art", "scripture prints", "faith decor", "A3 posters"],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ErrorBoundary>
          <ThemeProvider>
            <LanguageProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster position="bottom-right" richColors />
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
