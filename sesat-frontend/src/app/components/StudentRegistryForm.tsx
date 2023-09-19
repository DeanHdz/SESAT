import { useEffect, useState } from "react";


import SelectProgramas from "./SelectProgramas";
import { Programa, UsuarioPrueba } from "../../../types/ISESAT";


export const StudentRegistryForm = () => {
  const [claveUnica, setClaveUnica] = useState("");
  const [program, setProgram] = useState<string>("");
  const [activeStatus, setActiveStatus] = useState<boolean>(true); //had to default it
  const [modalidad, setModalidad] = useState<string>("");

  const [hasShownUserInfo, setHasShownUserInfo] = useState(false);
  const [usuarioPrueba, setUsuarioPrueba] = useState<UsuarioPrueba | undefined>();

  const [listaProgramas, setListaProgramas] = useState<Programa[] | undefined>();
  {/**Commented for test
  
  const getListaProgramas = async () =>
  {
    setListaProgramas(await ProgramaEndpoint.getProgramas(""))
  }

  useEffect(() => {
    getListaProgramas();
  }, []);

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

      const id_datos = await DatosAlumnoEndpoint.postDatosAlumno(
        {
          grado_estudio: usuarioPrueba?.grado_estudio! ?? "",
          modalidad: modalidad,
          estado_activo: activeStatus,
          id_programa: parseInt(program),
          generacion: usuarioPrueba?.generacion! ?? "",
        }, ""
      )

      const alumno = await UsuarioEndpoint.postUsuario(
        {
          clave: parseInt(claveUnica),
          nombre: usuarioPrueba?.nombre! ?? "",
          apellido_paterno: usuarioPrueba?.apellido_pat! ?? "",
          apellido_materno: usuarioPrueba?.apellido_mat! ?? "",
          password: usuarioPrueba?.password! ?? "",
          id_rol: 3,
          id_datos_alumno: id_datos?.id_datos_alumno! ?? null,
          correo: usuarioPrueba?.correo! ?? "",
          id_datos_asesorexterno: null,
        },
        ""
      );
      
      await TesisEndpoint.postTesis(
        {
          clave_alumno: alumno?.clave! ?? 0,
          titulo: null,
          fecharegistro: null,
          generacion: null,
          registrada: false,
          ultimo_avance: null,
          estado_activo: true,
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
      <div className="flex flex-wrap gap-4 m-8 ">
        <label className="block text-4xl font-bold">Dar de alta Alumno</label>
        <div className="border-b border-light-gray-22 border-solid w-full"></div>

        <form
          
          /**onSubmit={handleSubmit} */ //uncomment this
          className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start"
        >
          <p className="text-3xl">Añadir Alumno</p>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Clave Única</span>
            </label>
            <input
              type="text"
              required
              placeholder="0-9"
              maxLength={6}
              className="input rounded input-bordered w-full max-w-xs"
              value={claveUnica}
              onChange={(e) => {
                setClaveUnica(e.target.value);
              }}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Modalidad</span>
            </label>
            <select
              required
              className="select select-bordered rounded"
              onChange={(e) => {
                  setModalidad(e.target.value);
              }}
            >
              <option disabled selected>
                Seleccione una opción
              </option>
              <option value={"Medio Tiempo"}>Medio tiempo</option>
              <option value={"Tiempo Completo"}>Tiempo Completo</option>
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Estado Activo</span>
            </label>
            <select
              required
              className="select select-bordered rounded"
              onChange={(e) => {
                if (e.target.value == "0") setActiveStatus(false);
                else if (e.target.value == "1") {
                  setActiveStatus(true);
                }
              }}
            >
              <option disabled selected>
                Seleccione una opción
              </option>
              <option value={"0"}>Inactivo</option>
              <option value={"1"}>Activo</option>
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Programa</span>
            </label>
            <select
              required
              className="select select-bordered rounded"
              onChange={(e) => {
                  setProgram(e.target.value)
                }
              }
            >
              <option disabled selected>
                Seleccione una opción
              </option>
              {
                listaProgramas? (
                  <SelectProgramas programas={listaProgramas} />
                ) : ("")
              }
            </select>
          </div>

          <div className="ml-auto mt-5 flex justify-end items-center">
            <button type="submit" className="btn shadow rounded">
              Agregar
            </button>
          </div>
        </form>

        <div className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start">
          <p className="text-3xl">Datos del Usuario</p>
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
              <label className="label text-black">
                <span className="label-text text-xl text-dark-blue-10 font-bold">Grado de Estudios</span><br/><br/>
                {usuarioPrueba?.grado_estudio}
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

export default StudentRegistryForm;