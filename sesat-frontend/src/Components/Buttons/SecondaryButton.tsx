import React from "react";


export const SecondaryButton = ({id, text}: {id:string, text:string}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="btn bg-white border-primary text-slate-900 hover:text-white"
      >
        {text}
      </label>
    </div>
  );
};
