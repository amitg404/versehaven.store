"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { productApi, Product } from "@/lib/api";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { vibeGroups } from "@/lib/vibes";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await productApi.getById(productId);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (productId) fetchProduct();
  }, [productId]);

  const parseImages = (images: string): string[] => {
    try {
      return JSON.parse(images);
    } catch {
      return [];
    }
  };

  const parseTags = (tags: string): string[] => {
    try {
      return JSON.parse(tags);
    } catch {
      return [];
    }
  };

  const getTagLabel = (tagId: string): string => {
    for (const group of vibeGroups) {
      const cat = group.categories.find((c) => c.id === tagId);
      if (cat) return cat.name;
    }
    return tagId;
  };

  const handleAddToCart = () => {
    if (!product) return;

    const images = parseImages(product.images);
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: images[0] || "",
      quantity,
    });

    toast.success("Added to cart!", {
      description: `${product.title} × ${quantity}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-[var(--text-muted)]">Product not found</p>
        <Link href="/catalog" className="btn btn-primary">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const images = parseImages(product.images);
  const tags = parseTags(product.tags);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--bg-light)]">
              {images[selectedImage] ? (
                <Image
                  src={images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl opacity-50">🖼️</span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImage === index
                        ? "border-[var(--accent)]"
                        : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-[var(--accent)] font-medium mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text)]">
                {product.title}
              </h1>
            </div>

            <p className="text-3xl font-bold text-[var(--accent)]">
              {formatPrice(product.price)}
            </p>

            <p className="text-[var(--text-muted)] leading-relaxed">
              {product.description}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/catalog?tag=${tag}`}
                    className="px-3 py-1 text-sm bg-[var(--bg-light)] rounded-full hover:bg-[var(--accent)]/10 transition-colors"
                  >
                    {getTagLabel(tag)}
                  </Link>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-[var(--text-muted)]">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-1 text-lg py-4"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="btn btn-secondary p-4">
                <Heart className="w-5 h-5" />
              </button>
              <button className="btn btn-secondary p-4">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Stock Status */}
            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-sm">
                <span className="text-[var(--success)]">✓</span>{" "}
                {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
              </p>
            </div>

            {/* Bible Gateway Link */}
            <div className="pt-4">
              <a
                href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(product.title)}&version=NIV`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--info)] hover:underline text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Read this verse on Bible Gateway
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
