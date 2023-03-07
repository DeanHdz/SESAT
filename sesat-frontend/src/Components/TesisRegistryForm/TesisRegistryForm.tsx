export const TesisRegistryForm = () => {
  return (
    <div className="flex flex-row w-screen">
      <div className="w-3/6">
        <form className="flex flex-col mt-10 ml-10">
          <label className="mb-3 block text-lg font-bold">
            Nombre de la Tesis
          </label>
          <input
            className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
            type="text"
            placeholder="Nombre/Tema completo de la tesis"
          />
          <label className="mb-3 block text-lg font-bold">
            Correo Institucional
          </label>
          <input
            className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
            type="text" 
            placeholder="clave@alumnos.uaslp.mx"
          />
          <label className="mb-3 block text-lg font-bold">
            Asesor
          </label>
          <select className="select h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10">
            <option disabled selected>Nombre completo Asesor/a</option>
            <option>Asesor 1</option>
            <option>Asesor 2</option>
            <option>Asesor 3</option>
            <option>Asesor 4</option>
          </select>
          <div className="flex flex-row">
            <div className="w-5/6">
              <label className="mb-3 block text-lg font-bold">
                Coasesor
              </label>
              <input
                className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
                type="text"
                placeholder="Nombre completo Coasesor/a"
              />
            </div>
            <div className="w-1/6">
              <label className="mb-3 block text-lg font-bold">
                Añadir
              </label>
              <button className="shadow rounded h-1/4 w-[60px] hover:border hover:border-[#003067]">+</button>
            </div>
          </div>
        </form>
      </div>
      <div className="w-3/6">
      <form className="flex flex-col mt-10 ml-10">
          <label className="mb-3 block text-lg font-bold">
            Modalidad
          </label>
          <select className="select h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10">
            <option disabled selected>Tiempo Completo / Medio Tiempo</option>
            <option>Tiempo Completo</option>
            <option>Medio Tiempo</option>
          </select>
          <label className="mb-3 block text-lg font-bold">
            Programa
          </label>
          <select className="select h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10">
            <option disabled selected>Programa al que pertenece</option>
            <option>Programa 1</option>
            <option>Programa 2</option>
            <option>Programa 3</option>
            <option>Programa 4</option>
          </select>
          <label className="mb-3 block text-lg font-bold">
            Generación del alumno
          </label>
          <input
            className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
            type="text"
            placeholder="AAAA"
          />
          <div className="w-5/6">
            <label className="mb-3 block text-lg font-bold">
              Subir un archivo (opcional)
            </label>
            <input 
              type="file" 
              className="file-input w-5/6 mb-10 hover:border hover:border-[#003067]" 
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TesisRegistryForm;
