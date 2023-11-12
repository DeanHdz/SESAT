import Drawer from "../components/Drawer";
import StudentProfile from "../../../components/StudentProfile";
import NotFound from "@/app/(admin)/admin-dashboard/not-found";
import { fetchFullTesisHistory } from "../../../../../utils/tesis.endpoint";
import { fetchComiteMembers } from "../../../../../utils/comite.endpoint";
import ThesisInfo from "@/app/components/ThesisInfo";
import { cookies } from "next/headers";
import { LoggedUser } from "../../../../../types/ISESAT";
import { LoginEndpoint } from "../../../../../utils/login.endpoint";

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

type ComiteMember = {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre_funcion: string;
}

export default async function Home() {

  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const user: LoggedUser = await LoginEndpoint.getUserInfo(token);

  let fullHistory: undefined | ThesisFullHistory[] = await fetchFullTesisHistory(user.id_usuario, token).catch(() => { return null });

  let comite: undefined | ComiteMember[];
  if (fullHistory && Array.isArray(fullHistory)) {
    comite = await fetchComiteMembers(fullHistory[0].id_tesis, token).catch(() => { return null });
  }

  return (
    <div className="flex">
      <div className="hidden lg:flex lg:w-3/12 flex-col">
        <div className="pr-10">
        <Drawer />
        </div>
        {/*<ThesisHistory />*/}
      </div>

      {fullHistory ? (
        <div className="w-full lg:w-9/12">
          <div className="w-full mb-6 flex">
            <label className="text-4xl text-black/40 font-bold">
              Tus Datos
            </label>
          </div>
          {Array.isArray(fullHistory) && (
            <StudentProfile tesis={fullHistory[0]} />
          )}

          <div className="w-full mt-16 mb-6 flex">
            <label className="text-4xl text-black/40 font-bold">
              Comité de Evaluación
            </label>
          </div>

          <div className="w-full px-8 py-10 mt-4 mb-4 bg-white  gray__border !rounded-[15px] flex flex-col lg:flex-row">
            <table className="table table-zebra">
              <thead>
                <tr className="text-dark-blue-20">                  
                  <th>Nombre</th>
                  <th>Función</th>                  
                </tr>
              </thead>
              <tbody>
                {comite?.map((member, i) => (
                  <>
                    <tr                      
                    >
                      
                      <td>{`${member.nombre} ${member.apellido_paterno} ${member.apellido_materno}`}</td>
                      <td>{member.nombre_funcion}</td>                                            
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/*<div className="flex">
          <ThesisHistory />
  </div>*/}

          <label className="mb-6 mt-16 block text-4xl text-black/40 font-bold">
            Historial de tesis completo
          </label>

          {fullHistory?.map((elem, i) => (
            <ThesisInfo tesis={elem} key={i}/>
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