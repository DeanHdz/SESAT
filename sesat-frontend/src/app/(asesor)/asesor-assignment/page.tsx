'use client'

import TesisView from "@/app/components/TesisView"
import AddComment from "@/app/components/AddComment"
import Reply from "@/app/components/Reply"
import Drawer from "./components/Drawer"

export default function Home() {
  return (
    <div className="flex">
      <div className="hidden lg:flex lg:w-3/12 flex-col">
        <Drawer />
        <div className="w-10/12 pt-5 block mt-10 bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit border border-light-gray-22 border-solid">
          <label className="mb-0 block text-base font-bold">
            Retroalimentacion
          </label>
          <div className="mt-6 mb-2 block text-base text-dark-blue-10 font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga magnam perspiciatis incidunt vero inventore, officia non maxime, rem mollitia dolorum voluptatibus explicabo repellendus aliquid at! Voluptas, laborum dignissimos! Nostrum, at.
          </div>
          <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
            <div className="text-center text-[#ffffff]">
              Ver asignación
            </div>
          </button>
        </div>
        <div className="block mt-0 w-10/12 bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit border border-light-gray-22 border-solid">
            <label className="mb-0 block text-base font-bold">
              Versiones anteriores de la tesis
            </label>
            <label className="mt-6 mb-2 block text-base font-light">
              Historial de versiones
            </label>
            <select className="mt-0 select h-1/4 py-2 px-10 shadow appearance-none border-primary rounded w-full mb-10">
              <option disabled selected>
                Seleccione para previsualizar
              </option>
              <option>Avance 1</option>
              <option>Avance 2</option>
              <option>Avance 3</option>
            </select>
  
  
          </div>
      </div>

      <div className="w-full lg:w-9/12">
        <TesisView titulo="La importancia del agua" fecha="10/10/2023" autor="Edwin Aguilar" />
        <Reply userName="Yo" date="Hoy" body="Hola" />
        <AddComment id_asignacion={3} />
      </div>
    </div>
  )
}