import { useEffect, useState } from "react";
import { SESAT } from "../../Interfaces/ISESAT";
import { UsuarioPruebaEndpoint } from "../../api/usuario-prueba.endpoint";
import { UsuarioEndpoint } from "../../api/usuario.endpoint";

export const AsesorRegistryForm = () => {
  const [claveUnica, setClaveUnica] = useState("");

  const [hasShownUserInfo, setHasShownUserInfo] = useState(false);
  const [usuarioPrueba, setUsuarioPrueba] = useState<
    SESAT.UsuarioPrueba | undefined
  >();

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
          apellido_paterno: usuarioPrueba?.apellido_mat! ?? "",
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

  //0 --> Medio tiempo
  //1 -->Tiempo completo

  return (
    <>
      <div className="flex flex-wrap gap-4 m-8 ">
        <label className="block text-4xl font-bold">Dar de alta Asesor</label>
        <div className="border-b border-light-gray-22 border-solid w-full"></div>

        <form
          onSubmit={handleSubmit}
          className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start"
        >
          <p className="text-3xl">Añadir Asesor</p>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Clave Única</span>
            </label>
            <input
              type="text"
              placeholder="0-9"
              maxLength={6}
              className="input rounded input-bordered w-full max-w-xs"
              value={claveUnica}
              onChange={(e) => {
                setClaveUnica(e.target.value);
              }}
            />
          </div>


          <div className="ml-auto mt-5 flex justify-end items-center">
            <button type="submit" className="btn shadow rounded">
              Agregar
            </button>
          </div>
        </form>

        <div className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start">
          <p className="text-3xl">Datos de usuario</p>
          {usuarioPrueba ? (
            <div className="form-control w-full max-w-xs">
              <label className="label text-black">
                <span className="label-text text-xl text-dark-blue-10 font-bold">Nombre</span><br/><br/>
                {usuarioPrueba?.nombre}
              </label>

              <label className="label text-black">
                <span className="label-text text-xl text-dark-blue-10 font-bold">Apellido Paterno</span><br/><br/>
                {usuarioPrueba?.apellido_pat}
              </label>
              <label className="label text-black">
                <span className="label-text text-xl text-dark-blue-10 font-bold">Apellido Materno</span><br/><br/>
                  {usuarioPrueba?.apellido_mat}
              </label>
              <label className="label text-black">
                <span className="label-text text-xl text-dark-blue-10 font-bold">Correo</span><br/><br/>
                {usuarioPrueba?.correo}
              </label>            
            </div>
          ) : (
            <label className="label">
              <span className="label-text">No existe el usuario</span>
            </label>
          )}
        </div>
      </div>
    </>
  );
};

export default AsesorRegistryForm;