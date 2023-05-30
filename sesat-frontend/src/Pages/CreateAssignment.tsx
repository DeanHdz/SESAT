import NewAssignment from "../Components/NewAssignment/NewAssignment";
import Drawer from "../Components/Drawer/Drawer";
import { useNavigate, useLocation } from "react-router-dom";

let paths: string[] = [];
paths.push("Nueva Asignación");

let links: string[] = [];
links.push("/create_assignment");

const CreateAssignment = () => {
  const location = useLocation();

  const title = location.state.title;

  console.log(title);

  return (
    <div className="flex flex-row">
      <div className="w-3/12">
        <Drawer />
      </div>
      <div className="w-9/12">
        <NewAssignment program="Programa" title={title} />
      </div>
    </div>
  );
};

export default CreateAssignment;
