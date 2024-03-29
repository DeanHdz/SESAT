import { UsuarioEndpoint } from "../../../../../../../utils/usuario.endpoint";
import { Usuario } from "../../../../../../../types/ISESAT";
import { PaginatedUser } from "../../../../../../../types/IPaginate";
import StudentProfileModal from "../../../components/StudentProfileModal";
import Link from "next/link";
import clsx from "clsx";
import Search from "../../../components/Search";
import { cookies } from "next/headers";

export default async function SearchMastersStudents({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10; //10
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  if(search)
  {
    if (!isNaN(Number(search))) {
      const usuariosByIdData: Promise<Usuario[]> =
        UsuarioEndpoint.getAlumnosMaestriaById(token, parseInt(search));
      const usersByID = await usuariosByIdData;
      return (
        <>
          <Search url={"/admin-dashboard/sesat-users/alumnos/masters-degree"}/>
          <div className="mt-6 bg-white gray__border p-3">
            <table className="table table-zebra">
              <thead>
                <tr className="text-dark-blue-20">
                  <th>Clave Única</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Correo</th>
                  <th>Propiedades</th>
                </tr>
              </thead>
              <tbody>
                {usersByID?.map((user: Usuario, i: number) => (
                  <>
                    <tr key={user.id_usuario}>
                      <td>{user.id_usuario}</td>
                      <td>{`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</td>
                      <td>
                        {user.datos_alumno?.estado_activo ? "Activo" : "Inactivo"}
                      </td>
                      <td>{user.correo}</td>
                      <td>
                        <div>
                          <StudentProfileModal user={user} />
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )
    } else {
      const usuariosByNameData: Promise<Usuario[]> =
        UsuarioEndpoint.getAlumnosMaestriaByName(token, search);
      const usersByName = await usuariosByNameData;
      return (
        <>
          <Search url={"/admin-dashboard/sesat-users/alumnos/masters-degree"}/>
          <div className="mt-6 bg-white gray__border p-3">
            <table className="table table-zebra">
              <thead>
                <tr className="text-dark-blue-20">
                  <th>Clave Única</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Correo</th>
                  <th>Propiedades</th>
                </tr>
              </thead>
              <tbody>
                {usersByName?.map((user: Usuario, i: number) => (
                  <>
                    <tr key={user.id_usuario}>
                      <td>{user.id_usuario}</td>
                      <td>{`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</td>
                      <td>
                        {user.datos_alumno?.estado_activo ? "Activo" : "Inactivo"}
                      </td>
                      <td>{user.correo}</td>
                      <td>
                        <div>
                          <StudentProfileModal user={user} />
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )
    }
  }
  else {
    const usuariosData: Promise<PaginatedUser> =
      UsuarioEndpoint.getAlumnosMaestriaPaginated(token, page, limit);
    const users = await usuariosData;
    return (
      <>
        <Search url={"/admin-dashboard/sesat-users/alumnos/masters-degree"}/>
        <div className="mt-6 bg-white gray__border p-3">
          <table className="table table-zebra">
            <thead>
              <tr className="text-dark-blue-20">
                <th>Clave Única</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Correo</th>
                <th>Propiedades</th>
              </tr>
            </thead>
            <tbody>
              {users.items?.map((user: Usuario, i: number) => (
                <>
                  <tr key={user.id_usuario}>
                    <td>{user.id_usuario}</td>
                    <td>{`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</td>
                    <td>
                      {user.datos_alumno?.estado_activo ? "Activo" : "Inactivo"}
                    </td>
                    <td>{user.correo}</td>
                    <td>
                      <div>
                        <StudentProfileModal user={user} />
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 w-full flex justify-end">
          {
            !search ? 
            ( <>
              <Link
            href={{
              pathname: "/admin-dashboard/sesat-users/alumnos/masters-degree",
              query: {
                page: page > 1 ? page - 1 : 1,
                limit: limit,
              },
            }}
            className={clsx(
              "bg-dark-blue-10 text-white hover:bg-dark-blue-10 font-normal text-sm px-5 py-1 rounded-lg shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none ease-linear transition-all duration-150",
              page <= 1 && "pointer-events-none opacity-50"
            )}
          >
            Previous
          </Link>
          <p className="px-2">
            pag. <span> {users.meta.currentPage} </span> /{" "}
            <span> {users.meta.totalPages} </span>
          </p>

          <Link
            href={{
              pathname: "/admin-dashboard/sesat-users/alumnos/masters-degree",
              query: {
                page: page + 1,
                limit: limit,
              },
            }}
            className={clsx(
              "bg-dark-blue-10 text-white hover:bg-dark-blue-10 font-normal text-sm px-5 py-1 rounded-lg shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none ease-linear transition-all duration-150",
              page >= users.meta.totalPages && "pointer-events-none opacity-50"
            )}
          >
            Next
          </Link>
          </>
            ) : ""
          }
        </div>
      </>
    );
  }
}
