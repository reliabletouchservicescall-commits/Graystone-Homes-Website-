import { motion } from 'framer-motion'
import { Clock, MessageSquareText, ShieldCheck } from 'lucide-react'
import Reveal from '../components/Reveal'
import Logo from '../components/Logo'
import { IMAGES, RESPONSE_HOURS } from '../config/site'
import './LandlordPromise.css'

const PILLARS = [
  { Icon: Clock, text: `Reply within ${RESPONSE_HOURS} hours` },
  { Icon: MessageSquareText, text: 'Updates at every step' },
  { Icon: ShieldCheck, text: 'Transparent pricing' },
]

export default function LandlordPromise() {
  return (
    <section className="promise">
      <div className="promise__media">
        <motion.img
          src={IMAGES.promise}
          alt="Bright modern home interior with open staircase"
          loading="lazy"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="promise__panel">
        <Reveal>
          <span className="eyebrow promise__eyebrow">Our Promise to Landlords</span>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="promise__quote">
            If we don’t respond within <em>{RESPONSE_HOURS} hours</em>, or keep you updated every step of the way,
            tell us and we’ll make it right. <em>No excuses.</em>
          </p>
        </Reveal>
        <Reveal delay={0.16} className="promise__sign">
          <Logo variant="symbol" tone="light" className="promise__symbol" />
          <div>
            <strong>The Graystone Team</strong>
            <span>Secure Living, Elevated</span>
          </div>
        </Reveal>
        <Reveal delay={0.24}>
          <ul className="promise__pillars">
            {PILLARS.map(({ Icon, text }) => (
              <li key={text}>
                <Icon strokeWidth={1.25} />
                {text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
