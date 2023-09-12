import { useState, useEffect } from "react";
import SelectAsesores from "./SelectAsesores";
import SelectProgramas from "./SelectProgramas";
import { Programa, Usuario } from "../../../types/ISESAT";



const StudentProfileModal = ({ user }: { user: Usuario }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState<boolean>(true); //had to default it
  const [program, setProgram] = useState<string>("");
  

  const [isChecked, setIsChecked] = useState(false);

  const [asesor, setAsesor] = useState("");
  const [Asesores, setAsesores] = useState<Usuario[] | undefined>(
    undefined
  );

  //custom Hook para sacar los datos de los asesores del backend
  const getAsesoresData = async () => {
    /*setAsesores(await UsuarioEndpoint.getAsesores(""));*/
  };

  useEffect(() => {
    if (showModal === true) {
      console.log("useEffect");
      getAsesoresData();
    }
  }, [showModal]);

  const renderSelectAsesores = () => {
    if (Asesores != undefined) {
      return <SelectAsesores asesores={Asesores} />;
    }
  };

  const [listaProgramas, setListaProgramas] = useState<
    Programa[] | undefined
  >();

  const getListaProgramas = async () => {
    /*setListaProgramas(await ProgramaEndpoint.getProgramas(""));*/
  };

  useEffect(() => {
    if (showModal === true) {
      console.log("useEffect");
      getListaProgramas();
    }
  }, [showModal]);

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      /*
      DatosAlumnoEndpoint.putDatosAlumno(
        {
          id_datos_alumno: user.id_datos_alumno! ?? 0,
          grado_estudio: user.datos_alumno?.grado_estudio! ?? "",
          modalidad: user.datos_alumno?.modalidad! ?? "",
          estado_activo: activeStatus! ?? user.datos_alumno?.estado_activo,
          id_programa: parseInt(program)! ?? user.datos_alumno?.id_programa,
          generacion: user.datos_alumno?.generacion! ?? "",
        },
        ""
      );
      */
      {/**
      TesisEndpoint.getTesisPerStudent(user.clave, "").then((tesis) => {
        if (tesis) {
          console.log("Tesis" + tesis);
          ComiteEndpoint.getPerTesis(tesis.id_tesis, "").then((comite) => {
            if (comite) {
              comite.forEach((c) => {
                if (c.id_tesis == tesis.id_tesis && c.funcion.id_funcion === 1) {
                  ComiteEndpoint.putComite(
                    {
                      id_comite: c.id_comite,
                      clave_asesor: parseInt(asesor)! ?? c.clave_asesor,
                      id_tesis: c.id_tesis,
                      id_funcion: c.id_funcion,
                    },
                    ""
                  );
                }
              });
            }
          });
        }
      });
       */}

    } catch (err) {
      console.log(err);
    }
    setShowModal(false);
  }

  return (
    <>
      <button
        className="bg-[SESAT] bg-dark-blue-10 text-white active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Editar Alumno
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Editar Alumno</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="my-3 block text-lg font-bold">
                          Programa
                        </span>
                      </label>
                      <select
                        required
                        className="select select-bordered rounded"
                        onChange={(e) => {
                          setProgram(e.target.value);
                        }}
                      >
                        <option disabled selected>
                          Seleccione una opción
                        </option>
                        {listaProgramas ? (
                          <SelectProgramas programas={listaProgramas} />
                        ) : (
                          ""
                        )}
                      </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className=" my-3 block text-lg font-bold">
                          Estado Activo
                        </span>
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
                      <label className="my-3 block text-lg font-bold">
                        Asesor
                      </label>
                      <select
                        className="select select-bordered rounded"
                        required
                        onChange={(e) => {
                          setAsesor(e.target.value);
                        }}
                      >
                        <option disabled selected>
                          Nombre completo Asesor/a
                        </option>
                        {
                          renderSelectAsesores() //display las opciones de asesores de manera condicional
                        }
                      </select>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cerrar
                    </button>
                    <button
                      className="bg-dark-blue-10 text-white active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default StudentProfileModal;
