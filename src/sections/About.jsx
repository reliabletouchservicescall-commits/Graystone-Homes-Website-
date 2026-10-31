import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import Logo from '../components/Logo'
import { IMAGES } from '../config/site'
import { useTheme } from '../context/ThemeContext'
import './About.css'

function RotatingSeal() {
  const { theme } = useTheme()
  const text = 'SECURE LIVING · ELEVATED · EST. 2026 · '
  return (
    <div className="seal" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="seal__ring">
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#seal-circle" textLength="488">
            {text}
          </textPath>
        </text>
      </svg>
      <Logo variant="symbol" tone={theme === 'dark' ? 'light' : 'navy'} className="seal__mark" />
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const mainY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const detailY = useTransform(scrollYProgress, [0, 1], ['18%', '-18%'])

  return (
    <section className="section about" ref={ref}>
      <div className="container about__grid">
        <div className="about__media">
          <Reveal className="about__main" y={60}>
            <motion.img src={IMAGES.aboutMain} alt="Warm, light-filled living room" loading="lazy" style={{ y: mainY }} />
          </Reveal>
          <motion.div className="about__detail" style={{ y: detailY }}>
            <img src={IMAGES.aboutDetail} alt="Open-plan modern interior" loading="lazy" />
          </motion.div>
          <RotatingSeal />
        </div>

        <div className="about__copy">
          <Reveal>
            <span className="eyebrow">About Us</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              We’re young. We’re hungry. And we’re <em>done</em> with the old way of doing real estate.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="about__text">
              You’ve probably dealt with agents who take days to reply, disappear after signing, and treat your
              property like just another listing. We built The Graystone Homes to be the opposite.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="about__text">
              When your unit sits empty, you lose money every day, so we move fast. When you have a question, you get
              an answer, not a voicemail. And because speed means nothing without trust, we tell you the truth about
              your property, your pricing and your tenants, even when it’s not what you want to hear.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <blockquote className="about__quote">
              <span>“</span>Speed is a form of respect.
            </blockquote>
          </Reveal>
          <Reveal delay={0.25}>
            <Link to="/about" className="text-link">
              Our story <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
