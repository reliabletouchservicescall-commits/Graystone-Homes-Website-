import { motion } from 'framer-motion'

// The flowing line motif from the brand guidelines ("Visual Elements"),
// drawn as a family of bezier curves that interpolate between two waves.
const LINES = 26

const lerp = (a, b, t) => a + (b - a) * t
const pt = (x, y) => `${x.toFixed(1)},${y.toFixed(1)}`

function buildPath(t) {
  const start = pt(0, lerp(150, 330, t))
  const c1 = pt(lerp(220, 180, t), lerp(225, 240, t))
  const c2 = pt(lerp(300, 330, t), lerp(260, 300, t))
  const mid = pt(lerp(420, 400, t), lerp(250, 200, t))
  const c3 = pt(lerp(560, 480, t), lerp(230, 80, t))
  const c4 = pt(lerp(680, 690, t), lerp(10, 210, t))
  const end = pt(800, lerp(40, 250, t))
  return `M${start} C${c1} ${c2} ${mid} C${c3} ${c4} ${end}`
}

export default function LineWave({ className = '', duration = 2.6 }) {
  return (
    <svg className={className} viewBox="0 0 800 340" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {Array.from({ length: LINES }, (_, i) => {
        const t = i / (LINES - 1)
        return (
          <motion.path
            key={i}
            d={buildPath(t)}
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.25 + 0.75 * (1 - Math.abs(t - 0.5) * 2) }}
            viewport={{ once: true }}
            transition={{ duration, delay: i * 0.035, ease: [0.65, 0, 0.35, 1] }}
          />
        )
      })}
    </svg>
  )
}
