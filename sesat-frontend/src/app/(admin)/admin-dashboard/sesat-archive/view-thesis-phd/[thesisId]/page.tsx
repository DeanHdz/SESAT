"use client";

import FullPDFViewer from "@/app/components/FullPDFViewer";
import { InactiveTesisProps } from "@/types/ISESAT";
import { fetchDocumentByID } from "@/utils/asignacion-tesis.endpoint";
import { fetchOneTesis, fetchTesisCompletadasPhd } from "@/utils/tesis.endpoint";



export async function generateStaticParams() {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/completed/phd`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer `,
    },
  };
  const tesisList = await fetch(url, options).then((res) => res.json())


  return tesisList.map((tesis: InactiveTesisProps) => ({
    thesisId: `${tesis.id_tesis}`,
  }))
}


/**
 * 
 
 * {
  "documento": {
    "type": "Buffer",
    "data": [
      74,
      86,
      66,
      69,
      82,
    ],
  },
}
 
 */

export default async function Page({
  params,
}: {
  params: { thesisId: string }
}) {

  const { thesisId } = params

  const datosTesis: InactiveTesisProps | undefined = await fetchOneTesis(thesisId, "")
  let pdf = undefined
  const resp = await fetchDocumentByID(thesisId, "")

  return (
    <main>
      <details className="collapse bg-white gray__border mb-6">
        <summary className="collapse-title text-[16px] font-medium">
          <div className="flex flex-row">
            <div>Propiedades</div>
            <div className="w-[20px] flex ml-2 items-center">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg>
            </div>
          </div>

        </summary>
        <div className="collapse-content">
          <div className="block w-auto bg-light-blue-10 rounded px-8 py-4 mb-6 h-fit border border-light-gray-22 
border-solid">

            <label className="mb-0 block text-base font-light">Título</label>
            <label className="mb-4 block text-lg font-bold">{datosTesis?.titulo}</label>

            <label className="mb-0 block text-base font-light">Autor</label>
            <label className="mb-5 block text-lg font-bold">{`${datosTesis?.nombre} ${datosTesis?.apellido_paterno} ${datosTesis?.apellido_materno}`}</label>

            <label className="mb-0 block text-base font-light">
              Asesor de tesis
            </label>
            <label className="mb-5 block text-lg font-bold">
              {/*asesor*/}
            </label>
          </div>

          <div className="flex flex-col lg:flex-row w-full mb-6">
            <div className="block mt-0 w-full bg-light-blue-10 rounded px-8 py-4 h-fit lg:h-[200px] border border-light-gray-22 border-solid">
              <label className="mb-0 block text-base font-bold">
                Versiones anteriores de la tesis
              </label>
              <label className="mt-6 mb-2 block text-base font-light">
                Historial de entregas de avance para completar la tesis
              </label>
              <select className="mt-0 select h-1/4 py-2 px-10 shadow appearance-none border-primary rounded w-full mb-10">
                <option disabled selected>
                  Seleccione para previsualizar
                </option>
                <option>Avance 1</option>
                <option>Avance 2</option>
                <option>Avance 3</option>
              </select>


            </div>
            <div className="w-[50px]"></div>


            <div className="block mt-6 lg:mt-0 w-full bg-light-blue-10 rounded px-8 py-4 h-fit lg:h-[200px] border border-light-gray-22 border-solid">
              <label className="mb-0 block text-base font-bold">Información</label>


              <label className="mb-0 mt-5 block text-base font-light">
                Fecha del registro de tesis
              </label>
              <label className="mb-5 block text-lg font-bold">{datosTesis?.fecharegistro.substring(0, 10)}</label>


              <label className="mb-0 block text-base font-light">
                Programa de posgrado
              </label>
              <label className="mb-5 block text-lg font-bold">{datosTesis?.programa_nombreprograma}</label>

            </div>

          </div>

        </div>
      </details>
      {pdf && (
        <FullPDFViewer file={pdf} />
      )

      }

    </main>
  )
}
