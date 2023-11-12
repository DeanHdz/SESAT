import Drawer from "../../../components/Drawer";
import StudentProfile from "../../../../../components/StudentProfile";
import ThesisInfo from "../../../../../components/ThesisInfo";
import { fetchValidateRole } from "../../../../../../../utils/comite.endpoint";
import { fetchFullTesisHistory } from "../../../../../../../utils/tesis.endpoint";
import NotFound from "@/app/(admin)/admin-dashboard/not-found";
import { LoginEndpoint } from "../../../../../../../utils/login.endpoint";
import { cookies } from "next/headers";
import { LoggedUser } from "../../../../../../../types/ISESAT";

type RoleProps = {
  nombre_funcion: string;
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
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const user: LoggedUser = await LoginEndpoint.getUserInfo(token);

  let { idAlumno } = params;
  let role: RoleProps = await fetchValidateRole(user.id_usuario, +idAlumno, token).catch(() => { return null });
  let fullHistory: undefined | ThesisFullHistory[] = undefined;

  if (role && role.id_tesis) {
    fullHistory = await fetchFullTesisHistory(+idAlumno, token).catch(() => { return null });
  }
  return (
    <div className="flex mb-40">
      <div className="hidden lg:flex lg:w-3/12 flex-col pr-10">
        <Drawer />
      </div>

      {role && role.id_tesis ? (
        <div className="w-full lg:w-9/12">
          <div className="w-full mb-6 flex flex-row">
            <label className="text-4xl text-black/40 font-bold">
              Datos del alumno
            </label>
            <div className="ml-auto flex flex-row items-center">
              <div className="mr-3">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.2"
                  baseProfile="tiny"
                  viewBox="0 0 24 24"
                  height="20px"
                  width="20px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 14c1.381 0 2.631-.56 3.536-1.465.904-.904 1.464-2.154 1.464-3.535s-.56-2.631-1.464-3.535c-.905-.905-2.155-1.465-3.536-1.465s-2.631.56-3.536 1.465c-.904.904-1.464 2.154-1.464 3.535s.56 2.631 1.464 3.535c.905.905 2.155 1.465 3.536 1.465zM20 15c.69 0 1.315-.279 1.768-.731.453-.452.732-1.077.732-1.769 0-.69-.279-1.315-.732-1.768-.453-.453-1.078-.732-1.768-.732-.691 0-1.316.279-1.769.732-.452.453-.731 1.078-.731 1.768 0 .691.279 1.316.731 1.769s1.078.731 1.769.731zM20 15.59c-1.331 0-2.332.406-2.917.968-1.115-.917-2.878-1.558-5.083-1.558-2.266 0-3.995.648-5.092 1.564-.596-.565-1.608-.974-2.908-.974-2.188 0-3.5 1.09-3.5 2.182 0 .545 1.312 1.092 3.5 1.092.604 0 1.146-.051 1.623-.133l-.04.27c0 1 2.406 2 6.417 2 3.762 0 6.417-1 6.417-2l-.02-.255c.463.073.995.118 1.603.118 2.051 0 3.5-.547 3.5-1.092 0-1.092-1.373-2.182-3.5-2.182zM4 15c.69 0 1.315-.279 1.768-.732.453-.453.732-1.078.732-1.768 0-.689-.279-1.314-.732-1.768-.453-.452-1.078-.732-1.768-.732-.691 0-1.316.28-1.769.732-.452.454-.731 1.079-.731 1.768 0 .69.279 1.315.731 1.768.453.453 1.078.732 1.769.732z"></path>
                </svg>
              </div>
              <p className="font-SESAT">Función en el Comité de evaluación:</p>
              <p className="ml-3 font-light">{role.nombre_funcion}</p>
            </div>
          </div>
          {Array.isArray(fullHistory) && (
            <StudentProfile tesis={fullHistory[0]} />
          )}

          {/*<div className="flex">
          <ThesisHistory />
  </div>*/}

          <label className="mb-6 mt-16 block text-4xl text-black/40 font-bold">
            Historial de tesis completo
          </label>

          {fullHistory?.map((elem) => (
            <ThesisInfo tesis={elem} />
          ))}

        </div>
      ) : (
        <div className="w-full lg:w-9/12">
          <NotFound />
        </div>
      )}
    </div>
  );
}