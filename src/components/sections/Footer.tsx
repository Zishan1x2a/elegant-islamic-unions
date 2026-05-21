import { Share2, Download, Heart } from "lucide-react";
import { ArabesqueDivider } from "@/components/ornaments/ArabesqueDivider";
import { FloatingParticles } from "@/components/ornaments/FloatingParticles";
import { wedding } from "@/lib/wedding-data";

export function Footer() {
  const share = async () => {
    const data = {
      title: `${wedding.groom.name} & ${wedding.bride.name} — Wedding`,
      text: `Join us on ${wedding.dateLabel}, ${wedding.venue}.`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        /* user cancelled */
      }
      return;
    }
    const wa = `https://wa.me/?text=${encodeURIComponent(`${data.text} ${data.url}`)}`;
    window.open(wa, "_blank");
  };

  return (
    <footer className="relative overflow-hidden bg-[#0F2A24] px-6 pb-12 pt-24 text-center text-[#FAF8F3]">
      <FloatingParticles count={18} />
      <div className="relative mx-auto max-w-3xl">
        <p dir="rtl" lang="ar" className="font-arabic gold-shimmer text-2xl sm:text-3xl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <ArabesqueDivider className="mt-8" />
        <h2 className="font-serif-display mt-8 text-4xl font-light sm:text-5xl">
          {wedding.groom.name} <span className="font-script text-[#C9A84C]">&amp;</span> {wedding.bride.name}
        </h2>
        <p className="font-sans-soft mt-3 text-[11px] uppercase tracking-[0.4em] text-[#E8D5A3]/80">
          {wedding.dateLabel} · {wedding.venue}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={share}
            className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/40 px-5 py-2.5 font-sans-soft text-[11px] uppercase tracking-[0.32em] transition hover:bg-[#C9A84C]/15"
          >
            <Share2 className="h-3.5 w-3.5" /> Share on WhatsApp
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/40 px-5 py-2.5 font-sans-soft text-[11px] uppercase tracking-[0.32em] transition hover:bg-[#C9A84C]/15"
          >
            <Download className="h-3.5 w-3.5" /> Save invitation
          </button>
        </div>

        <p className="font-script mt-12 text-2xl text-[#E8D5A3]/90">{wedding.hashtag}</p>
        <p className="font-sans-soft mt-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[#E8D5A3]/60">
          Crafted with <Heart className="h-3 w-3 fill-[#C9A84C] text-[#C9A84C]" /> for our beloved guests
        </p>
      </div>
    </footer>
  );
}
