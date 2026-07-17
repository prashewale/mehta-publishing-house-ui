import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Menu, User, Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/lib/store";
import { MiniCart } from "@/components/cart/MiniCart";
import { MobileNav } from "./MobileNav";

const NAV_ITEMS = [
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

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const langRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const totalItems = useCart((s) => s.totalItems());
  const setCartOpen = useCart((s) => s.setCartOpen);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="lg:hidden p-2 -ml-2 text-foreground"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="flex gap-2 justify-between items-center font-serif text-lg xl:text-2xl font-bold tracking-tight text-foreground">
              <img src="/images/logo.png" alt="" className="h-8 w-8" />
              <span className="hidden sm:inline">Mehta Publishing House</span>
              <span className="sm:hidden">MPH</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-2.5 xl:px-3 py-2 text-[11px] xl:text-xs font-semibold tracking-wide text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}

            {/* Change Language */}
            <div className="relative ml-1" ref={langRef}>
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-2 text-[11px] xl:text-xs font-semibold tracking-wide text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
              >
                <Globe className="h-3.5 w-3.5" />
                {language.label}
                <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 top-full mt-1 min-w-[140px] rounded-xl border bg-background py-1.5 shadow-lg z-50"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      role="option"
                      aria-selected={language.code === lang.code}
                      onClick={() => {
                        setLanguage(lang);
                        setLangOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-muted ${
                        language.code === lang.code
                          ? "font-semibold text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books..."
                  className="h-9 w-36 xl:w-48 rounded-full border bg-muted/50 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
                />
              </div>
            </form>

            <Link
              to="/profile"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden md:flex"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MiniCart />
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
