"use client";

import { useEffect, useState } from "react";
import autosize from "autosize";
import { useRouter } from "next/navigation";
import { TitleBar } from "@/app/components/TitleBar";
import "flatpickr/dist/themes/light.css";

import Flatpickr from "react-flatpickr";

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
    'Seminario de Tesis I (20% de avance)',
    'Seminario de Tesis II (50% de avance)',
    'Seminario de Tesis III (90% de avance)',
  ]

  const title = names.at(parseInt(numAvance) - 1)

  {/*const [listaProgramas, setListaProgramas] = useState<SESAT.Programa[]>();  */ }
  const [programs, setProgram] = useState<string>();
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");
  const [description, setDescription] = useState("");
  const navigate = useRouter()
  {/**      

    const getListaProgramas = async () => {
      setListaProgramas(await ProgramaEndpoint.getProgramas(""));
    };

  */}


  useEffect(() => {
    console.log("useEffect");
    {/**
      getListaProgramas();
     */}

  }, []);

  function onChangeStartDate(value: Date) {
    setStartDate(value);
  }

  function onChangeEndDate(value: Date) {
    setEndDate(value);
  }

  function onChangeStartTime(value: any) {
    setStartTime(value);
  }

  function onChangeEndTime(value: any) {
    setEndTime(value);
  }

  const handleSubmit = (e: any) => {
    {/** 
      try {
        e.preventDefault();
        console.log("Handle Submit");
        TesisEndpoint.getTheses("").then((tesis) => {
          if (tesis) {
            console.log("Tesis");
            tesis.forEach((t) => {
              console.log("Each Tesis");
              if (t.ultimo_avance === parseInt(avance)) {
                console.log("Acta");
                ActaEvaluacionEndpoint.postActaEvaluacion(
                  {
                    documento_rellenado: null,
                    id_acta_vacia: 1,
                  },
                  ""
                ).then((acta) => {
                  if (acta) {
                    console.log("Formato");
                    FormatoEvaluacion.postFormatoEvaluacion(
                      {
                        documento_rellenado: null,
                        id_formato_vacio: 1,
                      },
                      ""
                    ).then((formato) => {
                      if (formato) {
                        console.log("Asignacion");
                        AsignacionEndpoint.postAsignacion(
                          {
                            num_avance: parseInt(avance),
                            titulo: title,
                            descripcion: description,
                            apertura: new Date(startDate),
                            cierre: endDate,
                            calificacion: null,
                            documento: null,
                            estado_entrega: 0,
                            retroalimentacion: null,
                            id_formato_evaluacion: formato.id_formato_evaluacion,
                            id_acta_evaluacion: acta.id_acta_evaluacion,
                          },
                          ""
                        ).then((asignacion) => {
                          if (asignacion) {
                            console.log("AsignacionTesis");
                            AsignacionTesisEndpoint.postAsignacionTesis(
                              {
                                id_asignacion: asignacion?.id_asignacion,
                                id_tesis: t.id_tesis,
                              },
                              ""
                            );
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
      */}
  };
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

              <Flatpickr
                data-enable-time
                value={startDate}
                className="gray__border"
                onChange={([date]) => {
                  setStartDate(date)
                }}

              />

            </div>
            
            {/**Date end */}
            <div className="flex flex-col w-full mt-10 ">
              <label className="mb-3 block text-lg font-bold">
                Fecha y hora de entrega
              </label>

              <Flatpickr
                data-enable-time
                value={endDate}
                className="gray__border"
                onChange={([date]) => {
                  setEndDate(date)
                }}

              />
            </div>

            {/**Buttons */}
            <div className="flex justify-end w-full mt-10">
              <div className="mr-6">
                <button
                  type="button"
                  className="bg-white text-red-500 hover:scale-105 gray__border font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 transition-all duration-150"

                >
                  Descartar
                </button>
              </div>
              <button
                type="submit"
                className="bg-dark-blue-10/90 text-white hover:bg-dark-blue-10 hover:scale-105 font-bold uppercase text-sm px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
