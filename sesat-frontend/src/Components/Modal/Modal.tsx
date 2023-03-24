import React from "react";
import { IModalData } from "../../Interfaces/IModalData";
import { PrimaryButton } from "../../Components/Buttons/PrimaryButton";
import { SecondaryButton } from "../../Components/Buttons/SecondaryButton";


export const Modal = ({info}: {info:IModalData}) => {
  return (
    <div>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{info.title}</h3>
          <input
            className="mt-10 h-1/4 py-2 px-10 shadow appearance-none rounded w-full mb-10"
            type="text"
            placeholder="Ingrese el nuevo nombre"
          />
          <p className="py-4">
            {info.message}            
          </p>
          <div className="modal-action">
            <SecondaryButton id="my-modal-6" text="Descartar"/>
            <PrimaryButton id="my-modal-6" text="Aceptar"/>
          </div>
        </div>
      </div>
    </div>
  );
};

