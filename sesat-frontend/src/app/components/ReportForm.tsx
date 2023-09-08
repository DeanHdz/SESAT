{/*}
import { Suspense, useEffect, useState } from "react";
import autosize from 'autosize';
import { ActaEvaluacionEndpoint } from "../../utils/acta-evaluacion.endpoint";
import { useRouter } from "next/navigation";
import { SecondaryButton } from "./SecondaryButton";
import CustomCalendar from "./CustomCalendar";
import ProcessingAnim from "./ProcessingAnim";
import { Asignacion, Programa, Tesis } from "@/types/ISESAT";



const ReportForm = ({ tesis, asignacion }: { tesis: Tesis, asignacion: Asignacion }) => {

  const [programa, setPrograma] = useState<Programa | undefined>();


  const [received, setReceived] = useState(false);
  const [fechaEval, setFechaEval] = useState(new Date());
  const [porcentajeAv, setPrcAvance] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [documentoAvance, setDocAvance] = useState("");
  const [exposicion, setExposicion] = useState("");
  const [dominioTema, setDominioTema] = useState("");
  const [gradoAvance, setGradoAvance] = useState("");
  const [promedio, setPromedio] = useState("");
  const [fechaToefl, setFechaToefl] = useState(new Date());
  const [puntajeToefl, setPuntajeToefl] = useState("");
  const [proxToefl, setProxToefl] = useState(new Date());
  const [observaciones, setObservaciones] = useState("");

  const [id_asignacion, setIdAsignacion] = useState("102");

  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  function formatDate(dateValue: Date) {
    let day = dateValue.getDate();
    let month = dateValue.getMonth() + 1; //(Esta indexado desde 0)
    let year = dateValue.getFullYear();
    let date = day + "/" + month + "/" + year;
    return date;
  }

  const handleGoBack = () => {
    navigate.back();
  };


  useEffect(() => {
    getPrograma();
  }, [received])

  useEffect(() => {
    getAlumno();
    getTesis();
    //Esta pagina requiere la claveUnica del alumno para realizar consultas
    //pasar en variables de estado de navigate();

    //Hacer request para datos del alumno y tesis aqui
    //El arreglo de dependencias debe estar vacio para que solo se ejecute este segmento 1 vez

    //Consulta 1 de la tabla alumno usando claveUnica
    //nombre, apMat, apPat, clave, noAvance

    //Consulta 2 de la tabla tesis usando claveUnica
    //titulo de la tesis

    //Consulta 3 de la tabla programa usando id_programa de la tabla tesis
    //nombre programa
  }, []);

  useEffect(() => {
    let p = (parseInt(documentoAvance) + parseInt(exposicion) + parseInt(dominioTema) + parseInt(gradoAvance)) / 4;
    setPromedio(isNaN(p) ? "0" : p.toString());
  }, [documentoAvance, exposicion, dominioTema, gradoAvance]);


  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const resp = await ActaEvaluacionEndpoint.putActaEvaluacion(
        parseInt(id_asignacion),
        {

          fecha_eval: formatDate(fechaEval),
          ap_pat: alumno?.last_name! ?? "",
          ap_mat: alumno?.family_name! ?? "",
          nombre: alumno?.name! ?? "",

          programa: programa?.nombreprograma! ?? "",
          no_avance: tesis?.ultimo_avance! ?? "",

          titulo_tesis: tesis?.titulo! ?? "",
          total_avance: porcentajeAv,
          comentarios: comentarios,

          cal_doc: parseInt(documentoAvance),
          cal_expo: parseInt(exposicion),
          cal_dom: parseInt(dominioTema),
          grado_avance: parseInt(gradoAvance),
          promedio: parseInt(promedio),
          fecha_toefl: formatDate(fechaToefl),
          puntaje_toefl: parseInt(puntajeToefl),
          prox_toefl: formatDate(proxToefl),
          observaciones: observaciones

        },
        ""
      );
      if (resp) {
        setLoading(false);
        console.log("Acta guardada");
        navigate('/view_document/', {
          state: {
            id_assign: id_asignacion,
            pdfType: 2,
          },
        }
        );


      } else {
        console.log('No hubo respuesta del servidor');
      }
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <Suspense fallback={<ProcessingAnim title="Generando PDF..." />}>
      <div className="lg:flex flex-col w-screen">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row  w-5/6 m-auto mt-6 mb-0 h-fit p-0">
            <div className="flex flex-row w-full justify-end items-center sm:mb-10">
              <label className="block mr-4 text-lg font-bold">
                Fecha de evaluación:
              </label>
              <CustomCalendar setSelectedDate={setFechaEval} />
            </div>
          </div>
          <div className="flex flex-row  w-5/6 m-auto mb-0 h-fit p-0">
            <label className="mb-3 block text-lg font-bold">
              Datos del alumno
            </label>
          </div>
          <div className="flex flex-col  w-5/6 m-auto bg-light-blue-10 rounded py-6 px-6 border border-light-gray-22 border-solid">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3">
                <label className="mb-3 block text-lg font-bold">
                  Apellido Paterno:
                </label>
                <label className="mb-3 block text-lg font-sans">
                  {alumno?.last_name}
                </label>
              </div>
              <div className="lg:w-1/3">
                <label className="mb-3 block text-lg font-bold">
                  Apellido Materno:
                </label>
                <label className="mb-3 block text-lg font-sans">
                  {alumno?.family_name}
                </label>
              </div>
              <div className="lg:w-1/3">
                <label className="mb-3 block text-lg font-bold">Nombre:</label>
                <label className="mb-3 block text-lg font-sans">
                  {alumno?.name}
                </label>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col lg:w-1/2">
                <label className="mb-3 block text-lg font-bold">
                  Estudiante del programa:
                </label>
                <label className="mb-3 block text-lg font-sans">
                  {programa?.nombreprograma}
                </label>

              </div>
              <div className="flex flex-row w-1/2">
                <div className="flex flex-col w-1/2">
                  <label className="mb-3 block text-lg font-bold">
                    Clave Única:
                  </label>
                  <label className="mb-3 block text-lg font-sans">
                    {claveUnica}
                  </label>
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="mb-3 block text-lg font-bold">Avance No.:</label>
                  <label className="mb-3 block text-lg font-sans">
                    {tesis?.ultimo_avance}
                  </label>
                </div>


              </div>
            </div>
          </div>
          <div className="flex flex-row  w-5/6 m-auto mb-0 h-fit p-0 mt-10">
            <label className="mb-3 block text-lg font-bold">
              Datos de la Tesis
            </label>
          </div>
          <div className="flex flex-col w-5/6 m-auto ">
            <div className="flex flex-col py-6 px-6 bg-light-blue-10 rounded border border-solid border-light-gray-22 mb-10">
              <label className="mb-3 block text-lg font-bold">
                Título de la tesis
              </label>
              <label className="mb-3 block text-lg">
                {tesis?.titulo}
              </label>
            </div>


            <div className="flex flex-col ">
              <label className="mb-3 block text-lg font-bold">
                Porcentaje de avance en el desarrollo del proyecto de tesis
              </label>
              <input
                className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                type="number"
                placeholder="%"
                pattern="^(100|[1-9][0-9]?|0)$"
                value={porcentajeAv}
                required
                onChange={
                  (e) => {
                    setPrcAvance(e.target.value);
                  }
                }
              />
              <label className="mb-3 block text-lg font-bold">
                Comentarios y sugerencias
              </label>
              <textarea
                className="textarea h-48 w-full px-10  border-primary rounded text-base mb-10 "
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
                      className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
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
                      className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
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
                      className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
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
                      className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
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
                      {promedio} %
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
                    <CustomCalendar setSelectedDate={setFechaToefl} />
                  </div>
                  <div className="flex flex-col mt-10">
                    <label className="mb-3 block text-lg font-bold">
                      Puntaje obtenido
                    </label>
                    <input
                      className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
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
                    <CustomCalendar setSelectedDate={setProxToefl} />
                  </div>
                </div>
              </div>

              <label className="mb-3 mt-10 block text-lg font-bold">
                Observaciones y compromisos
              </label>
              <textarea
                className="textarea h-12 w-full px-10 border-primary rounded text-base mb-10"
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

              <div className="flex justify-end w-full mb-10 mt-10">
                <div className="mr-6">
                  <SecondaryButton text="Descartar" onClick={handleGoBack} />
                </div>
                <button type="submit" className="btn">
                  Guardar Acta de Evaluación
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Suspense>
  );
};

export default ReportForm

*/}
