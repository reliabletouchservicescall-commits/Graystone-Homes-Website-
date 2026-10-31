import Reveal from '../components/Reveal'
import LineWave from '../components/LineWave'
import './VisionMission.css'

const ITEMS = [
  {
    label: 'Our Vision',
    text: 'To build the most trusted real estate engine in Africa, an ecosystem where landlords never worry, agents never stall, and every property reaches its full potential.',
  },
  {
    label: 'Our Mission',
    text: 'To equip our agents with the tools, training and support they need to work at their best, so every landlord we serve gets faster results, better tenants and complete transparency, every single time.',
  },
]

export default function VisionMission() {
  return (
    <section className="vm">
      <LineWave className="vm__wave" duration={3.4} />
      <div className="container">
        <div className="vm__grid">
          {ITEMS.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.15} className="vm__item">
              <span className="vm__num">0{i + 1}</span>
              <h2 className="vm__label">{item.label}</h2>
              <p className="vm__text">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
