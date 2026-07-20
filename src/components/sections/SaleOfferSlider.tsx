import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, ArrowRight } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";
import { useMembership, getMembershipPrice } from "@/lib/membership-store";
import { cn } from "@/lib/utils";

const SALE = BOOKS.filter((b) => b.onSale || b.discountPrice).slice(0, 8);
const ITEMS = SALE.length ? SALE : BOOKS.slice(0, 6);

interface Props {
  compact?: boolean;
}

export function SaleOfferSlider({ compact = false }: Props) {
  const [i, setI] = useState(0);
  const discount = useMembership((s) => s.getDiscountPercent());

  const next = useCallback(() => setI((c) => (c + 1) % ITEMS.length), []);
  const prev = useCallback(
    () => setI((c) => (c - 1 + ITEMS.length) % ITEMS.length),
    [],
  );

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  const book = ITEMS[i];
  const base = book.discountPrice ?? book.price;
  const memberPrice = discount > 0 ? getMembershipPrice(base, discount) : base;
  const offPct = book.discountPrice
    ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
    : 20;

  if (compact) {
    return (
      <section className="relative h-full overflow-hidden rounded-2xl border border-red-200/60 bg-[#fff8f5] shadow-sm">
        {/* Atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-red-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-amber-300/25 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(180,60,40,0.12) 1px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />
        </div>

        <div className="relative flex h-full flex-col p-4">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-md shadow-red-600/25">
              <Flame className="h-3 w-3" />
              Hot Deal
            </div>
            <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold text-red-600 ring-1 ring-red-200">
              {offPct}% OFF
            </span>
          </div>

          {/* Book stage */}
          <div className="relative mx-auto flex flex-1 items-center justify-center py-1">
            <div className="absolute bottom-2 left-1/2 h-3 w-28 -translate-x-1/2 rounded-[100%] bg-black/15 blur-md" />
            <AnimatePresence mode="wait">
              <motion.div
                key={book.id + "cover"}
                initial={{ opacity: 0, y: 18, rotate: -6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, rotate: -3, scale: 1 }}
                exit={{ opacity: 0, y: -12, rotate: 4, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/books/${book.slug}`} className="block">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="h-[130px] w-auto rounded-lg object-cover shadow-[0_20px_40px_-12px_rgba(120,20,20,0.45)] ring-1 ring-black/10 transition-transform duration-300 hover:-translate-y-1 hover:rotate-0"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mt-1 space-y-2 text-center"
            >
              <div>
                <h2 className="font-serif text-sm font-bold leading-snug text-[hsl(var(--deep-brown))] line-clamp-2">
                  {book.title}
                </h2>
                <p className="mt-0.5 text-[10px] text-muted-foreground">by {book.author}</p>
              </div>

              <div className="flex items-baseline justify-center gap-2">
                <span className="text-xl font-bold tracking-tight text-red-600">
                  ₹{memberPrice.toFixed(0)}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  ₹{book.price.toFixed(0)}
                </span>
              </div>

              <Link
                to={`/books/${book.slug}`}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-red-600/20 transition-all hover:bg-red-700 hover:shadow-lg active:scale-[0.98]"
              >
                Grab the Deal
                <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          {/* <div className="mt-4 flex items-center justify-center gap-2.5">
            <button
              onClick={prev}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[hsl(var(--deep-brown))] shadow-sm ring-1 ring-black/5 transition hover:bg-white"
              aria-label="Previous"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <div className="flex gap-1.5">
              {ITEMS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === i ? "w-5 bg-red-600" : "w-1.5 bg-red-600/25 hover:bg-red-600/40",
                  )}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[hsl(var(--deep-brown))] shadow-sm ring-1 ring-black/5 transition hover:bg-white"
              aria-label="Next"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div> */}
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-red-200/50 bg-gradient-to-br from-[#fff5f2] via-amber-50 to-orange-50 min-h-[280px] md:min-h-[320px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-red-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />
      </div>

      <div className="relative grid md:grid-cols-2 items-center gap-6 p-6 md:p-8 min-h-[280px] md:min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={book.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.45 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-red-600/25">
              <Flame className="h-3 w-3" /> Limited Sale Offer
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight line-clamp-3 text-[hsl(var(--deep-brown))]">
              {book.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              by <span className="font-medium">{book.author}</span>
            </p>

            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl md:text-4xl font-bold text-red-600">
                ₹{memberPrice.toFixed(0)}
              </span>
              <span className="text-base text-muted-foreground line-through">
                ₹{book.price.toFixed(0)}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-600 text-white">
                Save {offPct}%
              </span>
            </div>

            <Link
              to={`/books/${book.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700"
            >
              Grab the Deal <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={book.id + "i"}
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Link to={`/books/${book.slug}`}>
              <img
                src={book.cover}
                alt={book.title}
                className="h-[200px] md:h-[260px] w-auto object-cover rounded-xl shadow-2xl ring-1 ring-black/10"
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <button
          onClick={prev}
          className="p-1.5 rounded-full bg-white/90 hover:bg-white border shadow-sm"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5">
          {ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-red-600" : "w-1.5 bg-red-600/30"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-1.5 rounded-full bg-white/90 hover:bg-white border shadow-sm"
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div> */}
    </section>
  );
}
