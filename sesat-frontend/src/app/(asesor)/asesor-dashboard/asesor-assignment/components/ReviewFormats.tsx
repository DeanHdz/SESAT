'use client'
import React, { useState } from 'react';
import PDFModal from './PDFModal';


import ActFormModal from './ActFormModal';
import ReportFormModal from './ReportFormModal';
import { Asignacion, AsignacionReview } from '../../../../../../types/ISESAT';
import { TesisInfo } from '../[idAsignacion]/page';


export interface ReviewFormatsProps {
    tesisInfo: TesisInfo;
    asignacion: AsignacionReview;
}



const ReviewFormats = (props: ReviewFormatsProps) => {

    return (

        <div className='flex flex-col w-full pt-5 mt-5 mb-5 bg-light-blue-10 rounded px-8 py-4 h-fit'>

            <label className="flex text-2xl font-bold">
                Evaluación
            </label>

            <div className='w-full my-2 mx-auto border border-solid border-gray-200'></div>
            {props.asignacion.id_funcion === 1 && (
                <div className='w-full flex flex-col'>
                    <ActFormModal tesisInfo={props.tesisInfo} asignacion={props.asignacion} />

                    <ReportFormModal tesisInfo={props.tesisInfo} asignacion={props.asignacion} />

                </div>
            )}
            <PDFModal pdfdocument={props.asignacion.documento.data} />
        </div>
    )
}

export default ReviewFormats