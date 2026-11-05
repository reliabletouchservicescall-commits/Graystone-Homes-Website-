import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import './HowItWorks.css'

const STEPS = [
  {
    title: 'Tell us about your property',
    text: 'Fill in a quick form or give us a call. It takes under 2 minutes.',
  },
  {
    title: 'We get to work immediately',
    text: 'Professional listing, active marketing and a pipeline of screened tenants.',
  },
  {
    title: 'You relax, we deliver',
    text: 'Quality tenants placed, paperwork handled, and regular updates so you’re never in the dark.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section section--alt how">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal>
            <span className="eyebrow">How It Works</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              From empty unit to <em>signed lease</em>, in three steps.
            </h2>
          </Reveal>
        </div>

        <div className="how__steps">
          <motion.span
            className="how__line"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={0.2 + i * 0.25} className="how__step">
              <span className="how__num">0{i + 1}</span>
              <h3 className="how__title">{step.title}</h3>
              <p className="how__text">{step.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4} className="how__cta">
          <Link to="/contact?intent=management" className="btn btn--primary">
            Start in under 2 minutes <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
