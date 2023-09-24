import { UsuarioEndpoint } from "../../../../../../../utils/usuario.endpoint";
import { Usuario } from "../../../../../../../types/ISESAT";
import { PaginatedUser } from "../../../../../../../types/IPaginate";
import Search from "./components/Search";
import StudentProfileModal from "./components/StudentProfileModal";
import Link from "next/link";

import clsx from 'clsx'
import Search2 from "./components/Search2";

export default async function SearchMastersStudents({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  
  /*
  //modified page ver 2
  const usuariosData: Promise<Usuario[]> =
    UsuarioEndpoint.getAlumnosMaestria("[token]");
  const usuarios = await usuariosData;

  return <Search usuarios={usuarios} />;
  */

  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 2; //10

  const usuariosData: Promise<PaginatedUser> =
    UsuarioEndpoint.getAlumnosMaestriaPaginated("[token]", page, limit);
  const users = await usuariosData;

  return(
    <>
      <Search2 />
      <div className="mt-6 bg-white gray__border p-3">
        <table className="table table-zebra">
          {/*Table head */}
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
                {/*
                parseInt(search) == user.id_usuario ||
                  (
                    `${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`
                  )
                    .toLowerCase()
                    .includes(search.toLowerCase()) ? (
                  /*<StudentProfile user={user} />*//*
                  <tr
                    key={user.id_usuario}
                  >
                    <td>{user.id_usuario}</td>
                    <td>{`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</td>
                    <td>Activo</td>
                    <td>{user.correo}</td>
                    <td>
                      <div>
                        <StudentProfileModal user={user} />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <></>
                )
                */}
                <tr
                  key={user.id_usuario}
                >
                  <td>{user.id_usuario}</td>
                  <td>{`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</td>
                  <td> 
                    activo
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
        <Link  
          href={{ 
            pathname: '/admin-dashboard/sesat-users/alumnos/masters-degree',
            query: {
              //...(search ? { search } : {}),
              page: page > 1 ? page - 1 : 1,
              limit: limit
            }    
          }} 
          className={clsx(
            "bg-dark-blue-10 text-white hover:bg-dark-blue-10 font-normal text-sm px-5 py-1 rounded-lg shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none ease-linear transition-all duration-150",
            page <= 1 && 'pointer-events-none opacity-50'
          )}
        >
          Previous 
        </Link>
        <p className="px-2">pag. <span> {users.meta.currentPage} </span> / <span> {users.meta.totalPages} </span></p>

        <Link 
          href={{
            pathname: '/admin-dashboard/sesat-users/alumnos/masters-degree',
            query: {
              //...(search ? { search } : {}),
              page: page + 1,
              limit: limit
            }
          }} 
          className={clsx(
            "bg-dark-blue-10 text-white hover:bg-dark-blue-10 font-normal text-sm px-5 py-1 rounded-lg shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none ease-linear transition-all duration-150",
            page >= users.meta.totalPages && 'pointer-events-none opacity-50'
          )}
          >
            Next
          </Link>
      </div>
    </>
  )
}
