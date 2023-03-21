import CustomCalendar from "../CustomCalendar/CustomCalendar";
import CustomTimePicker from "../CustomTimePicker/CustomTimePicker";

const NewAssignment = () => {
  return (
    <div className="lg:flex lg:flex-row w-screen">
      <div className="block w-11/12 lg:w-3/6">
        <form className="lg:flex lg:flex-col mt-10 ml-10">
          <label className="mb-3 block text-lg font-bold">Título</label>
          <input
            className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
            type="text"
            placeholder="Ingrese el título de la asignación"
          />
          <label className="mb-3 block text-lg font-bold">Instrucciones</label>
          <textarea
            className="textarea h-48 w-5/6 px-10  border-primary rounded text-base mb-10"
            placeholder="Ingrese las instrucciones y/o descripción"
          ></textarea>
          <label className="mb-3 block text-lg font-bold">Programa</label>
          <select className="select h-1/4 py-2 px-10 shadow appearance-none border-primary rounded w-5/6 mb-10">
            <option disabled selected>
              Programa al que pertenece
            </option>
            <option>Programa 1</option>
            <option>Programa 2</option>
            <option>Programa 3</option>
            <option>Programa 4</option>
          </select>
          <div className="w-5/6 mt-10">
            <label className="mb-3 block text-lg font-bold">
              Agregar materiales de referencia (Opcional)
            </label>
            <input
              type="file"
              className="file-input w-full mb-10 hover:border hover:border-[#003067]"
            />
          </div>
        </form>
      </div>
      <div className="block w-11/12 lg:w-3/6 ">
        <form className="lg:lex lg:flex-col mt-10 ml-10 ">
          <div className="bg-[#e8edef] w-5/6 rounded py-6 px-6">  
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
          <div className="flex justify-end items-end w-5/6 mb-10 mt-10">
              <button className="btn ml-6 bg-white border-primary text-black">
                Descartar
              </button>
              <button className="btn ml-6 ">Crear</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default NewAssignment;
