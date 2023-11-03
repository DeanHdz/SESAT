import React from 'react'
import AlumnoPDFModal from './AlumnoPDFModal';

export interface ResultProps{
    calificacion: number;
    id_acta_evaluacion: number;
    id_formato_evaluacion: number;
}

const Results = (props: ResultProps ) => {
    return (
        <div className="w-full h-fit mt-6 bg-light-blue-10 gray__border">
            <div className="px-6 py-3 mb-3 flex flex-col lg:flex-row items-center text-xl font-semibold border-b">
                <span>Resultados de la evaluación</span>

            </div>

            <div className="w-full flex flex-col lg:flex-row h-fit px-6 pb-3">
                <div className="flex flex-col  ">
                    <label className="mb-3 block text-md font-semibold">
                        Promedio
                    </label>

                    <div className="flex flex-row">
                        <div className="flex flex-row justify-center items-center">
                            <div className="mr-2">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 18H4v-8h5v8zm6 0h-5V6h5v12zm6 0h-5V2h5v16zm1 4H3v-2h19v2z"></path></g></svg>
                            </div>
                            <p>{props.calificacion}</p>
                        </div>

                    </div>

                </div>

                <div className="flex flex-col mt-3 lg:mt-0 lg:ml-16 ">
                    <label className="mb-3 block text-md font-semibold">
                        <span>Acta de evaluación</span>
                    </label>

                    <div className="flex flex-row">
                        <div className="flex flex-row justify-center items-center">
                            <div className="mr-2">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z"></path></g></svg>
                            </div>
                            <AlumnoPDFModal docType={1} id_document={props.id_acta_evaluacion}/>

                        </div>
                    </div>

                </div>



                <div className="flex flex-col mt-3 lg:mt-0 lg:ml-16 ">
                    <label className="mb-3 block text-md font-semibold">
                        <span>Formato de evaluación</span>
                    </label>

                    <div className="flex flex-row">
                        <div className="flex flex-row justify-center items-center">
                            <div className="mr-2">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z"></path></g></svg>
                            </div>
                            <AlumnoPDFModal docType={2} id_document={props.id_formato_evaluacion}/>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Results