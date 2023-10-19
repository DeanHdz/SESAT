import React from "react";

export interface ReviewFormatsProps{
    actaPDF: string;
    evaluacionPDF: string;
}

const ReviewFormats = (props: ReviewFormatsProps) =>{
    return(
        <div className='flex flex-col w-full pt-5 mt-5 mb-5 bg-light-blue-10 rounded px-8 py-4 h-fit'>

            <label className="flex text-2xl font-bold">
                Formatos de revisión
            </label>

            <div className='w-full m-2 border border-solid border-gray-200'></div>

            <div className='w-full flex flex-col'>
                <div className="bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full p-5 flex flex-col mb-2">
                    <p className="flex items-center text-2xl font-bold justify-center mb-2">
                        Acta de evaluación
                    </p>
                    <div className="flex flex-row justify-evenly">
                        <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
                            <div className="text-center text-[#ffffff]">
                                Ver PDF
                            </div>
                        </button>
                        <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
                            <div className="text-center text-[#ffffff]">
                                Rellenar Acta
                            </div>
                        </button>
                    </div>
                </div>
                <div className="bg-[#ffffff] rounded-[15px] border border-light-gray-22 border-solid w-full p-5 flex flex-col mb-2">
                    <p className="flex items-center text-2xl font-bold justify-center mb-2">
                        Formato de evaluación
                    </p>
                    <div className="flex flex-row justify-evenly">
                        <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
                            <div className="text-center text-[#ffffff]">Ver PDF</div>
                        </button>
                        <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
                            <div className="text-center text-[#ffffff]">Rellenar Formato</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewFormats