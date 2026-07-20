import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { COLLECTIONS, BOOKS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const GENRE_COLORS: Record<string, string> = {
  Fiction: "#a07850",
  Romance: "#b8687a",
  Mystery: "#6a4e90",
  "Sci-Fi": "#4a7da8",
  "Non-Fiction": "#6a9050",
  "Self-Help": "#489880",
  Historical: "#a88048",
  Classic: "#8a856a",
};

const AUTOPLAY_INTERVAL = 3500;

export function VerticalCategories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const genreListRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHoveringList, setIsHoveringList] = useState(false);

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

  const scrollGenreList = useCallback((direction: "up" | "down") => {
    const el = genreListRef.current;
    if (!el) return;
    el.scrollBy({ top: direction === "up" ? -ITEM_HEIGHT : ITEM_HEIGHT, behavior: "smooth" });
  }, []);

  // Build ordered items starting from the one just before active
  // so the active item lands at a fixed position in the list
  const ordered = [...Array(total)].map((_, i) => COLLECTIONS[(activeIdx + i) % total]);

  return (
    <section
      ref={sectionRef}
      className="py-1 lg:py-2 relative overflow-hidden transition-colors duration-700"
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
        {/* <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-1 lg:mb-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[hsl(var(--deep-brown))]" />
              <p className="text-xs font-medium tracking-widest text-[hsl(var(--deep-brown))]">GENRES</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-[hsl(var(--deep-brown))]">
              Shop by Category
            </h2>
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
        </div> */}

        {/* Two-panel layout - fixed height container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-[240px] lg:min-h-[230px]">
          {/* Left: Vertical Genre List */}
          <div
            className="relative lg:col-span-3"
            onMouseEnter={() => { setIsPaused(true); setIsHoveringList(true); }}
            onMouseLeave={() => { setIsPaused(false); setIsHoveringList(false); }}
          >
            {/* Fade top & bottom */}
            <div
              className="absolute top-0 left-0 right-0 h-6 z-10 pointer-events-none transition-colors duration-700"
              style={{ background: `linear-gradient(to bottom, ${bgColor}, transparent)` }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-6 z-10 pointer-events-none transition-colors duration-700"
              style={{ background: `linear-gradient(to top, ${bgColor}, transparent)` }}
            />

            {/* Up arrow */}
            <button
              onClick={() => scrollGenreList("up")}
              className={`absolute -top-1 left-1/2 -translate-x-1/2 z-20 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-md border border-border transition-all duration-200 ${isHoveringList ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              aria-label="Scroll up"
            >
              <ChevronUp className="h-3 w-3 text-[hsl(var(--deep-brown))]" />
            </button>

            {/* Down arrow */}
            <button
              onClick={() => scrollGenreList("down")}
              className={`absolute -bottom-1 left-1/2 -translate-x-1/2 z-20 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-md border border-border transition-all duration-200 ${isHoveringList ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              aria-label="Scroll down"
            >
              <ChevronDown className="h-3 w-3 text-[hsl(var(--deep-brown))]" />
            </button>

            {/* Genre items - scrollable list */}
            <div
              ref={genreListRef}
              className="overflow-y-auto overflow-x-hidden rounded-2xl h-[240px] lg:h-[220px] scrollbar-hide"
              style={{ padding: "30px 0" }}
            >
              <div className="flex flex-col">
                {ordered.map((cat, i) => {
                  const isActive = i === 0; // first item is the active one

                  return (
                    <motion.button
                      key={cat.name}
                      onClick={() => {
                        // find actual index to switch to
                        const actualIdx = COLLECTIONS.findIndex(
                          (c) => c.name === cat.name,
                        );
                        if (actualIdx >= 0) setActiveIdx(actualIdx);
                      }}
                      className="relative w-full text-left pl-4 pr-2 cursor-pointer flex items-center gap-2"
                      style={{
                        height: ITEM_HEIGHT,
                        opacity: isActive ? 1 : 0.5,
                      }}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-5 rounded-r-full"
                          style={{ backgroundColor: `hsl(var(--amber-glow))` }}
                        />
                      )}

                      {/* Genre name */}
                      <span
                        className={cn(
                          isActive
                            ? "text-xl md:text-2xl lg:text-3xl font-bold text-white"
                            : "text-base md:text-base",
                          "tracking-tight leading-none",
                        )}
                        style={{
                          color: isActive ? "white" : "rgba(255,255,255,0.85)",
                          textShadow: isActive
                            ? `0 2px 12px ${bgColor}99, 0 4px 24px ${bgColor}40`
                            : "none",
                        }}
                      >
                        {cat.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Product Cards */}
          <div className="lg:col-span-9" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            {/* <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg md:text-xl font-serif font-bold text-[hsl(var(--deep-brown))]">
                  {activeGenre?.name}
                </h3>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  {activeBooks.length} titles
                </p>
              </div>
            </div> */}

            {/* Product cards scroll */}
            <div
              id="genre-products-scroll"
              className="flex gap-3 overflow-x-auto overflow-y-hidden h-[240px] lg:h-[230px] items-center"
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
                      className="min-w-[110px] max-w-[110px] shrink-0 self-center"
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
                        <div className="p-1.5">
                          <p className="font-semibold text-[10px] leading-snug line-clamp-1 text-[hsl(var(--deep-brown))]">
                            {book.title}
                          </p>
                          <p className="text-[8px] text-muted-foreground mt-0.5 truncate font-serif">
                            {book.author}
                          </p>
                          <div className="mt-1 flex items-center gap-1">
                            <span className="text-[10px] font-bold text-[hsl(var(--sienna))]">
                              ₹{book.discountPrice ?? book.price}
                            </span>
                            {book.discountPrice && (
                              <span className="text-[8px] text-muted-foreground line-through">
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