"use client";

import { useEffect, useState } from "react";
import autosize from "autosize";
import { useRouter } from "next/navigation";
import { TitleBar } from "@/app/components/TitleBar";
import "flatpickr/dist/themes/light.css";

import Flatpickr from "react-flatpickr";
import { fetchLatestPeriod } from "../../../../../../../../utils/periodo.endpoint";
import { postAsignacionesPhdByNumAv } from "../../../../../../../../utils/asignacion.endpoint";
import NotFound from "@/app/(admin)/admin-dashboard/not-found";
import ProcessingAnim from "@/app/components/ProcessingAnim";

{/**
Docs:
Date-time picker
https://flatpickr.js.org/examples/

https://github.com/haoxins/react-flatpickr#readme
 */}

export default function CreateAssignment({
  params,
}: {
  params: { numAvance: string }
}) {

  const { numAvance } = params

  const names = [
    'Seminario de Avance de Tesis 1',
    'Seminario de Avance de Tesis 2',
    'Seminario de Avance de Tesis 3',
    'Seminario de Avance de Tesis 4',
    'Seminario de Avance de Tesis 5',
    'Seminario de Avance de Tesis 6',
  ]

  let avance = parseInt(numAvance) - 1;

  const title = names.at(avance)
  const [periodo, setPeriodo] = useState<undefined | PeriodoProps>(undefined)
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const navigate = useRouter()

  type PeriodoProps = {
    id_periodo: number;
    fecha_apertura: string;
    fecha_cierre: string;
  }

  function formatDate(dateString: string): string {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day.toString().padStart(2, '0')}/${month}/${year}`;
}

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      postAsignacionesPhdByNumAv(numAvance, {
        id_formato_evaluacion: null,
        id_acta_evaluacion: null,
        id_tesis: null,
        id_modalidad: 1,
        id_periodo: periodo?.id_periodo as number,
        num_avance: avance + 1,
        titulo: title as string,
        descripcion: description,
        fecha_entrega: null,
        calificacion: null,
        documento: null,
        estado_entrega: 0,
        retroalimentacion: null,
      }, "");
    } catch (error) {
      alert(error)
    }

  };
  useEffect(() => {
    async function fetchDATA() {
      try {
        await fetchLatestPeriod("").then((res) => {
          setPeriodo(res)
        })
      } catch (error: any) {
        setError(error)
      }
    }

    fetchDATA();
  }, []);

  if (error) {
    return (
      <NotFound />
    )
  }

  if (!periodo) {
    return (
      <div className="flex w-full justify-center items-center">
        <ProcessingAnim title="" />
      </div>
    )
  }

  return (
    <main>
      <div>
        <TitleBar title="Asignación de entrega de avance" />
        <form
          className="lg:flex lg:flex-row w-full"
          onSubmit={handleSubmit}
        >
          {/**Titulo Descripcion */}

          <div className="w-full lg:w-3/6 h-fit p-6 mt-10 gray__border">
            <label className="mb-3 block text-lg font-bold">Título</label>
            <label className="mb-10 block text-lg font-normal w-full">
              {title}
            </label>
            <label className="mb-3 block text-lg font-bold">
              Instrucciones
            </label>
            <textarea
              className=" h-48 w-full px-3 gray__border text-base"
              placeholder="Ingrese las instrucciones y/o descripción"
              onChange={(e) => {
                autosize(e.currentTarget);
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="w-full lg:w-3/6 h-fit bg-light-blue-10 mt-10 lg:ml-6 gray__border p-6">

            {/**Date start */}
            <div className="flex flex-col w-full ">
              <label className="mb-3 block text-lg font-bold">
                Fecha y hora de publicación
              </label>

              {periodo && (
                <p>{formatDate(periodo.fecha_apertura)}</p>
              )}

            </div>

            {/**Date end */}
            <div className="flex flex-col w-full mt-10 ">
              <label className="mb-3 block text-lg font-bold">
                Fecha y hora de entrega
              </label>

              {periodo && (
                <p>{formatDate(periodo.fecha_cierre)}</p>
              )}
            </div>

            {/**Buttons */}
            <div className="flex justify-end w-full mt-10">
              <div className="mr-6">
                <button
                  type="button"
                  className="secondary__btn"

                >
                  Descartar
                </button>
              </div>
              <button
                type="submit"
                className="primary__btn"
              >
                Crear
              </button>
            </div>

          </div>




        </form>
      </div>
    </main>
  )
}
