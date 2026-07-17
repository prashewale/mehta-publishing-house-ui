import { motion } from "framer-motion";
import { Scale, Mail, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function Rights() {
  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl text-center space-y-6"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Scale className="h-7 w-7" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold">Rights</h1>
        <p className="text-muted-foreground leading-relaxed">
          Explore translation, adaptation, and reprint rights for Mehta Publishing House titles.
          For rights inquiries, partnerships, or licensing requests, please get in touch with our
          rights team.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href="mailto:rights@mehtapublishinghouse.com"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            <Mail className="h-4 w-4" />
            Contact Rights Team
          </a>
          <Link
            to="/publish"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold hover:bg-muted"
          >
            <FileText className="h-4 w-4" />
            Publish with us
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
