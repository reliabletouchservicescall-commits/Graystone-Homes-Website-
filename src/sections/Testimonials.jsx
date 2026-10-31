import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import Reveal, { fadeUp, stagger } from '../components/Reveal'
import { IMAGES } from '../config/site'
import './Testimonials.css'

// Placeholder testimonials — replace with real quotes, names, areas and
// photos from landlords who have agreed to be featured.
const TESTIMONIALS = [
  {
    quote:
      'My apartment had been sitting empty for six weeks with another agency. Graystone had a vetted tenant signed in nine days, and they called me before I could even ask for an update.',
    name: 'Thabo M.',
    area: 'Rosebank, Johannesburg',
    photo: IMAGES.people.thabo,
  },
  {
    quote:
      'What stood out was the honesty. They told me my asking rent was too high, explained why with real numbers, and the unit let at their price within two weeks.',
    name: 'Naledi K.',
    area: 'Midrand, Gauteng',
    photo: IMAGES.people.naledi,
  },
  {
    quote:
      'I live overseas, so responsiveness is everything. Every message is answered the same day and the monthly reports are clear. It finally feels like someone owns the problem.',
    name: 'Sarah van der Berg',
    area: 'Sea Point, Cape Town',
    photo: IMAGES.people.sarah,
  },
]

export default function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal>
            <span className="eyebrow">What Landlords Say</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              Trusted by owners who <em>expect more.</em>
            </h2>
          </Reveal>
        </div>

        <motion.div
          className="testimonials__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure className="tcard" key={t.name} variants={fadeUp}>
              <div className="tcard__top">
                <Quote className="tcard__mark" strokeWidth={1} />
                <div className="tcard__stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} strokeWidth={0} fill="currentColor" />
                  ))}
                </div>
              </div>
              <blockquote className="tcard__quote">{t.quote}</blockquote>
              <figcaption className="tcard__author">
                <img src={t.photo} alt="" loading="lazy" />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.area}</span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
