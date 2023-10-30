import React from "react";
import PrevAdvance from "./PrevAdvance";

const AdvancesList = ({ history }: { history: Array<number> }) => {
  
  return (
    
    <div className="block mt-6 w-10/12 bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit border border-light-gray-22 border-solid">
      <label className="mb-0 block text-base font-bold">
        Historial de avances
      </label>

      <ul className="steps steps-vertical">
        {history.map((elem, i) => (
          elem !== 0 ? (
            <li className="step step-primary">
              <PrevAdvance idAsignacion={elem} avance={i + 1}/>
            </li>
          ) : (
            <li className="step">
              {`Avance ${i + 1}`}
            </li>
          )
        ))}        
      </ul>


    </div>
  );
};

export default AdvancesList;