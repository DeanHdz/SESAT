"use client";
import ProcessingAnim from '@/app/components/ProcessingAnim';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { fetchTesisByID, updateThesis } from '../../../../../utils/tesis.endpoint';
import { UpdateTesis } from '../../../../../types/ISESAT';

const UpdateThesisTitleModal = ({ idTesis, titulo, token }: { idTesis: number, titulo: string, token: string }) => {
    
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [cssDisabled, setCSSDisabled] = useState("")
    const [cssHide, setcssHide] = useState("")
    const [cssError, setCssError] = useState("hidden")
    const [cssOk, setCssOk] = useState("hidden")
    const [title, setTitle] = useState(titulo)
    const [msg, setmsg] = useState("")
    const router = useRouter()

    function setDefaultState() {
        setShowModal(false)
        document.body.classList.remove("modal-open");
        setCssError("hidden")
        setCSSDisabled("")
        setCssOk("hidden")
        setcssHide("")//oculta boton crear
        router.refresh();//on test

    }

    function openUpdatePeriodModal() {
        setShowModal(true);
        document.body.classList.add("modal-open");
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setCssError("hidden");
        setCSSDisabled("");
        setCssOk("hidden");
        setmsg("");
        setIsSubmitting(true);
        const tesis: UpdateTesis = await fetchTesisByID(idTesis, token);

        if (tesis) {
            const res = await updateThesis({
                id_tesis: tesis.id_tesis,
                id_usuario: tesis.id_usuario,
                titulo: title,
                fecha_registro: tesis.fecha_registro,
                generacion: tesis.generacion,
                ultimo_avance: tesis.ultimo_avance,
                estado_finalizacion: tesis.estado_finalizacion,
            }, token).catch(() => {
                setmsg("Algo salío mal")
                setCssError("");
            });

            if (res) {
                setCssOk("");
                setcssHide("hidden");
                setmsg("El título se actualizó correctamente");
                setCSSDisabled("opacity-80 pointer-events-none cursor-not-allowed")
            }
        } else {
            setmsg("Algo salío mal")
            setCssError("");
        }
        setIsSubmitting(false);
    }
    return (
        <>
            <div className='w-[24px] h-[24px] hover:scale-110'>
                <button className="w-[24px] h-[24px]" type='button' onClick={openUpdatePeriodModal}>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M7,17.013l4.413-0.015l9.632-9.54c0.378-0.378,0.586-0.88,0.586-1.414s-0.208-1.036-0.586-1.414l-1.586-1.586	c-0.756-0.756-2.075-0.752-2.825-0.003L7,12.583V17.013z M18.045,4.458l1.589,1.583l-1.597,1.582l-1.586-1.585L18.045,4.458z M9,13.417l6.03-5.973l1.586,1.586l-6.029,5.971L9,15.006V13.417z"></path><path d="M5,21h14c1.103,0,2-0.897,2-2v-8.668l-2,2V19H8.158c-0.026,0-0.053,0.01-0.079,0.01c-0.033,0-0.066-0.009-0.1-0.01H5V5	h6.847l2-2H5C3.897,3,3,3.897,3,5v14C3,20.103,3.897,21,5,21z"></path></svg>
                </button>
            </div>
            {showModal ? (
                <>

                    <div className='w-screen h-screen bg-black/20 z-50 fixed top-0 right-0 flex justify-center pt-[100px] overflow-hidden'>
                        <div className="fixed w-11/12 lg:w-[600px] lg:mx-auto p-6 border-0 rounded-xl shadow-lg  flex flex-col bg-white outline-none focus:outline-none z-50">
                            {/*header*/}
                            <div className="w-full flex flex-row h-fit items-center">
                                <h3 className="font-bold text-lg">
                                    Cambiar Título de la Tesis
                                </h3>
                                <div className='tooltip tooltip-left w-[24px] h-[24px] ml-auto rounded-full flex items-center justify-center hover:bg-light-gray-22'
                                    data-tip='El cambio no afecta a las versiones anteriores de la tesis'>
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
                                <div className="flex flex-col mt-10">
                                    <input
                                        className={`py-2 px-3 shadow appearance-none gray__border w-full mb-10 ${cssDisabled}`}
                                        type="text"
                                        placeholder="Escriba el título de la tesis"
                                        maxLength={300}
                                        value={title}
                                        required
                                        onChange={(e) => {
                                            setTitle(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className='flex flex-row'>
                                    <button className={`secondary__btn ml-auto`} onClick={setDefaultState}>Cerrar</button>
                                    <button type='submit' className={`primary__btn ml-3 ${cssDisabled} ${cssHide}`} onClick={handleSubmit}>
                                        {isSubmitting ? (
                                            <div className='h-[20px]'>
                                                <ProcessingAnim title='' />
                                            </div>
                                        ) : (
                                            <>
                                                Guardar
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

export default UpdateThesisTitleModal