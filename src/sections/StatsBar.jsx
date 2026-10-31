import { motion } from 'framer-motion'
import Counter from '../components/Counter'
import { STATS } from '../config/site'
import { fadeUp, stagger } from '../components/Reveal'
import './StatsBar.css'

export default function StatsBar() {
  return (
    <section className="stats" id="stats" aria-label="Graystone Homes in numbers">
      <div className="container">
        <motion.dl
          className="stats__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {STATS.map((stat) => (
            <motion.div className="stats__item" key={stat.label} variants={fadeUp}>
              <dt className="stats__label">{stat.label}</dt>
              <dd className="stats__value">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
