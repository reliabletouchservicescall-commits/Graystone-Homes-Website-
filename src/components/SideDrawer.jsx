import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, Link } from 'react-router-dom'
import { ArrowRight, Mail, Phone, X } from 'lucide-react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { CONTACT, NAV_LINKS } from '../config/site'
import { useTheme } from '../context/ThemeContext'
import './SideDrawer.css'

const EASE = [0.22, 1, 0.36, 1]

export default function SideDrawer({ open, onClose }) {
  const { theme } = useTheme()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="drawer-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.aside
            id="side-drawer"
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <div className="drawer__top">
              <Logo variant="horizontal" tone={theme === 'dark' ? 'light' : 'brown'} className="drawer__logo" />
              <div className="drawer__top-actions">
                <ThemeToggle />
                <button type="button" className="icon-btn" onClick={onClose} aria-label="Close menu" autoFocus>
                  <X strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <nav className="drawer__nav" aria-label="Site">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.25 + i * 0.06 }}
                >
                  <NavLink to={link.to} end className="drawer__link" onClick={onClose}>
                    <span className="drawer__index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="drawer__label">{link.label}</span>
                    <ArrowRight className="drawer__arrow" strokeWidth={1.25} />
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="drawer__footer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
            >
              <p className="drawer__tagline">“Secure Living, Elevated”</p>
              <a href={CONTACT.phoneHref} className="drawer__contact">
                <Phone strokeWidth={1.5} /> {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="drawer__contact">
                <Mail strokeWidth={1.5} /> {CONTACT.email}
              </a>
              <Link to="/contact?intent=management" className="btn btn--primary drawer__cta" onClick={onClose}>
                Get a Free Rental Assessment <ArrowRight />
              </Link>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
