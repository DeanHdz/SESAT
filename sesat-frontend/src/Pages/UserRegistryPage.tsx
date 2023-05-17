import Drawer from "../Components/Drawer/Drawer";
import UserRegistryForm from "../Components/UserRegistryForm/UserRegistryForm";

export const UserRegistryPage = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-row">

        <div className="w-3/12">
          <Drawer />
        </div>
        <div className="w-9/12">
          <UserRegistryForm />
        </div>

      </div>
    </div>
  );
};

export default UserRegistryPage
