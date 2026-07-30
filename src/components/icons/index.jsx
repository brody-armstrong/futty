// Custom Matchday icon set — nav glyphs (stroke) + position marks (filled).
// Props mirror lucide-react's API (size, className, ...rest) for drop-in use.

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const BallIcon = ({ size = 20, className = '', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...strokeProps} {...rest}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.2l3.3 2.4-1.2 3.9H9.9l-1.2-3.9z" fill="currentColor" stroke="none" />
    <path d="M12 7.2V3.5M15.3 9.6l3.3-1.8M8.7 9.6l-3.3-1.8M10.4 13.5l-1.6 3.6M13.6 13.5l1.6 3.6" />
  </svg>
)

export const TeamSheetIcon = ({ size = 20, className = '', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...strokeProps} {...rest}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9.5 4V3.2C9.5 2.5 10 2 10.7 2h2.6c.7 0 1.2.5 1.2 1.2V4" />
    <path d="M8 10.5h8M8 13.5h8M8 16.5h5" />
  </svg>
)

export const DugoutIcon = ({ size = 20, className = '', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...strokeProps} {...rest}>
    <path d="M4 12V8.5c0-1.4 1.1-2.5 2.5-2.5h11c1.4 0 2.5 1.1 2.5 2.5V12" />
    <path d="M4.5 12h15" />
    <path d="M6 12v6.5M18 12v6.5M9.5 12v6.5M14.5 12v6.5" />
  </svg>
)

export const CupIcon = ({ size = 20, className = '', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...strokeProps} {...rest}>
    <path d="M7 4h10v4.2a5 5 0 01-10 0z" />
    <path d="M7 5.2H4.5v1.8a4 4 0 004 4M17 5.2h2.5V7a4 4 0 01-4 4" />
    <path d="M12 13.2v3.3" />
    <path d="M8.3 20h7.4" />
    <path d="M9 20v-1.8h6V20" />
  </svg>
)

export const ShirtSwapIcon = ({ size = 20, className = '', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...strokeProps} {...rest}>
    <path d="M4 7.2A8 8 0 0116.5 2.4" />
    <path d="M20 6.6l-3.2-1-.4-3.3" />
    <path d="M20 16.8a8 8 0 01-12.5 4.8" />
    <path d="M4 17.4l3.2 1 .4 3.3" />
    <path d="M10.3 9.8l1.7-1.7 1.7 1.7-1 1v2.6h-1.4v-2.6z" />
  </svg>
)

export const BootIcon = ({ size = 20, className = '', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...strokeProps} {...rest}>
    <path d="M8.3 3v6.7L4.5 12.4v3.4A2 2 0 006.5 18h11a2 2 0 002-2v-1.6c0-1.9-1.8-2.9-3.6-2.9h-2.9V3z" />
    <path d="M4.5 17h14.9" />
    <path d="M9.3 5.8h3M9.3 8.2h3" />
  </svg>
)

export const GloveIcon = ({ size = 16, className = '', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" {...rest}>
    <rect x="7" y="10" width="10" height="9" rx="3" />
    <rect x="8" y="4" width="2.2" height="7" rx="1.1" />
    <rect x="10.9" y="3" width="2.2" height="8" rx="1.1" />
    <rect x="13.8" y="3" width="2.2" height="8" rx="1.1" />
    <rect x="16.2" y="4.5" width="2.2" height="6.5" rx="1.1" />
    <rect x="4.7" y="11.2" width="2.2" height="5.4" rx="1.1" transform="rotate(-25 5.8 13.9)" />
  </svg>
)

export const ShieldMarkIcon = ({ size = 16, className = '', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" {...rest}>
    <path d="M12 2.3L19.2 5.4V11C19.2 16 16.1 19.6 12 21.1C7.9 19.6 4.8 16 4.8 11V5.4Z" />
  </svg>
)

export const EngineMarkIcon = ({ size = 16, className = '', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    <path d="M12 4a8 8 0 017.75 6" />
    <path d="M17 7l2.75 3 .75-3.8" />
    <path d="M12 20a8 8 0 01-7.75-6" />
    <path d="M7 17l-2.75-3-.75 3.8" />
  </svg>
)

export const StrikeMarkIcon = ({ size = 16, className = '', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" {...rest}>
    <path d="M3 16.5L11 13.2 14.5 10 18 11 16.8 14.3 12.7 15.6 9.8 19Z" />
    <circle cx="18.4" cy="7" r="2.3" />
  </svg>
)

export const positionIcons = {
  GK: GloveIcon,
  DEF: ShieldMarkIcon,
  MID: EngineMarkIcon,
  FWD: StrikeMarkIcon,
}
