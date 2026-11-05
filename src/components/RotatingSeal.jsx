import Logo from './Logo'
import { useTheme } from '../context/ThemeContext'
import './RotatingSeal.css'

export default function RotatingSeal() {
  const { theme } = useTheme()
  const text = 'SECURE LIVING · ELEVATED · EST. 2026 · '
  return (
    <div className="seal" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="seal__ring">
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#seal-circle" textLength="488">
            {text}
          </textPath>
        </text>
      </svg>
      <Logo variant="symbol" tone={theme === 'dark' ? 'light' : 'navy'} className="seal__mark" />
    </div>
  )
}
