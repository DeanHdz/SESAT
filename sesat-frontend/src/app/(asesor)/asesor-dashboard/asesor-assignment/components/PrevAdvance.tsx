"use client";
import React, { useEffect, useState } from 'react'
import PDFViewer from './PDFViewer';
import { useRouter } from 'next/navigation';
import AssignmentHeader from './AssignmentHeader';
import AssignmentData from './AssignmentData';
import { shortFormatDate } from '../../../../../../utils/utils';
import ReviewFormats from './ReviewFormats';
import PDFPreview from './PDFPreview';
import CommentSection from './CommentSection';
import AddComment from '@/app/components/AddComment';
import { Asignacion } from '../../../../../../types/ISESAT';
import { fetchOneTesis } from '../../../../../../utils/tesis.endpoint';
import { fetchOneByIdAsignacion } from '../../../../../../utils/asignacion.endpoint';
import { fetchConversationByIdAsignacion } from '../../../../../../utils/comentario.endpoint';
import ProcessingAnim from '@/app/components/ProcessingAnim';

async function fetchAndSortComments(idAsignacion: number, token: string) {
    let comments = await fetchConversationByIdAsignacion(idAsignacion, token);
    comments.sort((a: any, b: any) => a.id_comentario - b.id_comentario);
    return comments;
}

const PrevAdvance = ({ idAsignacion }: { idAsignacion: number }) => {
    const [showModal, setShowModal] = useState(false);

    const [cssDisabled, setCSSDisabled] = useState("")
    const [cssHide, setcssHide] = useState("")
    const [cssError, setCssError] = useState("hidden")
    const [cssOk, setCssOk] = useState("hidden")
    const router = useRouter()

    const [asignacion, setAsignacion] = useState<Asignacion | undefined>(undefined)
    const [tesisInfo, settesisInfo] = useState<any>(undefined)

    const [comments, setcomments] = useState<any>(undefined)


    


    function setDefaultState() {
        document.body.classList.remove('modal-open');
        setShowModal(false)
        setCssError("hidden")
        setCSSDisabled("")
        setCssOk("hidden")
        setcssHide("")//oculta boton crear 
        router.refresh();//on test

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
        })                
    }

    return (
        <>
            <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none" type='button' onClick={openModal}>
                <div className="text-center text-[#ffffff] text-[12px]  ">
                    Avance 3
                </div>
            </button>
            {showModal && (
                <>

                    <div className='w-screen h-screen bg-black/20 z-50 fixed top-0 right-0 flex justify-center pt-2 overflow-hidden'>
                        <div className={` w-11/12 lg:w-11/12 lg:mx-auto p-2 border-0 rounded-xl shadow-lg  flex flex-col bg-white outline-none focus:outline-none z-50 animate-slide-up `}>
                            
                            <div className="w-full flex flex-row h-fit items-center">
                                <div className='ml-6 px-4 font-SESAT text-[12px] gray__border'>
                                    Avance 3 (Revisado)
                                </div>
                                <button className={`ml-auto w-[24px] active:opacity-40`} onClick={setDefaultState}>
                                    <svg stroke="#dd4d4d" fill="#dd4d4d" stroke-width="0" viewBox="0 0 1024 1024" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                                </button>

                            </div>
                            <div className='mt-3 overflow-y-scroll p-6'>
                                {asignacion && tesisInfo && comments ? (
                                    <>

                                        <AssignmentHeader titulo={asignacion.titulo} descripcion={asignacion.descripcion} />

                                        <div className="flex flex-col lg:flex-row">

                                            <div className="flex flex-col w-full lg:w-3/12 lg:m-2">
                                                <AssignmentData nombreTesis={tesisInfo.titulo} autor={`${tesisInfo.nombre} ${tesisInfo.apellido_paterno} ${tesisInfo.apellido_materno} `} numAvance={asignacion.num_avance} fechaEntrega={shortFormatDate(asignacion.fecha_entrega)} fechaPresentacion={asignacion.fecha_presentacion} />
                                                {/*<AssignmentProperties fechaEntrega={shortFormatDate(asignacion.fecha_entrega)} calificacion={10}/> */} {/* (Dean) Calificacion era en base 10 o 100?*/}
                                                <ReviewFormats tesis={asignacion.documento.data} actaPDF="" evaluacionPDF="" />
                                            </div>

                                            <div className="flex flex-col w-full lg:w-9/12 mb-20 lg:mb-0 lg:m-2">
                                                <PDFViewer buffer={asignacion.documento.data} />
                                            </div>

                                        </div>
                                        {/**El id de usuario debe obtenerse de la cookie */}
                                        <CommentSection commentsArray={comments} currentUserID={333333} />
                                        

                                    </>
                                ) : (
                                    <>
                                        <div className="flex w-full bg-light-blue-10 gray__border h-[500px] justify-center items-center">
                                            <ProcessingAnim title="Obteniendo datos de la asignación" />
                                        </div>
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