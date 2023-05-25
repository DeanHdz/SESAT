import Drawer from "../Components/Drawer/Drawer";
import AsesorRegistryForm from "../Components/UserRegistryForm/AsesorRegistryForm";

export const AsesorRegistryPage = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-row">
        <div className="w-3/12">
          <Drawer />
        </div>
        <div className="w-9/12">
          <AsesorRegistryForm />
        </div>
      </div>
    </div>
  );
};

export default AsesorRegistryPage