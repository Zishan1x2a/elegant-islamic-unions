import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { SectionHeading } from "@/components/ornaments/SectionHeading";
import { galleryImages } from "@/lib/wedding-data";

export function Gallery() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-[#F5F0E6] px-2 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Memories"
          arabic="ذِكْرَيَات"
          title="Moments, Captured"
          subtitle="A film of all the small, sacred things."
        />
      </div>

      <div className="mt-14">
        <Swiper
          modules={[Autoplay, EffectCoverflow, Pagination, Keyboard]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          keyboard={{ enabled: true }}
          autoplay={{ delay: 4200, disableOnInteraction: false }}
          slidesPerView={1.15}
          breakpoints={{
            640: { slidesPerView: 1.8 },
            900: { slidesPerView: 2.4 },
            1200: { slidesPerView: 2.8 },
          }}
          coverflowEffect={{ rotate: 18, stretch: 0, depth: 220, modifier: 1.1, slideShadows: false }}
          pagination={{ clickable: true }}
          className="!pb-14"
        >
          {galleryImages.map((img, i) => (
            <SwiperSlide key={i} className="!h-auto">
              <figure className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-[#C9A84C]/30 bg-[#2B1B14] shadow-[0_30px_60px_-30px_rgba(43,27,20,0.55)]">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 mix-blend-overlay opacity-30"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9' /></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
                  }}
                />
                <span className="absolute inset-x-4 bottom-4 rounded-full bg-[#0A0907]/40 px-4 py-2 text-center font-sans-soft text-[10px] uppercase tracking-[0.35em] text-[#E8D5A3] backdrop-blur">
                  {img.alt}
                </span>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: #8B7355; opacity: 0.5; width: 8px; height: 8px;
        }
        .swiper-pagination-bullet-active {
          background: #C9A84C; opacity: 1; width: 24px; border-radius: 999px;
          transition: width .3s ease;
        }
      `}</style>
    </section>
  );
}
