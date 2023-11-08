import React, { useEffect, useState } from "react";
import { TesisInfo } from "../[idAsignacion]/page";
import { Asignacion } from "../../../../../../types/ISESAT";
import { formatAsISODate, shortFormatDate } from "../../../../../../utils/utils";
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import autosize from "autosize";
import { fetchActaEvaluacion, postActaEvaluacion } from "../../../../../../utils/acta-evaluacion.endpoint";
import PDFViewer from "./PDFViewer";
import ProcessingAnim from "@/app/components/ProcessingAnim";
import Cookies from 'js-cookie';
import { postNotificacion } from "../../../../../../utils/notification.endpoint";

const ActFormModal = ({
  tesisInfo, asignacion
}: {
  tesisInfo: TesisInfo, asignacion: Asignacion
}) => {
  const cookie = Cookies.get("SESATsession");
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";

  const [isOpen, setIsOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedPDF, setPDF] = useState<undefined | Array<number>>(undefined);
  const [fechaEval, setFechaEval] = useState(new Date());
  const [porcentajeAv, setPrcAvance] = useState(30);
  const [comentarios, setComentarios] = useState("");
  const [documentoAvance, setDocAvance] = useState("");
  const [exposicion, setExposicion] = useState("");
  const [dominioTema, setDominioTema] = useState("");
  const [gradoAvance, setGradoAvance] = useState("");
  const [promedio, setPromedio] = useState("0");
  const [fechaToefl, setFechaToefl] = useState(new Date());
  const [puntajeToefl, setPuntajeToefl] = useState("");
  const [proxToefl, setProxToefl] = useState(new Date());
  const [observaciones, setObservaciones] = useState("");

  const openActFormModal = () => {
    document.body.classList.add('modal-open');
    setIsOpen(true);

    if (asignacion.calificacion && asignacion.id_acta_evaluacion !== null) {
      setIsSubmitting(true);
      fetchPDFActaEvaluacion(asignacion.id_acta_evaluacion);
    }
  };

  async function fetchPDFActaEvaluacion(idActa: number) {    
    const res = await fetchActaEvaluacion(idActa, token);
    setPDF(res.documento_rellenado.data);
    setIsSubmitting(false);
  }

  const closeActFormModal = () => {
    document.body.classList.remove('modal-open');
    setIsOpen(false);
  };

  useEffect(() => {
    let p = (parseInt(documentoAvance) + parseInt(exposicion) + parseInt(dominioTema) + parseInt(gradoAvance)) / 4;
    setPromedio(isNaN(p) ? "0" : p.toString());
  }, [documentoAvance, exposicion, dominioTema, gradoAvance]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await postActaEvaluacion(
        asignacion.id_asignacion,
        {
          fecha_eval: formatAsISODate(fechaEval),
          ap_pat: tesisInfo.apellido_paterno,
          ap_mat: tesisInfo.apellido_materno,
          nombre: tesisInfo.nombre,

          programa: tesisInfo.programa_nombre_programa,
          no_avance: asignacion.num_avance,

          titulo_tesis: tesisInfo.titulo,
          total_avance: porcentajeAv.toString(),
          comentarios: comentarios,

          cal_doc: parseInt(documentoAvance),
          cal_expo: parseInt(exposicion),
          cal_dom: parseInt(dominioTema),
          grado_avance: parseInt(gradoAvance),
          promedio: parseInt(promedio),
          fecha_toefl: formatAsISODate(fechaToefl),
          puntaje_toefl: parseInt(puntajeToefl),
          prox_toefl: formatAsISODate(proxToefl),
          observaciones: observaciones
        },
        token
      );
      await postNotificacion({
        id_usuario: tesisInfo.id_usuario,
        titulo: "Asignacion Calificada",
        descripcion: `Su asignación ${asignacion.titulo} ha sido calificada`,
        fecha_expedicion: formatAsISODate(new Date())
      }, token)
      setPDF(res.documento_rellenado.data);
      setIsSubmitting(false);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button onClick={openActFormModal} className="bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full px-5 flex flex-row items-center mb-2">
        <div className='w-[20px] h-[20px] opacity-40 my-3'>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M4.99787498,8.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L4,23 M18,1 L18,6 L23,6 M3,12 L3.24999995,12 L4.49999995,12 C6.5,12 6.75,13.25 6.75,14 C6.75,14.75 6.5,16 4.49999995,16 L3.24999995,16 L3.24999995,18 L3,17.9999999 L3,12 Z M9.5,18 L9.5,12 C9.5,12 10.4473684,12 11.2052633,12 C12.3421053,12 13.5,12.5 13.5,15 C13.5,17.5 12.3421053,18 11.2052633,18 C10.4473684,18 9.5,18 9.5,18 Z M16.5,19 L16.5,12 L20.5,12 M16.5,15.5 L19.5,15.5"></path></svg>
        </div>
        <p className="flex items-center font-SESAT font-bold justify-center ml-3">
          Acta de evaluación
        </p>

      </button>
      {
        isOpen && (
          <div className='w-screen h-screen bg-black/40 z-50 fixed top-0 right-0 flex justify-center pt-2 overflow-hidden'>
            <div className={` w-full lg:w-11/12 lg:mx-auto p-2 pb-16 lg:pb-2 border-0 rounded-t-xl shadow-lg  flex flex-col bg-white outline-none focus:outline-none z-50 animate-slide-up lg:max-w-[1400px]`}>

              {/**Close button */}
              <div className="w-full flex flex-row h-fit items-center">
                <button className={`ml-auto w-[24px] active:opacity-40`} onClick={closeActFormModal}>
                  <svg stroke="#dd4d4d" fill="#dd4d4d" strokeWidth="0" viewBox="0 0 1024 1024" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                </button>

              </div>

              {isSubmitting ? (
                <div>
                  <ProcessingAnim title="Obteniendo Documento PDF..." />
                </div>
              ) : (
                <>
                  {generatedPDF ? (
                    <>
                      <PDFViewer buffer={generatedPDF} />
                    </>
                  ) : (
                    <>
                      {/**Title bar */}
                      <div className='w-11/12 lg:w-5/6 mx-auto flex flex-col lg:flex-row pr-3 mb-3'>
                        <div className='font-SESAT text-4xl mr-auto mb-3 lg:mb-0'>
                          Acta de evaluación de avance de tesis
                        </div>
                        <button type="submit" onClick={handleSubmit} className="primary__btn">
                          Guardar
                        </button>
                      </div>

                      {/**Content */}
                      <div className='w-full flex flex-col overflow-y-scroll'>
                        {/*<ActForm />*/}
                        <form /*onSubmit={handleSubmit}*/>
                          <div className="flex flex-row w-11/12 lg:w-5/6 m-auto mt-6 mb-0 h-fit p-0">
                            <div className="flex flex-row w-full lg:justify-end items-center sm:mb-10">
                              <label className="block mr-4 text-lg font-bold">
                                Fecha de evaluación:
                              </label>
                              {shortFormatDate(formatAsISODate(fechaEval))}
                            </div>
                          </div>
                          <div className="flex flex-row  w-11/12 lg:w-5/6 m-auto mb-0 h-fit p-0">
                            <label className="mb-3 block text-lg font-bold">
                              Datos del alumno
                            </label>
                          </div>
                          <div className="flex flex-col w-11/12 lg:w-5/6 m-auto bg-light-blue-10 rounded py-6 px-6 border border-light-gray-22 border-solid">
                            <div className="flex flex-col lg:flex-row">
                              <div className="lg:w-1/3">
                                <label className="mb-3 block text-lg font-bold">
                                  Apellido Paterno:
                                </label>
                                <label className="mb-3 block text-lg font-sans">
                                  {tesisInfo.apellido_paterno}
                                </label>
                              </div>
                              <div className="lg:w-1/3">
                                <label className="mb-3 block text-lg font-bold">
                                  Apellido Materno:
                                </label>
                                <label className="mb-3 block text-lg font-sans">
                                  {tesisInfo.apellido_materno}
                                </label>
                              </div>
                              <div className="lg:w-1/3">
                                <label className="mb-3 block text-lg font-bold">Nombre:</label>
                                <label className="mb-3 block text-lg font-sans">
                                  {tesisInfo.nombre}
                                </label>
                              </div>
                            </div>
                            <div className="flex flex-col lg:flex-row">
                              <div className="flex flex-col lg:w-1/2">
                                <label className="mb-3 block text-lg font-bold">
                                  Estudiante del programa:
                                </label>
                                <label className="mb-3 block text-lg font-sans">
                                  {tesisInfo.programa_nombre_programa}
                                </label>
                              </div>
                              <div className="flex flex-col lg:flex-row w-1/2">
                                <div className="flex flex-col lg:w-1/2">
                                  <label className="mb-3 block text-lg font-bold">
                                    Clave Única:
                                  </label>
                                  <label className="mb-3 block text-lg font-sans">
                                    {tesisInfo.id_usuario}
                                  </label>
                                </div>
                                <div className="flex flex-col lg:w-1/2">
                                  <label className="mb-3 block text-lg font-bold">Avance No.:</label>
                                  <label className="mb-3 block text-lg font-sans">
                                    {asignacion.num_avance}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row w-11/12 lg:w-5/6 m-auto mb-0 h-fit p-0 mt-10">
                            <label className="mb-3 block text-lg font-bold">
                              Datos de la Tesis
                            </label>
                          </div>
                          <div className="flex flex-col w-11/12 lg:w-5/6 m-auto ">
                            <div className="flex flex-col py-6 px-6 bg-light-blue-10 rounded border border-solid border-light-gray-22 mb-10">
                              <label className="mb-3 block text-lg font-bold">
                                Título de la tesis
                              </label>
                              <label className="mb-3 block text-lg">
                                {tesisInfo.titulo}
                              </label>
                            </div>
                            <div className="flex flex-col ">
                              <label className="mb-3 block text-lg font-bold">
                                Porcentaje de avance en el desarrollo del proyecto de tesis
                              </label>
                              <div className="w-80 mb-10 flex flex-row items-center">
                                <input type="range" value={porcentajeAv} min={0} max="100" className="range" onChange={(e) => {
                                  setPrcAvance(parseInt(e.target.value))
                                }} />
                                <span className="ml-3 font-SESAT text-lg">{porcentajeAv}%</span>
                              </div>

                              <label className="mb-3 block text-lg font-bold">
                                Comentarios y sugerencias
                              </label>
                              <textarea
                                className="textarea h-48 w-full px-6 lg:px-10 gray__border text-base mb-10 "
                                placeholder="Escriba sus sugerencias o comentarios"
                                value={comentarios}
                                required
                                onChange={
                                  (e) => {
                                    autosize(e.currentTarget);
                                    setComentarios(e.target.value);
                                  }
                                }
                              ></textarea>
                              <label className="mb-3 block text-lg font-bold">Evaluación</label>
                              <div className="flex flex-col  w-full m-auto bg-light-blue-10 rounded py-6 px-6 border border-light-gray-22 border-solid">
                                <div className="flex flex-col lg:flex-row justify-between">
                                  <div className="flex flex-col">
                                    <label className="mb-3 block text-lg font-bold">
                                      Documento de avance
                                    </label>
                                    <input
                                      className="py-2 px-3 shadow appearance-none gray__border w-[80px] mb-10"
                                      type="number"
                                      placeholder="%"
                                      pattern="^(100|[1-9][0-9]?|0)$"
                                      value={documentoAvance}
                                      required
                                      onChange={
                                        (e) => {
                                          setDocAvance(e.target.value);
                                        }
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <label className="mb-3 block text-lg font-bold">
                                      Exposición
                                    </label>
                                    <input
                                      className="py-2 px-3 shadow appearance-none gray__border w-[80px] mb-10"
                                      type="number"
                                      placeholder="%"
                                      pattern="^(100|[1-9][0-9]?|0)$"
                                      value={exposicion}
                                      required
                                      onChange={
                                        (e) => {
                                          setExposicion(e.target.value);
                                        }
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <label className="mb-3 block text-lg font-bold">
                                      Dominio del tema
                                    </label>
                                    <input
                                      className="py-2 px-3 shadow appearance-none gray__border w-[80px] mb-10"
                                      type="number"
                                      placeholder="%"
                                      pattern="^(100|[1-9][0-9]?|0)$"
                                      value={dominioTema}
                                      required
                                      onChange={
                                        (e) => {
                                          setDominioTema(e.target.value);
                                        }
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <label className="mb-3 block text-lg font-bold">
                                      Grado de avance en el periodo
                                    </label>
                                    <input
                                      className="py-2 px-3 shadow appearance-none gray__border w-[80px] mb-10"
                                      type="number"
                                      placeholder="%"
                                      pattern="^(100|[1-9][0-9]?|0)$"
                                      value={gradoAvance}
                                      required
                                      onChange={
                                        (e) => {
                                          setGradoAvance(e.target.value);
                                        }
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-row">
                                  <div className="flex flex-col">
                                    <label className="mb-3 block text-lg font-bold">
                                      Promedio de la evaluación
                                    </label>
                                    <label className="mb-3 block text-lg">
                                      {promedio}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <label className="mt-10 mb-3 block text-lg font-bold">Acerca del examen TOEFL</label>
                              <div className="flex flex-col  w-full m-auto bg-light-blue-10 rounded py-6 px-6 border border-light-gray-22 border-solid">
                                <div className="flex flex-col lg:flex-row justify-normal">
                                  <div className="flex flex-col mr-20">
                                    <label className="mb-3 block text-lg font-bold">
                                      Fecha de presentación del examen
                                    </label>
                                    <Flatpickr
                                      className={`gray__border w-full`}
                                      options={{
                                        enableTime: false,
                                        noCalendar: false,
                                        static: true,
                                      }}
                                      //data-enable-time
                                      placeholder=""
                                      value={fechaToefl}
                                      onChange={([date]) => {
                                        setFechaToefl(date)
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <label className="mt-6 lg:mt-0 mb-3 block text-lg font-bold">
                                      Puntaje obtenido
                                    </label>
                                    <input
                                      className="py-2 px-3 shadow appearance-none gray__border w-[80px] mb-10"
                                      type="number"
                                      placeholder="pts"
                                      pattern="^(100|[1-9][0-9]?|0)$"
                                      value={puntajeToefl}
                                      required
                                      onChange={
                                        (e) => {
                                          setPuntajeToefl(e.target.value);
                                        }
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-row">
                                  <div className="flex flex-col">
                                    <label className="mb-3 block text-lg font-bold">
                                      Próxima fecha para presentar el examen TOEFL
                                    </label>
                                    <Flatpickr
                                      className={`gray__border w-full`}
                                      options={{
                                        enableTime: false,
                                        noCalendar: false,
                                        static: true,
                                      }}
                                      //data-enable-time
                                      placeholder=""
                                      value={proxToefl}
                                      onChange={([date]) => {
                                        setProxToefl(date)
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <label className="mb-3 mt-10 block text-lg font-bold">
                                Observaciones y compromisos
                              </label>
                              <textarea
                                className="textarea h-20 lg:h-12 w-full px-6 lg:px-10 gray__border text-base mb-10"
                                placeholder="Escriba sus observaciones y compromisos para el alumno"
                                value={observaciones}
                                required
                                onChange={
                                  (e) => {
                                    autosize(e.currentTarget);
                                    setObservaciones(e.target.value);
                                  }
                                }
                              ></textarea>
                            </div>
                          </div>
                        </form>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div >
        )
      }
    </>
  );
};

export default ActFormModal