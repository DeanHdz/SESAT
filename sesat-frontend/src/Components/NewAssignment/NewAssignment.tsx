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

const NewAssignment = ({
  title,
  program,
}: {
  title: string;
  program: string;
}) => {
  const [listaProgramas, setListaProgramas] = useState<SESAT.Programa[]>();
  const [programs, setProgram] = useState<string>();
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
    setStartDate(value);
  }

  return (
    <div>
      <div className="w-11/12 m-auto">
        <label className="mt-10 block text-4xl font-bold">
          Nueva Asignación
        </label>
        <div className="border-t border-light-gray-22 border-solid w-full mt-3"></div>
      </div>
      <form className="lg:flex lg:flex-row w-11/12 m-auto">
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
              }}
            ></textarea>
            <label className="mb-3 block text-lg font-bold">Programa</label>
            <select
              required
              className="select select-bordered rounded"
              onChange={(e) => {
                setProgram(e.target.value);
              }}
            >
              <option disabled selected>
                Seleccione una opción
              </option>
              {listaProgramas ? (
                <SelectProgramas programas={listaProgramas} />
              ) : (
                ""
              )}
            </select>
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

            <div className="flex flex-row w-full justify-around">
              <DatePicker
                selected={startDate}
                onChange={onChangeStartDate}
                className="rounded"
              />
              <CustomTimePicker />
            </div>
            <div className="flex justify-around w-full mt-10">
              <label className="mb-3 block text-lg font-bold">
                Fecha de entrega
              </label>
              <label className="mb-3 block text-lg font-bold">Hora</label>
            </div>

            <div className="flex flex-row w-full justify-around">
              <DatePicker
                selected={endDate}
                onChange={onChangeEndDate}
                className="rounded"
              />
              <CustomTimePicker />
            </div>
          </div>
          <div className="flex justify-end w-full mb-10 mt-10">
            <div className="mr-6">
              <SecondaryButton text="Descartar" />
            </div>
            <PrimaryButton text="Crear" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewAssignment;
