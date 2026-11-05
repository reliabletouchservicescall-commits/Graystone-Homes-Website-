import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BedDouble,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  KeyRound,
  MapPin,
  MessageCircle,
  Plus,
  Search,
  ShieldAlert,
  Wrench,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal, { fadeUp, stagger } from '../components/Reveal'
import StatementBand from '../components/StatementBand'
import { CONTACT, IMAGES } from '../config/site'
import { LISTINGS, formatPrice } from '../config/properties'
import './TenantsPage.css'

const EASE = [0.22, 1, 0.36, 1]
const RENTALS = LISTINGS.filter((l) => l.deal === 'rent')
const RENTAL_CITIES = ['Anywhere', ...new Set(RENTALS.map((l) => l.city))]

const TYPES = [
  { id: 'any', label: 'Any home' },
  { id: 'apartment', label: 'Apartment' },
  { id: 'family', label: 'Family home' },
]
const BED_OPTIONS = [0, 1, 2, 3, 4]

const JOURNEY = [
  { Icon: Search, title: 'Find your home', text: 'Browse our rentals or tell us what you need. We’ll match you with homes that fit your budget and lifestyle.' },
  { Icon: CalendarCheck, title: 'Book a viewing', text: 'Pick a time that suits you. We show up on time and answer every question honestly.' },
  { Icon: FileText, title: 'Apply with ease', text: 'Send us your documents and we’ll take care of the checks. No endless forms, no chasing.' },
  { Icon: BadgeCheck, title: 'Get approved', text: 'We keep you updated at every step, so you’re never left wondering where your application stands.' },
  { Icon: KeyRound, title: 'Sign & move in', text: 'Sign your lease, complete the move-in inspection together, collect your keys. Welcome home.' },
]

// Typical South African rental application documents. Confirm with the team.
const DOCUMENTS = [
  'Copy of your ID or passport',
  'Latest 3 months’ payslips or proof of income',
  'Latest 3 months’ bank statements',
  'Proof of your current address',
  'Contact details for your current landlord',
]
const CHECKLIST_KEY = 'tgh-tenant-checklist'

const FAQS = [
  {
    q: 'How do I book a viewing?',
    a: `Tap any rental on our Properties page, call us on ${CONTACT.phone} or send us a WhatsApp. We’ll find a time that works for you.`,
  },
  {
    q: 'What do I need to apply?',
    a: 'Usually a copy of your ID, proof of income and recent bank statements. Use the checklist on this page to get everything ready before you apply.',
  },
  {
    q: 'How long does approval take?',
    a: 'Once we have all your documents, we move quickly and keep you updated throughout. Complete applications are always processed fastest.',
  },
  {
    q: 'Where is my deposit kept?',
    a: 'Your deposit is held in an interest-bearing account, as required by the Rental Housing Act, and the interest it earns belongs to you.',
  },
  {
    q: 'Can I keep a pet?',
    a: 'It depends on the property and the landlord. Homes that welcome pets are marked “Pet friendly” on our listings, and we’re happy to ask on your behalf.',
  },
  {
    q: 'Who do I contact if something needs fixing?',
    a: 'Report it to us on WhatsApp with a photo and a short description. We log it straight away and keep you posted until it’s sorted.',
  },
]

const whatsapp = (text) => `${CONTACT.whatsappHref}?text=${encodeURIComponent(text)}`

/* ------------------------------ Intro + finder ------------------------------ */

function HomeFinder() {
  const [type, setType] = useState('any')
  const [beds, setBeds] = useState(0)
  const [city, setCity] = useState(RENTAL_CITIES[0])

  const matches = useMemo(
    () =>
      RENTALS.filter(
        (l) =>
          (type === 'any' || l.category === type) &&
          l.beds >= beds &&
          (city === RENTAL_CITIES[0] || l.city === city),
      ).length,
    [type, beds, city],
  )

  const query = new URLSearchParams()
  if (type !== 'any') query.set('type', type)
  if (beds) query.set('beds', beds)
  if (city !== RENTAL_CITIES[0]) query.set('city', city)
  const target = `/properties${query.toString() ? `?${query}` : ''}`

  return (
    <Reveal className="finder" y={50}>
      <div className="finder__head">
        <span className="finder__badge">
          <Search strokeWidth={1.5} />
        </span>
        <div>
          <h3 className="finder__title">Find your perfect match</h3>
          <p className="finder__sub">Three quick choices. We’ll do the rest.</p>
        </div>
      </div>

      <fieldset className="finder__group">
        <legend>I’m looking for</legend>
        <div className="finder__chips">
          {TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`chip ${type === t.id ? 'is-active' : ''}`}
              aria-pressed={type === t.id}
              onClick={() => setType(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="finder__group">
        <legend>Bedrooms</legend>
        <div className="finder__chips">
          {BED_OPTIONS.map((b) => (
            <button
              key={b}
              type="button"
              className={`chip chip--round ${beds === b ? 'is-active' : ''}`}
              aria-pressed={beds === b}
              onClick={() => setBeds(b)}
            >
              {b === 0 ? 'Any' : `${b}+`}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="finder__group">
        <legend>Area</legend>
        <div className="finder__chips">
          {RENTAL_CITIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip ${city === c ? 'is-active' : ''}`}
              aria-pressed={city === c}
              onClick={() => setCity(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="finder__foot">
        <p className="finder__count" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.strong
              key={matches}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {matches}
            </motion.strong>
          </AnimatePresence>
          {matches === 1 ? 'home matches' : 'homes match'}
        </p>
        <Link to={matches ? target : '/contact?intent=renting'} className="btn btn--primary">
          {matches ? 'Show me' : 'Tell us what you need'} <ArrowRight />
        </Link>
      </div>
    </Reveal>
  )
}

function Intro() {
  return (
    <section className="section ten-intro">
      <div className="container ten-intro__grid">
        <div>
          <Reveal>
            <span className="eyebrow">For Tenants</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              Looking for a place to call home? <em>We’ve got you covered.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="ten-intro__text">
              Explore available rentals, find your perfect match and let us make your next move easier. From the first
              viewing to the day you get your keys, you’ll have a team in your corner.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="ten-intro__perks">
              <li>
                <Check strokeWidth={2} /> Quality, well-kept homes
              </li>
              <li>
                <Check strokeWidth={2} /> Honest, quick answers
              </li>
              <li>
                <Check strokeWidth={2} /> Support after you move in
              </li>
            </ul>
          </Reveal>
        </div>
        <HomeFinder />
      </div>
    </section>
  )
}

/* ------------------------------ Rentals strip ------------------------------ */

function RentalsStrip() {
  const track = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const update = () => {
    const el = track.current
    if (!el) return
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
  }

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const scroll = (dir) => {
    const el = track.current
    const card = el?.querySelector('.rent-card')
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' })
  }

  return (
    <section className="section section--alt rentals">
      <div className="container">
        <div className="rentals__head">
          <div>
            <Reveal>
              <span className="eyebrow">Explore Available Rentals</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">
                Homes ready for <em>you.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="rentals__nav">
            <button type="button" className="icon-btn" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Previous homes">
              <ChevronLeft strokeWidth={1.5} />
            </button>
            <button type="button" className="icon-btn" onClick={() => scroll(1)} disabled={edges.end} aria-label="Next homes">
              <ChevronRight strokeWidth={1.5} />
            </button>
          </Reveal>
        </div>
      </div>

      <motion.div
        className="rentals__track"
        ref={track}
        onScroll={update}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {RENTALS.map((l) => {
          const { amount, unit } = formatPrice(l)
          return (
            <motion.div className="rent-card" key={l.id} variants={fadeUp}>
              <Link to={`/contact?property=${l.id}`} className="rent-card__link">
                <div className="rent-card__media">
                  <img src={l.image} alt={`${l.title} in ${l.suburb}`} loading="lazy" />
                  <span className="rent-card__status">{l.available}</span>
                </div>
                <div className="rent-card__body">
                  <span className="rent-card__area">
                    <MapPin strokeWidth={1.5} /> {l.suburb}
                  </span>
                  <h3 className="rent-card__title">{l.title}</h3>
                  <div className="rent-card__foot">
                    <span className="rent-card__price">
                      {amount} <small>{unit}</small>
                    </span>
                    <span className="rent-card__beds">
                      <BedDouble strokeWidth={1.5} /> {l.beds}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
        <motion.div className="rent-card rent-card--more" variants={fadeUp}>
          <Link to="/properties" className="rent-card__link">
            <span className="rent-card__more-icon">
              <ArrowUpRight strokeWidth={1.25} />
            </span>
            <span className="rent-card__more-title">See every property</span>
            <span className="rent-card__more-text">Filter by area, bedrooms and type.</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ------------------------------ Journey timeline ------------------------------ */

function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section className="section journey-t">
      <div className="container journey-t__grid">
        <div className="journey-t__intro">
          <Reveal>
            <span className="eyebrow">Your Move, Made Easier</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              From first viewing <em>to front door.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-lead">
              Renting shouldn’t feel like a second job. Here’s exactly what happens when you rent with Graystone.
            </p>
          </Reveal>
        </div>

        <div className="journey-t__list" ref={ref}>
          <span className="journey-t__rail" aria-hidden="true">
            <motion.span className="journey-t__fill" style={{ scaleY: fill }} />
          </span>
          <ol className="journey-t__steps">
            {JOURNEY.map(({ Icon, title, text }, i) => (
              <Reveal as="li" key={title} className="journey-t__step" delay={0.05}>
                <span className="journey-t__node">
                  <Icon strokeWidth={1.25} />
                </span>
                <div>
                  <span className="journey-t__num">Step 0{i + 1}</span>
                  <h3 className="journey-t__title">{title}</h3>
                  <p className="journey-t__text">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Application checklist ------------------------------ */

function Checklist() {
  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CHECKLIST_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(done))
  }, [done])

  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))
  const progress = done.length / DOCUMENTS.length
  const complete = done.length === DOCUMENTS.length

  return (
    <section className="section section--alt checklist">
      <div className="container checklist__grid">
        <Reveal className="checklist__media" y={60}>
          <img src={IMAGES.tenants.checklist} alt="Cosy, sunlit bedroom" loading="lazy" />
          <div className="checklist__ring" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" className="checklist__ring-bg" />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                className="checklist__ring-fg"
                initial={false}
                animate={{ pathLength: progress, opacity: progress ? 1 : 0 }}
                transition={{ duration: 0.8, ease: EASE }}
              />
            </svg>
            <span>
              <strong>{done.length}</strong>/{DOCUMENTS.length}
            </span>
          </div>
        </Reveal>

        <div className="checklist__copy">
          <Reveal>
            <span className="eyebrow">Get Application-Ready</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              Your move-in <em>checklist.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="checklist__lead">
              Have these ready and your application moves faster. Tick them off as you go. We’ll remember your progress
              on this device.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="checklist__items">
              {DOCUMENTS.map((doc, i) => {
                const checked = done.includes(i)
                return (
                  <li key={doc}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={checked}
                      className={`check-item ${checked ? 'is-checked' : ''}`}
                      onClick={() => toggle(i)}
                    >
                      <span className="check-item__box">
                        <AnimatePresence>
                          {checked && (
                            <motion.span
                              initial={{ scale: 0, rotate: -45 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              style={{ display: 'grid' }}
                            >
                              <Check strokeWidth={2.5} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <span className="check-item__label">{doc}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <AnimatePresence mode="wait">
            {complete ? (
              <motion.div
                key="ready"
                className="checklist__ready"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p>
                  <strong>You’re ready to apply.</strong> Let’s find your home.
                </p>
                <Link to="/contact?intent=renting" className="btn btn--primary">
                  Start my application <ArrowRight />
                </Link>
              </motion.div>
            ) : (
              <motion.p
                key="todo"
                className="checklist__hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {DOCUMENTS.length - done.length} to go. Some landlords may ask for one or two extra documents.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Current tenants ------------------------------ */

function Support() {
  const cards = [
    {
      Icon: Wrench,
      title: 'Report maintenance',
      text: 'Something broken? Send us a photo and a quick description on WhatsApp and we’ll get it logged and sorted.',
      cta: 'Report on WhatsApp',
      href: whatsapp('Hi Graystone, I’d like to report a maintenance issue.\n\nProperty address:\nWhat needs fixing:\nHow urgent is it:'),
      external: true,
    },
    {
      Icon: ShieldAlert,
      title: 'Pay rent safely',
      text: `We will never change our banking details by email or WhatsApp. If you get a message like that, call us on ${CONTACT.phone} before you pay.`,
      cta: 'Call to confirm',
      href: CONTACT.phoneHref,
      highlight: true,
    },
    {
      Icon: MessageCircle,
      title: 'Questions about your lease',
      text: 'Renewals, moving out, inspections or anything else. Reach out and you’ll get a real answer from a real person.',
      cta: 'Email the team',
      href: `mailto:${CONTACT.email}?subject=${encodeURIComponent('Tenant enquiry')}`,
    },
  ]

  return (
    <section className="section support">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal>
              <span className="eyebrow">Already Renting With Us?</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">
                We’re here <em>after you move in, too.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="section-lead">
              Our relationship doesn’t end when you get your keys. Whatever comes up, help is one message away.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="support__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {cards.map(({ Icon, title, text, cta, href, external, highlight }) => (
            <motion.article key={title} className={`support-card ${highlight ? 'support-card--alert' : ''}`} variants={fadeUp}>
              <span className="support-card__icon">
                <Icon strokeWidth={1.25} />
              </span>
              <h3 className="support-card__title">{title}</h3>
              <p className="support-card__text">{text}</p>
              <a
                href={href}
                className="text-link support-card__cta"
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {cta} <ArrowRight />
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------ FAQ ------------------------------ */

function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section section--alt faq">
      <div className="container faq__grid">
        <div>
          <Reveal>
            <span className="eyebrow">Tenant FAQs</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              Good questions, <em>straight answers.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-lead">
              Can’t find what you’re looking for?{' '}
              <a href={CONTACT.phoneHref} className="faq__call">
                Call {CONTACT.phone}
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal className="faq__list" delay={0.1}>
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-item__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <motion.span
                    className="faq-item__icon"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <Plus strokeWidth={1.25} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-item__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export default function TenantsPage() {
  return (
    <>
      <PageHero
        title="Tenants"
        heading="Your Next Home Awaits"
        eyebrow="For Tenants"
        intro="Looking for a place to call home? We’ve got you covered."
        image={IMAGES.tenants.hero}
      />
      <Intro />
      <RentalsStrip />
      <Journey />
      <Checklist />
      <Support />
      <Faq />
      <StatementBand
        eyebrow="A Fresh Start"
        lines={['A fresh start begins', <em key="em">with the right home.</em>]}
        image={IMAGES.tenants.freshStart}
      >
        <Link to="/properties" className="btn btn--light">
          Browse rentals <ArrowRight />
        </Link>
        <a
          href={whatsapp('Hi Graystone, I’m looking for a place to rent.')}
          target="_blank"
          rel="noreferrer"
          className="btn btn--ghost-light"
        >
          Chat on WhatsApp
        </a>
      </StatementBand>
    </>
  )
}
