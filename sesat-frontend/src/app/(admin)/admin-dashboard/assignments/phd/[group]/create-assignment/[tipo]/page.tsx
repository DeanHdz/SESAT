"use client";

import { useEffect, useState } from "react";
import autosize from "autosize";
import { useRouter } from "next/navigation";
import { TitleBar } from "@/app/components/TitleBar";
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";

import { fetchNumAsignacionesPendientesDoctorado, postAsignacionesPhdByNumAv } from "../../../../../../../../../utils/asignacion.endpoint";
import ProcessingAnim from "@/app/components/ProcessingAnim";
import { fetchLatestPeriod, putPeriod } from "../../../../../../../../../utils/periodo.endpoint";
import { formatAsISODate, getFormattedHours, isPeriodActive, shortFormatDate } from "../../../../../../../../../utils/utils";
import EmptyPage from "@/app/components/EmptyPage";
import NotFound from "@/app/(admin)/admin-dashboard/not-found";



export default function CreateAssignment({
  params,
}: {
  params: { group: string, tipo: string }
}) {

  const { group, tipo } = params

  const names = [
    'Seminario de Avance de Tesis 1',
    'Seminario de Avance de Tesis 2',
    'Seminario de Avance de Tesis 3',
    'Seminario de Avance de Tesis 4',
    'Seminario de Avance de Tesis 5',
    'Seminario de Avance de Tesis 6',
    'Seminario de Avance de Tesis 7',
    'Seminario de Avance de Tesis 8',
  ]



  let index = parseInt(group) - 1;
  let captionA = group === '5' && tipo === '2' ? ' - Evaluación de Inicio de Semestre' : '';
  let captionB = group === '5' && tipo === '1' ? ' - Evaluación de Fin de Semestre' : '';
  let oneWeekAhead = new Date();
  oneWeekAhead.setDate(oneWeekAhead.getDate() + 7);
  const title = names.at(index) + captionA + captionB;
  const [periodo, setPeriodo] = useState<undefined | PeriodoProps>(undefined)
  const [numPendientes, setnumPendientes] = useState<undefined | number>(undefined)
  const [description, setDescription] = useState<null | string>(null);
  const [start, setStartDate] = useState<Date>(new Date())                //Para avance 5 doctorado
  const [end, setEndDate] = useState<Date>(oneWeekAhead)                  //Para avance 5 doctorado
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(false);
  const [cssDisabled, setCSSDisabled] = useState("")
  const [cssHide, setcssHide] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useRouter()
  const [cssError, setCssError] = useState("hidden")
  const [cssOk, setCssOk] = useState("hidden")
  const [msg, setmsg] = useState("")

  type PeriodoProps = {
    id_periodo: number;
    fecha_apertura: string;
    fecha_cierre: string;
    fecha_apertura_opc: string;//Fecha para evaluacion de medio termino de doctorado(Inicio de semestre)
    fecha_cierre_opc: string;//Fecha para evaluacion de medio termino de doctorado(Inicio de semestre)
    concluido: boolean;//  ---> No proviene del fetch, se deduce localmente
  }

  //REVISAR: Porque cuando se crea la asignacion 4 Inicio de sem y despues haces click
  //en    (<--) de la barra de titulo si actualiza la pagina anterior, mientras que en
  //otro caso no, (por ejemplo al crear asignacion 1)

  useEffect(() => {
    async function fetchDATA() {
      try {
        let res = await fetchLatestPeriod("").catch(() => { return null });
        setPeriodo(res)

        if (periodo) {
          periodo.concluido = isPeriodActive(res.fecha_cierre)
        }

        if (!["1", "2"].includes(tipo) || tipo === '2' && group !== '5') {
          setnumPendientes(0);  //tipo 2 restringido a avance 5
        } else {
          await fetchNumAsignacionesPendientesDoctorado(res.id_periodo, group, tipo, "").then((result) => {

            let total = parseInt(result)

            setnumPendientes(total) //0 -> activa  | >0 -> pendiente

          })
        }

      } catch (error: any) {
        setError(error)
      }
    }


    fetchDATA();
  }, []);

  {/**En caso de URL incorrecta || perdida de conexion */ }
  if (error) {
    return (
      <NotFound />
    )
  }

  {/**Animacion de espera mientras llegan los datos*/ }
  if (!periodo || typeof numPendientes === 'undefined') {
    return (
      <div className="flex w-full justify-center items-center">
        <ProcessingAnim title="" />
      </div>
    )
  }

  {/**Establecer Periodo de evaluacion de inicio de semestre */ }
  async function updatePeriodForPHD() {
    if (periodo) {
      setCssError("hidden")
      setIsSubmitting(true)
      setCSSDisabled("opacity-50 pointer-events-none cursor-not-allowed")
      await putPeriod(
        {
          id_periodo: periodo.id_periodo,
          fecha_apertura: formatAsISODate(new Date(periodo.fecha_apertura)),
          fecha_cierre: formatAsISODate(new Date(periodo.fecha_cierre)),
          fecha_apertura_opc: formatAsISODate(start),
          fecha_cierre_opc: formatAsISODate(end),
        },
        ""
      ).catch((error) => {
        setUpdateError(true)
        setCSSDisabled("")
        setcssHide("hidden")//oculta boton crear
        setIsSubmitting(false)
        setmsg("Algo salió mal")
        setCssError("")
      })

    }
  }

  {/**Crear grupo de asignaciones */ }
  async function postAsignment() {
    setIsSubmitting(true);

    if (periodo)
      await postAsignacionesPhdByNumAv(group, {
        id_formato_evaluacion: null,
        id_acta_evaluacion: null,
        id_tesis: null,
        id_modalidad: 1,
        id_periodo: periodo.id_periodo,
        num_avance: index + 1,
        titulo: title as string,
        descripcion: description ? description : '',
        fecha_entrega: null,
        calificacion: null,
        documento: null,
        estado_entrega: 0,
        retroalimentacion: null,
        tipo: parseInt(tipo),
        fecha_presentacion: null,
      }, "").then((res) => {

        if (res && res.statusCode === 200) {
          setIsSubmitting(false);
          setmsg("Asignaciones de tesis creadas con éxito")
          setCssOk("")
          setcssHide("hidden")
          setCssError("hidden")
        }
      }).catch((error) => {
        setmsg("Algo salió mal")
        setCssError("")
        setcssHide("hidden")
        setIsSubmitting(false);
      })
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    {/**Si la cadena no esta vacia o contiene solo espacios ' ' */ }
    if (description != null && description.trim().length > 0) {

      {/**Caso doctorado evaluacion de medio termino */ }
      if (group === '5' && tipo === '2') {
        if (start && end && start > end) {
          setmsg("La fecha de inicio no puede ser posterior a la fecha de fin")
          setCssError("")
        } else {
          updatePeriodForPHD();
        }
      }

      {/**Si no ocurrio ningun error al guardar el periodo de entrega*/ }
      if (!updateError) {
        postAsignment();
      }

    } else {
      setmsg("Complete todos los campos por favor")
      setCssError("")
    }
  };

  return (
    <main>
      <div>

        {periodo && numPendientes && numPendientes > 0 && !periodo.concluido ? (
          <>
            <TitleBar title={names[index]} />
            <form action='submit'>

              <div className={`font-SESAT rounded-md w-full p-3 my-3 bg-red-100 ${cssError}`}>
                {msg}
              </div>
              <div className={`font-SESAT rounded-md w-full p-3 my-3 bg-blue-100 ${cssOk}`}>
                {msg}
              </div>
              <div className="w-full flex flex-col lg:flex-row h-fit py-6 mt-6">
                {/**Title/Instructions */}
                <div className="w-full lg:w-3/6">
                  <label className="mb-3 block text-xl font-semibold">Título</label>
                  <label className="mb-10 block text-lg font-normal opacity-90 w-full">
                    {title}
                  </label>
                  <label className="mb-3 block text-xl font-semibold">
                    Instrucciones
                  </label>
                  <textarea
                    required={true}
                    maxLength={400}
                    className="h-32 w-full px-3 gray__border text-base"
                    placeholder="Ingrese las instrucciones y/o descripción"
                    onChange={(e) => {
                      autosize(e.currentTarget);
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>


                <div className="w-full lg:w-3/6 h-fit lg:ml-3 mt-10 lg:mt-0 bg-light-blue-10 gray__border">
                  {/**Dates Header */}
                  <div className="px-6 py-3 mb-3 flex flex-row items-center text-xl font-semibold border-b">
                    <span>Fecha</span>
                    <div className='tooltip tooltip-left w-[24px] h-[24px] ml-auto rounded-full flex items-center justify-center hover:bg-light-gray-22'
                      data-tip={
                        group === '5' && tipo === '2' ?
                          'Esta fecha solo aplica para alumnos de cuarto semestre de doctorado'
                          : 'Esta fecha se establece/modifica en la página de inicio'
                      }>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20px"
                        width="20px" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                          clipRule="evenodd"></path>
                        <path
                          d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z">
                        </path>
                        <circle cx="8" cy="4.5" r="1"></circle>
                      </svg>
                    </div>
                  </div>

                  <div className="w-full h-fit p-6">

                    {/**Fecha de entrega para medio termino */}
                    {group === '5' && tipo === '2' ? (
                      <>
                        <div className="flex flex-col w-full ">
                          {/**Publicacion */}
                          <div className="mb-6 w-full flex flex-col">
                            <label className="mb-3 block text-md font-semibold">
                              Publicación (Evaluación de Medio Término)
                            </label>

                            {!periodo.fecha_apertura_opc && (
                              <>
                                <Flatpickr
                                  className={`gray__border w-full ${cssDisabled}`}
                                  options={{
                                    enableTime: true,
                                    noCalendar: false,
                                    minDate: new Date(periodo.fecha_apertura),
                                    static: true,
                                  }}
                                  //data-enable-time
                                  placeholder="Inicio"
                                  value={start}
                                  onChange={([date]) => {
                                    setStartDate(date)
                                  }}
                                />
                              </>
                            )}
                          </div>
                          {/**Cierre */}
                          <div className="w-full flex flex-col">
                            <label className="mb-3 block text-md font-semibold">
                              Límite de entrega (Evaluación de Medio Término)
                            </label>

                            {!periodo.fecha_cierre_opc && (
                              <>
                                <Flatpickr
                                  className={`gray__border w-full ${cssDisabled}`}
                                  options={{
                                    enableTime: true,
                                    noCalendar: false,
                                    minDate: new Date(periodo.fecha_apertura),
                                    static: true,
                                  }}
                                  //data-enable-time
                                  placeholder="Inicio"
                                  value={end}
                                  onChange={([date]) => {
                                    setEndDate(date)
                                  }}
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    ) :
                      <>
                        <div className="flex flex-col w-full ">
                          <label className="mb-3 block text-md font-semibold">
                            Publicación de la asignación
                          </label>
                          {/**Apertura */}
                          <div className="flex flex-row">
                            <div className="flex flex-row justify-center items-center">
                              <div className="mr-2">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path></svg>
                              </div>
                              <p>{shortFormatDate(periodo.fecha_apertura)}</p>
                            </div>
                            <div className="flex flex-row justify-center items-center ml-6">
                              <div className="mr-2">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
                              </div>
                              <p>{getFormattedHours(new Date(periodo.fecha_apertura))}</p>
                            </div>
                          </div>
                          {/**Cierre */}
                          <div className="flex flex-col w-full mt-10 ">
                            <label className="mb-3 block text-md font-semibold">
                              Límite de entrega
                            </label>

                            <div className="flex flex-row">
                              <div className="flex flex-row justify-center items-center">
                                <div className="mr-2">
                                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path></svg>
                                </div>
                                <p>{shortFormatDate(periodo.fecha_cierre)}</p>
                              </div>
                              <div className="flex flex-row justify-center items-center ml-6">
                                <div className="mr-2">
                                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
                                </div>
                                <p>{getFormattedHours(new Date(periodo.fecha_cierre))}</p>
                              </div>
                            </div>

                          </div>
                        </div>

                      </>
                    }




                  </div>
                </div>

              </div>

              {/**Buttons */}
              <div className="flex justify-end w-full mt-6">

                <button type='submit' className={`primary__btn ml-3 ${cssDisabled} ${cssHide}`} onClick={handleSubmit}>
                  {isSubmitting ? (
                    <div className='h-[20px]'>
                      <ProcessingAnim title='' />
                    </div>
                  ) : (
                    <>Crear Asignaciones de Entrega</>
                  )}
                </button>
              </div>
            </form>
          </>


        ) : (
          <EmptyPage />
        )}

      </div >
    </main >
  )
}