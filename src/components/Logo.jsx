import horizontalBrown from '../../The Graystone Homes_LOGO/TGH_ PNG Logo/5.png'
import horizontalNavy from '../../The Graystone Homes_LOGO/TGH_ PNG Logo/6.png'
import horizontalLight from '../../The Graystone Homes_LOGO/TGH_ PNG Logo/8.png'
import stackedNavy from '../../The Graystone Homes_LOGO/TGH_ PNG Logo/4.png'
import stackedLight from '../../The Graystone Homes_LOGO/TGH_ PNG Logo/3.png'
import './Logo.css'

// The source PNGs are 2000×2000 with generous transparent padding.
// These boxes (in source pixels) crop each artwork to its visible bounds.
const CROPS = {
  horizontal: { x: 196, y: 788, w: 1531, h: 365 },
  stacked: { x: 455, y: 493, w: 1088, h: 853 },
  symbol: { x: 196, y: 788, w: 365, h: 365 },
}

const SOURCES = {
  horizontal: { navy: horizontalNavy, brown: horizontalBrown, light: horizontalLight },
  stacked: { navy: stackedNavy, light: stackedLight },
  symbol: { navy: horizontalNavy, brown: horizontalBrown, light: horizontalLight },
}

export default function Logo({ variant = 'horizontal', tone = 'navy', className = '' }) {
  const crop = CROPS[variant]
  const src = SOURCES[variant][tone]

  return (
    <span
      className={`logo logo--${variant} ${className}`}
      style={{ aspectRatio: `${crop.w} / ${crop.h}` }}
    >
      <img
        src={src}
        alt={variant === 'symbol' ? '' : 'The Graystone Homes'}
        draggable="false"
        style={{
          width: `${(2000 / crop.w) * 100}%`,
          left: `${(-crop.x / crop.w) * 100}%`,
          top: `${(-crop.y / crop.h) * 100}%`,
        }}
      />
    </span>
  )
}
