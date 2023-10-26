import Drawer from "../components/Drawer"
import ThesisRegistrationForm from "../components/ThesisRegistrationForm"

export default function Home() {
  return (
    <div className="flex">
      <div className="hidden lg:flex lg:w-3/12 flex-col">
        <Drawer />
      </div>

      <div className="w-full">
        <ThesisRegistrationForm/>
      </div>

    </div>
  )
}