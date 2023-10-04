"use client";
import { useState } from "react";
import { UsuarioPrueba } from "../../../../../../../../types/ISESAT";
import Tabs from "../components/Tabs";

export default function MasterStudentRegistryForm() {

  {/**Tabla de datos de asesores para seleccionar el que se va a registrar*/ }
  const [selectedUser, setSelectedUser] = useState<UsuarioPrueba | null>(null);

  const [claveUnica, setClaveUnica] = useState("");

  const [hasShownUserInfo, setHasShownUserInfo] = useState(false);
  const [usuariosPrueba, setUsuariosPrueba] = useState<
    UsuarioPrueba[] | undefined
  >();

  {/** Commented for testing ui

  const getUsuarioPrueba = async () => {
    if (claveUnica && claveUnica.length == 6) {
      setUsuarioPrueba(
        await UsuarioPruebaEndpoint.getUsuarioPrueba(parseInt(claveUnica), "")
      );
      setHasShownUserInfo(true);
    }

    if (hasShownUserInfo == true) {
      setUsuarioPrueba(
        await UsuarioPruebaEndpoint.getUsuarioPrueba(parseInt(claveUnica), "")
      );
      setHasShownUserInfo(false);
    }
  };

  useEffect(() => {
    getUsuarioPrueba();
  }, [claveUnica]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      await UsuarioEndpoint.postUsuario(
        {
          clave: parseInt(claveUnica),
          nombre: usuarioPrueba?.nombre! ?? "",
          apellido_paterno: usuarioPrueba?.apellido_pat! ?? "",
          apellido_materno: usuarioPrueba?.apellido_mat! ?? "",
          password: usuarioPrueba?.password! ?? "",
          id_rol: 2,
          id_datos_alumno: null,
          correo: usuarioPrueba?.correo! ?? "",
          id_datos_asesorexterno: null,
        },
        ""
      );
    } catch (err) {
      console.log(err);
    }
    //window.location.reload();
  }
 */}
  //0 --> Medio tiempo
  //1 -->Tiempo completo

  return (
    <>
      <form className="w-full flex flex-col">
        <div className="h-fit w-full gray__border mt-10 p-6">
          <span className="font-bold ">Complete los siguientes datos para realizar el registro.</span>          
            <div className={`h-fit w-full my-10`}>
              <div className="flex flex-col mt-10">
                <span className="mt-3">Ingrese la clave única o el nombre del alumno para buscar, seleccione una opción.</span>
                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="Nombre o clave única"
                    maxLength={6}
                    className="gray__border input-bordered w-full max-w-lg"
                    value={claveUnica}
                    onChange={(e) => {
                      setClaveUnica(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="mt-6 bg-white gray__border p-3">
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/*Table head */}
                    <thead>
                    <tr className="text-dark-blue-20">
                        <th></th>
                        <th>Clave Única</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuariosPrueba?.map((user) => (
                        <tr
                          key={user.clave_unica}
                          onClick={() => setSelectedUser(user)}
                          /** Visualizar la seleccion de un renglon*/
                          className={selectedUser?.clave_unica === user.clave_unica ? '!bg-dark-blue-10 rounded !text-white' : 'cursor-pointer'}
                        >
                          <td>{user.clave_unica}</td>
                          <td>{`${user.nombre} ${user.apellido_pat} ${user.apellido_mat}`}</td>
                          <td>{user.correo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          <div className="w-full mt-6 flex justify-end">
            <button type="submit" className="primary__btn">
              Registrar alumno en SESAT
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
