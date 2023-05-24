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
      <NewAssignment program="Programa" title="Título de la asignación"/>
    </div>
  </div>
  );
};

export default CreateAssignment;
