import React from 'react'
import { shortFormatDate } from '../../../utils/utils';
import UpdateThesisTitleModal from '../(asesor)/asesor-dashboard/components/UpdateThesisTitleModal';

export interface AssignmentDataProps{
    nombreTesis: string;
    autor: string;
    numAvance: number;
    fechaEntrega: string;    
    fechaPresentacion: string;  
}

const AssignmentData = ( props: AssignmentDataProps) =>{
    return(
        <div className='flex flex-col w-full pt-5 mb-5 bg-light-blue-10 rounded px-8 py-4 h-fit'>
            
            <div className='flex flex-row items-center'>
            <label className="flex text-2xl font-bold mr-auto">
                Datos
            </label>
            <UpdateThesisTitleModal />
            </div>

            <div className='w-full m-2 border border-solid border-gray-200'></div>
            
            <div className='w-full flex flex-col'>

                <label className="font-SESAT mb-2">
                    Nombre de tesis:
                </label>
                <label className="pl-4 mb-2">
                    {props.nombreTesis}
                </label>

                <label className="font-SESAT mb-2">
                    Autor:
                </label>
                <label className="pl-4 mb-2">
                    {props.autor}
                </label>

                <label className="font-SESAT mb-2">
                    Numero de avance:
                </label>
                <label className="pl-4 mb-2">
                    {props.numAvance}
                </label>

                <label className="font-SESAT mb-2">
                    Fecha de entrega:
                </label>
                <label className="pl-4 mb-2">
                    {props.fechaEntrega}
                </label>  

                <label className="font-SESAT mb-2">
                    Fecha de presentación:
                </label>
                <label className="pl-4 mb-2">
                    {props.fechaPresentacion ? (
                        <span>{shortFormatDate(props.fechaPresentacion)}</span>
                    ):(
                        <span>{'Sin definir'}</span>
                    )}
                </label>               

            </div>

        </div>
    )
}

export default AssignmentData