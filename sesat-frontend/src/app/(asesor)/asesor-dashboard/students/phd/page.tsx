import Drawer from "../../components/Drawer";
import { UsuarioEndpoint } from "../../../../../../utils/usuario.endpoint";
import HistoryPath from "../../components/HistoryPath";

type Asesorado = {
  id_usuario: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
}

export default async function Home() {

  let alumnos: Asesorado[] = await UsuarioEndpoint.getAlumnosAsesoradosArray(333333, 2, "");
  return (
    <main className="w-full flex">

      <div className="hidden lg:flex lg:w-3/12 flex-col">
        <Drawer />
      </div>

      <div className="w-full lg:w-9/12">
        <label className="mb-6 block text-4xl font-bold">
          Alumnos de Doctorado
        </label>
        <div className="mt-6 mb-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-end">
          <input
            type="search"
            placeholder="Buscar alumno"
            className="rounded-full border-b border-light-gray-22 border-solid px-6"
          />
          <div className="flex items-center ml-2">
            <svg
              stroke="#d5d3dd"
              fill="#d5d3dd"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="24px"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"></path>
            </svg>
          </div>
        </div>
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