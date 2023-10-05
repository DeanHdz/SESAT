"use client";
import React, { useState } from 'react'
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import ProcessingAnim from '@/app/components/ProcessingAnim';
import { postNewPeriod } from '../../../../../utils/periodo.endpoint';
import { useRouter } from 'next/navigation';
import { esPeriodoValido, formatAsISODate } from '../../../../../utils/utils';



const AddPeriodoModal = ({ previousEndDate, startDate, endDate }: { previousEndDate: Date, startDate: Date, endDate: Date }) => {

    const [showModal, setShowModal] = useState(false);
    const [start, setStartDate] = useState<Date>(startDate)
    const [end, setEndDate] = useState<Date>(endDate)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [cssDisabled, setCSSDisabled] = useState("")
    const [cssHide, setcssHide] = useState("")
    const [cssError, setCssError] = useState("hidden")
    const [cssOk, setCssOk] = useState("hidden")
    const [msg, setmsg] = useState("")
    const router = useRouter()
    let info = '¿Cómo funciona? El inicio y fin del periodo marcan la apertura y cierre de los avances de tesis'


    function setDefaultState() {
        setShowModal(false)
        setCssError("hidden")
        setCSSDisabled("")
        setCssOk("hidden")
        setcssHide("")//oculta boton crear
        router.refresh();//on test

    }
        

    async function handleSubmit(event: any) {
        event.preventDefault();
        if (start && end && start > end) {
            setmsg("La fecha de inicio no puede ser posterior a la fecha de fin")
            setCssError("")
        } else if(!esPeriodoValido(previousEndDate, start)){
            setmsg("No se puede crear más de un periodo por semestre, los avances de tesis son semestrales")
            setCssError("")
        }else{
            try {
                setCssError("hidden")
                setIsSubmitting(true)
                setCSSDisabled("opacity-50 pointer-events-none cursor-not-allowed")                
                await postNewPeriod(
                    {
                        fecha_apertura: formatAsISODate(start),
                        fecha_cierre: formatAsISODate(end),
                    },
                    ""
                ).then((res) => {
                    if (res) {                        
                        setcssHide("hidden")//oculta boton crear
                        setCSSDisabled("")
                        setmsg("El periodo se ha creado correctamente")
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



        //hacer un post request a la tabla periodo
        //esperar una respuesta
        //mientras se espera

        //mostrar animacion de espera en el boton
        //inhabilitar los componentes del modal

    }
    return (
        <>
            <button className="btn btn-sm" type='button' onClick={() => setShowModal(true)}>Establecer Periodo</button>
            {showModal ? (
                <>

                    <div className='w-screen h-screen bg-black/20 z-50 fixed top-0 right-0 flex justify-center pt-[100px] overflow-hidden'>
                        <div className="fixed w-[600px] mx-auto p-6 border-0 rounded-lg shadow-lg  flex flex-col bg-white outline-none focus:outline-none z-50">
                            {/*header*/}
                            <div className="w-full flex flex-row h-fit items-center">
                                <h3 className="font-bold text-lg">Establecer Periodo de entregas de avance</h3>
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
                                        className={`gray__border ml-3 ${cssDisabled}`}
                                        options={{
                                            enableTime: true,
                                            noCalendar: false,
                                            minDate: "today",
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
                                            minDate: "today",
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
                                                Crear periodo
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

export default AddPeriodoModal;