import React, { FC } from "react";
import { ButtonProps } from "../../Interfaces/IButtonProps";


export const PrimaryButton: FC<ButtonProps> = ({onClick, id, text}) => {
  return (
    <div>
      <label htmlFor={id} className="btn" onClick={onClick}>
        {text}
      </label>      
    </div>
  );
};
