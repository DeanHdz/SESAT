import { FC } from "react";

export interface ButtonProps {
  onClick?: () => void;
  id?: string;
  text: string;
}

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