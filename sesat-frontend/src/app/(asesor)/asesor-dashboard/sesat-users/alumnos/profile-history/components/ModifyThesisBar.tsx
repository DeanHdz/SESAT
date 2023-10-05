'use client'
import React, { useState } from "react";
import Modal from "react-modal";

const ModifyThesisBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-full pb-4">
            <label className="mb-2 block text-2xl font-bold">Titulo de Tesis:</label>
            <div className="flex">
                <div className="w-9/12 rounded-[15px] bg-[#E8EDEF] input input-bordered ml-2 mr-2">
                    <span className="font-semibold align-middle">
                        Desarrollo de sistemas utilizando PSP
                    </span>
                </div>
                <button
                    className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-2 outline-none focus:outline-none"
                    onClick={openModal}
                >
                    <div className="text-center text-[#ffffff]">Modificar título</div>
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Modificar Título Modal"
                ariaHideApp={false} 
                style={{
                    content: {
                        width: '50%', 
                        height: '30%',
                        margin: 'auto',
                    },
                }}
            >
                <label className="mb-2 block text-2xl font-bold">Titulo de Tesis:</label>

                <div className="w-12/12 rounded-[15px] bg-[#E8EDEF] input input-bordered mb-7 mt-5">
                    <span className="font-semibold align-middle">
                        Desarrollo de sistemas utilizando PSP
                    </span>
                </div>

                <button
                    className="bg-[#c0c0c0] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-2 outline-none focus:outline-none"
                    onClick={closeModal}
                >
                    <div className="text-center text-[#ffffff]">Cancelar</div>
                </button>

                <button
                    className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-2 outline-none focus:outline-none"
                    onClick={closeModal}
                >
                    <div className="text-center text-[#ffffff]">Modificar título</div>
                </button>

            </Modal>
        </div>
    );
};

export default ModifyThesisBar;


