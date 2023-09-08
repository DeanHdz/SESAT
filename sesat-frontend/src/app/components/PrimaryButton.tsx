
import { ButtonProps } from "@/types/IButtonProps";
import { FC } from "react";

export const PrimaryButton: FC<ButtonProps> = ({onClick, id, text}) => {
    return (
      <div>
        <label htmlFor={id} className="btn" onClick={onClick}>
          {text}
        </label>      
      </div>
    );
  };