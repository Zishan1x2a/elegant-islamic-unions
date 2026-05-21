import { ArabesqueDivider } from "./ArabesqueDivider";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  arabic,
  title,
  subtitle,
}: {
  eyebrow?: string;
  arabic?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <Reveal>
          <p className="font-sans-soft text-[11px] uppercase tracking-[0.4em] text-[#8B7355]">
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      {arabic ? (
        <Reveal delay={0.1}>
          <p dir="rtl" className="font-arabic mt-3 text-2xl text-[#C9A84C] sm:text-3xl">
            {arabic}
          </p>
        </Reveal>
      ) : null}
      <Reveal delay={0.2}>
        <h2 className="font-serif-display mt-3 text-4xl font-light leading-[1.1] text-[#163C32] sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.3}>
        <ArabesqueDivider className="mt-6" />
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.4}>
          <p className="font-serif-display mt-5 text-lg italic text-[#8B7355]">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
