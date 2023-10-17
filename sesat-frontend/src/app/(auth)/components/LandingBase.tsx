import LandingInfo from "./LandingInfo"
import LandingLogin from "./LandingLogin"
import LandingLogo from "./LandingLogo"

const LandingBase = () =>
{
  return(
    <div className="bg-[#e8edef] w-screen h-[687px] flex flex-row">
      <div className="w-screen md:w-4/6 h-[687px]">
        <LandingLogin />
      </div>
      <div className=" relative right-16 hidden md:visible w-0 h-0 md:w-2/6 md:h-[687px] md:flex flex-col items-center">
        <LandingLogo />
        <LandingInfo />
      </div>
    </div>
  )
}

export default LandingBase