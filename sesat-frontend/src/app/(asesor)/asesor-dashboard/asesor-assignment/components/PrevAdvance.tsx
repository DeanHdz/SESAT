"use client";
import React, { useState } from 'react'
import PDFViewer from './PDFViewer';
import { useRouter } from 'next/navigation';
import AssignmentHeader from './AssignmentHeader';
import AssignmentData from './AssignmentData';
import { shortFormatDate } from '../../../../../../utils/utils';
import CommentSection from './CommentSection';
import { Asignacion } from '../../../../../../types/ISESAT';
import { fetchOneTesis } from '../../../../../../utils/tesis.endpoint';
import { fetchOneByIdAsignacion } from '../../../../../../utils/asignacion.endpoint';
import { fetchConversationByIdAsignacion } from '../../../../../../utils/comentario.endpoint';
import ProcessingAnim from '@/app/components/ProcessingAnim';
import { fetchActaEvaluacion } from '../../../../../../utils/acta-evaluacion.endpoint';
import { fetchFormatoEvaluacion } from '../../../../../../utils/formato-evaluacion.endpoint';

async function fetchAndSortComments(idAsignacion: number, token: string) {
    let comments = await fetchConversationByIdAsignacion(idAsignacion, token);
    comments.sort((a: any, b: any) => a.id_comentario - b.id_comentario);
    return comments;
}

const PrevAdvance = ({ idAsignacion, avance }: { idAsignacion: number, avance: number }) => {
    const [showModal, setShowModal] = useState(false);

    const [cssDisabled, setCSSDisabled] = useState("")
    const [cssHide, setcssHide] = useState("")
    const [cssError, setCssError] = useState("hidden")
    const [cssOk, setCssOk] = useState("hidden")
    const router = useRouter()

    const [asignacion, setAsignacion] = useState<Asignacion | undefined>(undefined)
    const [tesisInfo, settesisInfo] = useState<any>(undefined)

    const [comments, setcomments] = useState<any>(undefined)
    const [currentPDF, setcurrentPDF] = useState<Array<number> | undefined>()



    function setDefaultState() {
        document.body.classList.remove('modal-open');
        setShowModal(false)
        setCssError("hidden")
        setCSSDisabled("")
        setCssOk("hidden")
        setcssHide("")//oculta boton crear 
        router.refresh();//on test

    }

    async function fetchActa(idActa: number) {
        setcurrentPDF(undefined);
        const res = await fetchActaEvaluacion(idActa, "");
        setcurrentPDF(res.documento_rellenado.data);
    }

    async function fetchFormato(idFormato: number) {
        setcurrentPDF(undefined);
        const res = await fetchFormatoEvaluacion(idFormato, "");
        setcurrentPDF(res.documento_rellenado.data);
    }

    async function setDocAvance() {
        await setcurrentPDF(undefined);
        setcurrentPDF(asignacion?.documento.data);
    }

    async function openModal() {
        setShowModal(true);
        document.body.classList.add('modal-open');

        await fetchOneByIdAsignacion(idAsignacion, "").then(async (result) => {

            await fetchOneTesis(result.id_tesis.toString(), "").then((res) => {
                settesisInfo(res)
            })
            await fetchAndSortComments(result.id_asignacion, '').then((res) => {
                setcomments(res)
            })

            setAsignacion(result)
            setcurrentPDF(result.documento.data);
        })
    }

    return (
        <>
            <button className="bg-none hover:  mr-1 mb-1 outline-none focus:outline-none" type='button' onClick={openModal}>
                <div className="text-center text-black text-base  ">
                    {`Avance ${avance}`}
                </div>
            </button>
            {showModal && (
                <>

                    <div className='w-screen h-screen bg-black/20 z-50 fixed top-0 right-0 flex justify-center pt-2 overflow-hidden'>
                        <div className={` w-11/12 lg:w-11/12 lg:mx-auto p-2 border-0 rounded-xl shadow-lg  flex flex-col bg-white outline-none focus:outline-none z-50 animate-slide-up `}>

                            <div className="w-full flex flex-row h-fit items-center">
                                <div className='ml-6 px-4 font-SESAT text-[12px] gray__border'>
                                    {`Avance ${avance} (Revisado)`}
                                </div>
                                <button className={`ml-auto w-[24px] active:opacity-40`} onClick={setDefaultState}>
                                    <svg stroke="#dd4d4d" fill="#dd4d4d" strokeWidth="0" viewBox="0 0 1024 1024" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                                </button>

                            </div>
                            <div className='mt-3 overflow-y-scroll p-6'>
                                {asignacion && tesisInfo && comments ? (
                                    <>

                                        <AssignmentHeader titulo={asignacion.titulo} descripcion={asignacion.descripcion} />

                                        <div className="flex flex-col lg:flex-row">

                                            <div className="flex flex-col w-full lg:w-3/12 lg:m-2">
                                                <AssignmentData nombreTesis={tesisInfo.titulo} autor={`${tesisInfo.nombre} ${tesisInfo.apellido_paterno} ${tesisInfo.apellido_materno} `} numAvance={asignacion.num_avance} fechaEntrega={shortFormatDate(asignacion.fecha_entrega)} fechaPresentacion={asignacion.fecha_presentacion} />
                                                {/*<AssignmentProperties fechaEntrega={shortFormatDate(asignacion.fecha_entrega)} calificacion={10}/> */}                                              

                                                <div className='flex flex-col w-full pt-5 mt-5 mb-5 bg-light-blue-10 rounded px-8 py-4 h-fit'>

                                                    <label className="flex text-2xl font-bold">
                                                        Evaluación
                                                    </label>

                                                    <div className='w-full my-2 mx-auto border border-solid border-gray-200'></div>

                                                    <div className='w-full flex flex-col'>
                                                        <button onClick={() => { fetchActa(asignacion.id_acta_evaluacion) }} className="bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full px-5 flex flex-row items-center mb-2">
                                                            <div className='w-[20px] h-[20px] opacity-40 my-3'>
                                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M4.99787498,8.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L4,23 M18,1 L18,6 L23,6 M3,12 L3.24999995,12 L4.49999995,12 C6.5,12 6.75,13.25 6.75,14 C6.75,14.75 6.5,16 4.49999995,16 L3.24999995,16 L3.24999995,18 L3,17.9999999 L3,12 Z M9.5,18 L9.5,12 C9.5,12 10.4473684,12 11.2052633,12 C12.3421053,12 13.5,12.5 13.5,15 C13.5,17.5 12.3421053,18 11.2052633,18 C10.4473684,18 9.5,18 9.5,18 Z M16.5,19 L16.5,12 L20.5,12 M16.5,15.5 L19.5,15.5"></path></svg>
                                                            </div>
                                                            <p className="flex items-center font-SESAT font-bold justify-center ml-3">
                                                                Acta de evaluación
                                                            </p>

                                                        </button>
                                                        <button onClick={() => { fetchFormato(asignacion.id_formato_evaluacion) }} className="bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full px-5 flex flex-row items-center mb-2">
                                                            <div className='w-[20px] h-[20px] opacity-40 my-3'>
                                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M4.99787498,8.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L4,23 M18,1 L18,6 L23,6 M3,12 L3.24999995,12 L4.49999995,12 C6.5,12 6.75,13.25 6.75,14 C6.75,14.75 6.5,16 4.49999995,16 L3.24999995,16 L3.24999995,18 L3,17.9999999 L3,12 Z M9.5,18 L9.5,12 C9.5,12 10.4473684,12 11.2052633,12 C12.3421053,12 13.5,12.5 13.5,15 C13.5,17.5 12.3421053,18 11.2052633,18 C10.4473684,18 9.5,18 9.5,18 Z M16.5,19 L16.5,12 L20.5,12 M16.5,15.5 L19.5,15.5"></path></svg>
                                                            </div>
                                                            <p className="flex items-center font-SESAT font-bold justify-center ml-3">
                                                                Reporte de evaluación
                                                            </p>
                                                        </button>

                                                        <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none" type='button' onClick={() => { setDocAvance() }}>
                                                            <div className="text-center text-[#ffffff] text-[12px]">
                                                                Ver documento de avance
                                                            </div>
                                                        </button>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className="flex flex-col w-full lg:w-9/12 mb-20 lg:mb-0 lg:m-2">
                                                {currentPDF ? (
                                                    <PDFViewer buffer={currentPDF} />
                                                ) : (
                                                    <ProcessingAnim title="Obteniendo documento PDF..." />
                                                )}
                                            </div>

                                        </div>
                                        {/**El id de usuario debe obtenerse de la cookie */}
                                        <CommentSection commentsArray={comments} currentUserID={333333} />


                                    </>
                                ) : (
                                    <>
                                        <ProcessingAnim title="Obteniendo datos de la asignación" />
                                    </>
                                )}
                            </div>
                        </div>
                    </div >
                </>
            )
            }
        </>
    )
}

export default PrevAdvance