import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useMembership, getMembershipPrice } from "@/lib/membership-store";

const PICKS = BOOKS.filter((b) => b.isNewRelease || b.onSale).slice(0, 2).length
  ? BOOKS.filter((b) => b.isNewRelease || b.onSale).slice(0, 2)
  : BOOKS.slice(0, 2);

export function NewArrivalsHeroSlider() {
  const [i, setI] = useState(0);
  const discount = useMembership((s) => s.getDiscountPercent());

  const next = useCallback(() => setI((c) => (c + 1) % PICKS.length), []);
  const prev = useCallback(
    () => setI((c) => (c - 1 + PICKS.length) % PICKS.length),
    [],
  );

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const book = PICKS[i];
  const base = book.discountPrice ?? book.price;
  const memberPrice = discount > 0 ? getMembershipPrice(base, discount) : base;
  const offPct = book.discountPrice
    ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
    : null;

  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 min-h-[340px] md:min-h-[400px] lg:min-h-[440px]">
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_30%_20%,#7c2d12,transparent_60%),radial-gradient(circle_at_80%_80%,#b45309,transparent_55%)]" />

      <div className="relative h-full grid grid-cols-[1fr_auto] gap-3 p-4 md:p-6 min-h-[340px] md:min-h-[400px] lg:min-h-[440px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col justify-between min-w-0"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider w-fit shadow">
                <Sparkles className="h-3 w-3" /> New Arrival
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-bold leading-tight line-clamp-3 text-[hsl(var(--deep-brown))]">
                {book.title}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                by <span className="font-medium">{book.author}</span>
              </p>
              <p className="text-sm text-muted-foreground line-clamp-6 max-w-md">
                {book.description}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl font-bold text-primary">
                  ₹{memberPrice.toFixed(0)}
                </span>
                {book.discountPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{book.price.toFixed(0)}
                  </span>
                )}
                {offPct && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">
                    {offPct}% OFF
                  </span>
                )}
              </div>
              <Button asChild size="sm" className="rounded-full">
                <Link to={`/books/${book.slug}`}>
                  Buy Now <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={book.id + "img"}
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
            transition={{ duration: 0.5 }}
            className="self-center"
          >
            <Link to={`/books/${book.slug}`}>
              <img
                src={book.cover}
                alt={book.title}
                className="h-[200px] md:h-[250px] lg:h-[300px] w-auto object-cover rounded-lg shadow-2xl"
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* controls */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <button
          onClick={prev}
          className="p-1.5 rounded-full bg-white/80 hover:bg-white border shadow-sm"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5">
          {PICKS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-primary" : "w-1.5 bg-primary/30"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-1.5 rounded-full bg-white/80 hover:bg-white border shadow-sm"
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
