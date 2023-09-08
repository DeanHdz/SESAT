import { useRouter } from "next/navigation";

{/** 
const ChangeTesisNameModal = ({tesis}:{tesis: SESAT.Tesis}) =>
{
  const navigate = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState<string>();

  async function handleSubmit(e: any) {
    try 
    {
      e.preventDefault();
      TesisEndpoint.putTesis({
        id_tesis: tesis.id_tesis,
        clave_alumno: tesis.clave_alumno,
        titulo: nombre! ?? "",
        fecharegistro: tesis.fecharegistro,
        generacion: tesis.generacion,
        registrada: tesis.registrada,
        ultimo_avance: tesis.ultimo_avance,
        estado_activo: tesis.estado_activo,
      },"");
    }
    catch(err)
    {
      console.log(err);
    }
    navigate("/asesor-board/view-tesis-phd");
  }

  return (
    <>
      <button
        className="bg-[SESAT] bg-dark-blue-10 text-white active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Modificar Nombre de Tesis
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modificar Nombre de Tesis</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  
                  <div className="relative p-6 flex-auto">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="my-3 block text-lg font-bold">Nombre de Tesis</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={tesis.titulo}
                        className="input rounded input-bordered w-full"
                        onChange={(e) => {
                          setNombre(e.target.value);
                        }}
                      />
                    </div>
                    <div className="prose prose-xl">
                      <label className="label">
                        <span className="mt-3 block text-lg font-bold">Atención</span>
                      </label>
                      <p className="relative bottom-4">
                        Considere que el cambio no se aplicará al documento debido a limitaciones del sistema. Actualice el archivo PDF para evitar incongruencias con los datos.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cerrar
                    </button>
                    <button
                      className="bg-dark-blue-10 text-white active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}


export default ChangeTesisNameModal
*/}
