import CustomCalendar from "../CustomCalendar/CustomCalendar";
import CustomTimePicker from "../CustomTimePicker/CustomTimePicker";
import { PrimaryButton } from "../../Components/Buttons/PrimaryButton";
import { SecondaryButton } from "../../Components/Buttons/SecondaryButton";
import autosize from "autosize";

const NewAssignment = () => {
  return (
    <form className="lg:flex lg:flex-row w-11/12 m-auto">
      <div className="block w-11/12 lg:w-3/6">
        <div className="sm:pl-12 lg:flex lg:flex-col mt-10">
          <label className="mb-3 block text-lg font-bold">Título</label>
          <input
            className="h-1/4 py-2 px-10 shadow appearance-none rounded w-full lg:w-5/6 mb-10"
            type="text"
            placeholder="Ingrese el título de la asignación"
          />
          <label className="mb-3 block text-lg font-bold">Instrucciones</label>
          <textarea
            className="textarea h-48 w-full lg:w-5/6 px-10  border-primary rounded text-base mb-10"
            placeholder="Ingrese las instrucciones y/o descripción"
            onChange={(e) => {
              autosize(e.currentTarget);
            }}
          ></textarea>
          <label className="mb-3 block text-lg font-bold">Programa</label>
          <select className="select h-1/4 py-2 px-10 shadow appearance-none border-primary rounded w-full lg:w-5/6 mb-10">
            <option disabled selected>
              Programa al que pertenece
            </option>
            <option>Programa 1</option>
            <option>Programa 2</option>
            <option>Programa 3</option>
            <option>Programa 4</option>
          </select>
          <div className="w-full mt-10">
            <label className="mb-3 block text-lg font-bold">
              Agregar materiales de referencia (Opcional)
            </label>
            <input
              type="file"
              className="file-input w-full lg:w-5/6 mb-10 hover:border hover:border-[#003067]"
            />
          </div>
        </div>
      </div>
      <div className="block w-11/12 lg:w-3/6">
        <div className="bg-light-blue-10 w-auto md:w-auto lg:w-full rounded py-6 px-6 ml-12 lg:ml-0 lg:mt-10">
          <div className="flex justify-around w-full ">
            <label className="mb-3 block text-lg font-bold">
              Fecha de publicación
            </label>
            <label className="mb-3 block text-lg font-bold">Hora</label>
          </div>

          <div className="flex flex-row w-full justify-around">
            <CustomCalendar />
            <CustomTimePicker />
          </div>
          <div className="flex justify-around w-full mt-10">
            <label className="mb-3 block text-lg font-bold">
              Fecha de entrega
            </label>
            <label className="mb-3 block text-lg font-bold">Hora</label>
          </div>

          <div className="flex flex-row w-full justify-around">
            <CustomCalendar />
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
  );
};

export default NewAssignment;
