import { useEffect, useState } from "react";
import { SESAT } from "../../Interfaces/ISESAT";
import { UsuarioPruebaEndpoint } from "../../api/usuario-prueba.endpoint";
import { UsuarioEndpoint } from "../../api/usuario.endpoint";

export const ExternalAsesorRegistryForm = () => {
  const [claveUnica, setClaveUnica] = useState("");


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

  return (
    
      <div className="flex flex-wrap gap-4 m-8 ">
        <label className="block text-4xl font-bold">Dar de alta Asesor</label>
        <div className="border-b border-light-gray-22 border-solid w-full"></div>

        <form
          onSubmit={handleSubmit}
          className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start"
        >
          <p className="text-3xl">Añadir Asesor Externo</p>

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
      </div>
  )
};

export default ExternalAsesorRegistryForm;