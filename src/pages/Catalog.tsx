import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { BOOKS, COLLECTIONS } from "@/lib/mock-data";

export default function Catalog() {
  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-4"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <BookOpen className="h-7 w-7" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold">Catalog</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Browse our full publishing catalog by category — poems, novels, fiction, non-fiction, and more.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
        {COLLECTIONS.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to={`/books?genre=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-5 text-center transition hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="font-serif font-bold">{cat.name}</span>
              <span className="text-xs text-muted-foreground">{cat.count} titles</span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          View all {BOOKS.length}+ books
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
