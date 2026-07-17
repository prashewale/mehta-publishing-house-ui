import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Book } from "@/lib/types";
import { BookCard } from "./BookCard";

interface Props {
  books: Book[];
  /** Min visible cards on desktop (controls width). Default 6. */
  minVisible?: number;
  /** Interval in ms between auto-slides. Default 4000. */
  autoSlideInterval?: number;
}

export function BookSlider({ books, minVisible = 6, autoSlideInterval = 4000 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  /** Calculate the width of a single card including gap */
  const getCardStep = useCallback(() => {
    const el = ref.current;
    if (!el) return 0;
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return 0;
    // Get computed gap between cards
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    return first.offsetWidth + gap;
  }, []);

  const scroll = useCallback((dir: "l" | "r") => {
    const el = ref.current;
    if (!el) return;
    const step = getCardStep();
    if (step === 0) return;
    el.scrollBy({ left: step * (dir === "l" ? -1 : 1), behavior: "smooth" });
  }, [getCardStep]);

  // Auto-slide effect: slide 1 item at a time, wrap to start at the end
  useEffect(() => {
    if (isPaused || books.length === 0) return;

    const intervalId = setInterval(() => {
      const el = ref.current;
      if (!el) return;

      const step = getCardStep();
      if (step === 0) return;

      const maxScrollLeft = el.scrollWidth - el.clientWidth;

      // If next slide would go past the end, wrap to start
      if (el.scrollLeft + step >= maxScrollLeft - 1) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, autoSlideInterval);

    return () => clearInterval(intervalId);
  }, [isPaused, books.length, autoSlideInterval, getCardStep]);

  // Tailwind needs static classes; map for common values
  const widthClass =
    minVisible === 6
      ? "w-[44%] sm:w-[30%] md:w-[22%] lg:w-[16%]"
      : minVisible === 4
        ? "w-[48%] sm:w-[32%] md:w-[28%] lg:w-[23%]"
        : "w-[44%] sm:w-[30%] md:w-[22%] lg:w-[19%]";

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={ref}
        className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-1 px-1 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {books.map((b) => (
          <div
            key={b.id}
            className={`shrink-0 snap-start ${widthClass}`}
          >
            <BookCard book={b} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("l")}
        className="hidden md:flex absolute -left-3 top-1/3 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-background border shadow-md hover:bg-primary hover:text-primary-foreground transition opacity-0 group-hover:opacity-100"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => scroll("r")}
        className="hidden md:flex absolute -right-3 top-1/3 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-background border shadow-md hover:bg-primary hover:text-primary-foreground transition opacity-0 group-hover:opacity-100"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
