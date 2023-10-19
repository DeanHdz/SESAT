import React from 'react'

export interface AssignmentPropertiesProps{
    fechaEntrega: string;
    calificacion: number;
}

const AssignmentProperties = ( props : AssignmentPropertiesProps) =>{
    return(
        <div className='flex flex-col w-full pt-5 mt-5 mb-5 bg-light-blue-10 rounded px-8 py-4 h-fit'>
            
            <label className="flex text-2xl font-bold">
                Propiedades
            </label>

            <div className='w-full m-2 border border-solid border-gray-200'></div>
            
            <div className='w-full flex flex-col'>

                <label className="font-bold mb-2">
                Fecha límite de entrega: {props.fechaEntrega}
                </label>

                <div className='flex'>
                <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
                    <div className="text-center text-[#ffffff]">
                        Modificar Fecha
                    </div>
                </button>
                </div>
                

                <label className="font-bold mb-2">
                Calificación: {props.calificacion}
                </label>

                <div className='flex'>
                <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
                    <div className="text-center text-[#ffffff]">
                        Calificar asignación
                    </div>
                </button>
                </div>
                

            </div>

        </div>
    )
}

export default AssignmentProperties