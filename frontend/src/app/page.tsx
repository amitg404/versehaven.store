"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { vibeGroups } from "@/lib/vibes";
import { useLanguage } from "@/components/LanguageProvider";

// Sample poster images for vibe tiles
const vibeImages = [
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&q=80",
  "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
];

// Vibe keys that match translations
const vibeKeys = [
  "hope-encouragement",
  "peace-calm", 
  "strength-hard-times",
  "faith-over-fear",
  "joy",
  "courage",
] as const;

// Vibe Tile Component with scroll-based blur on mobile
function VibeTile({ vibeKey, index, activeIndex, setActiveIndex }: {
  vibeKey: string;
  index: number;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.6 });
  const { t } = useLanguage();

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  const isActive = activeIndex === index;
  const vibeData = t.vibes[vibeKey as keyof typeof t.vibes];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -3 }}
    >
      <Link
        href={`/catalog?tag=${vibeKey}`}
        className="block relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden group"
      >
        {/* Background Image */}
        <Image
          src={vibeImages[index % vibeImages.length]}
          alt=""
          fill
          className={`object-cover transition-all duration-500 ${
            isActive ? "blur-0 scale-105 md:blur-sm md:scale-100 md:group-hover:blur-0 md:group-hover:scale-110" 
                     : "blur-sm md:blur-sm group-hover:blur-0 group-hover:scale-110"
          }`}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 group-hover:from-black/80 group-hover:via-black/50 transition-colors duration-300" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <h3 
            className="text-xl md:text-2xl lg:text-3xl font-bold"
            style={{ 
              color: '#FFFFFF', 
              textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.7)' 
            }}
          >
            {vibeData?.name || vibeKey}
          </h3>
          <p 
            className="text-sm md:text-base mt-2 max-w-[200px]"
            style={{ 
              color: 'rgba(255,255,255,0.95)', 
              textShadow: '0 1px 4px rgba(0,0,0,0.9)' 
            }}
          >
            {vibeData?.desc || ""}
          </p>
          <span 
            className="mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1" 
            style={{ color: '#C6A87C' }}
          >
            {t.soulCheck.explore} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [activeVibeIndex, setActiveVibeIndex] = useState(0);
  const { t } = useLanguage();
  
  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative h-[50vh] md:h-[75vh] min-h-[350px] md:min-h-[500px] overflow-hidden"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 hero-gradient" />
        
        {/* Accent Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#C6A87C] rounded-full blur-[100px] md:blur-[150px] opacity-20 animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-48 md:w-80 h-48 md:h-80 bg-[#5D6D58] rounded-full blur-[80px] md:blur-[120px] opacity-15 animate-float-delayed" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm md:text-base font-medium mb-4 md:mb-6 border border-white/20">
                <Sparkles className="w-4 h-4" />
                {t.hero.badge}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                {t.hero.title1}
                <span className="block text-[#C6A87C]">{t.hero.title2}</span>
              </h1>

              <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
                {t.hero.subtitle}
              </p>

              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/catalog"
                  className="flex items-center gap-2 bg-[#C6A87C] hover:bg-[#B8996D] text-white px-8 py-4 rounded-xl font-medium text-lg transition-all shadow-lg hover:shadow-xl min-w-[200px] justify-center"
                >
                  {t.hero.shopBtn}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/custom"
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all border border-white/30 min-w-[200px] justify-center"
                >
                  {t.hero.customBtn}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Soul Check / Vibe Picker */}
      <section className="py-12 md:py-20 lg:py-24 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text)]">
              {t.soulCheck.title}
            </h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-[var(--text-muted)] max-w-xl mx-auto">
              {t.soulCheck.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {vibeKeys.map((vibeKey, index) => (
              <VibeTile
                key={vibeKey}
                vibeKey={vibeKey}
                index={index}
                activeIndex={activeVibeIndex}
                setActiveIndex={setActiveVibeIndex}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 md:mt-12 text-center"
          >
            <Link
              href="/catalog?view=vibes"
              className="text-[var(--accent)] hover:underline font-medium text-lg inline-flex items-center gap-2"
            >
              {t.soulCheck.exploreAll}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Browse by Category Groups */}
      <section className="py-12 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text)]">
              {t.shopYourWay.title}
            </h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-[var(--text-muted)]">
              {t.shopYourWay.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {vibeGroups.slice(0, 8).map((group, index) => {
              const groupTranslation = t.categoryGroups?.[group.id as keyof typeof t.categoryGroups];
              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -3 }}
                >
                  <Link
                    href={`/catalog?group=${group.id}`}
                    className="card p-6 md:p-8 block group h-full"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {groupTranslation?.name || group.name}
                    </h3>
                    <p className="text-sm md:text-base text-[var(--text-muted)] mt-2">
                      {groupTranslation?.desc || group.description}
                    </p>
                    <p className="text-sm text-[var(--accent)] mt-4 flex items-center gap-1">
                      {group.categories.length} {t.shopYourWay.categories} <ArrowRight className="w-4 h-4" />
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#2C2420]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {t.cta.title}
            </h2>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-white/70 max-w-xl mx-auto">
              {t.cta.subtitle}
            </p>
            <Link
              href="/custom"
              className="mt-8 md:mt-10 inline-flex items-center gap-2 bg-[#C6A87C] hover:bg-[#B8996D] text-white px-8 py-4 rounded-xl font-medium text-lg transition-colors min-w-[240px] justify-center"
            >
              {t.cta.btn}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
