"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Filter, Grid3X3, List, Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { productApi, Product } from "@/lib/api";
import { vibeGroups } from "@/lib/vibes";
import { formatPrice } from "@/lib/utils";

function CatalogContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const activeTag = searchParams.get("tag");
  const activeCategory = searchParams.get("category");
  const activeGroup = searchParams.get("group");
  const sortBy = searchParams.get("sort") || "createdAt";

  // Get current group's categories
  const currentGroup = vibeGroups.find((g) => g.id === activeGroup);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params: Record<string, string> = {};
        if (activeTag) params.tag = activeTag;
        if (activeCategory) params.category = activeCategory;
        if (searchQuery) params.search = searchQuery;
        if (sortBy) params.sort = sortBy;

        const response = await productApi.getAll(params);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeTag, activeCategory, searchQuery, sortBy]);

  const parseImages = (images: string): string[] => {
    try {
      return JSON.parse(images);
    } catch {
      return [];
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text)]">
              {activeTag
                ? vibeGroups.flatMap((g) => g.categories).find((c) => c.id === activeTag)?.name || "Shop"
                : activeCategory
                ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
                : activeGroup
                ? currentGroup?.name || "Shop"
                : "All Posters"}
            </h1>
            <p className="text-[var(--text-muted)] mt-1">
              {products.length} {products.length === 1 ? "poster" : "posters"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-[var(--bg-light)] rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-white/50"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-white/50"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn btn-secondary ${showFilters ? "bg-[var(--accent)]/10" : ""}`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters Sidebar */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-[var(--bg-light)] rounded-xl border border-[var(--border)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--text)]">Filter by Vibe</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5 text-[var(--text-muted)]" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
              {vibeGroups.map((group) => (
                <Link
                  key={group.id}
                  href={`/catalog?group=${group.id}`}
                  className={`p-3 rounded-lg border text-center text-sm transition-colors ${
                    activeGroup === group.id
                      ? "border-[var(--accent)] bg-[var(--accent)]/10"
                      : "border-[var(--border)] hover:border-[var(--accent)]"
                  }`}
                >
                  {group.name}
                </Link>
              ))}
            </div>

            {currentGroup && (
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <p className="text-sm font-medium text-[var(--text-muted)] mb-3">
                  {currentGroup.name} Categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentGroup.categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalog?tag=${cat.id}`}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
                        activeTag === cat.id
                          ? "bg-[var(--accent)] text-white"
                          : "bg-white border border-[var(--border)] hover:border-[var(--accent)]"
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted)] text-lg">No posters found</p>
            <Link href="/catalog" className="btn btn-primary mt-4">
              View All Posters
            </Link>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {products.map((product, index) => {
              const images = parseImages(product.images);
              const firstImage = images[0];

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className={`card group ${viewMode === "list" ? "flex gap-4" : ""}`}
                  >
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list" ? "w-32 h-32 flex-shrink-0" : "aspect-[3/4]"
                      }`}
                    >
                      {firstImage ? (
                        <Image
                          src={firstImage}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--bg-light)] flex items-center justify-center">
                          <span className="text-4xl opacity-50">🖼️</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1">
                      <h3 className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-1">
                        {product.category}
                      </p>
                      <p className="text-lg font-semibold text-[var(--accent)] mt-2">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]" />
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
