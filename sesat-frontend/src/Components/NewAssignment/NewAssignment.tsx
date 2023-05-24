import CustomCalendar from "../CustomCalendar/CustomCalendar";
import CustomTimePicker from "../CustomTimePicker/CustomTimePicker";
import { PrimaryButton } from "../../Components/Buttons/PrimaryButton";
import { SecondaryButton } from "../../Components/Buttons/SecondaryButton";
import autosize from "autosize";

const NewAssignment = ({title="Título de la asignación", program="Programa"}:{title: string, program: string}) => {
  return (
    <div>
      <div className="w-11/12 m-auto">
        <label className="mt-10 block text-4xl font-bold">Nueva Asignación</label>
        <div className="border-t border-light-gray-22 border-solid w-full mt-3"></div>
      </div>
      <form className="lg:flex lg:flex-row w-11/12 m-auto">

        <div className="block w-11/12 lg:w-3/6 ">
          <div className="pt-6 sm:pl-12 lg:flex lg:flex-col mt-10 mb-10 mr-6 rounded border border-light-gray-22 border-solid">
            <label className="mb-3 block text-lg font-bold">Título</label>
            <label className="mb-10 block text-lg font-normal w-full lg:w-11/12">{title}</label>            
            <label className="mb-3 block text-lg font-bold">Instrucciones</label>
            <textarea
              className="textarea h-48 w-full lg:w-11/12 px-10  border-primary rounded text-base mb-10"
              placeholder="Ingrese las instrucciones y/o descripción"
              onChange={(e) => {
                autosize(e.currentTarget);
              }}
            ></textarea>
            <label className="mb-3 block text-lg font-bold">Programa</label>
            <label className="mb-10 block text-lg font-normal w-full lg:w-11/12">{program}</label>            
            <div className="w-full">
              <label className="mb-3 block text-lg font-bold">
                Agregar materiales de referencia (Opcional)
              </label>
              <input
                type="file"
                className="file-input w-full lg:w-11/12 mb-10 hover:border hover:border-[#003067] border border-light-gray-22 border-solid"
              />
            </div>
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
    </div>
  );
};

export default NewAssignment;
