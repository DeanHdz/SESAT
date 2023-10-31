import Drawer from "../../../components/Drawer";
import AssignmentPath from "../../../components/AssignmentPath";
import StudentProfile from "./components/StudentProfile";
import ThesisHistory from "./components/ThesisHistory";
import ThesisInfo from "./components/ThesisInfo";
import { fetchLatestPeriod } from "../../../../../../../utils/periodo.endpoint";
import { fetchValidateRole } from "../../../../../../../utils/comite.endpoint";
import { fetchFullTesisHistory } from "../../../../../../../utils/tesis.endpoint";

type RoleProps = {
  id_funcion: number;
  id_tesis: number;
}

export type ThesisFullHistory = {
  nombre_programa: string;
  id_tesis: number;
  titulo: string;
  grado: number;
  fecha_registro: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  estado_finalizacion: boolean;
  estado_activo: boolean;
}

export default async function Home({
  params,
}: {
  params: { idAlumno: string }
}) {
  let { idAlumno } = params;
  let periodo = await fetchLatestPeriod("").catch();
  let role: RoleProps = await fetchValidateRole(333333, parseInt(idAlumno), "").catch();
  let fullHistory: undefined | ThesisFullHistory[] = undefined;

  if (role && role.id_tesis) {
    fullHistory = await fetchFullTesisHistory(parseInt(idAlumno), "").catch()
  }
  return (
    <div className="flex mb-40">
      <div className="hidden lg:flex lg:w-3/12 flex-col">
        <Drawer />
      </div>

      <div className="w-full lg:w-9/12">
        <label className="mb-6 block text-4xl font-bold">
          Datos del alumno
        </label>
        {Array.isArray(fullHistory) && (
          <StudentProfile tesis={fullHistory[0]} />
        )}

        {/*<div className="flex">
          <ThesisHistory />
  </div>*/}

        <label className="mb-6 mt-16 block text-4xl font-bold">
          Historial de tesis completo
        </label>        

        {fullHistory?.map((elem) => (
          <ThesisInfo tesis={elem} />
        ))}

      </div>
    </div>
  );
}