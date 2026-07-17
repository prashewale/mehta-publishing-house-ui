import { HeroWithOffer } from "@/components/sections/HeroWithOffer";
import { SaleOfferWithFeaturedVideo } from "@/components/sections/SaleOfferWithFeaturedVideo";
import {
  NewArrivalsSection,
  FeaturedSection,
  AllTimeBestsellerSection,
  RecentBestsellerSection,
} from "@/components/sections/HomeBookSections";
import { VerticalCategories } from "@/components/sections/VerticalCategories";
import { PromoTripleBox } from "@/components/sections/PromoTripleBox";
import { FeaturedAuthor } from "@/components/sections/FeaturedAuthor";
import { AuthorGallery } from "@/components/sections/AuthorGallery";
import { InstagramYouTubeSection } from "@/components/sections/InstagramYouTubeSection";
import { SpecialOffers } from "@/components/sections/SpecialOffers";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <main>
      <HeroWithOffer />

      {/* New Arrivals (2/3) + Sale Offer (1/3) */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_460px] gap-4">
          <div className="rounded-2xl overflow-hidden">
            <NewArrivalsSection embedded />
          </div>
          <div className="hidden lg:block">
            <SaleOfferWithFeaturedVideo embedded />
          </div>
        </div>
      </section>

      <AllTimeBestsellerSection />
      <RecentBestsellerSection />

      {/* Category — crossword-style grid */}
      <VerticalCategories />

      {/* Author Birthday / Festival / Combo Sets — 3 content-rich boxes */}
      <PromoTripleBox />

      {/* MPH Family author photos */}
      <AuthorGallery />

      {/* Editor's Picks */}
      <FeaturedSection />

      {/* Author of the Month — horizontal promo-style block */}
      <FeaturedAuthor />

      {/* Instagram (1/3) + YouTube (2/3) */}
      <InstagramYouTubeSection />

      {/* Make Your Own Combo / 50% Off / Book Reviews tabs */}
      <SpecialOffers />

      <Testimonials />
      <Newsletter />
    </main>
  );
}
