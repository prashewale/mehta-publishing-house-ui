import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Crown } from "lucide-react";
import type { Book } from "@/lib/types";
import { useCart } from "@/lib/store";
import { useMembership, getMembershipPrice } from "@/lib/membership-store";
import { Button } from "@/components/ui/button";

export function BookCard({ book, compact = false }: { book: Book; compact?: boolean }) {
  const addItem = useCart((s) => s.addItem);
  const discountPercent = useMembership((s) => s.getDiscountPercent());
  const basePrice = book.discountPrice || book.price;
  const hasMembership = discountPercent > 0;
  const memberPrice = hasMembership ? getMembershipPrice(basePrice, discountPercent) : basePrice;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative flex flex-col rounded-xl border-2 border-[hsl(var(--sienna))]/20 p-1.5 ${compact ? "space-y-1.5" : "space-y-3"}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted shadow-soft">
        <Link to={`/books/${book.slug}`}>
          <img
            src={book.cover}
            alt={book.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {book.onSale && (
          <div className="absolute top-3 left-3 bg-primary px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-primary-foreground rounded-sm">
            Sale
          </div>
        )}
        {book.isBestseller && !book.onSale && (
          <div className="absolute top-3 left-3 bg-foreground px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-background rounded-sm">
            Bestseller
          </div>
        )}
        <Button
          onClick={() => addItem(book, book.formats[0])}
          size="icon"
          variant="secondary"
          className="absolute bottom-3 right-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 bg-background text-foreground hover:bg-primary hover:text-primary-foreground shadow-soft"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>

      <div className={compact ? "space-y-0.5" : "space-y-1"}>
        <Link to={`/books/${book.slug}`} className="block">
          <h3 className={`font-serif font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2 ${compact ? "text-xs" : "text-base"}`}>
            {book.title}
          </h3>
        </Link>
        <p className={compact ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>{book.author}</p>
        <div className={`flex items-center justify-between ${compact ? "pt-0" : "pt-1"}`}>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-primary ${compact ? "text-xs" : ""}`}>
                ₹{memberPrice.toFixed(2)}
              </span>
              {book.discountPrice && (
                <span className={`${compact ? "text-[10px]" : "text-sm"} text-muted-foreground line-through`}>
                  ₹{book.price.toFixed(2)}
                </span>
              )}
            </div>
            {hasMembership && !compact && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary">
                <Crown className="h-3 w-3" /> Member saves ₹{(basePrice - memberPrice).toFixed(0)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-amber-glow">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs font-medium text-foreground">
              {book.rating}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
