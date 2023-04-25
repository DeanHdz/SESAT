import { on } from "events";
import React, { FC } from "react";
import { ButtonProps } from "../../Interfaces/IButtonProps";


export const SecondaryButton: FC<ButtonProps> = ({onClick, id, text}) => {
  return (
    <div>
      <label
        htmlFor={id}
        onClick={onClick}
        className="btn bg-white border-primary text-dark-blue-20 hover:bg-light-gray-22"
      >
        {text}
      </label>
    </div>
  );
};
