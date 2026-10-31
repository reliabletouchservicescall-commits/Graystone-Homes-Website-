import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from './SocialIcons'
import Logo from './Logo'
import { CONTACT, NAV_LINKS } from '../config/site'
import './Footer.css'

const SERVICES = ['Tenant Placement', 'Full Property Management', 'Rental Assessments', 'Tenant Screening', 'Rent Collection']

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
                <li key={s}>
                  <Link to="/services">{s}</Link>
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
              {[
                { Icon: InstagramIcon, label: 'Instagram' },
                { Icon: FacebookIcon, label: 'Facebook' },
                { Icon: LinkedinIcon, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="footer__social-link">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__cta">
          <p>Ready to let with confidence?</p>
          <Link to="/contact" className="footer__cta-link">
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
