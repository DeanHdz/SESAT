import PrevAdvance from "@/app/(asesor)/asesor-dashboard/components/PrevAdvance";
import React from "react";


const AdvancesList = ({ history }: { history: Array<number> | undefined }) => {

  return (

    <div className="block mt-6 w-full  bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit gray__border">
      <label className="lg:mb-0 mb-3 block text-xl font-SESAT">
        Historial de avances
      </label>

      <ul className=" w-full overflow-x-scroll no-scrollbar lg:overflow-x-hidden steps steps-horizontal lg:steps-vertical">
        {history && (
          history.map((elem, i) => (
            elem !== 0 ? (
              <li className="step step-primary hidden">
                <PrevAdvance idAsignacion={elem} avance={i + 1} />
              </li>
            ) : (
              <li className="step">
                {`Avance ${i + 1}`}
              </li>
            )
          ))
        )}
      </ul>

    </div>
  );
};

export default AdvancesList;