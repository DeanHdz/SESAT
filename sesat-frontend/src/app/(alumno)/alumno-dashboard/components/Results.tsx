import React from 'react'
import AlumnoPDFModal from './AlumnoPDFModal';

export interface ResultProps {
    calificacion: number;
    id_acta_evaluacion: number;
    id_formato_evaluacion: number;
}

const Results = (props: ResultProps) => {
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

                <div className='flex flex-row w-full'>
                    <div className="flex flex-col mt-3 lg:mt-0 lg:ml-16 ">
                        <label className="mb-3 block text-md font-semibold">
                            <span>Acta de evaluación</span>
                        </label>

                        <div className="flex flex-row">
                            <div className="flex flex-row justify-center items-center">
                                <div className="mr-2">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M4.99787498,8.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L4,23 M18,1 L18,6 L23,6 M3,12 L3.24999995,12 L4.49999995,12 C6.5,12 6.75,13.25 6.75,14 C6.75,14.75 6.5,16 4.49999995,16 L3.24999995,16 L3.24999995,18 L3,17.9999999 L3,12 Z M9.5,18 L9.5,12 C9.5,12 10.4473684,12 11.2052633,12 C12.3421053,12 13.5,12.5 13.5,15 C13.5,17.5 12.3421053,18 11.2052633,18 C10.4473684,18 9.5,18 9.5,18 Z M16.5,19 L16.5,12 L20.5,12 M16.5,15.5 L19.5,15.5"></path></svg>
                                </div>
                                <AlumnoPDFModal docType={1} id_document={props.id_acta_evaluacion} />

                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col mt-3 lg:mt-0 ml-16 ">
                        <label className="mb-3 block text-md font-semibold">
                            <span>Formato de evaluación</span>
                        </label>

                        <div className="flex flex-row">
                            <div className="flex flex-row justify-center items-center">
                                <div className="mr-2">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M4.99787498,8.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L4,23 M18,1 L18,6 L23,6 M3,12 L3.24999995,12 L4.49999995,12 C6.5,12 6.75,13.25 6.75,14 C6.75,14.75 6.5,16 4.49999995,16 L3.24999995,16 L3.24999995,18 L3,17.9999999 L3,12 Z M9.5,18 L9.5,12 C9.5,12 10.4473684,12 11.2052633,12 C12.3421053,12 13.5,12.5 13.5,15 C13.5,17.5 12.3421053,18 11.2052633,18 C10.4473684,18 9.5,18 9.5,18 Z M16.5,19 L16.5,12 L20.5,12 M16.5,15.5 L19.5,15.5"></path></svg>
                                </div>
                                <AlumnoPDFModal docType={2} id_document={props.id_formato_evaluacion} />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Results