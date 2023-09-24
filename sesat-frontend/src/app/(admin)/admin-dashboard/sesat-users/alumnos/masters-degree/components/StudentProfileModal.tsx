"use client"

import { useState, useEffect } from "react";
import SelectAsesores from "../../../../../../components/SelectAsesores";
import SelectProgramas from "../../../../../../components/SelectProgramas";
import { Programa, Usuario } from "../../../../../../../../types/ISESAT";


const StudentProfileModal = ({ user }: { user: Usuario }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState<boolean>(true); //had to default it
  const [program, setProgram] = useState<string>("");

  const [activeTab0, setActiveTab0] = useState("tab-active");
  const [activeTab1, setActiveTab1] = useState("");


  const [isChecked, setIsChecked] = useState(false);

  const [asesor, setAsesor] = useState("");
  const [Asesores, setAsesores] = useState<Usuario[] | undefined>(
    undefined
  );

  //custom Hook para sacar los datos de los asesores del backend
  const getAsesoresData = async () => {
    /*setAsesores(await UsuarioEndpoint.getAsesores(""));*/
  };


  function setActiveTab(tab: number) {
    switch (tab) {
      case 1:
        setActiveTab0("tab-active");
        setActiveTab1("");
        break;
      case 2:
        setActiveTab0("");
        setActiveTab1("tab-active");
        break;

    }
  }
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
        className="bg-dark-blue-10 text-white hover:bg-dark-blue-10 font-normal text-sm px-5 py-1 rounded-full shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Modificar
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[600px] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                {/*header*/}
                <div className="flex items-start justify-between p-5 ">
                  <h3 className="text-2xl font-semibold">Editar datos del Alumno</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="tabs w-full px-6">
                  <a className={`tab tab-lifted ${activeTab0}`} onClick={() => { setActiveTab(1) }}>Datos generales</a>
                  <a className={`tab tab-lifted ${activeTab1}`} onClick={() => { setActiveTab(2) }}>Comité de evaluación</a>
                </div>

                {activeTab0 === 'tab-active' && (
                  <form onSubmit={handleSubmit}>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <div className="form-control w-full max-w-xs">
                        <label className="my-3 block text-lg font-bold">
                          Programa de posgrado
                        </label>

                        <select
                          required
                          className="select-bordered gray__border text-sm"
                          onChange={(e) => {
                            setProgram(e.target.value);
                          }}
                        >
                          <option disabled selected>
                            Actualizar programa
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
                          className="select-bordered gray__border text-sm"
                          onChange={(e) => {
                            if (e.target.value == "0") setActiveStatus(false);
                            else if (e.target.value == "1") {
                              setActiveStatus(true);
                            }
                          }}
                        >
                          <option disabled selected>
                            Actualizar estado activo
                          </option>
                          <option value={"0"}>Inactivo</option>
                          <option value={"1"}>Activo</option>
                        </select>
                      </div>

                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end px-6 py-2">
                      <button
                        className="secondary__btn mr-3 "
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Descartar
                      </button>
                      <button
                        className="primary__btn"
                        type="submit"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                )}
                {activeTab1 === 'tab-active' && (
                  <form onSubmit={handleSubmit}>
                    {/*body*/}
                    <div className="relative px-6 flex-auto">
                      <div className="form-control w-full max-w-xs">

                        <label className="my-3 block text-lg font-bold">
                          Asesor de tesis
                        </label>

                        <select
                          required
                          className="select-bordered gray__border text-sm"
                          onChange={(e) => {
                            setProgram(e.target.value);
                          }}
                        >
                          <option disabled selected>
                            Actualizar asesor
                          </option>
                          {listaProgramas ? (
                            <SelectProgramas programas={listaProgramas} />
                          ) : (
                            ""
                          )}
                        </select>
                      </div>
                      <div className="form-control w-full max-w-xs">

                        <label className=" my-2 block text-lg font-bold">
                          Integrante 2
                        </label>

                        <select
                          required
                          className="select-bordered gray__border text-sm"
                          onChange={(e) => {
                            if (e.target.value == "0") setActiveStatus(false);
                            else if (e.target.value == "1") {
                              setActiveStatus(true);
                            }
                          }}
                        >
                          <option disabled selected>
                            Actualizar
                          </option>
                          <option value={"0"}>Inactivo</option>
                          <option value={"1"}>Activo</option>
                        </select>
                      </div>

                      <div className="form-control w-full max-w-xs">
                        <label className="my-3 block text-lg font-bold">
                          Integrante 3
                        </label>
                        <select
                          className="select-bordered gray__border text-sm"
                          required
                          onChange={(e) => {
                            setAsesor(e.target.value);
                          }}
                        >
                          <option disabled selected>
                            Actualizar
                          </option>
                          {
                            renderSelectAsesores() //display las opciones de asesores de manera condicional
                          }
                        </select>
                      </div>
                      <div className="form-control w-full max-w-xs">
                        <label className="my-3 block text-lg font-bold">
                          Integrante 4
                        </label>
                        <select
                          className="select-bordered gray__border text-sm"
                          required
                          onChange={(e) => {
                            setAsesor(e.target.value);
                          }}
                        >
                          <option disabled selected>
                            Actualizar
                          </option>
                          {
                            renderSelectAsesores() //display las opciones de asesores de manera condicional
                          }
                        </select>
                      </div>

                      <div className="form-control w-full max-w-xs">
                        <label className="my-3 block text-lg font-bold">
                          Integrante 5
                        </label>
                        <select
                          className="select-bordered gray__border text-sm"
                          required
                          onChange={(e) => {
                            setAsesor(e.target.value);
                          }}
                        >
                          <option disabled selected>
                            Actualizar
                          </option>
                          {
                            renderSelectAsesores() //display las opciones de asesores de manera condicional
                          }
                        </select>
                      </div>

                    </div>

                    {/*footer*/}
                    <div className="flex items-center justify-end px-6 py-2">
                      <button
                        className="secondary__btn mr-3 "
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Descartar
                      </button>
                      <button
                        className="primary__btn"
                        type="submit"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                )}

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
