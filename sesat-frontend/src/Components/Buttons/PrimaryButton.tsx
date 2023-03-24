import React from "react";


export const PrimaryButton = ({id, text}: {id:string, text:string}) => {
  return (
    <div>
      <label htmlFor={id} className="btn">
        {text}
      </label>
    </div>
  );
};
