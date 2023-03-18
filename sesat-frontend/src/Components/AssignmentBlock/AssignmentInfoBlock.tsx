
const AssignmentInfoBlock = () =>
{
  return(
    <div className="">
      <article className="prose">
        <h1 className="font-SESAT mt-2">
          Título de la asignación
        </h1>
        <h3 className="ml-4">
          Texto descriptivo de la asignación
        </h3>
      </article>
      <div className=" mt-4 w-full bg-[#f8f9fa] shadow-md px-4 py-4">
        <div className="pt-[7px]">
          <button className="btn bg-[#8c969f] border-transparent w-1/8 h-[30px]">
            Marcar como hecho 
          </button>
        </div>
        <div className="divider mt-2 mb-2"></div>
        <div className="font-bold">
          Abierto: <span className="font-normal text-gray-500"> lunes, 13 de marzo de 2023, 00:00 </span>
        </div>
        <div className="font-bold mt-2">
          Pendiente: <span className="font-normal text-gray-500"> lunes, 13 de marzo de 2023, 00:00 </span>
        </div>
        <div className="divider mt-2 mb-2"></div> 
        <button className="btn no-animation bg-[#f9c107] border-transparent w-1/8 h-[30px] hover:bg-[#f9c107] hover:border-transparent text-gray-700 hover:cursor-default">
            Pendiente de Entrega 
        </button>
      </div>
      <input type="file" className="file-input mt-10 hover:border hover:border-[#003067]" />
    </div>
  )
}

export default AssignmentInfoBlock