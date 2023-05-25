import Drawer from "../Components/Drawer/Drawer";
import StudentRegistryForm from "../Components/UserRegistryForm/StudentRegistryForm";

export const StudentRegistryPage = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-row">
        <div className="w-3/12">
          <Drawer />
        </div>
        <div className="w-9/12">
          <StudentRegistryForm />
        </div>
      </div>
    </div>
  );
};

export default StudentRegistryPage