import LandingNavbar from "../Components/Navbar/LandingNavbar"
import LandingBanner from "../Components/Banner/LandingBanner"
import LandingBase from "../Components/LandingBase/LandingBase"

const LandingPage = () =>
{
  return(
    <div className="overflow-hidden">
      <LandingNavbar />
      <LandingBanner />
      <LandingBase />
    </div>
  )
}

export default LandingPage