export const TesisRegistry = () => {
  return (
    <div className="h-screen">
      <div className="h-28 flex bg-[#075599]">
        <div className="ml-8 flex flex-row justify-center">
          <p className="text-white place-self-center text-4xl">Registro</p>
        </div>
      </div>
      <div className="h-10 flex bg-[#f1f2f5]">
        <div className="ml-8 flex flex-row justify-center">
          <p className="place-self-center text-xl">Registro de tesis</p>
        </div>
      </div>
      <form className="flex flex-col mt-10 ml-10">
        <label className="mb-3 block text-lg font-bold">
          Nombre de la Tesis
        </label>
        <input
          className="h-1/4 py-2 px-10 shadow appearance-none rounded"
          type="text"
          placeholder="Nombre/Tema completo de la tesis"
        />
        <label className="mb-3 block text-lg font-bold">
          Correo Institucional
        </label>
        <input
          className="h-1/4 py-2 px-10 shadow appearance-none rounded"
          type="text"
          placeholder="clave@alumnos.uaslp.mx"
        />
        <label className="mb-3 block text-lg font-bold">
          Asesor
        </label>
        <input
          className="h-1/4 py-2 px-10 shadow appearance-none rounded"
          type="text"
          placeholder="Nombre completo Asesor/a"
        />
        <label className="mb-3 block text-lg font-bold">
          Coasesor
        </label>
        <input
          className="h-1/4 py-2 px-10 shadow appearance-none rounded"
          type="text"
          placeholder="Nombre completo Coasesor/a"
        />
      </form>
    </div>
  );
};

export default TesisRegistry;
