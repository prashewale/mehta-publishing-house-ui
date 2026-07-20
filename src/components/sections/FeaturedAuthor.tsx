import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, Star } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";

function AuthorEllipse({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative shrink-0">
      {/* Soft glow behind ellipse */}
      <div className="absolute inset-0 scale-110 rounded-[50%] bg-[hsl(var(--sienna))]/25 blur-xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-32 w-24 items-center justify-center rounded-[50%] bg-gradient-to-br from-[hsl(var(--sienna))] via-amber-600 to-amber-800 font-serif text-3xl font-bold text-white shadow-[0_16px_40px_-12px_rgba(120,60,20,0.5)] ring-[5px] ring-white sm:h-40 sm:w-28 md:h-44 md:w-32 md:text-4xl"
        style={{ borderRadius: "50%" }}
      >
        {initials}
        <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-amber-700 shadow-md ring-1 ring-amber-100">
          <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
          Featured
        </div>
      </motion.div>
    </div>
  );
}

export function FeaturedAuthor() {
  const { featuredAuthor, authorBooks, avgRating } = useMemo(() => {
    const counts: Record<string, number> = {};
    BOOKS.forEach((b) => {
      counts[b.author] = (counts[b.author] || 0) + 1;
    });
    const featuredAuthor =
      Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || BOOKS[0].author;
    const authorBooks = BOOKS.filter((b) => b.author === featuredAuthor);
    const avgRating =
      authorBooks.reduce((s, b) => s + b.rating, 0) / Math.max(authorBooks.length, 1);
    return { featuredAuthor, authorBooks, avgRating };
  }, []);

  const displayBooks =
    authorBooks.length >= 4
      ? authorBooks.slice(0, 4)
      : [...authorBooks, ...BOOKS.filter((b) => b.author !== featuredAuthor)].slice(0, 4);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative overflow-hidden rounded-2xl border border-amber-200/60 bg-[#fffaf3] shadow-sm transition-all duration-300 hover:shadow-lg"
        >
          {/* Atmosphere */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/4 h-56 w-56 rounded-full bg-amber-300/25 blur-3xl" />
            <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-[hsl(var(--sienna))]/15 blur-3xl" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(140,80,30,0.08) 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
          </div>

          {/* Slim accent bar */}
          <div className="relative h-1.5 w-full bg-gradient-to-r from-[hsl(var(--sienna))] via-amber-500 to-amber-300" />

          <div className="relative flex flex-col items-center gap-6 p-6 md:p-8 lg:flex-row lg:gap-8 lg:items-center">
            {/* Left — title block */}
            <div className="shrink-0 text-center lg:w-[160px] lg:text-left">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-800">
                <Sparkles className="h-3 w-3" />
                Spotlight
              </div>
              <h2 className="font-serif text-2xl font-bold leading-tight text-[hsl(var(--deep-brown))] md:text-[1.65rem]">
                Author of
                <br className="hidden lg:block" /> the Month
              </h2>
              <div className="mt-3 flex items-center justify-center gap-3 text-xs text-muted-foreground lg:justify-start">
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-[hsl(var(--sienna))]" />
                  {authorBooks.length} books
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {avgRating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Elliptical portrait */}
            <AuthorEllipse name={featuredAuthor} />

            {/* Book covers — slight fan / lift on hover */}
            <div className="grid grid-cols-4 gap-2 min-w-0 flex-1 py-2 sm:gap-3">
              {displayBooks.map((book, i) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                  className="min-w-0"
                >
                  <Link to={`/books/${book.slug}`} className="group/book block">
                    <div className="relative">
                      <div className="absolute -bottom-1 left-1/2 h-2 w-3/4 -translate-x-1/2 rounded-full bg-black/15 blur-sm transition-opacity group-hover/book:opacity-70" />
                      <img
                        src={book.cover}
                        alt={book.title}
                        title={book.title}
                        className="relative w-full aspect-[3/4] rounded-lg object-cover shadow-md ring-1 ring-black/8 transition-all duration-300 group-hover/book:-translate-y-2 group-hover/book:shadow-xl"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right — bio */}
            <div className="w-full shrink-0 space-y-3 text-center lg:w-[500px] xl:w-[540px] lg:text-left">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700/80">
                  This month&apos;s pick
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-[hsl(var(--deep-brown))]">
                  {featuredAuthor}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A compelling voice in contemporary Marathi literature,{" "}
                {featuredAuthor.split(" ")[0]} weaves rich narratives that blend culture, emotion,
                and unforgettable storytelling. With {authorBooks.length} published works, their
                books have touched readers across generations.
              </p>
              <Link
                to={`/books?author=${encodeURIComponent(featuredAuthor)}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--sienna))] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-900/15 transition-all hover:opacity-90 hover:shadow-lg group/cta"
              >
                Explore all books
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
