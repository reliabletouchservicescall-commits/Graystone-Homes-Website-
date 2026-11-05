import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, DraftingCompass, Handshake, KeyRound, ShieldCheck, TrendingUp } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal, { fadeUp, stagger } from '../components/Reveal'
import StatementBand from '../components/StatementBand'
import { CONTACT, IMAGES } from '../config/site'
import './ServicesPage.css'

const SERVICES = [
  {
    id: 'tenant-placement',
    intent: 'management',
    Icon: KeyRound,
    title: 'Tenant Placement',
    tagline: 'Connecting landlords with the right tenants.',
    text: 'We market your property professionally, handle every enquiry and viewing, and screen applicants carefully, so the tenant who moves in is one you can rely on.',
    points: ['Professional listing and marketing', 'Viewings and applicant screening', 'Lease preparation and signing'],
    image: IMAGES.services.placement,
    alt: 'Agent presenting a model house to a client',
  },
  {
    id: 'property-management',
    intent: 'management',
    Icon: ShieldCheck,
    title: 'Property Management',
    tagline: 'Protecting and managing your investment.',
    text: 'From rent collection to maintenance and inspections, we take care of the day-to-day so your property stays in excellent condition and keeps earning.',
    points: ['Rent collection and monthly statements', 'Maintenance and repairs coordination', 'Routine inspections and tenant communication'],
    image: IMAGES.services.management,
    alt: 'Modern home exterior at dusk',
  },
  {
    id: 'property-sales',
    intent: 'selling',
    Icon: Handshake,
    title: 'Property Sales',
    tagline: 'Making buying and selling seamless.',
    text: 'Whether you’re selling a home or searching for your next one, we guide you through pricing, marketing, offers and transfer, with honest advice at every step.',
    points: ['Market-based pricing advice', 'Marketing and buyer viewings', 'Support from offer to transfer'],
    image: IMAGES.services.sales,
    alt: 'Contemporary villa with a swimming pool',
  },
  {
    id: 'property-development',
    intent: 'other',
    Icon: DraftingCompass,
    title: 'Property Development',
    tagline: 'Building opportunities for tomorrow.',
    text: 'We work alongside developers and landowners to shape residential projects around real demand, then help bring every new unit to market.',
    points: ['Market and demand insight', 'Project planning support', 'Sales and letting of new units'],
    image: IMAGES.services.development,
    alt: 'Architect drawing up building plans',
  },
  {
    id: 'property-investment',
    intent: 'buying',
    Icon: TrendingUp,
    title: 'Property Investment',
    tagline: 'Helping you unlock property potential.',
    text: 'Planning your first investment property or growing a portfolio? We help you find the right opportunities and understand the numbers before you commit.',
    points: ['Sourcing investment opportunities', 'Rental yield and return analysis', 'Guidance on growing your portfolio'],
    image: IMAGES.services.investment,
    alt: 'Apartment block at sunset',
  },
]

function Overview() {
  return (
    <section className="section svc-overview">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal>
              <span className="eyebrow">What We Do</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">
                Everything property, <em>all under one roof.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="section-lead">
              Letting, managing, buying, selling, building or investing: whatever your next property move is, one
              trusted team handles it from start to finish.
            </p>
          </Reveal>
        </div>

        <motion.nav
          className="svc-index"
          aria-label="Our services"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {SERVICES.map(({ id, Icon, title }, i) => (
            <motion.a key={id} href={`#${id}`} className="svc-index__item" variants={fadeUp}>
              <span className="svc-index__num">0{i + 1}</span>
              <span className="svc-index__icon">
                <Icon strokeWidth={1.25} />
              </span>
              <span className="svc-index__title">{title}</span>
            </motion.a>
          ))}
        </motion.nav>
      </div>
    </section>
  )
}

function ServiceRow({ service, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const { id, intent, Icon, title, tagline, text, points, image, alt } = service

  return (
    <article id={id} className={`svc-row ${index % 2 ? 'svc-row--flip' : ''}`} ref={ref}>
      <Reveal className="svc-row__media" y={60}>
        <motion.img src={image} alt={alt} loading="lazy" style={{ y }} />
        <span className="svc-row__badge">0{index + 1}</span>
      </Reveal>

      <div className="svc-row__copy">
        <Reveal>
          <span className="svc-row__icon">
            <Icon strokeWidth={1.25} />
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="svc-row__title">{title}</h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="svc-row__tagline">{tagline}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="svc-row__text">{text}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <ul className="svc-row__points">
            {points.map((p) => (
              <li key={p}>
                <Check strokeWidth={2} />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.25}>
          <Link to={`/contact?intent=${intent}`} className="text-link">
            Enquire about {title.toLowerCase()} <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </article>
  )
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        heading="What We Do"
        eyebrow="Our Services"
        intro="Everything property, all under one roof. From finding the right tenant to building your next investment."
        image={IMAGES.services.hero}
      />
      <Overview />

      <section className="section section--alt svc-list">
        <div className="container">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      <StatementBand
        eyebrow="One Destination"
        lines={['Your property goals.', 'Our expertise.', <em key="em">One destination.</em>]}
        image={IMAGES.services.statement}
      >
        <Link to="/contact" className="btn btn--light">
          Start a conversation <ArrowRight />
        </Link>
        <a href={CONTACT.phoneHref} className="btn btn--ghost-light">
          Call {CONTACT.phone}
        </a>
      </StatementBand>
    </>
  )
}
