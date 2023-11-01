'use client'
import React, { useState } from 'react';

export interface AssignmentPropertiesProps {
  fechaEntrega: string;
  calificacion: number;
}

const FechaEntregaModal = ({
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
                Modificar fecha límite de entrega:
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

const CalificacionModal = ({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: number) => void;
}) => {
  const [updatedValue, setUpdatedValue] = useState('');

  const saveChanges = () => {
    const numericValue = parseFloat(updatedValue); // Convertir string a numero
    onSave(numericValue);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50">
        
        <div className='max-w-[400px] bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full p-5 flex flex-col mb-2'>
            <p className="flex items-center text-2xl font-bold justify-center mb-4">
                Calificar asignación:
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

const AssignmentProperties = (props: AssignmentPropertiesProps) => {
  const [isFechaEntregaModalOpen, setIsFechaEntregaModalOpen] = useState(false);
  const [isCalificacionModalOpen, setIsCalificacionModalOpen] = useState(false);
  const [modifiedFechaEntrega, setModifiedFechaEntrega] = useState(props.fechaEntrega);
  const [modifiedCalificacion, setModifiedCalificacion] = useState(props.calificacion);

  const openFechaEntregaModal = () => {
    setIsFechaEntregaModalOpen(true);
  };

  const openCalificacionModal = () => {
    setIsCalificacionModalOpen(true);
  };

  const closeFechaEntregaModal = () => {
    setIsFechaEntregaModalOpen(false);
  };

  const closeCalificacionModal = () => {
    setIsCalificacionModalOpen(false);
  };

  const handleFechaEntregaSave = (value: string) => {
    //(Dean) Falta meter logica para guardar cambio en Base de datos o verificacion de input
    setModifiedFechaEntrega(value);
  };

  const handleCalificacionSave = (value: number) => {
    //(Dean) Falta meter logica para guardar cambio en Base de datos o de verificacion de input
    setModifiedCalificacion(value);
  };

  return (
    <div className='flex flex-col w-full pt-5 mt-5 mb-5 bg-light-blue-10 rounded px-8 py-4 h-fit'>
      <label className="flex text-2xl font-bold">Propiedades</label>
      <div className='w-full m-2 border border-solid border-gray-200'></div>
      <div className='w-full flex flex-col'>
        <div className='flex place-content-between mb-4'>
          <label className="font-SESAT mb-2">
            Fecha límite de entrega: {modifiedFechaEntrega}
          </label>
          <button
            onClick={openFechaEntregaModal}
            className="p-2 ml-2 bg-[#004A8C] hover-bg-dark-blue-10 rounded-[15px] shadow hover:shadow-lg outline-none focus:outline-none text-white"
          >
            Modificar Fecha
          </button>
          <FechaEntregaModal
            isOpen={isFechaEntregaModalOpen}
            onClose={closeFechaEntregaModal}
            onSave={handleFechaEntregaSave}
          />
        </div>
        <div className='flex place-content-between'>
          <label className="font-SESAT mb-2">
            Calificación: {modifiedCalificacion}
          </label>
          <button
            onClick={openCalificacionModal}
            className="p-2 ml-2 bg-[#004A8C] hover-bg-dark-blue-10 rounded-[15px] shadow hover:shadow-lg outline-none focus:outline-none text-white"
          >
            Calificar asignación
          </button>
          <CalificacionModal
            isOpen={isCalificacionModalOpen}
            onClose={closeCalificacionModal}
            onSave={handleCalificacionSave}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignmentProperties;
