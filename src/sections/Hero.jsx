import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, Phone } from 'lucide-react'
import LineWave from '../components/LineWave'
import { CONTACT, IMAGES, RESPONSE_HOURS } from '../config/site'
import './Hero.css'

const EASE = [0.22, 1, 0.36, 1]

const HEADLINE = [
  <>Your property, let faster.</>,
  <>Your tenants, managed better.</>,
  <>
    Your peace of mind, <em>guaranteed.</em>
  </>,
]

const TRUST = [`Response within ${RESPONSE_HOURS} hours`, 'Vetted, quality tenants', 'No surprises, ever']

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero__media" style={{ y: imageY }}>
        <motion.img
          src={IMAGES.hero}
          alt="Contemporary home at dusk"
          initial={{ scale: 1.18 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 2.8, ease: EASE }}
          fetchPriority="high"
        />
      </motion.div>
      <div className="hero__shade" />

      <LineWave className="hero__wave" duration={3.2} />

      <motion.div className="container hero__content" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.span
          className="eyebrow hero__eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
        >
          Rental &amp; Property Management · South Africa
        </motion.span>

        <h1 className="hero__title">
          {HEADLINE.map((line, i) => (
            <span className="hero__line" key={i}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.55 + i * 0.14 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.15 }}
        >
          The Graystone Homes is a new kind of real estate agency, built by a young, relentless team that moves at
          the speed landlords deserve, with integrity in every deal.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.3 }}
        >
          <Link to="/contact" className="btn btn--light">
            Get a Free Rental Assessment <ArrowRight />
          </Link>
          <a href={CONTACT.phoneHref} className="btn btn--ghost-light">
            <Phone /> Talk to an Agent Today
          </a>
        </motion.div>

        <motion.ul
          className="hero__trust"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.5 } } }}
        >
          {TRUST.map((item) => (
            <motion.li
              key={item}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            >
              <span className="hero__check">
                <Check strokeWidth={2} />
              </span>
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.a
        href="#stats"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        aria-label="Scroll to content"
      >
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </motion.a>
    </section>
  )
}
