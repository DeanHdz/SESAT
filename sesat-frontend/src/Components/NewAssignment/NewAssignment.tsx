import CustomCalendar from "../CustomCalendar/CustomCalendar";
import CustomTimePicker from "../CustomTimePicker/CustomTimePicker";
import { PrimaryButton } from "../../Components/Buttons/PrimaryButton";
import { SecondaryButton } from "../../Components/Buttons/SecondaryButton";
import autosize from "autosize";
import { useEffect, useState } from "react";
import { SESAT } from "../../Interfaces/ISESAT";
import { ProgramaEndpoint } from "../../api/programa.endpoint";
import SelectProgramas from "../TesisRegistryForm/SelectProgramas";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { AsignacionEndpoint } from "../../api/asignacion.endpoint";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { TesisEndpoint } from "../../api/tesis.endpoint";
import { AsignacionTesisEndpoint } from "../../api/asignacion-tesis.endpoint";
import { ActaEvaluacionEndpoint } from "../../api/acta-evaluacion.endpoint";
import { FormatosVaciosEndpoint } from "../../api/formatos-vacios.endpoint";
import { FormatoEvaluacion } from "../../api/formato-evaluacion.endpoint";

const NewAssignment = ({
  title,
  avance,
}: {
  title: string;
  avance: string;
}) => {
  const [listaProgramas, setListaProgramas] = useState<SESAT.Programa[]>();
  const [programs, setProgram] = useState<string>();
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const getListaProgramas = async () => {
    setListaProgramas(await ProgramaEndpoint.getProgramas(""));
  };

  useEffect(() => {
    console.log("useEffect");
    getListaProgramas();
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
  };

  return (
    <div>
      <div className="w-11/12 m-auto">
        <label className="mt-10 block text-4xl font-bold">
          Nueva Asignación
        </label>
        <div className="border-t border-light-gray-22 border-solid w-full mt-3"></div>
      </div>
      <form
        className="lg:flex lg:flex-row w-11/12 m-auto"
        onSubmit={handleSubmit}
      >
        <div className="block w-11/12 lg:w-3/6 ">
          <div className="pt-6 sm:pl-12 lg:flex lg:flex-col mt-10 mb-10 mr-6 rounded border border-light-gray-22 border-solid">
            <label className="mb-3 block text-lg font-bold">Título</label>
            <label className="mb-10 block text-lg font-normal w-full lg:w-11/12">
              {title}
            </label>
            <label className="mb-3 block text-lg font-bold">
              Instrucciones
            </label>
            <textarea
              className="textarea h-48 w-full lg:w-11/12 px-10  border-primary rounded text-base mb-10"
              placeholder="Ingrese las instrucciones y/o descripción"
              onChange={(e) => {
                autosize(e.currentTarget);
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className="block w-11/12 lg:w-3/6">
          <div className="bg-light-blue-10 w-auto md:w-auto lg:w-full rounded py-6 px-6 ml-12 lg:ml-0 lg:mt-10 border border-light-gray-22 border-solid">
            <div className="flex justify-around w-full ">
              <label className="mb-3 block text-lg font-bold">
                Fecha de publicación
              </label>
              <label className="mb-3 block text-lg font-bold">Hora</label>
            </div>
            <div className="flex flex-row w-full justify-around pl-12">
              <DatePicker
                selected={startDate}
                onChange={onChangeStartDate}
                className="rounded"
              />

              <TimePicker
                onChange={onChangeStartTime}
                value={startTime}
                className="border-none"
              />
            </div>
            <div className="flex justify-around w-full mt-10">
              <label className="mb-3 block text-lg font-bold">
                Fecha de entrega
              </label>
              <label className="mb-3 block text-lg font-bold">Hora</label>
            </div>

            <div className="flex flex-row w-full justify-around pl-12">
              <DatePicker
                selected={endDate}
                onChange={onChangeEndDate}
                className="rounded"
              />
              <TimePicker
                onChange={onChangeEndTime}
                value={endTime}
                className="border-none"
              />
            </div>
          </div>
          <div className="flex justify-end w-full mb-10 mt-10">
            <div className="mr-6">
              <button
                type="button"
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                //onClick={() => window.location.reload()}
              >
                Descartar
              </button>
            </div>
            <button
              type="submit"
              className="bg-dark-blue-10 text-white active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Crear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewAssignment;
