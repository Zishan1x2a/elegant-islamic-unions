export function IslamicStar({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF3D6" />
          <stop offset="45%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#8B7355" />
        </linearGradient>
      </defs>
      <g fill="url(#goldGrad)">
        <rect x="22" y="22" width="56" height="56" />
        <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" />
      </g>
      <g fill="none" stroke="#FFF3D6" strokeWidth="0.6" opacity="0.6">
        <rect x="22" y="22" width="56" height="56" />
        <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" />
      </g>
    </svg>
  );
}
