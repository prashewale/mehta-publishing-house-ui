import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cake, Star, ShoppingCart, ArrowRight, Gift, Calendar } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";
import { useCart } from "@/lib/store";

const AUTHOR_BIRTHDAYS: Record<string, string> = {
  "AUTHOR 1": "05-15",
  "AUTHOR 3": "05-22",
  "AUTHOR 7": "05-08",
  "AUTHOR 12": "05-28",
  "AUTHOR 5": "06-10",
  "AUTHOR 9": "06-15",
  "AUTHOR 15": "06-20",
  "AUTHOR 2": "07-05",
  "AUTHOR 8": "07-12",
  "AUTHOR 14": "07-25",
};

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export function AuthorBirthdaySpecial() {
  const addItem = useCart((s) => s.addItem);

  const { birthdayAuthors, currentMonth } = useMemo(() => {
    const now = new Date();
    const currentMonthNum = now.getMonth();
    const monthName = MONTH_NAMES[currentMonthNum];
    const birthdayMonth = (currentMonthNum + 1).toString().padStart(2, "0");

    const birthdayAuthorsList = Object.entries(AUTHOR_BIRTHDAYS)
      .filter(([_, date]) => date.startsWith(birthdayMonth))
      .map(([author, date]) => {
        const day = parseInt(date.split("-")[1]);
        const books = BOOKS.filter((b) => b.author === author);
        return { author, date: `${day} ${monthName}`, books };
      })
      .sort((a, b) => parseInt(a.date) - parseInt(b.date));

    const authorsToShow =
      birthdayAuthorsList.length > 0
        ? birthdayAuthorsList.slice(0, 3)
        : [
            { author: BOOKS[0].author, date: `15 ${monthName}`, books: BOOKS.filter((b) => b.author === BOOKS[0].author) },
            { author: BOOKS[4]?.author || BOOKS[1].author, date: `22 ${monthName}`, books: BOOKS.filter((b) => b.author === (BOOKS[4]?.author || BOOKS[1].author)) },
            { author: BOOKS[8]?.author || BOOKS[2].author, date: `28 ${monthName}`, books: BOOKS.filter((b) => b.author === (BOOKS[8]?.author || BOOKS[2].author)) },
          ];

    return { birthdayAuthors: authorsToShow, currentMonth: monthName };
  }, []);

  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/[0.06] via-background to-amber-400/[0.04]" />
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-pink-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-300 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-10 flex flex-col items-center justify-center text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500 backdrop-blur">
            <Cake className="h-4 w-4" />
            Birthday Celebrations — {currentMonth}
          </div>
          <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Author Birthday Special
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Celebrating our beloved authors born in{" "}
            <span className="font-semibold text-pink-500">{currentMonth}</span>. Explore their remarkable works with exclusive birthday offers!
          </p>
        </motion.div>

        {/* 3-column card layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {birthdayAuthors.map((authorData, index) => {
            const featuredBook = authorData.books[0] || BOOKS[index];
            return (
              <motion.div
                key={authorData.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top banner */}
                <div className="bg-gradient-to-r from-pink-500 to-amber-400 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 font-serif text-base font-bold text-white">
                      {authorData.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">{authorData.author}</p>
                      <div className="flex items-center gap-1 text-white/80 text-[10px]">
                        <Calendar className="h-3 w-3" />
                        {authorData.date}
                      </div>
                    </div>
                  </div>
                  <Gift className="h-5 w-5 text-white/80" />
                </div>

                {/* Book preview */}
                <div className="p-4 flex gap-3">
                  <div className="relative w-20 h-28 shrink-0 overflow-hidden rounded-lg shadow-md">
                    <img
                      src={featuredBook.cover}
                      alt={featuredBook.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1 rounded-full bg-pink-500 px-2 py-0.5 text-[9px] font-bold uppercase text-white mb-1.5">
                        <Cake className="h-2.5 w-2.5" />
                        Birthday Pick
                      </div>
                      <h4 className="text-sm font-semibold leading-tight line-clamp-2 text-foreground">
                        {featuredBook.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-muted-foreground">{featuredBook.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <span className="text-base font-bold text-pink-500">
                          ₹{(featuredBook.discountPrice || featuredBook.price).toFixed(0)}
                        </span>
                        {featuredBook.discountPrice && (
                          <span className="ml-1 text-[11px] text-muted-foreground line-through">
                            ₹{featuredBook.price.toFixed(0)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => addItem(featuredBook, featuredBook.formats[0])}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow-sm"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t px-4 py-2.5">
                  <Link
                    to={`/books?author=${encodeURIComponent(authorData.author)}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-pink-500 hover:text-pink-600 transition-colors"
                  >
                    {authorData.books.length} book{authorData.books.length !== 1 ? "s" : ""} available
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
