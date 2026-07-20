import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package2, Tag, Star, Plus, X, ShoppingCart, ArrowRight, CheckCircle2, Quote,
} from "lucide-react";
import { BOOKS } from "@/lib/mock-data";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";

// ── Tab types ──
type Tab = "combo" | "sale" | "reviews";

// ── 50% Off books ──
const HALF_OFF_BOOKS = BOOKS.filter(b => b.onSale || b.discountPrice).slice(0, 6);

// ── Book reviews (mock) ──
const BOOK_REVIEWS = [
  { id: 1, name: "Sunita Joshi", rating: 5, text: "Absolutely loved this book! The storytelling is vivid and the characters feel so real. Mehta Publishing always delivers quality.", book: BOOKS[0]?.title || "Featured Book", avatar: "SJ" },
  { id: 2, name: "Rajesh Kulkarni", rating: 5, text: "A masterpiece of Marathi literature. I couldn't put it down. Highly recommended for anyone who loves meaningful stories.", book: BOOKS[1]?.title || "Classic Novel", avatar: "RK" },
  { id: 3, name: "Priya Deshpande", rating: 4, text: "Beautiful prose and an engaging plot. The author's attention to detail is remarkable. Will definitely read more from MPH.", book: BOOKS[2]?.title || "Poetry Collection", avatar: "PD" },
  { id: 4, name: "Amit Shinde", rating: 5, text: "One of the best books I've read this year. The themes are timeless and the writing is impeccable. 5 stars!", book: BOOKS[3]?.title || "Award Winner", avatar: "AS" },
  { id: 5, name: "Meena Patil", rating: 4, text: "A wonderful read. The narrative flows beautifully and the cultural richness is well captured throughout the story.", book: BOOKS[4]?.title || "Cultural Fiction", avatar: "MP" },
  { id: 6, name: "Vikram Naik", rating: 5, text: "Exceptional book from start to finish. This is why Mehta Publishing is the gold standard for Marathi literature.", book: BOOKS[5]?.title || "Bestseller", avatar: "VN" },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`h-3.5 w-3.5 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
      ))}
    </div>
  );
}

// ── Make Your Own Combo ──
function MakeComboTab() {
  const addItem = useCart(s => s.addItem);
  const [selected, setSelected] = useState<typeof BOOKS>([]);
  const COMBO_BOOKS = BOOKS.slice(0, 6);
  const DISCOUNT = selected.length >= 3 ? 0.35 : selected.length === 2 ? 0.20 : 0;
  const subtotal = selected.reduce((sum, b) => sum + (b.discountPrice || b.price), 0);
  const savings = subtotal * DISCOUNT;
  const total = subtotal - savings;

  const toggle = (book: typeof BOOKS[0]) => {
    setSelected(prev =>
      prev.find(b => b.id === book.id)
        ? prev.filter(b => b.id !== book.id)
        : prev.length < 6 ? [...prev, book] : prev
    );
  };

  const handleAddAll = () => {
    selected.forEach(b => addItem(b, b.formats[0]));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      {/* Book picker */}
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          Select <span className="font-semibold text-foreground">2–6 books</span> to build your combo and save up to <span className="font-semibold text-green-600">35%</span>! Buy 100+ quantity to unlock bulk pricing.
        </p>
        <div className="grid grid-cols-6 gap-2">
          {COMBO_BOOKS.map(book => {
            const isSelected = !!selected.find(b => b.id === book.id);
            return (
              <motion.button
                key={book.id}
                onClick={() => toggle(book)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`relative group text-left overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-muted bg-card hover:border-primary/30"
                }`}
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {isSelected && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-primary drop-shadow-lg" />
                    </div>
                  )}
                </div>
                <div className="p-1.5">
                  <p className="text-[10px] font-semibold line-clamp-1">{book.title}</p>
                  <p className="text-[8px] text-muted-foreground line-clamp-1">{book.author}</p>
                  <p className="text-[10px] font-bold text-primary mt-0.5">₹{(book.discountPrice || book.price).toFixed(0)}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Summary panel */}
      <div className="sticky top-20">
        <div className="rounded-2xl border bg-card p-5 shadow-lg">
          <h4 className="font-serif text-lg font-bold mb-1">Your Combo</h4>
          <p className="text-xs text-muted-foreground mb-4">
            {selected.length === 0
              ? "Select books to build your combo"
              : `${selected.length} book${selected.length !== 1 ? "s" : ""} selected`}
          </p>

          {/* Discount tiers */}
          <div className="space-y-1.5 mb-4">
            {[
              { label: "Buy any 2", discount: "20% off", active: selected.length >= 2 },
              { label: "Buy any 3+", discount: "35% off", active: selected.length >= 3 },
              { label: "Buy 100+ qty", discount: "Special bulk rate", active: false },
            ].map(tier => (
              <div key={tier.label} className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-xs ${tier.active ? "bg-green-50 border border-green-200 text-green-700" : "bg-muted/40 text-muted-foreground"}`}>
                <span className="font-medium">{tier.label}</span>
                <span className="font-bold">{tier.discount}</span>
              </div>
            ))}
          </div>

          {/* Selected books mini list */}
          {selected.length > 0 && (
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {selected.map(book => (
                <div key={book.id} className="flex items-center gap-2 rounded-lg bg-muted/40 p-1.5 pr-2">
                  <img src={book.cover} alt={book.title} className="w-8 h-10 rounded object-cover shrink-0" />
                  <p className="flex-1 text-xs font-medium line-clamp-1">{book.title}</p>
                  <button onClick={() => toggle(book)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Price breakdown */}
          {selected.length > 0 && (
            <div className="border-t pt-3 mb-4 space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              {DISCOUNT > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Combo Discount ({Math.round(DISCOUNT * 100)}%)</span>
                  <span>-₹{savings.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base border-t pt-1 mt-1">
                <span>Total</span>
                <span className="text-primary">₹{total.toFixed(0)}</span>
              </div>
            </div>
          )}

          <Button
            className="w-full rounded-xl"
            disabled={selected.length < 2}
            onClick={handleAddAll}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add Combo to Cart
          </Button>
          {selected.length < 2 && (
            <p className="text-center text-[11px] text-muted-foreground mt-2">Select at least 2 books to activate combo</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── 50% Off Books ──
function SaleBooksTab() {
  const addItem = useCart(s => s.addItem);
  return (
    <div>
      <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-red-50 border border-red-200">
        <Tag className="h-5 w-5 text-red-500 shrink-0" />
        <p className="text-sm text-red-700">
          <span className="font-bold">Limited time offer:</span> These books are available at up to 50% off. Grab them before the sale ends!
        </p>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {HALF_OFF_BOOKS.map((book, i) => {
          const discount = book.discountPrice
            ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
            : 0;
          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <img src={book.cover} alt={book.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {discount > 0 && (
                  <div className="absolute top-1.5 left-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[8px] font-bold text-white shadow">
                    {discount}% OFF
                  </div>
                )}
                <button
                  onClick={() => addItem(book, book.formats[0])}
                  className="absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-500 hover:text-white"
                >
                  <ShoppingCart className="h-3 w-3" />
                </button>
                <div className="absolute bottom-1.5 left-1.5 right-8">
                  <p className="text-[9px] font-bold text-white line-clamp-1">{book.title}</p>
                </div>
              </div>
              <div className="p-1.5">
                <p className="text-[8px] text-muted-foreground line-clamp-1 mb-0.5">{book.author}</p>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-red-500">₹{(book.discountPrice || book.price).toFixed(0)}</span>
                  {book.discountPrice && (
                    <span className="text-[8px] text-muted-foreground line-through">₹{book.price.toFixed(0)}</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-6 text-center">
        <Link to="/discounts" className="inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 text-sm font-bold text-white hover:bg-red-600 transition-colors shadow-lg group">
          View All Discounted Books
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

// ── Book Reviews ──
function ReviewsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => <Star key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
          </div>
          <span className="text-xl font-bold">4.8</span>
          <span className="text-muted-foreground text-sm">based on 2,400+ reviews</span>
        </div>
        <Link to="/books" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          Write a Review <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {BOOK_REVIEWS.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all"
          >
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-amber-400 flex items-center justify-center font-bold text-white text-sm shrink-0">
                {review.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm">{review.name}</p>
                <StarRow rating={review.rating} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{review.text}</p>
            <p className="mt-3 text-[11px] font-medium text-primary border-t pt-2">📖 {review.book}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Main Export ──
export function SpecialOffers() {
  const [activeTab, setActiveTab] = useState<Tab>("combo");

  const TABS = [
    { id: "combo" as Tab, label: "Make Your Own Combo", icon: Package2, color: "text-primary" },
    { id: "sale" as Tab, label: "50% Off Books", icon: Tag, color: "text-red-500" },
    { id: "reviews" as Tab, label: "Book Reviews", icon: Star, color: "text-amber-500" },
  ];

  return (
    <section className="py-16 bg-accent/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Special Offers & More</h2>
          <p className="mt-2 text-muted-foreground text-base">Deals, discounts, and what readers are saying</p>
        </motion.div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-foreground text-background border-foreground shadow-lg"
                    : "bg-background border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-background" : tab.color}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "combo" && <MakeComboTab />}
            {activeTab === "sale" && <SaleBooksTab />}
            {activeTab === "reviews" && <ReviewsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
