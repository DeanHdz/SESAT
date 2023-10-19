import React from 'react'

export interface AssignmentDataProps{
    nombreTesis: string;
    autor: string;
    numAvance: number;
    fechaEntrega: string;
    encargadoRevision: string;
}

const AssignmentData = ( props: AssignmentDataProps) =>{
    return(
        <div className='flex flex-col w-full pt-5 mt-5 mb-5 bg-light-blue-10 rounded px-8 py-4 h-fit'>
            
            <label className="flex text-2xl font-bold">
                Datos
            </label>

            <div className='w-full m-2 border border-solid border-gray-200'></div>
            
            <div className='w-full flex flex-col'>

                <label className="font-bold mb-2">
                    Nombre de tesis:
                </label>
                <label className="pl-4 mb-2">
                    {props.nombreTesis}
                </label>

                <label className="font-bold mb-2">
                    Autor:
                </label>
                <label className="pl-4 mb-2">
                    {props.autor}
                </label>

                <label className="font-bold mb-2">
                    Numero de avance:
                </label>
                <label className="pl-4 mb-2">
                    {props.numAvance}
                </label>

                <label className="font-bold mb-2">
                    Fecha de entregado:
                </label>
                <label className="pl-4 mb-2">
                    {props.fechaEntrega}
                </label>

                <label className="font-bold mb-2">
                    Revisado y aprobado por:
                </label>
                <label className="pl-4 mb-2">
                    {props.encargadoRevision}
                </label>

            </div>

        </div>
    )
}

export default AssignmentData