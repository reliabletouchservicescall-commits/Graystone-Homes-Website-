import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Reveal, { fadeUp, stagger } from '../components/Reveal'
import { IMAGES } from '../config/site'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className="section portfolio">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal>
              <span className="eyebrow">Homes In Our Care</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">
                Properties that deserve <em>better</em> than “just another listing.”
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="portfolio__all">
            <Link to="/properties" className="text-link">
              View all properties <ArrowRight />
            </Link>
          </Reveal>
        </div>

        <motion.div
          className="portfolio__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {IMAGES.portfolio.map((p) => (
            <motion.div className="pcard" key={p.title} variants={fadeUp}>
              <Link to="/properties" className="pcard__link">
                <div className="pcard__media">
                  <img src={p.src} alt={`${p.title} in ${p.area}`} loading="lazy" />
                </div>
                <div className="pcard__info">
                  <div>
                    <span className="pcard__area">{p.area}</span>
                    <h3 className="pcard__title">{p.title}</h3>
                    <span className="pcard__type">{p.type}</span>
                  </div>
                  <span className="pcard__arrow">
                    <ArrowUpRight strokeWidth={1.25} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
