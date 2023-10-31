import { FC } from "react";

export interface ButtonProps {
  onClick?: () => void;
  id?: string;
  text: string;
}

export const PrimaryButton: FC<ButtonProps> = ({onClick, id, text}) => {
    return (
      <div>
        <label htmlFor={id} className="btn" onClick={onClick}>
          {text}
        </label>      
      </div>
    );
  };