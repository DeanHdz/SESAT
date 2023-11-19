import PrevAdvance from "@/app/components/PrevAdvance";
import React from "react";
import { Avance } from "../../../types/ISESAT";


const AdvancesList = ({ history }: { history: Array<Avance> | undefined }) => {

  return (

    <div className="block mt-6 w-full  bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit gray__border">
      <label className="lg:mb-0 mb-3 block text-xl font-SESAT">
        Historial de avances
      </label>

      <ul className=" w-full overflow-x-scroll no-scrollbar lg:overflow-x-hidden steps steps-horizontal lg:steps-vertical">

        {history && (
          history.map((elem, i) => (
            elem.id_asignacion > 0 ? (
              <>
                {/**Avance de medio término doctorado */}                
                {elem.grado_estudio === 'Doctorado' && elem.tipo === 2 ? (
                  <li data-content={''} className="step step-primary hidden">
                    <PrevAdvance idAsignacion={elem.id_asignacion} avance={elem.num_avance} tipo={elem.tipo} />
                  </li>
                ) : (
                  <li data-content={elem.num_avance > 0 ? elem.num_avance : ''} className="step step-primary hidden">
                    <PrevAdvance idAsignacion={elem.id_asignacion} avance={elem.num_avance} tipo={elem.tipo} />
                  </li>
                )}
              </>
            ) : (
              <>
                {elem.id_asignacion === -1 ? (
                  <li data-content={''} className="step text-black/40 lg:!text-left">
                    {`Cambio de modalidad a ${elem.modalidad}`}
                  </li>
                ) : (
                  <>
                    {elem.tipo !== 2 ? (
                      <li data-content={elem.num_avance > 0 ? elem.num_avance : ''} className="step">
                        {elem.num_avance > 0 ? `Avance ${elem.num_avance}` : 'Seminario de investigación'}
                      </li>
                    ) : (
                      <li data-content={''} className="step">
                        {`Avance de medio término`}
                      </li>
                    )}
                  </>
                )}
              </>
            )
          ))
        )}

      </ul>

    </div>
  );
};

export default AdvancesList;