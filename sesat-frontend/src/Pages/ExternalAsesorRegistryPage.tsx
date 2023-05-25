import Drawer from "../Components/Drawer/Drawer";
import ExternalAsesorRegistryForm from "../Components/UserRegistryForm/ExternalAsesorRegistryForm";

const ExternalAsesorRegistryPage = () =>
{
  return(
    <div className="overflow-hidden">
      <div className="flex flex-row">
        <div className="w-3/12">
          <Drawer />
        </div>
        <div className="w-9/12">
          <ExternalAsesorRegistryForm/>
        </div>
      </div>
    </div>
  )
}

export default ExternalAsesorRegistryPage;