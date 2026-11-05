import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Bath, BedDouble, Car, Info, MapPin, Search } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal, { fadeUp, stagger } from '../components/Reveal'
import StatementBand from '../components/StatementBand'
import { CONTACT, IMAGES } from '../config/site'
import { CATEGORIES, LISTINGS, SAMPLE_LISTINGS, formatPrice } from '../config/properties'
import './PropertiesPage.css'

const EASE = [0.22, 1, 0.36, 1]

const CITIES = ['All areas', ...new Set(LISTINGS.map((l) => l.city))]
const BEDS = [
  { label: 'Any', value: 0 },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
]

const STEPS = [
  { title: 'Browse', text: 'Explore homes by type, area and budget, all in one place.' },
  { title: 'Discover', text: 'Book a viewing and get honest answers from a team that knows the property.' },
  { title: 'Move in', text: 'We handle the paperwork, the inspection and the keys. You settle in.' },
]

function scrollToListings() {
  document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })
}

function Categories({ onPick }) {
  return (
    <section className="section prop-cats">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal>
              <span className="eyebrow">Find Your Place</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">
                Discover a property that <em>feels right.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="section-lead">
              From stylish apartments to beautiful family homes and prime investment opportunities, discover a property
              that feels right.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="prop-cats__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {CATEGORIES.map((c) => {
            const count = LISTINGS.filter((l) => l.category === c.id).length
            return (
              <motion.button
                type="button"
                key={c.id}
                className="cat-tile"
                variants={fadeUp}
                onClick={() => onPick(c.id)}
              >
                <img src={c.image} alt="" loading="lazy" />
                <span className="cat-tile__shade" />
                <span className="cat-tile__body">
                  <span className="cat-tile__count">
                    {count} {count === 1 ? 'listing' : 'listings'}
                  </span>
                  <span className="cat-tile__title">{c.tagline}</span>
                  <span className="cat-tile__text">{c.text}</span>
                  <span className="cat-tile__cta">
                    View {c.label.toLowerCase()} <ArrowRight />
                  </span>
                </span>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function ListingCard({ listing }) {
  const { amount, unit } = formatPrice(listing)
  const enquiry = `/contact?property=${listing.id}`

  return (
    <motion.article
      layout
      className="listing"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <Link to={enquiry} className="listing__media" aria-label={`Enquire about ${listing.title}`}>
        <img src={listing.image} alt={`${listing.title} in ${listing.suburb}`} loading="lazy" />
        <span className={`listing__deal listing__deal--${listing.deal}`}>
          {listing.deal === 'rent' ? 'To Let' : 'For Sale'}
        </span>
        <span className="listing__status">{listing.available}</span>
      </Link>

      <div className="listing__body">
        <span className="listing__area">
          <MapPin strokeWidth={1.5} /> {listing.suburb}, {listing.city}
        </span>
        <h3 className="listing__title">{listing.title}</h3>

        <ul className="listing__specs">
          <li>
            <BedDouble strokeWidth={1.5} /> {listing.beds} Bed
          </li>
          <li>
            <Bath strokeWidth={1.5} /> {listing.baths} Bath
          </li>
          <li>
            <Car strokeWidth={1.5} /> {listing.parking} Parking
          </li>
        </ul>

        <ul className="listing__features">
          {listing.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <div className="listing__foot">
          <p className="listing__price">
            {amount} <span>{unit}</span>
          </p>
          <Link to={enquiry} className="listing__go" aria-label={`Enquire about ${listing.title}`}>
            <ArrowUpRight strokeWidth={1.25} />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

function Listings({ category, setCategory, initialCity, initialBeds }) {
  const [city, setCity] = useState(CITIES.includes(initialCity) ? initialCity : CITIES[0])
  const [beds, setBeds] = useState(initialBeds)

  const results = useMemo(
    () =>
      LISTINGS.filter(
        (l) =>
          (category === 'all' || l.category === category) &&
          (city === CITIES[0] || l.city === city) &&
          l.beds >= beds,
      ),
    [category, city, beds],
  )

  const reset = () => {
    setCategory('all')
    setCity(CITIES[0])
    setBeds(0)
  }

  return (
    <section className="section section--alt prop-list" id="listings">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal>
              <span className="eyebrow">Our Listings</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">
                Browse what’s <em>available now.</em>
              </h2>
            </Reveal>
          </div>
          {SAMPLE_LISTINGS && (
            <Reveal delay={0.1} className="prop-sample">
              <Info strokeWidth={1.5} />
              <p>
                These are example listings while our portfolio goes online. Call{' '}
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> for homes available today.
              </p>
            </Reveal>
          )}
        </div>

        <Reveal className="prop-filters">
          <div className="prop-tabs" role="tablist" aria-label="Property type">
            {[{ id: 'all', label: 'All' }, ...CATEGORIES].map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={category === c.id}
                className={`prop-tab ${category === c.id ? 'is-active' : ''}`}
                onClick={() => setCategory(c.id)}
              >
                {category === c.id && (
                  <motion.span layoutId="prop-tab-pill" className="prop-tab__pill" transition={{ duration: 0.5, ease: EASE }} />
                )}
                <span className="prop-tab__label">{c.label}</span>
              </button>
            ))}
          </div>

          <div className="prop-selects">
            <label className="prop-select">
              <span>Area</span>
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="prop-select">
              <span>Bedrooms</span>
              <select value={beds} onChange={(e) => setBeds(Number(e.target.value))}>
                {BEDS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Reveal>

        <p className="prop-count" aria-live="polite">
          Showing <strong>{results.length}</strong> {results.length === 1 ? 'property' : 'properties'}
        </p>

        <motion.div layout className="prop-grid">
          <AnimatePresence mode="popLayout">
            {results.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </AnimatePresence>
        </motion.div>

        {results.length === 0 && (
          <motion.div className="prop-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Search strokeWidth={1.25} />
            <h3>No matches just yet.</h3>
            <p>Tell us what you’re looking for and we’ll let you know the moment it comes in.</p>
            <div className="prop-empty__actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>
                Clear filters
              </button>
              <Link to="/contact?intent=renting" className="btn btn--primary">
                Tell us what you need <ArrowRight />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section className="section prop-steps">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal>
            <span className="eyebrow">Three Simple Steps</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title prop-steps__title">
              Browse. Discover. <em>Move in.</em>
            </h2>
          </Reveal>
        </div>

        <motion.ol
          className="prop-steps__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {STEPS.map((s, i) => (
            <motion.li className="prop-step" key={s.title} variants={fadeUp}>
              <span className="prop-step__num">0{i + 1}</span>
              <h3 className="prop-step__title">{s.title}</h3>
              <p className="prop-step__text">{s.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

// Filters can be preset from the URL, e.g. /properties?type=apartment&beds=2&city=Cape%20Town
export default function PropertiesPage() {
  const [params] = useSearchParams()
  const typeParam = params.get('type')
  const [category, setCategory] = useState(
    CATEGORIES.some((c) => c.id === typeParam) ? typeParam : 'all',
  )
  const hasFilters = params.toString() !== ''

  useEffect(() => {
    if (!hasFilters) return
    const t = setTimeout(scrollToListings, 400)
    return () => clearTimeout(t)
  }, [hasFilters])

  const pickCategory = (id) => {
    setCategory(id)
    scrollToListings()
  }

  return (
    <>
      <PageHero
        title="Properties"
        heading="Find Your Place"
        eyebrow="Our Properties"
        intro="From stylish apartments to beautiful family homes and prime investment opportunities."
        image={IMAGES.properties}
      />
      <Categories onPick={pickCategory} />
      <Listings
        category={category}
        setCategory={setCategory}
        initialCity={params.get('city')}
        initialBeds={Number(params.get('beds')) || 0}
      />
      <Journey />
      <StatementBand
        eyebrow="Can’t See It Yet?"
        lines={['Your next address', <em key="em">could be right here.</em>]}
        image={IMAGES.hero}
      >
        <Link to="/contact?intent=renting" className="btn btn--light">
          Tell us what you’re looking for <ArrowRight />
        </Link>
        <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="btn btn--ghost-light">
          Chat on WhatsApp
        </a>
      </StatementBand>
    </>
  )
}
