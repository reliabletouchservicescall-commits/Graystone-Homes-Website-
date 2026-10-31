import Hero from '../sections/Hero'
import StatsBar from '../sections/StatsBar'
import About from '../sections/About'
import VisionMission from '../sections/VisionMission'
import Values from '../sections/Values'
import HowItWorks from '../sections/HowItWorks'
import Portfolio from '../sections/Portfolio'
import LandlordPromise from '../sections/LandlordPromise'
import Testimonials from '../sections/Testimonials'
import FinalCTA from '../sections/FinalCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <About />
      <VisionMission />
      <Values />
      <HowItWorks />
      <Portfolio />
      <LandlordPromise />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
