import { motion } from 'framer-motion'
import { BrainCircuit, Handshake, ShieldCheck, Zap } from 'lucide-react'
import { fadeUp, stagger } from '../components/Reveal'
import Reveal from '../components/Reveal'
import './Values.css'

const VALUES = [
  {
    Icon: Zap,
    title: 'Speed',
    text: 'We act today, not “sometime this week.” Fast responses, fast viewings, fast placements.',
  },
  {
    Icon: ShieldCheck,
    title: 'Integrity',
    text: 'Honest advice, transparent pricing, and no hidden anything. Your trust is our most valuable asset.',
  },
  {
    Icon: BrainCircuit,
    title: 'Intelligence',
    text: 'We use data, technology and sharp thinking to make better decisions for your property.',
  },
  {
    Icon: Handshake,
    title: 'Ownership',
    text: 'We treat your property like it’s ours. If something needs doing, we do it.',
  },
]

export default function Values() {
  return (
    <section className="section values">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal>
              <span className="eyebrow">What We Stand For</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">
                Four principles. <em>Every</em> property.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="section-lead">
              Behind every agent is a system built for performance: smart technology, clear processes, and a team that
              backs each other up. That’s how we deliver results others can’t.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="values__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {VALUES.map(({ Icon, title, text }, i) => (
            <motion.article className="value" key={title} variants={fadeUp}>
              <div className="value__top">
                <span className="value__icon">
                  <Icon strokeWidth={1.25} />
                </span>
                <span className="value__num">0{i + 1}</span>
              </div>
              <h3 className="value__title">{title}</h3>
              <p className="value__text">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
