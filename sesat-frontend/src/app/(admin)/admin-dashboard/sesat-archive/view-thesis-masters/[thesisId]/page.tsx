"use client";

import { InactiveTesisProps } from "../../../../../../../types/ISESAT";
import { fetchOneTesis } from "../../../../../../../utils/tesis.endpoint";
import { fetchAsesorByIDTesis } from "../../../../../../../utils/comite.endpoint";
import { useEffect, useState } from "react";
import ProcessingAnim from "@/app/components/ProcessingAnim";
import PDFViewer from "@/app/components/PDFViewer";
import NotFound from "../../../not-found";
import { fetchDocumentByID } from "../../../../../../../utils/asignacion.endpoint";
import Cookies from "js-cookie";

type AsesorProps = {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
};

type pdfProps = {
  documento: {
    type: string;
    data: Array<number>;
  };
};

export default function Page({ params }: { params: { thesisId: string } }) {
  const cookie = Cookies.get("SESATsession");
    const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : ""
  const { thesisId } = params;

  const [pdf, setPdf] = useState<undefined | Uint8Array>(undefined);
  const [datosTesis, setDatosTesis] = useState<undefined | InactiveTesisProps>(
    undefined
  );
  const [asesor, setAsesor] = useState<undefined | AsesorProps>(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDATA() {
      try {
        await fetchOneTesis(thesisId, token).then((result) => {
          setDatosTesis(result);
        });

        await fetchAsesorByIDTesis(thesisId, token).then((result) => {
          setAsesor(result);
        });

        await fetchDocumentByID(thesisId, token).then((res: pdfProps) => {
          const buffer = Uint8Array.from(res.documento.data);

          setPdf(buffer);
        });
      } catch (error: any) {
        setError(error);
      }
    }

    fetchDATA();
  }, []);

  if (error) {
    return <NotFound />;
  }

  if (!datosTesis || !pdf || !asesor) {
    return (
      <div className="flex w-full bg-light-blue-10 gray__border h-[500px] f justify-center items-center">
        <ProcessingAnim title="" />
      </div>
    );
  }

  return (
    <div className="">
      <div
        tabIndex={0}
        className="collapse bg-white gray__border w-full mb-6 mt-4"
      >
        <div className="collapse-title my-0 text-[16px] font-medium hover:text-dark-blue-10">
          Propiedades
        </div>
        <div className="collapse-content">
          <div className="block w-auto bg-light-blue-10 rounded px-8 py-4 mb-6 h-fit border border-light-gray-22 border-solid">
            <label className="mb-0 block text-base font-light">Título</label>
            <label className="mb-4 block text-lg font-bold">
              {datosTesis?.titulo}
            </label>

            <label className="mb-0 block text-base font-light">Autor</label>
            <label className="mb-5 block text-lg font-bold">{`${datosTesis?.nombre} ${datosTesis?.apellido_paterno} ${datosTesis?.apellido_materno}`}</label>

            <label className="mb-0 block text-base font-light">
              Asesor de tesis
            </label>
            <label className="mb-5 block text-lg font-bold">
              {`${asesor?.nombre} ${asesor?.apellido_paterno} ${asesor?.apellido_materno}`}
            </label>
          </div>

          <div className="flex flex-col lg:flex-row w-full mb-6">
            <div className="block lg:mt-0 w-full bg-light-blue-10 rounded px-8 py-4 h-fit lg:h-fit border border-light-gray-22 border-solid">
              <label className="mb-6 block text-base font-bold">
                Acerca de
              </label>

              <div className="flex flex-col lg:flex-row w-full h-fit">
                <div className="flex  flex-col justify-center h-full">
                  <label className="mb-0 block text-base font-light">
                    Fecha del registro de tesis
                  </label>
                  <label className="mb-5 block text-lg font-bold">
                    {datosTesis?.fecha_registro.substring(0, 10)}
                  </label>
                </div>

                <div className="flex lg:ml-14 flex-col justify-center h-full">
                  <label className="mb-0 block text-base font-light">
                    Programa de posgrado
                  </label>
                  <label className="mb-5 block text-lg font-bold">
                    {datosTesis?.programa_nombre_programa}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {pdf && (
        <div className="z-10 w-full">
          <PDFViewer buffer={pdf} />
        </div>
      )}
    </div>
  );
}
