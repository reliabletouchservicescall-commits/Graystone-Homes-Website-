import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Check,
  Copy,
  Home,
  KeyRound,
  Mail,
  MessageCircle,
  Phone,
  RotateCcw,
  Send,
  Sparkles,
  Tag,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal, { fadeUp, stagger } from '../components/Reveal'
import { SOCIAL_ICONS } from '../components/SocialIcons'
import { CONTACT, IMAGES, RESPONSE_HOURS, SOCIALS, SOCIAL_HANDLE } from '../config/site'
import { LISTINGS } from '../config/properties'
import './ContactPage.css'

const EASE = [0.22, 1, 0.36, 1]

// Each goal shows only the fields that matter for it.
const INTENTS = [
  { id: 'buying', label: 'Buying', Icon: Home, blurb: 'Find a home or investment', fields: ['area', 'type', 'budget'], budgetLabel: 'Budget' },
  { id: 'selling', label: 'Selling', Icon: Tag, blurb: 'Get the best price', fields: ['area', 'type', 'beds'] },
  { id: 'renting', label: 'Renting', Icon: KeyRound, blurb: 'Find your next home', fields: ['area', 'beds', 'budget'], budgetLabel: 'Monthly budget' },
  { id: 'management', label: 'Property management', Icon: Building2, blurb: 'Let us look after it', fields: ['area', 'type', 'beds'] },
  { id: 'other', label: 'Something else', Icon: Sparkles, blurb: 'Development, investment & more', fields: ['area'] },
]

const PROPERTY_TYPES = ['Apartment', 'House', 'Townhouse', 'Multiple units', 'Land / development']
const BEDROOMS = ['Studio', '1', '2', '3', '4', '5+']
const CONTACT_VIA = [
  { id: 'WhatsApp', Icon: MessageCircle },
  { id: 'Call', Icon: Phone },
  { id: 'Email', Icon: Mail },
]

const EMPTY = { name: '', phone: '', email: '', area: '', type: '', beds: '', budget: '', message: '', via: 'WhatsApp' }

function initialState(params) {
  const listing = LISTINGS.find((l) => l.id === params.get('property'))
  const intentParam = params.get('intent')
  const intent = listing
    ? listing.deal === 'rent' ? 'renting' : 'buying'
    : INTENTS.some((i) => i.id === intentParam) ? intentParam : 'renting'

  return {
    intent,
    listing,
    form: listing
      ? {
          ...EMPTY,
          area: `${listing.suburb}, ${listing.city}`,
          message: `I’m interested in the ${listing.title} in ${listing.suburb}. Is it still available, and when can I view it?`,
        }
      : EMPTY,
  }
}

function buildMessage(intent, form) {
  const shown = (key) => intent.fields.includes(key) && form[key]
  const details = [
    ['Name', form.name],
    ['Phone', form.phone],
    ['Email', form.email],
    ['Area', shown('area')],
    ['Property type', shown('type')],
    ['Bedrooms', shown('beds')],
    [intent.budgetLabel || 'Budget', shown('budget')],
    ['Best way to reach me', form.via],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)

  const greeting = `Hi Graystone, I’d like help with ${intent.id === 'other' ? 'a property enquiry' : intent.label.toLowerCase()}.`
  return [greeting, details.join('\n'), form.message.trim()].filter(Boolean).join('\n\n')
}

/* ------------------------------ Copyable channel ------------------------------ */

function Channel({ Icon, label, value, href, external }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* Clipboard can be unavailable (e.g. insecure context); the link still works. */
    }
  }

  return (
    <motion.div className="channel" variants={fadeUp}>
      <a href={href} className="channel__main" {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        <span className="channel__icon">
          <Icon strokeWidth={1.25} />
        </span>
        <span className="channel__text">
          <span className="channel__label">{label}</span>
          <span className="channel__value">{value}</span>
        </span>
      </a>
      <button type="button" className="channel__copy" onClick={copy} aria-label={`Copy ${label.toLowerCase()}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? 'done' : 'copy'}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'grid' }}
          >
            {copied ? <Check strokeWidth={2} /> : <Copy strokeWidth={1.5} />}
          </motion.span>
        </AnimatePresence>
        <span className="channel__tip">{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </motion.div>
  )
}

/* ------------------------------ Enquiry form ------------------------------ */

function Field({ label, children, optional }) {
  return (
    <label className="field">
      <span className="field__label">
        {label}
        {optional && <em> (optional)</em>}
      </span>
      {children}
    </label>
  )
}

function EnquiryForm() {
  const [params] = useSearchParams()
  const start = useMemo(() => initialState(params), [params])
  const [intentId, setIntentId] = useState(start.intent)
  const [form, setForm] = useState(start.form)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)

  const intent = INTENTS.find((i) => i.id === intentId)
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target ? e.target.value : e }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    if (!form.phone.trim() && !form.email.trim()) next.phone = 'Add a phone number or an email so we can reply.'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'That email doesn’t look quite right.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const send = (channel) => {
    if (!validate()) return
    const text = buildMessage(intent, form)
    if (channel === 'whatsapp') {
      window.open(`${CONTACT.whatsappHref}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    } else {
      const subject = `Website enquiry: ${intent.label}${form.name ? ` from ${form.name}` : ''}`
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
    }
    setSent(channel)
  }

  const reset = () => {
    setForm(EMPTY)
    setErrors({})
    setSent(null)
  }

  return (
    <Reveal className="enquiry" y={50}>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            className="enquiry__sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <motion.span
              className="enquiry__sent-icon"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 16 }}
            >
              <Check strokeWidth={2} />
            </motion.span>
            <h3>Your message is ready.</h3>
            <p>
              We’ve opened {sent === 'whatsapp' ? 'WhatsApp' : 'your email app'} with your enquiry filled in. Just
              press send and we’ll reply within {RESPONSE_HOURS} hours.
            </p>
            <div className="enquiry__sent-actions">
              <button type="button" className="btn btn--ghost" onClick={() => setSent(null)}>
                Edit my message
              </button>
              <button type="button" className="btn btn--primary" onClick={reset}>
                <RotateCcw /> Start a new enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              send('whatsapp')
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="enquiry__head">
              <span className="enquiry__step">01</span>
              <h3 className="enquiry__title">What can we help you with?</h3>
            </div>

            <div className="intents" role="radiogroup" aria-label="What can we help you with?">
              {INTENTS.map(({ id, label, Icon, blurb }) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={intentId === id}
                  className={`intent ${intentId === id ? 'is-active' : ''}`}
                  onClick={() => setIntentId(id)}
                >
                  {intentId === id && (
                    <motion.span layoutId="intent-ring" className="intent__ring" transition={{ duration: 0.45, ease: EASE }} />
                  )}
                  <span className="intent__icon">
                    <Icon strokeWidth={1.25} />
                  </span>
                  <span className="intent__label">{label}</span>
                  <span className="intent__blurb">{blurb}</span>
                </button>
              ))}
            </div>

            {start.listing && (
              <p className="enquiry__listing">
                <Check strokeWidth={2} /> Enquiring about <strong>{start.listing.title}</strong>, {start.listing.suburb}
              </p>
            )}

            <div className="enquiry__head">
              <span className="enquiry__step">02</span>
              <h3 className="enquiry__title">Tell us a little more</h3>
            </div>

            <div className="fields">
              <Field label="Full name">
                <input value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} placeholder="e.g. Thandi Mokoena" />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </Field>
              <Field label="Phone / WhatsApp">
                <input value={form.phone} onChange={set('phone')} type="tel" autoComplete="tel" aria-invalid={!!errors.phone} placeholder="e.g. 082 123 4567" />
                {errors.phone && <span className="field__error">{errors.phone}</span>}
              </Field>
              <Field label="Email" optional>
                <input value={form.email} onChange={set('email')} type="email" autoComplete="email" aria-invalid={!!errors.email} placeholder="you@example.com" />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </Field>

              <AnimatePresence initial={false}>
                {intent.fields.includes('area') && (
                  <motion.div key="area" className="fields__anim" {...FIELD_MOTION}>
                    <Field label={intentId === 'selling' || intentId === 'management' ? 'Property location' : 'Preferred area'}>
                      <input value={form.area} onChange={set('area')} placeholder="Suburb or city" />
                    </Field>
                  </motion.div>
                )}
                {intent.fields.includes('type') && (
                  <motion.div key="type" className="fields__anim" {...FIELD_MOTION}>
                    <Field label="Property type">
                      <select value={form.type} onChange={set('type')}>
                        <option value="">Select…</option>
                        {PROPERTY_TYPES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                  </motion.div>
                )}
                {intent.fields.includes('beds') && (
                  <motion.div key="beds" className="fields__anim" {...FIELD_MOTION}>
                    <Field label="Bedrooms">
                      <select value={form.beds} onChange={set('beds')}>
                        <option value="">Select…</option>
                        {BEDROOMS.map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                    </Field>
                  </motion.div>
                )}
                {intent.fields.includes('budget') && (
                  <motion.div key="budget" className="fields__anim" {...FIELD_MOTION}>
                    <Field label={intent.budgetLabel} optional>
                      <input value={form.budget} onChange={set('budget')} placeholder={intentId === 'renting' ? 'e.g. R12 000' : 'e.g. R1 800 000'} />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>

              <Field label="Message" optional>
                <textarea value={form.message} onChange={set('message')} rows={4} placeholder="Anything else we should know?" />
              </Field>
            </div>

            <fieldset className="via">
              <legend>Best way to reach you</legend>
              <div className="via__options">
                {CONTACT_VIA.map(({ id, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    className={`via__opt ${form.via === id ? 'is-active' : ''}`}
                    aria-pressed={form.via === id}
                    onClick={() => setForm((f) => ({ ...f, via: id }))}
                  >
                    <Icon strokeWidth={1.5} /> {id}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="enquiry__actions">
              <button type="submit" className="btn btn--primary">
                <MessageCircle /> Send on WhatsApp
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => send('email')}>
                <Send /> Send by email
              </button>
            </div>
            <p className="enquiry__privacy">
              Your details go straight to our team and are only used to respond to your enquiry.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </Reveal>
  )
}

const FIELD_MOTION = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.4, ease: EASE },
}

/* ------------------------------ Page ------------------------------ */

function ContactBody() {
  return (
    <section className="section contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <Reveal>
            <span className="eyebrow">Get In Touch</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              We’re just <em>a call away.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="contact__lead">
              Whether you’re buying, selling, renting or looking for professional property management, talk to a real
              person who’ll give you a straight answer, fast.
            </p>
          </Reveal>

          <motion.div
            className="channels"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <Channel Icon={Phone} label="Call us" value={CONTACT.phone} href={CONTACT.phoneHref} />
            <Channel
              Icon={MessageCircle}
              label="WhatsApp"
              value={CONTACT.phone}
              href={`${CONTACT.whatsappHref}?text=${encodeURIComponent('Hi Graystone, I’d like to chat about a property.')}`}
              external
            />
            <Channel Icon={Mail} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
          </motion.div>

          <Reveal delay={0.1} className="promise-chip">
            <span className="promise-chip__pulse" aria-hidden="true" />
            <span>
              We reply within <strong>{RESPONSE_HOURS} hours</strong>. No voicemail runarounds.
            </span>
          </Reveal>
        </div>

        <EnquiryForm />
      </div>
    </section>
  )
}

function Socials() {
  return (
    <section className="section section--alt socials">
      <div className="container socials__inner">
        <Reveal>
          <span className="eyebrow">Follow The Journey</span>
        </Reveal>
        <Reveal delay={0.05}>
          <a
            href={SOCIALS[0].href}
            target="_blank"
            rel="noreferrer"
            className="socials__handle"
          >
            @{SOCIAL_HANDLE}
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="socials__lead">
            New listings, property tips and behind-the-scenes moments. Find us on Facebook, Instagram and TikTok.
          </p>
        </Reveal>
        <motion.div
          className="socials__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {SOCIALS.map(({ id, label, href }) => {
            const Icon = SOCIAL_ICONS[id]
            return (
              <motion.a key={id} href={href} target="_blank" rel="noreferrer" className={`social social--${id}`} variants={fadeUp}>
                <span className="social__icon">
                  <Icon />
                </span>
                <span className="social__name">{label}</span>
                <span className="social__cta">
                  Follow <ArrowRight />
                </span>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function Marquee() {
  const phrase = (
    <>
      <span>Let’s talk property.</span>
      <em>Let’s make moves.</em>
      <span className="marquee__dot" aria-hidden="true" />
    </>
  )
  return (
    <section className="marquee" aria-label="Let’s talk property. Let’s make moves.">
      <div className="marquee__track" aria-hidden="true">
        {Array.from({ length: 2 }, (_, k) => (
          <div className="marquee__group" key={k}>
            {phrase}
            {phrase}
            {phrase}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        heading="Let’s Make Your Next Move"
        eyebrow="Contact The Graystone Homes"
        intro="Whether you’re buying, selling, renting or looking for professional property management, we’re just a call away."
        image={IMAGES.contact}
      />
      <ContactBody />
      <Marquee />
      <Socials />
    </>
  )
}
