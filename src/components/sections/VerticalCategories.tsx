import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, BookOpen, ArrowRight } from "lucide-react";
import { COLLECTIONS, BOOKS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
const GENRE_COLORS: Record<string, string> = {
  Fiction: "#c8b6a6",
  Romance: "#d8a7b1",
  Mystery: "#9f86c0",
  "Sci-Fi": "#8faecf",
  "Non-Fiction": "#b8c99d",
  "Self-Help": "#8fc4b2",
  Historical: "#d6b38a",
  Classic: "#b7b39a",
};

const AUTOPLAY_INTERVAL = 3500;

export function VerticalCategories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = COLLECTIONS.length;

  const activeGenre = COLLECTIONS[activeIdx];
  const bgColor = GENRE_COLORS[activeGenre?.name] || "#f5e6d0";
  const activeBooks = BOOKS.filter((b) =>
    b.genres.some((g) => g.toLowerCase() === activeGenre?.name.toLowerCase())
  );

  const slideNext = useCallback(() => setActiveIdx((p) => (p + 1) % total), [total]);
  const slidePrev = useCallback(() => setActiveIdx((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (!isInView || isPaused) return;
    const t = setInterval(slideNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(t);
  }, [isInView, isPaused, slideNext]);

  const distance = (i: number, active: number) => {
    const d = Math.abs(i - active);
    return Math.min(d, total - d);
  };

  const ITEM_HEIGHT = 44;

  // Build ordered items starting from the one just before active
  // so the active item lands at a fixed position in the list
  const ordered = [...Array(total)].map((_, i) => COLLECTIONS[(activeIdx + i) % total]);

  return (
    <section
      ref={sectionRef}
      className="py-2 lg:py-4 relative overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: bgColor }}
    >
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#5a3e2b 0.8px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2 lg:mb-8">
          <div>
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[hsl(var(--deep-brown))]" />
              <p className="text-xs font-medium tracking-widest text-[hsl(var(--deep-brown))]">GENRES</p>
            </div> */}
            {/* <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-[hsl(var(--deep-brown))]">
              Shop by Category
            </h2> */}
            <p className="mt-1 text-sm md:text-base text-foreground/80 max-w-md">
              Browse our curated genres. Find your next favorite read.
            </p>
          </div>
          <Link
            to="/books"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[hsl(var(--deep-brown))] hover:bg-[hsl(var(--sienna))] text-white rounded-xl font-medium text-sm transition-all active:scale-95 group shrink-0"
          >
            Explore All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Two-panel layout - fixed height container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-[340px] lg:min-h-[320px]">
          {/* Left: Vertical Genre List */}
          <div
            className="relative lg:col-span-3"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Fade top & bottom */}
            <div
              className="absolute top-0 left-0 right-0 h-10 z-10 pointer-events-none transition-colors duration-700"
              style={{ background: `linear-gradient(to bottom, ${bgColor}, transparent)` }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-10 z-10 pointer-events-none transition-colors duration-700"
              style={{ background: `linear-gradient(to top, ${bgColor}, transparent)` }}
            />

            {/* Up arrow */}
            <button
              onClick={slidePrev}
              className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 p-1 rounded-full bg-white/80 hover:bg-white shadow-sm border border-border hover:border-[hsl(var(--deep-brown))] transition-all"
              aria-label="Previous genre"
            >
              <ChevronUp className="h-3 w-3 text-[hsl(var(--deep-brown))]" />
            </button>

            {/* Down arrow */}
            <button
              onClick={slideNext}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20 p-1 rounded-full bg-white/80 hover:bg-white shadow-sm border border-border hover:border-[hsl(var(--deep-brown))] transition-all"
              aria-label="Next genre"
            >
              <ChevronDown className="h-3 w-3 text-[hsl(var(--deep-brown))]" />
            </button>

            {/* Genre items - fixed visible window */}
            <div className="overflow-hidden rounded-2xl h-[280px] lg:h-[260px]" style={{ padding: "40px 0" }}>
              <motion.div
                className="flex flex-col"
                key={activeIdx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 30, mass: 0.8 }}
              >
                {ordered.map((cat, i) => {
                  const isActive = i === 0; // first item is the active one
                  const d = i; // distance from active

                  if (d > 5) return null;

                  return (
                    <motion.button
                      key={cat.name}
                      onClick={() => {
                        // find actual index to switch to
                        const actualIdx = COLLECTIONS.findIndex((c) => c.name === cat.name);
                        if (actualIdx >= 0) setActiveIdx(actualIdx);
                      }}
                      layout
                      className="relative w-full text-left pl-4 pr-2 transition-all duration-500 cursor-pointer flex items-center gap-2"
                      style={{
                        height: ITEM_HEIGHT,
                        opacity: isActive ? 1 : 0.3,
                        scale: isActive ? 1 : 0.85,
                        transformOrigin: "center left",
                      }}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.span
                          layoutId="activeBar"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full"
                          style={{ backgroundColor: `hsl(var(--sienna))` }}
                        />
                      )}

                      {/* Genre name */}
                      <span
                        className={cn(
                          isActive
                            ? "text-xl md:text-2xl lg:text-3xl font-bold text-white"
                            : "text-base md:text-base",
                          "tracking-tight leading-none transition-all duration-500"
                        )}
                        style={{
                          color: isActive ? "white" : `hsl(var(--deep-brown))`,
                          textShadow: isActive ? `0 2px 12px ${bgColor}99, 0 4px 24px ${bgColor}40` : "none",
                        }}
                      >
                        {cat.name}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Right: Product Cards */}
          <div className="lg:col-span-9" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg md:text-xl font-serif font-bold text-[hsl(var(--deep-brown))]">
                  {activeGenre?.name}
                </h3>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  {activeBooks.length} titles
                </p>
              </div>
          

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const el = document.getElementById("genre-products-scroll");
                    if (el) el.scrollBy({ left: -240, behavior: "smooth" });
                  }}
                  className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm border border-border hover:border-[hsl(var(--deep-brown))] transition-all"
                  aria-label="Previous products"
                >
                  <ChevronLeft className="h-3.5 w-3.5 text-[hsl(var(--deep-brown))]" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("genre-products-scroll");
                    if (el) el.scrollBy({ left: 240, behavior: "smooth" });
                  }}
                  className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm border border-border hover:border-[hsl(var(--deep-brown))] transition-all"
                  aria-label="Next products"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-[hsl(var(--deep-brown))]" />
                </button>
              </div>
            </div>

            {/* Product cards scroll */}
            <div
              id="genre-products-scroll"
              className="flex gap-4 overflow-x-auto scrollbar-thin h-[320px] lg:h-[300px] items-center"
              style={{ scrollbarWidth: "thin", scrollbarColor: `${bgColor} transparent` }}
            >
              <AnimatePresence mode="wait">
                {activeBooks.length > 0 ? (
                  activeBooks.slice(0, 10).map((book, i) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ delay: i * 0.05, type: "spring", stiffness: 120 }}
                      className="min-w-[150px] max-w-[150px] shrink-0 self-center"
                    >
                      <Link
                        to={`/books/${book.slug}`}
                        className="group block bg-white rounded-lg overflow-hidden border border-white/80 hover:shadow-md transition-all duration-500 hover:-translate-y-1"
                      >
                        <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                        </div>
                        <div className="p-2.5">
                          <p className="font-semibold text-[11px] leading-snug line-clamp-2 text-[hsl(var(--deep-brown))]">
                            {book.title}
                          </p>
                          <p className="text-[9px] text-muted-foreground mt-0.5 truncate font-serif">
                            {book.author}
                          </p>
                          <div className="mt-1.5 flex items-center gap-1">
                            <span className="text-xs font-bold text-[hsl(var(--sienna))]">
                              ₹{book.discountPrice ?? book.price}
                            </span>
                            {book.discountPrice && (
                              <span className="text-[9px] text-muted-foreground line-through">
                                ₹{book.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-muted-foreground/60">
                    <p className="text-sm font-serif italic">Explore books in this genre</p>
                  </div>
                )}
              </AnimatePresence>

              {/* Show All - only when books exist */}
              {activeBooks.length > 0 && (
                <Link
                  to={`/books?genre=${encodeURIComponent(activeGenre?.name || "")}`}
                  className="w-12 h-12 shrink-0 rounded-full bg-white border-2 border-dashed border-[hsl(var(--sienna))]/40 hover:bg-[hsl(var(--sienna))]/10 hover:border-[hsl(var(--sienna))] flex items-center justify-center transition-all group"
                  aria-label="Show all books"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[hsl(var(--sienna))] opacity-60 group-hover:opacity-100 transition-opacity">
                    <path d="M4.66663 11.3334L11.3333 4.66669" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.66663 4.66669H11.3333V11.3334" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Pause indicator */}
        {/* {isPaused && (
          <div className="text-center mt-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/70 backdrop-blur-sm rounded-full text-[10px] text-muted-foreground shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--deep-brown))] animate-pulse" />
              Autoplay paused
            </span>
          </div>
        )} */}
      </div>
    </section>
  );
}