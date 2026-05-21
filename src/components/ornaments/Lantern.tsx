export function Lantern({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`relative anim-float ${className}`} style={{ width: size }}>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-2xl"
        style={{
          background: "radial-gradient(circle, rgba(255,200,100,0.55), rgba(0,0,0,0) 65%)",
        }}
      />
      <svg viewBox="0 0 64 96" width={size} height={size * 1.5} aria-hidden>
        <g stroke="#C9A84C" strokeWidth="1.4" fill="none">
          <line x1="32" y1="2" x2="32" y2="12" />
          <path d="M22 12 Q32 6 42 12" />
          <rect x="14" y="16" width="36" height="42" rx="6" fill="rgba(255,200,100,0.18)" />
          <path d="M14 28 Q32 22 50 28 M14 46 Q32 52 50 46" opacity="0.7" />
          <line x1="14" y1="58" x2="50" y2="58" />
          <path d="M20 58 L24 70 L40 70 L44 58" />
          <path d="M26 70 L26 78 M38 70 L38 78" />
          <path d="M22 78 L42 78 L40 86 L24 86 Z" />
        </g>
        <circle cx="32" cy="36" r="6" fill="#FFE5A8" opacity="0.9" />
      </svg>
    </div>
  );
}
