import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './PageHero.css'

const EASE = [0.22, 1, 0.36, 1]

export default function PageHero({ title, eyebrow, intro, image, heading }) {
  return (
    <section className="ph-hero">
      <motion.img
        key={image}
        src={image}
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
          <span aria-current="page">{title}</span>
        </motion.nav>
        <motion.span
          className="eyebrow ph-hero__eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
        >
          {eyebrow}
        </motion.span>
        <h1 className="ph-hero__title">
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.45, duration: 1.1, ease: EASE }}
          >
            {heading || title}
          </motion.span>
        </h1>
        <motion.p
          className="ph-hero__intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9, ease: EASE }}
        >
          {intro}
        </motion.p>
      </div>
    </section>
  )
}
