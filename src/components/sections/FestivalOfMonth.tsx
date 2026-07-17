import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PartyPopper, Star, ShoppingCart, ArrowRight, Gift } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";
import { useCart } from "@/lib/store";

const FESTIVALS = [
  { month: 0, name: "New Year", icon: "🎊", color: "from-blue-500 to-cyan-400", textColor: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200", genres: ["Self-Help", "Motivational", "Philosophy"] },
  { month: 1, name: "Valentine's Day", icon: "💝", color: "from-pink-500 to-rose-400", textColor: "text-pink-600", bgColor: "bg-pink-50", borderColor: "border-pink-200", genres: ["Romance", "Literary", "Fiction"] },
  { month: 2, name: "Holi", icon: "🎨", color: "from-orange-500 to-pink-400", textColor: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200", genres: ["Fiction", "Comedy", "Literary"] },
  { month: 3, name: "Easter", icon: "🐣", color: "from-green-500 to-emerald-400", textColor: "text-green-700", bgColor: "bg-green-50", borderColor: "border-green-200", genres: ["Spiritual", "Philosophy", "Self-Help"] },
  { month: 4, name: "Mother's Day", icon: "🌸", color: "from-pink-400 to-rose-300", textColor: "text-pink-600", bgColor: "bg-pink-50", borderColor: "border-pink-200", genres: ["Fiction", "Memoir", "Biography"] },
  { month: 5, name: "Father's Day", icon: "👔", color: "from-blue-600 to-indigo-400", textColor: "text-blue-700", bgColor: "bg-blue-50", borderColor: "border-blue-200", genres: ["Biography", "Historical", "Non-Fiction"] },
  { month: 6, name: "Independence Day", icon: "🇮🇳", color: "from-orange-500 to-green-500", textColor: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200", genres: ["Historical", "Biography", "Non-Fiction"] },
  { month: 7, name: "Raksha Bandhan", icon: "🧿", color: "from-yellow-500 to-orange-400", textColor: "text-yellow-700", bgColor: "bg-yellow-50", borderColor: "border-yellow-200", genres: ["Fiction", "Literary", "Drama"] },
  { month: 8, name: "Ganesh Chaturthi", icon: "🐘", color: "from-orange-500 to-red-400", textColor: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200", genres: ["Spiritual", "Philosophy", "Self-Help"] },
  { month: 9, name: "Diwali", icon: "🪔", color: "from-amber-500 to-orange-400", textColor: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-200", genres: ["Spiritual", "Fantasy", "Fiction"] },
  { month: 10, name: "Christmas", icon: "🎄", color: "from-red-500 to-green-400", textColor: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200", genres: ["Fiction", "Classic", "Literary"] },
  { month: 11, name: "New Year Eve", icon: "🎆", color: "from-purple-500 to-pink-400", textColor: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200", genres: ["Self-Help", "Memoir", "Philosophy"] },
];

export function FestivalOfMonth() {
  const addItem = useCart((s) => s.addItem);
  const currentFestival = FESTIVALS[new Date().getMonth()];

  const festivalBooks = BOOKS.filter((book) =>
    book.genres.some((g) => currentFestival.genres.includes(g))
  ).slice(0, 3);

  // Fill to 3 if not enough
  while (festivalBooks.length < 3) {
    const extra = BOOKS.find(b => !festivalBooks.includes(b));
    if (extra) festivalBooks.push(extra);
    else break;
  }

  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.05] via-background to-orange-400/[0.03]" />
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-300 blur-3xl" />
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
          <div className={`mb-3 inline-flex items-center gap-2 rounded-full border ${currentFestival.borderColor} ${currentFestival.bgColor} px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${currentFestival.textColor} backdrop-blur`}>
            <PartyPopper className="h-4 w-4" />
            Festival of the Month
          </div>
          <div className="mb-2 text-4xl">{currentFestival.icon}</div>
          <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {currentFestival.name} Special
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Handpicked reads to celebrate the spirit of{" "}
            <span className={`font-semibold ${currentFestival.textColor}`}>{currentFestival.name}</span>.
          </p>
        </motion.div>

        {/* 3-column book cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festivalBooks.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Book cover */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* Festival badge */}
                <div className={`absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${currentFestival.color} px-2.5 py-1 text-[10px] font-bold uppercase text-white shadow-lg`}>
                  {currentFestival.icon} {currentFestival.name}
                </div>
                {book.onSale && (
                  <div className="absolute top-3 right-3 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">Sale</div>
                )}
                {/* Quick add */}
                <button
                  onClick={() => addItem(book, book.formats[0])}
                  className={`absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r ${currentFestival.color} text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg`}
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                </button>
                {/* Title overlay */}
                <div className="absolute bottom-3 left-3 right-12">
                  <h4 className="line-clamp-1 text-sm font-bold text-white">{book.title}</h4>
                  <p className="text-xs text-white/70">by {book.author}</p>
                </div>
              </div>

              {/* Price + rating */}
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-base font-bold ${currentFestival.textColor}`}>
                    ₹{(book.discountPrice || book.price).toFixed(0)}
                  </span>
                  {book.discountPrice && (
                    <span className="text-xs text-muted-foreground line-through">₹{book.price.toFixed(0)}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium">{book.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            to={`/books?festival=${encodeURIComponent(currentFestival.name.toLowerCase().replace(/\s+/g, "-"))}`}
            className={`group inline-flex items-center gap-2 rounded-full border ${currentFestival.borderColor} ${currentFestival.bgColor} px-6 py-3 text-sm font-semibold ${currentFestival.textColor} shadow-sm backdrop-blur transition-all hover:shadow-lg`}
          >
            <Gift className="h-4 w-4" />
            Shop Full {currentFestival.name} Collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
