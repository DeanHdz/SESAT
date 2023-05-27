import { TbPointFilled } from "react-icons/tb";
import TesisCard from "../TesisView/TesisCard";
import ReminderCard from "../ReminderCard/ReminderCard";
import CommentNew from "../CommentSection/CommentNew";
import Contact from "../Contact/Contact";
import AssignmentCard from "../NewAssignment/AssignmentCard";

const Board = () => {
  return (
    <form className="mt-10 lg:flex lg:flex-row w-11/12 m-auto">
      <div className="block w-11/12 lg:w-8/12 mr-6">
      <TesisCard />
        <div className="block mt-10 p-6 h-fit rounded border border-light-gray-22 border-solid">
          <label className="m-3 block text-2xl font-bold">Asignaciones</label>
          <AssignmentCard />
        </div>
        <div className="block h-fit">
          <div className="lg:flex lg:flex-row">
            <div className="block w-3/6">
              <div className="mt-10 p-6 mr-6 bg-light-blue-10 rounded border border-light-gray-22 border-solid">
                <label className="mb-3 block text-lg font-bold">Contacto</label>
                <Contact />
                <Contact />
                <Contact />
              </div>
            </div>
            <div className="block w-3/6">
              <div className="mt-10 p-6 rounded border border-light-gray-22 border-solid">
                <label className="mb-3 block text-lg font-bold">
                  Control de versiones
                </label>
                <ReminderCard />
                <ReminderCard />
                <ReminderCard />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block w-11/12 lg:w-4/12 h-fit ">
        <div className="p-6 bg-light-blue-10 rounded border border-light-gray-22 border-solid">
          <label className="mb-3 block text-lg font-bold">Notificaciones</label>
          <ul>
            <li className="flex items-center">
              <TbPointFilled /> Item 1
            </li>
            <li className="flex items-center">
              <TbPointFilled /> Item 2
            </li>
            <li className="flex items-center">
              <TbPointFilled /> Item 3
            </li>
          </ul>
        </div>

        <div className="mt-10 p-6 rounded border border-light-gray-22 border-solid">
          <label className="mb-3 block text-lg font-bold">Comentarios</label>
          <CommentNew />
          <CommentNew />
          <CommentNew />
        </div>
      </div>
    </form>
  );
};

export default Board;
