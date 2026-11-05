import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import LineWave from './LineWave'
import './StatementBand.css'

const PARENT = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }
const LINE_REVEAL = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
}

// Full-width brand statement: photo under a midnight wash, the line-wave
// motif, and each line of the heading sliding up into view.
export default function StatementBand({ eyebrow, lines, image, children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section className="statement" ref={ref}>
      <motion.img className="statement__bg" src={image} alt="" loading="lazy" style={{ y }} />
      <div className="statement__shade" />
      <LineWave className="statement__wave" duration={3.4} />
      <div className="container statement__content">
        <Reveal>
          <span className="eyebrow statement__eyebrow">{eyebrow}</span>
        </Reveal>
        <motion.h2
          className="statement__title"
          variants={PARENT}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {lines.map((line, i) => (
            <span className="statement__line" key={i}>
              <motion.span variants={LINE_REVEAL}>{line}</motion.span>
            </span>
          ))}
        </motion.h2>
        {children && (
          <Reveal delay={0.3} className="statement__actions">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  )
}
