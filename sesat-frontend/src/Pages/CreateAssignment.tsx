import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import TesisRegistryForm from "../Components/TesisRegistryForm/TesisRegistryForm";
import NewAssignment from "../Components/NewAssignment/NewAssignment";
import Drawer from "../Components/Drawer/Drawer";


let paths: string[] = [];
paths.push("Nueva Asignación");

let links: string[] = [];
links.push("/create_assignment");

const CreateAssignment = () => {
  return (
  <div className="flex flex-row">
    <div className="w-3/12">
      <Drawer />
    </div>
    <div className="w-9/12">
    <NewAssignment />
    </div>
  </div>
  );
};

export default CreateAssignment;
