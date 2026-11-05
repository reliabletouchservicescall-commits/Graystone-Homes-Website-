import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import SideDrawer from './SideDrawer'
import { NAV_LINKS } from '../config/site'
import { useTheme } from '../context/ThemeContext'
import './Header.css'

export default function Header() {
  const { theme } = useTheme()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 420 && y > lastY)
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Every page opens on a dark photographic hero, so the transparent
  // header always uses the light logo until the user scrolls.
  const solid = scrolled
  const logoTone = !solid || theme === 'dark' ? 'light' : 'navy'

  return (
    <>
      <header
        className={`header ${solid ? 'header--solid' : ''} ${hidden && !menuOpen ? 'header--hidden' : ''}`}
      >
        <div className="header__inner">
          <Link to="/" className="header__logo" aria-label="The Graystone Homes — home">
            <Logo variant="horizontal" tone={logoTone} />
          </Link>

          <nav className="header__nav" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end className="header__link">
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <ThemeToggle />
            <Link to="/contact?intent=management" className="btn btn--primary header__cta">
              Free Assessment <ArrowRight />
            </Link>
            <button
              type="button"
              className="header__menu"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="side-drawer"
            >
              <span className="header__menu-label">Menu</span>
              <span className="header__burger" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <SideDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
