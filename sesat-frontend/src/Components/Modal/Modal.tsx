import React, { useState } from "react";
import { IModalData } from "../../Interfaces/IModalData";
import { PrimaryButton } from "../../Components/Buttons/PrimaryButton";
import { SecondaryButton } from "../../Components/Buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";

export const Modal = ({ info }: { info: IModalData }) => {
  const navigate = useNavigate();

  function handleSubmit(): void {
    createAssignment();
  }

  function createAssignment(): void {
    if (isChecked) {
      navigate("/create_assignment");
    }
  }

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{info.title}</h3>
          <input
            className="mt-10 h-1/4 py-2 px-10 shadow appearance-none rounded w-full mb-10"
            type="text"
            placeholder="Ingrese el nuevo nombre"
            required
          />
          <p className="py-4">{info.message}</p>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                Crear una nueva asignación para actualizar el documento
              </span>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                className="checkbox"
              />
            </label>
          </div>
          <div className="modal-action">
            <SecondaryButton id="my-modal-6" text="Cancelar" />
            <button type="submit" id="my-modal-6" className="btn">
              Cambiar nombre
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
