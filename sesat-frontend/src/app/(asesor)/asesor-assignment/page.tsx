'use client'

import TesisView from "@/app/components/TesisView"
import AddComment from "@/app/components/AddComment"
import Reply from "@/app/components/Reply"
import Drawer from "./components/Drawer"
import AssignmentHeader from "./components/AssignmentHeader"
import Feedback from "./components/Feedback"
import AdvancesList from "./components/AdvancesList"
import AssignmentProperties from "./components/AssignmentProperties"
import AssignmentData from "./components/AssignmentData"

export default function Home() {
  return (
    <div className="flex">
      <div className="hidden lg:flex lg:w-3/12 flex-col">
        <Drawer />
        <Feedback texto="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga magnam perspiciatis incidunt vero inventore, officia non maxime, rem mollitia dolorum voluptatibus explicabo repellendus aliquid at! Voluptas, laborum dignissimos! Nostrum, at."/>
        <AdvancesList />
      </div>

      <div className="w-full lg:w-9/12">
        <AssignmentHeader titulo="Titulo de la asignación" descripcion="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."/>
        <div className="flex flex-row">
          
          <div className="flex flex-col w-2/5">
            <AssignmentData nombreTesis="Ejemplo de nombre de tesis" autor="Dean Joshua Hernandez" numAvance={4} fechaEntrega="18/10/2023" encargadoRevision="Sandra Edith Nava Muñoz"/>
            <AssignmentProperties fechaEntrega="31/10/2023" calificacion={10}/> {/* (Dean) Calificacion era en base 10 o 100?*/}
          </div>

          <div className="flex flex-col w-3/5">

          </div>

        </div>
        
        <AddComment id_asignacion={3}/>
      </div>

    </div>
  )
}