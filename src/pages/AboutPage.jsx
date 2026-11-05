import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Lightbulb, HeartHandshake, Sparkles } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal, { fadeUp, stagger } from '../components/Reveal'
import RotatingSeal from '../components/RotatingSeal'
import StatementBand from '../components/StatementBand'
import VisionMission from '../sections/VisionMission'
import FinalCTA from '../sections/FinalCTA'
import { FOUNDED, IMAGES, RESPONSE_HOURS } from '../config/site'
import './AboutPage.css'

const FACTS = [
  { label: 'Founded', value: FOUNDED },
  { label: 'Based in', value: 'South Africa' },
  { label: 'Focus', value: 'Rentals & management' },
  { label: 'Response promise', value: `Within ${RESPONSE_HOURS} hours` },
]

const PILLARS = [
  {
    Icon: Sparkles,
    title: 'Fresh energy',
    text: 'A young team that shows up, follows through and moves at the pace your property deserves.',
  },
  {
    Icon: Lightbulb,
    title: 'Innovative thinking',
    text: 'Smarter marketing, better tools and new ideas, so every listing and every lease works harder.',
  },
  {
    Icon: HeartHandshake,
    title: 'A personal touch',
    text: 'You deal with real people who know your name, your property and what matters to you.',
  },
]

const JOURNEYS = [
  {
    eyebrow: 'For tenants',
    title: 'Finding your dream home',
    text: 'Secure, beautifully kept homes for young professionals and families, with a team that makes moving in simple.',
    image: IMAGES.about.dreamHome,
    to: '/properties',
    cta: 'Browse properties',
  },
  {
    eyebrow: 'For landlords',
    title: 'Managing your investment',
    text: 'From finding quality tenants to collecting rent and handling maintenance, we look after your property like it’s ours.',
    image: IMAGES.about.investment,
    to: '/services',
    cta: 'Explore services',
  },
]

function WhoWeAre() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const mainY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const detailY = useTransform(scrollYProgress, [0, 1], ['18%', '-18%'])

  return (
    <section className="section who" ref={ref}>
      <div className="container who__grid">
        <div className="who__copy">
          <Reveal>
            <span className="eyebrow">Who We Are</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title who__title">
              We are young, dynamic and <em>passionate</em> about property.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="who__lead">
              At The Graystone Homes, we bring fresh energy, innovative thinking and a personal touch to the real estate
              industry.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="who__text">
              From finding your dream home to managing your investment, we’re here to make every property move count.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="who__sign">
            <span className="who__sign-line" />
            <span>
              Est. {FOUNDED} <em>· Secure Living, Elevated</em>
            </span>
          </Reveal>
        </div>

        <div className="who__media">
          <Reveal className="who__main" y={60}>
            <motion.img
              src={IMAGES.about.team}
              alt="Two colleagues celebrating a win at the office"
              loading="lazy"
              style={{ y: mainY }}
            />
          </Reveal>
          <motion.div className="who__detail" style={{ y: detailY }}>
            <img src={IMAGES.about.interior} alt="Bright, open-plan living room" loading="lazy" />
          </motion.div>
          <RotatingSeal />
        </div>
      </div>
    </section>
  )
}

function Facts() {
  return (
    <section className="facts" aria-label="Graystone Homes at a glance">
      <div className="container">
        <motion.dl
          className="facts__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {FACTS.map((f) => (
            <motion.div className="facts__item" key={f.label} variants={fadeUp}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}

function Pillars() {
  return (
    <section className="section section--alt pillars">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal>
              <span className="eyebrow">What We Bring</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">
                A <em>new</em> energy in real estate.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="section-lead">
              Three things set us apart from the agencies you’re used to, and they shape every viewing, every lease and
              every phone call.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="pillars__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PILLARS.map(({ Icon, title, text }, i) => (
            <motion.article className="pillar" key={title} variants={fadeUp}>
              <span className="pillar__num">0{i + 1}</span>
              <span className="pillar__icon">
                <Icon strokeWidth={1.25} />
              </span>
              <h3 className="pillar__title">{title}</h3>
              <p className="pillar__text">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Journeys() {
  return (
    <section className="section journeys">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal>
            <span className="eyebrow">Every Property Move Counts</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              Wherever you are on your <em>property journey.</em>
            </h2>
          </Reveal>
        </div>

        <motion.div
          className="journeys__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {JOURNEYS.map((j) => (
            <motion.div key={j.title} variants={fadeUp}>
              <Link to={j.to} className="journey">
                <div className="journey__media">
                  <img src={j.image} alt="" loading="lazy" />
                </div>
                <div className="journey__body">
                  <span className="journey__eyebrow">{j.eyebrow}</span>
                  <h3 className="journey__title">{j.title}</h3>
                  <p className="journey__text">{j.text}</p>
                  <span className="journey__cta">
                    {j.cta} <ArrowUpRight strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.2} className="journeys__more">
          <Link to="/contact" className="btn btn--primary">
            Talk to our team <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        heading="Who We Are"
        eyebrow="About The Graystone Homes"
        intro="Young, dynamic and passionate about property. We bring fresh energy to every home we let and every investment we manage."
        image={IMAGES.about.hero}
      />
      <WhoWeAre />
      <Facts />
      <Pillars />
      <StatementBand
        eyebrow="Our Belief"
        lines={['We don’t just deal in properties.', <em key="em">We create opportunities.</em>]}
        image={IMAGES.about.handshake}
      />
      <Journeys />
      <VisionMission />
      <FinalCTA />
    </>
  )
}
