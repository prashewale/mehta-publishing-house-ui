import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/mock-data';

export function Testimonials() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">What Readers Say</h2>
          {/* <p className="text-muted-foreground">Join thousands of happy book lovers</p> */}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="p-6 rounded-xl bg-card border shadow-soft space-y-4">
              <Quote className="h-6 w-6 text-primary/30" />
              <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold">{t.name}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current text-amber-glow" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
