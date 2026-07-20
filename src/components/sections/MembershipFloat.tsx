import { motion, AnimatePresence } from "framer-motion";
import { Crown, ArrowRight, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function MembershipFloat() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-8 right-6 z-40 hidden lg:block">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          /* ── Full Expanded Banner ── */
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="relative w-80 bg-white rounded-3xl shadow-2xl border border-[hsl(var(--sienna))]/20 overflow-hidden"
          >
            {/* Gold Accent Bar */}
            <div className="h-1.5 bg-gradient-to-r from-amber-400 via-[hsl(var(--sienna))] to-amber-600" />

            <div className="p-6">
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-[hsl(var(--sienna))] flex items-center justify-center shadow-inner">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-3 pr-8">
                  <h3 className="font-serif text-xl font-bold leading-tight text-[hsl(var(--deep-brown))]">
                    Join MPH Membership
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Get up to{" "}
                    <span className="font-semibold text-[hsl(var(--sienna))]">
                      40% off
                    </span>{" "}
                    on every book, free shipping, early access &amp; exclusive
                    events.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                      25%+ Discount
                    </span>
                    <span className="text-[10px] px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                      Free Shipping
                    </span>
                  </div>
                </div>
              </div>

              <Link to="/membership" className="block mt-6">
                <Button
                  size="lg"
                  className="w-full rounded-2xl bg-[hsl(var(--sienna))] hover:bg-[hsl(var(--deep-brown))] text-white shadow-warm font-medium flex items-center justify-center gap-2 group"
                >
                  Become a Member Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <p className="text-center text-[10px] text-muted-foreground mt-4">
                Starting at ₹450 • Cancel anytime
              </p>
            </div>
          </motion.div>
        ) : (
          /* ── Compressed Floating Pill ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-3 bg-white rounded-full shadow-xl border border-[hsl(var(--sienna))]/30 px-5 py-3.5 cursor-pointer hover:border-[hsl(var(--sienna))] transition-all"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[hsl(var(--sienna))]" />
              <Crown className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[hsl(var(--deep-brown))]">
                MPH Membership
              </p>
              <p className="text-[10px] text-muted-foreground -mt-0.5">
                Up to 40% off • Join now
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-[hsl(var(--sienna))]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
