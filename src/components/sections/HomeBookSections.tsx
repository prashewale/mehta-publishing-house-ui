import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";
import { BookSlider } from "@/components/product/BookSlider";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subtitle?: string;
  books: typeof BOOKS;
  href?: string;
  bg?: string;
  /** Skip outer container — for embedding in a parent grid */
  embedded?: boolean;
  /** Fewer visible cards when in a narrower column */
  minVisible?: number;
  className?: string;
}

function Section({
  title,
  subtitle,
  books,
  href = "/books",
  bg = "",
  embedded = false,
  minVisible = 6,
  className,
}: Props) {
  if (!books.length) return null;

  const inner = (
    <>
      <div className="flex items-end justify-between mb-4">
        <div>
          {title && (<h2 className="text-xl md:text-2xl font-serif font-bold">{title}</h2>)}
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <Link
          to={href}
          className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <BookSlider books={books} minVisible={minVisible} />
    </>
  );

  if (embedded) {
    return <div className={cn("h-full", className)}>{inner}</div>;
  }

  return (
    <section className={cn(`py-10 ${bg}`, className)}>
      <div className="container mx-auto px-4">{inner}</div>
    </section>
  );
}

export function NewArrivalsSection({
  embedded,
  minVisible,
}: { embedded?: boolean; minVisible?: number } = {}) {
  return (
    <Section
      title="New Arrivals"
      subtitle="Fresh off the press"
      books={BOOKS.slice(6, 20)}
      embedded={embedded}
      minVisible={minVisible ?? (embedded ? 4 : 6)}
    />
  );
}

export function UpcomingSection() {
  return (
    <Section
      title="Upcoming Releases"
      subtitle="Pre-order tomorrow's bestsellers"
      books={BOOKS.slice(20, 30)}
      bg="bg-accent/20"
    />
  );
}

export function FeaturedSection() {
  return (
    <Section
      title="Editor's Picks"
      subtitle="Handpicked by our editorial team"
      books={BOOKS.filter((b) => b.isBestseller).slice(0, 12)}
    />
  );
}

export function AllTimeBestsellerSection() {
  const books = [...BOOKS]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(4, 16);
  return (
    <Section
      title="All Time Bestsellers"
      subtitle="Loved by generations of readers"
      books={books}
      bg="bg-accent/20"
    />
  );
}

export function RecentBestsellerSection() {
  const books = [...BOOKS]
    .filter((b) => b.isBestseller)
    .sort((a, b) => b.rating - a.rating)
    .slice(8, 20);
  return <Section title="Recent Bestsellers" subtitle="Trending right now" books={books} />;
}
