import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import Reveal from '../components/Reveal'
import { CONTACT, IMAGES } from '../config/site'
import './FinalCTA.css'

export default function FinalCTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section className="final" ref={ref}>
      <motion.img className="final__bg" src={IMAGES.capeTown} alt="" loading="lazy" style={{ y }} />
      <div className="final__shade" />
      <div className="container final__content">
        <Reveal>
          <span className="eyebrow final__eyebrow">Free · No Obligation</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="final__title">
            Every empty day costs you money. <em>Let’s fix that.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="final__lead">
            Get a free, no-obligation rental assessment and find out what your property could be earning.
          </p>
        </Reveal>
        <Reveal delay={0.18} className="final__actions">
          <Link to="/contact" className="btn btn--light">
            Get My Free Assessment <ArrowRight />
          </Link>
          <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="btn btn--ghost-light">
            Chat on WhatsApp
          </a>
        </Reveal>
        <Reveal delay={0.24} className="final__contacts">
          <a href={CONTACT.phoneHref}>
            <Phone strokeWidth={1.5} /> {CONTACT.phone}
          </a>
          <span aria-hidden="true" />
          <a href={`mailto:${CONTACT.email}`}>
            <Mail strokeWidth={1.5} /> {CONTACT.email}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
