'use client'
import React, { useState } from 'react';

export interface FeedbackProps{
    texto: string;
}

const FeedbackModal = ({
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
                <textarea className="textarea border border-solid border-black" value={updatedValue} onChange={(e) => setUpdatedValue(e.target.value)}></textarea>
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

const Feedback = ( props : FeedbackProps) => {
  const [isFeedbackModalOpen, setIsFechaEntregaModalOpen] = useState(false);
  const [modifiedFeedback, setModifiedFeedback] = useState(props.texto);

  const openFeedbackModal = () => {
    setIsFechaEntregaModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFechaEntregaModalOpen(false);
  };

  const handleFeedbackSave = (value: string) => {
    //(Dean) Falta meter logica para guardar cambio en Base de datos o verificacion de input
    setModifiedFeedback(value);
  };

    return(
    <div className="w-10/12 pt-5 flex flex-col items-center mt-10 bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit border border-light-gray-22 border-solid">
          <label className="mb-0 block text-base font-bold">
            Retroalimentación
          </label>
          <div className="mt-6 mb-6 block text-base text-dark-blue-10 font-light w-full">
            {props.texto !== null ? (
              <>
              <span>{props.texto}</span>
              </>
            ):(
              <>
              <div className='w-full h-[150px] flex items-center justify-center font-SESAT text-center text-black/40'>Aún no ha escrito su retroalimentación</div>
              </>
            )}
          </div>
          <button onClick={openFeedbackModal} className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
            <div className="text-center text-[#ffffff] text-[12px]">
              Escribir
            </div>
          </button>
          <FeedbackModal
            isOpen={isFeedbackModalOpen}
            onClose={closeFeedbackModal}
            onSave={handleFeedbackSave}
          />
    </div>
    )
} 

export default Feedback