import { useEffect, useState } from "react";

export const ExternalAsesorRegistryForm = () => {
  const [nombre, setNombre] = useState<string>();
  const [apPaterno, setApPaterno] = useState<string>();
  const [apMaterno, setApMaterno] = useState<string>();
  const [correo, setCorreo] = useState<string>();
  const [telefono, setTelefono] = useState<string>();
  const [institucion, setInstitucion] = useState<string>();

  {/** commented for testing ui
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const vars = await VariablesSistemaEndpoint.getVariablesSistema(1,"");
      const id_datos = await DatosAsesorExternoEndpoint.postDatosAsesorExterno(
        {
          telefono: telefono! ?? "",
          institucion: institucion! ?? "",
        },
        ""
      )
      await UsuarioEndpoint.postUsuario(
        {
          clave: vars?.indice_clave_asesorexterno! ?? 0,
          nombre: nombre! ?? "",
          apellido_paterno: apPaterno! ?? "",
          apellido_materno: apMaterno! ?? "",
          password: "pass1234", //always gonna be default
          id_rol: 4,
          id_datos_alumno: null,
          correo: correo! ?? "",
          id_datos_asesorexterno: id_datos?.id_datos_asesorexterno! ?? null,
        },
        ""
      );
      if(vars){
        await VariablesSistemaEndpoint.putVariablesSistema({
          id_variables_sistema: 1,
          indice_clave_asesorexterno: vars?.indice_clave_asesorexterno + 1,
        },"")
      }
    } catch (err) {
      console.log(err);
    }
    //window.location.reload();
  }

   */}

  return (
    <div className="flex flex-wrap gap-4 m-8 ">
      <label className="block text-4xl font-bold">
        Dar de alta Asesor
        </label>
      <div className="border-b border-light-gray-22 border-solid w-full"></div>

      <form
        /*onSubmit={handleSubmit}*///Commented for testing ui
        className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start"
      >
        <p className="text-3xl">Añadir Asesor Externo</p>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            placeholder="Nombre"
            className="input rounded input-bordered w-full max-w-xs"
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
          <label className="label">
            <span className="label-text">Apellido Paterno</span>
          </label>
          <input
            type="text"
            placeholder="Apellido Paterno"
            className="input rounded input-bordered w-full max-w-xs"
            onChange={(e) => {
              setApPaterno(e.target.value);
            }}
          />
          <label className="label">
            <span className="label-text">Apellido Materno</span>
          </label>
          <input
            type="text"
            placeholder="Apellido Paterno"
            className="input rounded input-bordered w-full max-w-xs"
            onChange={(e) => {
              setApMaterno(e.target.value);
            }}
          />
          <label className="label">
            <span className="label-text">Correo</span>
          </label>
          <input
            type="text"
            placeholder="Correo"
            className="input rounded input-bordered w-full max-w-xs"
            onChange={(e) => {
              setCorreo(e.target.value);
            }}
          />
          <label className="label">
            <span className="label-text">Teléfono</span>
          </label>
          <input
            type="text"
            placeholder="Número de teléfono a 10 dígitos"
            maxLength={10}
            className="input rounded input-bordered w-full max-w-xs"
            onChange={(e) => {
              setTelefono(e.target.value);
            }}
          />
          <label className="label">
            <span className="label-text">Institución</span>
          </label>
          <input
            type="text"
            placeholder="Institución"
            className="input rounded input-bordered w-full max-w-xs"
            onChange={(e) => {
              setInstitucion(e.target.value);
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