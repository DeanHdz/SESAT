import Navbar from "../Components/Navbar/Navbar"
import LandingBanner from "../Components/Banner/LandingBanner"
import LandingBase from "../Components/LandingBase/LandingBase"

const LandingPage = () =>
{
  return(
    <div className="overflow-hidden">
      <Navbar />
      <LandingBanner />
      <LandingBase />
    </div>
  )
}

export default LandingPage