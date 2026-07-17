import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cake, PartyPopper, Package2, ArrowRight, Calendar } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";

const FESTIVALS = [
  { month: 0, name: "New Year", icon: "🎊", accent: "#2563eb", soft: "#eff6ff", genres: ["Self-Help", "Philosophy"] },
  { month: 1, name: "Valentine's Day", icon: "💝", accent: "#e11d48", soft: "#fff1f2", genres: ["Romance", "Fiction"] },
  { month: 2, name: "Holi", icon: "🎨", accent: "#ea580c", soft: "#fff7ed", genres: ["Fiction", "Literary"] },
  { month: 3, name: "Easter", icon: "🐣", accent: "#16a34a", soft: "#f0fdf4", genres: ["Spiritual", "Philosophy"] },
  { month: 4, name: "Mother's Day", icon: "🌸", accent: "#db2777", soft: "#fdf2f8", genres: ["Fiction", "Memoir"] },
  { month: 5, name: "Father's Day", icon: "👔", accent: "#1d4ed8", soft: "#eff6ff", genres: ["Biography", "Historical"] },
  { month: 6, name: "Independence Day", icon: "🇮🇳", accent: "#ea580c", soft: "#fff7ed", genres: ["Historical", "Biography"] },
  { month: 7, name: "Raksha Bandhan", icon: "🧿", accent: "#ca8a04", soft: "#fefce8", genres: ["Fiction", "Literary"] },
  { month: 8, name: "Ganesh Chaturthi", icon: "🐘", accent: "#c2410c", soft: "#fff7ed", genres: ["Spiritual", "Philosophy"] },
  { month: 9, name: "Diwali", icon: "🪔", accent: "#d97706", soft: "#fffbeb", genres: ["Spiritual", "Fantasy"] },
  { month: 10, name: "Christmas", icon: "🎄", accent: "#dc2626", soft: "#fef2f2", genres: ["Fiction", "Classic"] },
  { month: 11, name: "New Year Eve", icon: "🎆", accent: "#7c3aed", soft: "#f5f3ff", genres: ["Self-Help", "Memoir"] },
];

const COMBO_PREVIEW = [
  { id: "c1", name: "Fiction Starter Pack", bookIds: ["1", "2", "8"], discount: 20, desc: "3 acclaimed novels to kickstart your reading" },
];

export function PromoTripleBox() {
  const currentFestival = FESTIVALS[new Date().getMonth()];
  const monthName = new Date().toLocaleString("en", { month: "long" });

  const birthdayAuthors = useMemo(() => {
    const authors = [...new Set(BOOKS.map((b) => b.author))].slice(0, 3);
    return authors.map((author, idx) => {
      const books = BOOKS.filter((b) => b.author === author);
      const day = 8 + idx * 7;
      return { author, books, cover: books[0]?.cover || BOOKS[0].cover, date: `${day} ${monthName}` };
    });
  }, [monthName]);

  const festivalBooks = useMemo(() => {
    const matched = BOOKS.filter((b) =>
      b.genres.some((g) => currentFestival.genres.includes(g))
    ).slice(0, 3);
    while (matched.length < 3) {
      const extra = BOOKS.find((b) => !matched.includes(b));
      if (extra) matched.push(extra);
      else break;
    }
    return matched;
  }, [currentFestival.genres]);

  const combo = COMBO_PREVIEW[0];
  const comboBooks = combo.bookIds
    .map((id) => BOOKS.find((b) => b.id === id)!)
    .filter(Boolean);
  const comboOriginal = comboBooks.reduce((s, b) => s + b.price, 0);
  const comboPrice = Math.round(comboOriginal * (1 - combo.discount / 100));

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* ── Birthday ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-pink-200/70 bg-[#fff7f9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="pointer-events-none absolute -top-12 -right-10 h-36 w-36 rounded-full bg-pink-300/30 blur-3xl" />
            <div className="relative border-b border-pink-100/80 px-5 pt-5 pb-4">
              <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-400 text-white shadow-md shadow-pink-500/25">
                <Cake className="h-4 w-4" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[hsl(var(--deep-brown))]">
                Author Birthday Special
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 text-pink-500" />
                Born in <span className="font-semibold text-pink-600">{monthName}</span>
              </p>
            </div>

            <div className="relative flex flex-1 flex-col gap-2.5 p-4">
              {birthdayAuthors.map((a, i) => (
                <motion.div
                  key={a.author}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex items-center gap-3 rounded-xl bg-white/70 p-2 ring-1 ring-pink-100/80 transition hover:bg-white hover:shadow-sm"
                >
                  <img
                    src={a.cover}
                    alt=""
                    className="h-14 w-10 shrink-0 rounded-md object-cover shadow-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[hsl(var(--deep-brown))]">
                      {a.author}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {a.date} · {a.books.length} book{a.books.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative px-4 pb-4 pt-1">
              <Link
                to="/books?promo=author-birthday"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-pink-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-pink-600"
              >
                Explore birthday offers
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* ── Festival ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              backgroundColor: currentFestival.soft,
              borderColor: `${currentFestival.accent}33`,
            }}
          >
            <div
              className="pointer-events-none absolute -top-12 -right-10 h-36 w-36 rounded-full blur-3xl opacity-40"
              style={{ backgroundColor: currentFestival.accent }}
            />
            <div
              className="relative border-b px-5 pt-5 pb-4"
              style={{ borderColor: `${currentFestival.accent}22` }}
            >
              <div className="mb-2.5 flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${currentFestival.accent}, ${currentFestival.accent}cc)`,
                    boxShadow: `0 8px 16px -6px ${currentFestival.accent}66`,
                  }}
                >
                  <PartyPopper className="h-4 w-4" />
                </div>
                <span className="text-2xl">{currentFestival.icon}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[hsl(var(--deep-brown))]">
                Festival of the Month
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Handpicked for{" "}
                <span className="font-semibold" style={{ color: currentFestival.accent }}>
                  {currentFestival.name}
                </span>
              </p>
            </div>

            <div className="relative flex flex-1 flex-col gap-2.5 p-4">
              {festivalBooks.map((book, i) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + i * 0.06 }}
                >
                  <Link
                    to={`/books/${book.slug}`}
                    className="flex items-center gap-3 rounded-xl bg-white/70 p-2 ring-1 transition hover:bg-white hover:shadow-sm"
                    style={{ borderColor: `${currentFestival.accent}18` }}
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="h-14 w-10 shrink-0 rounded-md object-cover shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[hsl(var(--deep-brown))]">
                        {book.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        <span className="font-semibold" style={{ color: currentFestival.accent }}>
                          ₹{(book.discountPrice || book.price).toFixed(0)}
                        </span>
                        {book.discountPrice && (
                          <span className="ml-1.5 line-through opacity-50">₹{book.price.toFixed(0)}</span>
                        )}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="relative px-4 pb-4 pt-1">
              <Link
                to={`/books?festival=${encodeURIComponent(currentFestival.name.toLowerCase().replace(/\s+/g, "-"))}`}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
                style={{ backgroundColor: currentFestival.accent }}
              >
                Shop {currentFestival.name} collection
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* ── Combo Sets ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-amber-200/70 bg-[#fffbf5] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="pointer-events-none absolute -top-12 -right-10 h-36 w-36 rounded-full bg-amber-300/35 blur-3xl" />
            <div className="relative border-b border-amber-100/80 px-5 pt-5 pb-4">
              <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--sienna))] to-amber-600 text-white shadow-md shadow-amber-700/25">
                <Package2 className="h-4 w-4" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[hsl(var(--deep-brown))]">
                Combo Sets
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">Save more when you buy together</p>
            </div>

            <div className="relative flex flex-1 flex-col p-4">
              <p className="text-sm font-bold text-[hsl(var(--deep-brown))]">{combo.name}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{combo.desc}</p>

              {/* Fanned book covers */}
              <div className="relative mx-auto my-5 flex h-[100px] w-full max-w-[200px] items-end justify-center">
                {comboBooks.map((b, i) => {
                  const rotates = [-14, 0, 14];
                  const offsets = [-28, 0, 28];
                  return (
                    <motion.img
                      key={b.id}
                      src={b.cover}
                      alt={b.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="absolute bottom-0 h-[92px] w-[64px] rounded-md object-cover shadow-lg ring-2 ring-white"
                      style={{
                        transform: `translateX(${offsets[i]}px) rotate(${rotates[i]}deg)`,
                        zIndex: i === 1 ? 3 : 1,
                      }}
                    />
                  );
                })}
              </div>

              <div className="mt-auto flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[hsl(var(--sienna))]">₹{comboPrice}</span>
                <span className="text-xs text-muted-foreground line-through">
                  ₹{comboOriginal.toFixed(0)}
                </span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                  {combo.discount}% OFF
                </span>
              </div>
            </div>

            <div className="relative px-4 pb-4 pt-1">
              <Link
                to="/combo-sets"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[hsl(var(--sienna))] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                View all combo sets
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
