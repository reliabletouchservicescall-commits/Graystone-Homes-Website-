import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { SOCIAL_ICONS } from './SocialIcons'
import Logo from './Logo'
import { CONTACT, NAV_LINKS, SOCIALS, SOCIAL_HANDLE } from '../config/site'
import './Footer.css'

const SERVICES = [
  { label: 'Tenant Placement', id: 'tenant-placement' },
  { label: 'Property Management', id: 'property-management' },
  { label: 'Property Sales', id: 'property-sales' },
  { label: 'Property Development', id: 'property-development' },
  { label: 'Property Investment', id: 'property-investment' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo variant="stacked" tone="light" className="footer__logo" />
            <p className="footer__tagline">Secure Living, Elevated.</p>
            <p className="footer__about">
              A modern South African rental and property management agency, built to let your property faster and
              manage it better.
            </p>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Explore</h4>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Services</h4>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.id}`}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Get in touch</h4>
            <ul className="footer__contact">
              <li>
                <Phone strokeWidth={1.5} />
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
              <li>
                <Mail strokeWidth={1.5} />
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <MapPin strokeWidth={1.5} />
                <span>{CONTACT.region}</span>
              </li>
            </ul>
            <div className="footer__social">
              {SOCIALS.map(({ id, label, href }) => {
                const Icon = SOCIAL_ICONS[id]
                return (
                  <a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${label}: @${SOCIAL_HANDLE}`}
                    className="footer__social-link"
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="footer__cta">
          <p>Ready to let with confidence?</p>
          <Link to="/contact?intent=management" className="footer__cta-link">
            Book a free assessment <ArrowUpRight strokeWidth={1.25} />
          </Link>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} The Graystone Homes. All rights reserved.</span>
          <span>Est. January 2026 · South Africa</span>
        </div>
      </div>
    </footer>
  )
}
