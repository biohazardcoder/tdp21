import { Contact } from "../components/shared/contact"
import { Footer } from "../components/shared/footer"
import { Hero } from "../components/shared/hero"
import { Navbar } from "../components/shared/navbar"
import { Partners } from "../components/shared/partners"
import { Stats } from "../components/shared/stats"

export const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Stats/>
        <Contact/>
        <Partners/>
        <Footer/>
    </div>
  )
}
