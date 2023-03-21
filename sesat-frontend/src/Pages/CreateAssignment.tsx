import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import TesisRegistryForm from "../Components/TesisRegistryForm/TesisRegistryForm";
import NewAssignment from "../Components/NewAssignment/NewAssignment";

let paths: string[] = [];
paths.push("Nueva Asignación");

let links: string[] = [];
links.push("/create_assignment");

const CreateAssignment = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Nueva Asignación "} />
      <BreadcrumbContainer paths={paths} links={links} />
      <NewAssignment />
    </div>
  );
};

export default CreateAssignment;
