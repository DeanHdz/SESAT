import React from 'react';

export interface AssignmentHeaderProps {
    titulo: string,
    descripcion: string
}

const AssignmentHeader = (props: AssignmentHeaderProps) => {
    return (
        <div className="w-full flex flex-col px-2 mb-4">
            <label className="mb-6 block text-3xl font-bold">
                {props.titulo}
            </label>
            <div className='bg-light-gray-10 gray__border'>
                <div className='border-b font-SESAT'>
                    <span>Instrucciones/Descripción</span>
                </div>
                <div className='px-4 py-2 bg-white rounded-b-xl text-left'>
                    <label className="">
                        {props.descripcion}
                    </label>
                </div>
            </div>
        </div>
    )
}

export default AssignmentHeader