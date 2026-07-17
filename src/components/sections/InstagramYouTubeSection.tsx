import { useRef, useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, Play, ExternalLink, Heart, MessageCircle, Eye } from "lucide-react";

const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=400&fit=crop",
    caption: "New arrivals this week",
    likes: 842,
    comments: 34,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    caption: "Reading corner goals",
    likes: 1204,
    comments: 56,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop",
    caption: "Author signing event",
    likes: 673,
    comments: 21,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=400&fit=crop",
    caption: "Behind the scenes",
    likes: 928,
    comments: 45,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    caption: "Weekend reading stack",
    likes: 1102,
    comments: 38,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    caption: "Fresh from the press",
    likes: 756,
    comments: 19,
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=400&fit=crop",
    caption: "Poetry night highlights",
    likes: 634,
    comments: 27,
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=400&fit=crop",
    caption: "Classic shelf finds",
    likes: 891,
    comments: 41,
  },
];

const YOUTUBE_VIDEOS = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=340&fit=crop",
    title: "Live Author Interview: Acclaimed Marathi Writers",
    views: "12.4K",
    duration: "45:22",
    type: "Event",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=340&fit=crop",
    title: "Book Launch Event: Highlights & Readings",
    views: "8.7K",
    duration: "28:15",
    type: "Book Launch",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=340&fit=crop",
    title: "How to Publish Your Marathi Book",
    views: "21.2K",
    duration: "18:40",
    type: "Guide",
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=340&fit=crop",
    title: "Literary Festival Highlights — Day 1",
    views: "6.1K",
    duration: "32:10",
    type: "Event",
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&h=340&fit=crop",
    title: "Meet the Editor: Inside MPH",
    views: "9.8K",
    duration: "22:05",
    type: "Interview",
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=340&fit=crop",
    title: "Poetry Reading Evening — Live from Pune",
    views: "4.3K",
    duration: "51:18",
    type: "Event",
  },
  {
    id: 7,
    thumbnail: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=340&fit=crop",
    title: "Bestseller Stories: How Classics Are Made",
    views: "15.6K",
    duration: "26:44",
    type: "Documentary",
  },
  {
    id: 8,
    thumbnail: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&h=340&fit=crop",
    title: "Author Q&A: Writing for the Next Generation",
    views: "11.0K",
    duration: "39:02",
    type: "Q&A",
  },
];

function useAutoSlider(intervalMs = 3500) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const getStep = useCallback(() => {
    const el = ref.current;
    if (!el) return 0;
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return 0;
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return first.offsetWidth + gap;
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const el = ref.current;
      if (!el) return;
      const step = getStep();
      if (step === 0) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 2) return;
      if (el.scrollLeft + step >= max - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, intervalMs);
    return () => clearInterval(id);
  }, [paused, intervalMs, getStep]);

  return {
    ref,
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
  };
}

export function InstagramYouTubeSection() {
  const ig = useAutoSlider(3200);
  const yt = useAutoSlider(3800);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {/* Instagram — 1/3, 2 rows of small posts */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 rounded-2xl border border-pink-200/70 bg-gradient-to-b from-[#fff5f8] to-white p-4 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest mb-1.5 text-white"
                  style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}
                >
                  <Instagram className="h-3 w-3" />
                  Instagram Reels
                </div>
                <p className="text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground">@mehtapublishinghse</span>
                </p>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 p-1.5 rounded-full border border-pink-200 bg-white hover:bg-pink-50 transition-all"
                aria-label="Follow on Instagram"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div
              ref={ig.ref}
              onMouseEnter={ig.onMouseEnter}
              onMouseLeave={ig.onMouseLeave}
              className="grid grid-rows-2 grid-flow-col auto-cols-[calc(50%-4px)] gap-2 overflow-x-auto scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {INSTAGRAM_POSTS.map((post) => (
                <a
                  key={post.id}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-lg ring-1 ring-pink-100"
                >
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-white">
                      <Heart className="h-2.5 w-2.5" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-white">
                      <MessageCircle className="h-2.5 w-2.5" /> {post.comments}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* YouTube — 2/3, 2 rows of compact videos */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="lg:col-span-2 rounded-2xl border border-red-200/70 bg-gradient-to-b from-[#fff5f5] to-white p-4 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest mb-1.5 text-white">
                  <Youtube className="h-3 w-3" />
                  YouTube Videos & Events
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Author interviews, book launches & literary events
                </p>
              </div>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1 rounded-full border border-red-200 bg-white px-2.5 py-1 text-[11px] font-semibold hover:bg-red-50 hover:text-red-600 transition-all"
              >
                Channel <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div
              ref={yt.ref}
              onMouseEnter={yt.onMouseEnter}
              onMouseLeave={yt.onMouseLeave}
              className="grid grid-rows-2 grid-flow-col auto-cols-[calc(33.333%-8px)] sm:auto-cols-[calc(25%-9px)] gap-2.5 overflow-x-auto scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {YOUTUBE_VIDEOS.map((video) => (
                <a
                  key={video.id}
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-lg border border-red-100 bg-white transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
                        <Play className="h-3 w-3 fill-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[8px] font-bold text-white">
                      {video.duration}
                    </div>
                    <div className="absolute top-1 left-1 rounded-full bg-red-600 px-1.5 py-0.5 text-[8px] font-bold uppercase text-white">
                      {video.type}
                    </div>
                  </div>
                  <div className="p-1.5">
                    <h4 className="text-[10px] font-semibold leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
                      {video.title}
                    </h4>
                    <div className="mt-0.5 flex items-center gap-0.5 text-[9px] text-muted-foreground">
                      <Eye className="h-2.5 w-2.5" />
                      {video.views}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
