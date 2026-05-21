export function ArabesqueDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-[#C9A84C]/80" />
      <svg width="56" height="32" viewBox="0 0 56 32" fill="none" aria-hidden>
        <g stroke="#C9A84C" strokeWidth="1.1" fill="none">
          <polygon points="28,4 34,16 28,28 22,16" />
          <polygon points="16,16 22,10 28,16 22,22" />
          <polygon points="40,16 34,10 28,16 34,22" />
          <circle cx="28" cy="16" r="2" fill="#C9A84C" />
        </g>
        <path d="M0 16 L14 16 M42 16 L56 16" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6" />
      </svg>
      <span className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent via-[#C9A84C]/50 to-[#C9A84C]/80" />
    </div>
  );
}
