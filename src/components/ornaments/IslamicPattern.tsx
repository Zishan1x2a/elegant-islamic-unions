import { type SVGProps } from "react";

/** Seamless Islamic 8-point star + interlace pattern, gold on transparent. */
export function IslamicPattern({
  className,
  opacity = 0.12,
  ...rest
}: SVGProps<SVGSVGElement> & { opacity?: number }) {
  return (
    <svg aria-hidden className={className} width="100%" height="100%" {...rest}>
      <defs>
        <pattern id="ip" width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#C9A84C" strokeWidth="0.9" opacity={opacity}>
            <polygon points="40,4 50,30 76,30 56,46 64,72 40,58 16,72 24,46 4,30 30,30" />
            <circle cx="40" cy="40" r="14" />
            <circle cx="40" cy="40" r="22" />
            <path d="M0 40 L80 40 M40 0 L40 80" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ip)" />
    </svg>
  );
}
