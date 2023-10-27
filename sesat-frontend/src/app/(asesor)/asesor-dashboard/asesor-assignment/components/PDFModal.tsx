"use client";
import React, { useState } from 'react'

import ProcessingAnim from '@/app/components/ProcessingAnim';

import { useRouter } from 'next/navigation';
import PDFViewer from './PDFViewer';




const PDFModal = ({ document }: { document: Array<number> }) => {

    const [showModal, setShowModal] = useState(false);

    const [cssDisabled, setCSSDisabled] = useState("")
    const [cssHide, setcssHide] = useState("")
    const [cssError, setCssError] = useState("hidden")
    const [cssOk, setCssOk] = useState("hidden")    
    const router = useRouter()
    


    function setDefaultState() {
        setShowModal(false)
        setCssError("hidden")
        setCSSDisabled("")
        setCssOk("hidden")
        setcssHide("")//oculta boton crear 
        router.refresh();//on test

    }



    return (
        <>
            <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none" type='button' onClick={() => setShowModal(true)}>
                <div className="text-center text-[#ffffff] text-[12px]">
                    Ver documento de avance
                </div>
            </button>
            {showModal ? (
                <>

                    <div className='w-screen h-screen bg-black/20 z-50 fixed top-0 right-0 flex justify-center pt-2 overflow-hidden'>
                        <div className={`fixed w-11/12 lg:w-11/12 lg:mx-auto py-2 px-6 border-0 rounded-xl shadow-lg  flex flex-col bg-white outline-none focus:outline-none z-50 animate-slide-up`}>
                            <div className="w-full flex flex-row h-fit items-center">
                                <div className='flex flex-row w-full'>
                                    <button className={`ml-auto w-[24px] active:opacity-40`} onClick={setDefaultState}>
                                        <svg stroke="#dd4d4d" fill="#dd4d4d" strokeWidth="0" viewBox="0 0 1024 1024" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                                    </button>
                                </div>

                            </div>

                            <PDFViewer buffer={document} />
                        </div>
                    </div >



                </>
            ) : null
            }
        </>

    )
}

export default PDFModal;