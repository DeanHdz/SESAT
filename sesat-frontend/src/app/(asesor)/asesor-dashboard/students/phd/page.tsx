import Drawer from "../../components/Drawer";
import { UsuarioEndpoint } from "../../../../../../utils/usuario.endpoint";
import HistoryPath from "../../components/HistoryPath";
import { LoggedUser } from "../../../../../../types/ISESAT";
import { LoginEndpoint } from "../../../../../../utils/login.endpoint";
import { cookies } from "next/headers";

type Asesorado = {
  id_usuario: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
}

export default async function Home() {

  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const user: LoggedUser = await LoginEndpoint.getUserInfo(token);
  let alumnos: Asesorado[] = await UsuarioEndpoint.getAlumnosAsesoradosArray(user.id_usuario, 2, token);
  return (
    <main className="w-full flex">

      <div className="hidden lg:flex lg:w-3/12 flex-col pr-10">
        <Drawer />
      </div>

      <div className="w-full lg:w-9/12">
        <label className="mb-6 block text-4xl font-bold">
          Alumnos de Doctorado
        </label>
        <div className="mt-6 bg-white gray__border p-3">
          <table className="table table-zebra">
            <thead>
              <tr className="text-dark-blue-20">
                <th>Clave Única</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {alumnos?.map((alumno, i) => (
                <>
                  <tr
                    key={alumno.id_usuario}
                  >
                    <td>{alumno.id_usuario}</td>
                    <td>{`${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`}</td>
                    <td>{alumno.correo}</td>
                    <td>
                      <HistoryPath idAlumno={alumno.id_usuario} route="phd"/>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}