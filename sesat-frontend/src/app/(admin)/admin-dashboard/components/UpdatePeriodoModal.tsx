"use client";
import React, { useState } from 'react'
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import ProcessingAnim from '@/app/components/ProcessingAnim';
import { putPeriod } from '../../../../../utils/periodo.endpoint';
import { useRouter } from 'next/navigation';
import { formatAsISODate } from '../../../../../utils/utils';
import Cookies from 'js-cookie';
import { PeriodoProps } from './AlertPeriod';
//idPeriodo: number, startDate: Date, endDate: Date,
const UpdatePeriodoModal = ({ periodo, extender }: { periodo: PeriodoProps,  extender: boolean }) => {
    const cookie = Cookies.get("SESATsession");
    const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";

    const [showModal, setShowModal] = useState(false);
    const [start, setStartDate] = useState<Date>(new Date(periodo.fecha_apertura))
    const [end, setEndDate] = useState<Date>(new Date(periodo.fecha_cierre))    
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [cssDisabled, setCSSDisabled] = useState("")
    const [cssHide, setcssHide] = useState("")
    const [cssError, setCssError] = useState("hidden")
    const [cssOk, setCssOk] = useState("hidden")
    const [msg, setmsg] = useState("")
    const router = useRouter()
    let info = 'El inicio y fin del periodo corresponden a la fecha de apertura y cierre de los avances de tesis'
    let fechaActual = new Date();
    let unaSemanaAdelante = new Date();
    unaSemanaAdelante.setDate(fechaActual.getDate() + 7);

    function setDefaultState() {
        setShowModal(false)
        document.body.classList.remove("modal-open");
        setCssError("hidden")
        setCSSDisabled("")
        setCssOk("hidden")
        setcssHide("")//oculta boton crear
        router.refresh();//on test

    }

    function openUpdatePeriodModal(){
        setShowModal(true);
        document.body.classList.add("modal-open");
    }

    async function handleSubmit(event: any) {
        event.preventDefault();        
        if (start && end && start > end) {
            setmsg("La fecha de inicio no puede ser posterior a la fecha de fin")
            setCssError("")
        } else {
            try {
                setCssError("hidden")
                setIsSubmitting(true)
                setCSSDisabled("opacity-50 pointer-events-none cursor-not-allowed")
                await putPeriod(
                    {
                        id_periodo: periodo.id_periodo,
                        fecha_apertura: formatAsISODate(start),
                        fecha_cierre: formatAsISODate(end),
                        fecha_apertura_opc: periodo.fecha_apertura_opc ? formatAsISODate(new Date(periodo.fecha_apertura_opc)) : null,
                        fecha_cierre_opc: periodo.fecha_cierre_opc ? formatAsISODate(new Date(periodo.fecha_cierre_opc)) : null,
                    },
                    token
                ).then((res) => {
                    if (res) {
                        setcssHide("hidden")//oculta boton crear
                        setCSSDisabled("")
                        setmsg("El periodo se ha actualizado correctamente")
                        setCssOk("")
                        setIsSubmitting(false)
                    }

                })
            } catch (error) {
                setCSSDisabled("")
                setcssHide("hidden")//oculta boton crear
                setIsSubmitting(false)
                setmsg("Algo salió mal")
                setCssError("")
            }
        }

    }

    return (
        <>
            <button className="btn btn-sm px-10 mx-auto" type='button' onClick={openUpdatePeriodModal}>
                {extender ? (
                    <>Extender Periodo</>
                ) : (
                    <>Modificar</>
                )}
            </button>
            {showModal ? (
                <>

                    <div className='w-screen h-screen bg-black/20 z-50 fixed top-0 right-0 flex justify-center pt-[100px] overflow-hidden'>
                        <div className="fixed w-11/12 lg:w-[600px] lg:mx-auto p-6 border-0 rounded-xl shadow-lg  flex flex-col bg-white outline-none focus:outline-none z-50">
                            {/*header*/}
                            <div className="w-full flex flex-row h-fit items-center">
                                <h3 className="font-bold text-lg">
                                    {extender ? (
                                        <>Extender Periodo</>
                                    ) : (
                                        <>Modificar Periodo</>
                                    )}
                                </h3>
                                <div className='tooltip tooltip-left w-[24px] h-[24px] ml-auto rounded-full flex items-center justify-center hover:bg-light-gray-22'
                                    data-tip={info}>
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
                            <div className="border-b gray__border mb-3"></div>

                            <div className={`font-SESAT rounded-md w-full p-3 mb-3 bg-red-100 ${cssError}`}>
                                {msg}
                            </div>
                            <div className={`font-SESAT rounded-md w-full p-3 mb-3 bg-blue-100 ${cssOk}`}>
                                {msg}
                            </div>

                            <form method="submit" className="flex flex-col w-full">
                                {/**Fecha Inicio */}
                                <div className="h-fit flex flex-row w-full items-center mb-3">
                                    <div className="w-[24px] mr-3">
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24"
                                            height="24px" width="24px" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z">
                                            </path>
                                            <path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path>
                                        </svg>
                                    </div>
                                    <p>Inicio del semestre</p>
                                    <Flatpickr
                                        className={`gray__border ml-3 ${cssDisabled} ${extender && 'opacity-50 pointer-events-none cursor-not-allowed'}`}
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
                                <div className="h-fit flex flex-row w-full items-center mb-6">
                                    <div className="w-[24px] mr-3">
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24"
                                            height="24px" width="24px" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z">
                                            </path>
                                            <path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path>
                                        </svg>

                                    </div>
                                    <p>Fin del semestre</p>
                                    <Flatpickr
                                        className={`gray__border ml-3 ${cssDisabled}`}
                                        options={{
                                            enableTime: true,
                                            noCalendar: false,
                                            maxDate: extender ? unaSemanaAdelante : undefined,
                                            minDate: extender ? fechaActual : undefined,
                                            static: true,
                                        }}
                                        placeholder="Fin"                                        
                                        value={end}
                                        onChange={([date]) => {
                                            setEndDate(date)
                                        }}
                                    />
                                </div>
                                <div className='flex flex-row'>
                                    <button className={`secondary__btn ml-auto ${cssDisabled}`} onClick={setDefaultState}>Cerrar</button>
                                    <button type='submit' className={`primary__btn ml-3 ${cssDisabled} ${cssHide}`} onClick={handleSubmit}>
                                        {isSubmitting ? (
                                            <div className='h-[20px]'>
                                                <ProcessingAnim title='' />
                                            </div>
                                        ) : (
                                            <>
                                                {extender ? (
                                                    <>Extender Periodo</>
                                                ) : (
                                                    <>Modificar Periodo</>
                                                )}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div >



                </>
            ) : null
            }
        </>

    )
}

export default UpdatePeriodoModal;