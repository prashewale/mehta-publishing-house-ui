import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, MapPin, Clock, Phone, Mail, Star, Send } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");

  const editorsPick = [...BOOKS]
    .filter((b) => b.rating >= 4)
    .slice(0, 16);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Thanks for subscribing!", {
        description: "You'll receive our weekly picks soon.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="border-t bg-card overflow-hidden">
      {/* Editor's Pick */}
      <div className="border-b bg-accent/20">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center gap-2 mb-5">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <h3 className="font-serif text-lg font-bold">Editor's Pick</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {editorsPick.map((b) => (
              <Link
                key={b.id}
                to={`/books/${b.slug}`}
                className="group flex gap-3 items-center p-2 rounded-lg hover:bg-background transition-colors"
              >
                <img
                  src={b.cover}
                  alt={b.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold line-clamp-2 group-hover:text-primary">
                    {b.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {b.author}
                  </p>
                  <p className="text-[11px] font-bold text-primary mt-0.5">
                    ₹{(b.discountPrice ?? b.price).toFixed(0)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Col 1: Location */}
          <div className="md:col-span-3 min-w-0 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
              <span className="font-serif text-xl font-bold">
                Mehta Publishing House
              </span>
            </Link>
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                1941, Sadashiv Peth, Madiwale Colony, Opposite Bajirao Road
                Telephone Exchange, Pune - 411030 (Maharashtra), India
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p>020 2447 6924</p>
                <p>020 2447 5462</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p>info@mehtapublishinghouse.com</p>
                <p>sales@mehtapublishinghouse.com</p>
              </div>
            </div>
          </div>

          {/* Col 2: Showroom Timings + Website Queries */}
          <div className="md:col-span-3 min-w-0 space-y-5">
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Showroom Timing
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span className="font-medium text-foreground">9:30 AM – 8:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-foreground">10:00 AM – 8:30 PM</span>
                </div>
              </div>
            </div>
            <div className="border-t pt-4 space-y-2">
              <h5 className="font-serif text-sm font-semibold">Website Queries</h5>
              <p className="text-sm text-muted-foreground">
                webadmin@mehtapublishinghouse.com
              </p>
              <p className="text-sm text-muted-foreground">
                or chat on <span className="font-medium text-foreground">9420594665</span>
              </p>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="md:col-span-2 min-w-0">
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              {[
                { label: "All Books", to: "/books" },
                { label: "Combo Sets", to: "/combo-sets" },
                { label: "Authors", to: "/authors" },
                { label: "Membership", to: "/membership" },
                { label: "Discounts", to: "/discounts" },
                { label: "Gift Coupons", to: "/gift-coupons" },
                { label: "Events", to: "/events" },
                { label: "Publish with Us", to: "/publish" },
                { label: "Distributors", to: "/distributors" },
                { label: "Rights", to: "/rights" },
                { label: "Catalog", to: "/catalog" },
                { label: "Careers", to: "/careers" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="md:col-span-4 min-w-0 space-y-4">
            <h4 className="font-serif text-lg font-semibold">Stay in the Loop</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get weekly reading recommendations, exclusive deals, and early access to new arrivals.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="h-10 rounded-full border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 w-full"
              />
              <Button type="submit" size="sm" className="h-9 rounded-full px-6 text-xs shrink-0 w-auto mx-auto">
                <Send className="h-3 w-3 mr-1.5" /> Subscribe
              </Button>
            </form>
            <p className="text-[11px] text-muted-foreground">No spam, unsubscribe anytime.</p>
          </div>
        </div>


        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Mehta Publishing House Pvt. Ltd. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
