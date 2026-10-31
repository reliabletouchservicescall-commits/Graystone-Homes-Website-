import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Mail, Phone } from 'lucide-react'
import Reveal, { fadeUp, stagger } from '../components/Reveal'
import { CONTACT } from '../config/site'
import './PlaceholderPage.css'

const EASE = [0.22, 1, 0.36, 1]

function SkeletonCard({ label }) {
  return (
    <motion.div className="sk-card" variants={fadeUp}>
      <div className="skeleton sk-card__media" />
      <div className="sk-card__body">
        <span className="sk-card__label">{label}</span>
        <div className="skeleton sk-line" style={{ width: '85%' }} />
        <div className="skeleton sk-line" style={{ width: '70%' }} />
        <div className="skeleton sk-line" style={{ width: '40%' }} />
      </div>
    </motion.div>
  )
}

export default function PlaceholderPage({ page }) {
  return (
    <>
      <section className="ph-hero">
        <motion.img
          key={page.path}
          src={page.image}
          alt=""
          className="ph-hero__bg"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
        />
        <div className="ph-hero__shade" />
        <div className="container ph-hero__content">
          <motion.nav
            className="ph-hero__crumbs"
            aria-label="Breadcrumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link to="/">Home</Link>
            <span>/</span>
            <span aria-current="page">{page.title}</span>
          </motion.nav>
          <motion.span
            className="eyebrow ph-hero__eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
          >
            {page.eyebrow}
          </motion.span>
          <h1 className="ph-hero__title">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.45, duration: 1.1, ease: EASE }}
            >
              {page.title}
            </motion.span>
          </h1>
          <motion.p
            className="ph-hero__intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9, ease: EASE }}
          >
            {page.intro}
          </motion.p>
        </div>
      </section>

      <section className="section ph-body">
        <div className="container">
          <Reveal className="ph-notice">
            <span className="ph-notice__badge">Coming Soon</span>
            <div>
              <h2 className="ph-notice__title">This page is being crafted.</h2>
              <p className="ph-notice__text">
                We’re putting the finishing touches on the {page.title} page. In the meantime, our team is one call
                away.
              </p>
            </div>
            <div className="ph-notice__actions">
              <Link to="/" className="btn btn--ghost">
                <ArrowLeft /> Back home
              </Link>
              <a href={CONTACT.phoneHref} className="btn btn--primary">
                Talk to an agent <ArrowRight />
              </a>
            </div>
          </Reveal>

          {page.showContact && (
            <Reveal className="ph-contact">
              <a href={CONTACT.phoneHref} className="ph-contact__item">
                <Phone strokeWidth={1.25} />
                <span>Call us</span>
                <strong>{CONTACT.phone}</strong>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="ph-contact__item">
                <Mail strokeWidth={1.25} />
                <span>Email us</span>
                <strong>{CONTACT.email}</strong>
              </a>
            </Reveal>
          )}

          <div className="ph-skeleton" aria-hidden="true">
            <div className="ph-skeleton__head">
              <div className="skeleton sk-line" style={{ width: '7rem', height: '0.6rem' }} />
              <div className="skeleton sk-title" />
              <div className="skeleton sk-line" style={{ width: '60%' }} />
              <div className="skeleton sk-line" style={{ width: '45%' }} />
            </div>
            <motion.div
              className="ph-skeleton__grid"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              {page.sections.map((label, i) => (
                <SkeletonCard key={`${label}-${i}`} label={label} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
