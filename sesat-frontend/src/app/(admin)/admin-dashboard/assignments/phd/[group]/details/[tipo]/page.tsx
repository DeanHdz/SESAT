"use client";

import { useEffect, useState, useRef } from "react";
import autosize from "autosize";
import { TitleBar } from "@/app/components/TitleBar";
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";

import { fetchNumAsignacionesPendientesDoctorado, fetchOneInGroupAsignacionDoctorado, updateAsignacionesPhdByNumAv } from "../../../../../../../../../utils/asignacion.endpoint";

import ProcessingAnim from "@/app/components/ProcessingAnim";
import { fetchLatestPeriod, putPeriod } from "../../../../../../../../../utils/periodo.endpoint";
import { formatAsISODate, getFormattedHours, isDateWithinGlobalPeriod, shortFormatDate } from "../../../../../../../../../utils/utils";
import EmptyPage from "@/app/components/EmptyPage";
import NotFound from "@/app/(admin)/admin-dashboard/not-found";


export default function CreateAssignment({
  params,
}: {
  params: { group: string, tipo: string }
}) {

  let { group, tipo } = params

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

  const [title, setTitle] = useState<string | undefined>(names.at(index))
  const [periodo, setPeriodo] = useState<undefined | PeriodoProps>(undefined)
  const [numPendientes, setnumPendientes] = useState<undefined | number>(undefined)
  const [description, setDescription] = useState("");
  const [start, setStartDate] = useState<Date>(new Date())                //Para avance 4 doc
  const [end, setEndDate] = useState<Date>(new Date())                  //Para avance 4 doc
  const [cssDisabled, setCSSDisabled] = useState("opacity-50 pointer-events-none cursor-not-allowed")
  const [cssHide, setcssHide] = useState("hidden")
  const [cssHideBtnEdit, setcssHideBtnEdit] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cssError, setCssError] = useState("hidden")
  const [error, setError] = useState<undefined | boolean>(undefined)
  const [updateError, setUpdateError] = useState(false);
  const [cssOk, setCssOk] = useState("hidden")
  const [msg, setmsg] = useState("")
  const [editMode, setEditMode] = useState(false)

  type PeriodoProps = {
    id_periodo: number;
    fecha_apertura: string;
    fecha_cierre: string;
    fecha_apertura_opc: string;
    fecha_cierre_opc: string;
    concluido: boolean;
  }

  /**
   * Asignacion Activa
   * Traer los datos
   * se pueden editar las instrucciones
   * Se hace submit con en caso de editar
   */

  function evaluateParams(tipoAsignacion: string, grupo: string): boolean {
    const tiposPermitidos = ['1', '2'];
    const gruposPermitidos = ['1', '2', '3', '4', '5', '6', '7', '8'];

    if (!tiposPermitidos.includes(tipoAsignacion) || !gruposPermitidos.includes(grupo)) {
      return false;
    }

    if (tipo === '2' && group !== '4') {
      return false;
    }

    return true;
  }


  useEffect(() => {
    async function fetchDATA() {

      await fetchNumAsignacionesPendientesDoctorado(group, tipo, "").then((result) => {

        let total = parseInt(result)

        setnumPendientes(total) //0 -> activa  | >0 -> pendiente

      })/*.catch((error) => {
        setError(true)
        setnumPendientes(-1)
      })*/

      await fetchLatestPeriod("").then((res) => {
        let fechaCierrePeriodo = new Date(res.fecha_cierre);
        let fechaActual = new Date();

        res.concluido = false;//revisar

        if (fechaActual > fechaCierrePeriodo) {
          res.concluido = true;
        }

        //fetch de datos de la asignacion
        fetchOneInGroupAsignacionDoctorado(group, tipo, res.id_periodo.toString(), "").then((result) => {
          setDescription(result.descripcion)
          setTitle(result.titulo)
        }).catch((error) => {
          setError(true)
          setnumPendientes(-1)
        })

        setPeriodo(res)
        setStartDate(new Date(res.fecha_apertura_opc))
        setEndDate(new Date(res.fecha_cierre_opc))

      })/*.catch((error) => {
        setError(true)
        setnumPendientes(-1)
      })*/

      //URL constraints, solo en avance 4 se permite tipo 1 y tipo 2
      if (!evaluateParams(tipo, group)) {
        setnumPendientes(-1)
        setError(true)
      }


    }




    fetchDATA();
  }, []);


  if (error) {
    return <NotFound />
  }


  if (!periodo || typeof numPendientes === 'undefined') {
    return (
      <div className="flex w-full justify-center items-center">
        <ProcessingAnim title="" />
      </div>
    )
  }


  function setEditableState() {
    setEditMode(true)
    setCSSDisabled("")
    setcssHideBtnEdit("hidden")
    setcssHide("")
  }

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

  async function updateAssignmentForPHD() {
    setIsSubmitting(true);
    setCSSDisabled("opacity-80 pointer-events-none cursor-not-allowed")

    await updateAsignacionesPhdByNumAv({
      id_asignacion: 0, //no importa aqui, se asigna en backend
      id_formato_evaluacion: null,
      id_acta_evaluacion: null,
      id_tesis: null,
      id_modalidad: 1,
      id_periodo: periodo?.id_periodo as number,
      num_avance: index + 1,
      titulo: title as string,
      descripcion: description,
      fecha_entrega: null,
      calificacion: null,
      documento: null,
      estado_entrega: 0,
      retroalimentacion: null,
      tipo: parseInt(tipo),
      fecha_presentacion: null,
    }, "").then((res) => {

      if (res) {
        setIsSubmitting(false);
        setmsg("Los datos se actualizaron correctamente")
        setCssOk("")
        setcssHide("hidden")
        setEditMode(false)
      }
    }).catch(() => {
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
      if (group === '4' && tipo === '2') {
        if (periodo && isDateWithinGlobalPeriod(new Date(periodo.fecha_apertura), new Date(periodo.fecha_cierre), start, end)) {
          if (start && end && start > end) {
            setmsg("La fecha de inicio no puede ser posterior a la fecha de fin")
            setCssError("")
          } else {
            updatePeriodForPHD();
          }
        } else {
          setmsg("La fechas para esta asignación deben estar dentro del periodo global")
          setCssError("")
        }
      }

      {/**Si no ocurrio ningun error al guardar el periodo de entrega*/ }
      if (!updateError) {
        updateAssignmentForPHD();
      }

    } else {
      setmsg("Complete todos los campos por favor")
      setCssError("")
    }
  };

  return (
    <main>
      {periodo && typeof numPendientes !== 'undefined' && numPendientes === 0 && !periodo.concluido ? (
        <>
          <TitleBar title={names[index]} />
          <form action="submit" onSubmit={handleSubmit}>

            <div className={`font-SESAT rounded-md w-full p-3 my-3 bg-red-100 ${cssError}`}>
              {msg}
            </div>
            <div className={`font-SESAT rounded-md w-full p-3 my-3 bg-blue-100 ${cssOk}`}>
              {msg}
            </div>

            {/**Buttons */}
            <div className="flex justify-end w-full mt-6">

              <button type='button' className={`primary__btn ml-3 ${cssHideBtnEdit}`} onClick={setEditableState}>
                Editar
              </button>

              <button type='submit' className={`primary__btn ml-3 ${cssDisabled} ${cssHide}`}>
                {isSubmitting ? (
                  <div className='h-[20px]'>
                    <ProcessingAnim title='' />
                  </div>
                ) : (
                  <>Guardar cambios</>
                )}
              </button>
            </div>
            <div className="w-full flex flex-col lg:flex-row h-fit py-6 mt-3">
              <div className="w-full lg:w-3/6">
                <label className="mb-3 block text-xl font-semibold">Título</label>
                <label className="mb-10 block text-xl font-normal opacity-90 w-full">
                  {title}
                </label>
                <label className="mb-3 block text-xl font-semibold">
                  Instrucciones
                </label>
                {editMode ? (
                  <textarea
                    required={true}
                    maxLength={1000}
                    value={description}
                    className={`h-64 w-full overflow-hidden px-3 gray__border text-base ${cssDisabled}`}
                    placeholder="Ingrese las instrucciones y/o descripción"
                    onChange={(e) => {
                      autosize(e.currentTarget);
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                ) : (
                  <span className="w-full whitespace-break-spaces text-black/60">
                    {description}
                  </span>
                )}
              </div>


              <div className="w-full lg:w-3/6 h-fit lg:ml-3 mt-10 lg:mt-0 bg-light-blue-10 gray__border">
                <div className="px-6 py-3 mb-3 flex flex-row items-center text-xl font-semibold border-b">
                  <span>Fecha</span>
                  <div className='tooltip tooltip-left w-[24px] h-[24px] ml-auto rounded-full flex items-center justify-center hover:bg-light-gray-22'
                    data-tip={
                      group === '4' && tipo === '2' ? (
                        'Solo aplica para alumnos de doctorado que están cursando seminario de tesis 4, el periodo de publicación/cierre debe estar dentro del periodo global') : (
                        'Esta fecha se establece/modifica en la página de inicio')
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
                  {editMode && group === '4' && tipo === '2' ? (
                    <>
                      <div className="flex flex-col w-full ">
                        {/**Publicacion */}
                        <div className="mb-6 w-full flex flex-col">
                          <label className="mb-3 block text-md font-semibold">
                            Publicación (Evaluación de Medio Término)
                          </label>

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
                        </div>
                        {/**Cierre */}
                        <div className="w-full flex flex-col">
                          <label className="mb-3 block text-md font-semibold">
                            Límite de entrega (Evaluación de Medio Término)
                          </label>
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
                        </div>
                      </div>

                      {/**Date start */}
                      <div className="flex flex-col w-full mt-6">
                        <label className="mb-3 block text-md font-semibold">
                          Inicio del periodo (Global)
                        </label>

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

                      </div>

                      {/**Date end */}
                      <div className="flex flex-col w-full mt-10 ">
                        <label className="mb-3 block text-md font-semibold">
                          Fin del periodo (Global)
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

                    </>
                  ) : (
                    <>
                      {/**Date start */}
                      <div className="flex flex-col w-full ">
                        <label className="mb-3 block text-md font-semibold">
                          Publicación de la asignación
                        </label>

                        <div className="flex flex-row">
                          <div className="flex flex-row justify-center items-center">
                            <div className="mr-2">
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path></svg>
                            </div>
                            {group === '4' && tipo === '2' ? (
                              <p>{shortFormatDate(periodo.fecha_apertura_opc)}</p>
                            ) : (
                              <p>{shortFormatDate(periodo.fecha_apertura)}</p>
                            )}

                          </div>
                          <div className="flex flex-row justify-center items-center ml-6">
                            <div className="mr-2">
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
                            </div>
                            {group === '4' && tipo === '2' ? (
                              <p>{getFormattedHours(new Date(periodo.fecha_apertura_opc))}</p>
                            ) : (
                              <p>{getFormattedHours(new Date(periodo.fecha_apertura))}</p>
                            )}

                          </div>
                        </div>

                      </div>

                      {/**Date end */}
                      <div className="flex flex-col w-full mt-10 ">
                        <label className="mb-3 block text-md font-semibold">
                          Límite de entrega
                        </label>

                        <div className="flex flex-row">
                          <div className="flex flex-row justify-center items-center">
                            <div className="mr-2">
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path></svg>
                            </div>
                            {group === '4' && tipo === '2' ? (
                              <p>{shortFormatDate(periodo.fecha_cierre_opc)}</p>
                            ) : (
                              <p>{shortFormatDate(periodo.fecha_cierre)}</p>
                            )}

                          </div>
                          <div className="flex flex-row justify-center items-center ml-6">
                            <div className="mr-2">
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
                            </div>
                            {group === '4' && tipo === '2' ? (
                              <p>{getFormattedHours(new Date(periodo.fecha_cierre_opc))}</p>
                            ) : (
                              <p>{getFormattedHours(new Date(periodo.fecha_cierre))}</p>
                            )}

                          </div>
                        </div>

                      </div>

                    </>
                  )}

                </div>
              </div>

            </div>


          </form>
        </>


      ) : (
        <EmptyPage />
      )}


    </main >
  )
}
