import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";

// Build a deduplicated author list with book counts
function getAuthors() {
  const map: Record<string, { count: number; cover: string }> = {};
  BOOKS.forEach(b => {
    if (!map[b.author]) map[b.author] = { count: 0, cover: b.cover };
    map[b.author].count++;
  });
  return Object.entries(map)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8)
    .map(([name, info]) => ({ name, ...info }));
}

const GRADIENT_COLORS = [
  "from-amber-500 to-orange-600",
  "from-indigo-500 to-purple-600",
  "from-teal-500 to-cyan-600",
  "from-rose-500 to-pink-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-green-600",
  "from-violet-500 to-purple-600",
  "from-orange-500 to-red-600",
];

export function AuthorGallery() {
  const authors = getAuthors();

  return (
    <section className="py-10 bg-card/40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6"
        >
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Mehta Publishing House Family</h2>
            <p className="mt-1 text-muted-foreground text-sm">The brilliant minds behind our beloved books</p>
          </div>
          <Link
            to="/authors"
            className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-5 py-3 text-sm font-semibold shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group"
          >
            All Authors
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {authors.map((author, i) => {
            const initials = author.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
            const gradient = GRADIENT_COLORS[i % GRADIENT_COLORS.length];
            return (
              <motion.div
                key={author.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <Link to={`/books?author=${encodeURIComponent(author.name)}`} className="block">
                  <div className="relative">
                    <div
                      className={`h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center font-serif text-2xl sm:text-3xl font-bold text-white shadow-lg group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 ring-4 ring-white/50`}
                    >
                      {initials}
                    </div>
                    <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-background shadow-md">
                      <BookOpen className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {author.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{author.count} book{author.count !== 1 ? "s" : ""}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
