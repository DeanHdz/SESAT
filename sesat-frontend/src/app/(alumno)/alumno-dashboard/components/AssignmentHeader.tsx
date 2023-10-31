import React from 'react';

export interface AssignmentHeaderProps{
    titulo: string,
    descripcion: string
}

const AssignmentHeader = ( props : AssignmentHeaderProps) => {
    return(
        <div className="w-full flex flex-col">
            <label className="mb-6 block text-3xl font-bold">
                {props.titulo}
            </label>
            <label className="mb-6 block">
                {props.descripcion}
            </label>
        </div>
    )
}

export default AssignmentHeader