'use client'
import React, { useState } from 'react';

export interface ReviewFormatsProps{
    actaPDF: string;
    evaluacionPDF: string;
}

const ReviewFormats = (props: ReviewFormatsProps) =>{

const FormActaModal = ({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
}) => {
  const [updatedValue, setUpdatedValue] = useState('');

  const saveChanges = () => {
    onSave(updatedValue);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50">
        
        <div className='max-w-[400px] bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full p-5 flex flex-col mb-2'>
            <p className="flex items-center text-2xl font-bold justify-center mb-4">
                Retroalimentación de asignación:
            </p>
            <div className='flex flex-col'>
                <input type="text" value={updatedValue} onChange={(e) => setUpdatedValue(e.target.value)}/>
                <div className='flex flex-row justify-evenly mt-4'>
                    <button onClick={saveChanges} className="primary__btn">
                        Guardar
                    </button>
                    <button onClick={onClose} className='secondary__btn'>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>

      </div>
    )
  );
};

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