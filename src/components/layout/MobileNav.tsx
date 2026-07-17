import { Link } from "react-router-dom";
import { X, Globe } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: "BOOKS", to: "/books" },
  { label: "AUTHORS", to: "/authors" },
  { label: "RIGHTS", to: "/rights" },
  { label: "MEMBERSHIP", to: "/membership" },
  { label: "PUBLISH WITH US", to: "/publish" },
  { label: "CATALOG", to: "/catalog" },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
  { code: "hi", label: "हिंदी" },
];

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [language, setLanguage] = useState(LANGUAGES[0]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-background border-r shadow-warm"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-serif text-xl font-bold">Mehta Publishing</span>
              <button onClick={onClose} className="p-2 text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-65px)]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg text-foreground font-semibold tracking-wide text-sm hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t">
                <p className="px-4 mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Globe className="h-3.5 w-3.5" />
                  Change Language
                </p>
                <div className="space-y-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        language.code === lang.code
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
