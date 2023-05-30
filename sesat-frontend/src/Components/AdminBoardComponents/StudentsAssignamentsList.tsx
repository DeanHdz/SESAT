import { useState } from "react";
import AdminAssignmentCard from "../NewAssignment/AdminAssignmentCard";

const StudentAssignamentsList = ({
  title,
  modalidad,
}: {
  title: string;
  modalidad: string;
}) => {
  const [status, setStatus] = useState("Estado"); //Activa-Pendiente-No hay alumnos
  const [status1, setStatus1] = useState("Estado");
  const [status2, setStatus2] = useState("Estado");
  const [status3, setStatus3] = useState("Estado");
  const [status4, setStatus4] = useState("Estado");
  const [status5, setStatus5] = useState("Estado");
  const [status6, setStatus6] = useState("Estado");
  const [status7, setStatus7] = useState("Estado");
  const [status8, setStatus8] = useState("Estado");
  const [status9, setStatus9] = useState("Estado");
  const [status10, setStatus10] = useState("Estado");

  //join de tablas usuario tesis datos_alumno
  //Condiciones
  //Caso registro:
  //ultimo_avance -> 0
  //grado_estudio -> Maestria

  //obtener id_tesis
  //Subconsulta
  //Diferencia de conjuntos
  //Obtener los que no estan en la tabla asignacion_tesis

  //si retorna 0, no hay alumnos
  //si una de las asignaciones este activa, el estado es activa
  //

  return (
    <div className="w-full p-6 flex flex-col">
      <label className="mb-3 block text-4xl font-bold">{"Alumnos de " + modalidad}</label>
      <label className=" block text-xl font-bold">{title}</label>
      <div className="mt-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-start">
        <label className=" block text-xl font-light">
          Alumnos de tiempo completo
        </label>
      </div>

      <AdminAssignmentCard
        title="Seminario de Tesis I (20% de avance)"
        status={status1}
      />
      <AdminAssignmentCard
        title="Seminario de Tesis II (50% de avance)"
        status={status2}
      />
      <AdminAssignmentCard
        title="Seminario de Tesis III (90% de avance)"
        status={status3}
      />

      <div className="mt-14 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-start">
        <label className=" block text-xl font-light">
          Alumnos de medio tiempo
        </label>
      </div>

      <AdminAssignmentCard title="Avance 1" status={status5} />
      <AdminAssignmentCard
        title="Seminario de Tesis I (20% de la tesis)"
        status={status6}
      />
      <AdminAssignmentCard title="Avance 3" status={status7} />
      <AdminAssignmentCard
        title="Seminario de Tesis II (50% de la tesis)"
        status={status8}
      />
      <AdminAssignmentCard title="Avance 5" status={status9} />
      <AdminAssignmentCard
        title="Seminario de Tesis III (90% de la tesis)"
        status={status10}
      />
    </div>
  );
};

export default StudentAssignamentsList;
