import AddComment from "@/app/components/AddComment"
import Drawer from "../../components/Drawer"
import AssignmentHeader from "../../components/AssignmentHeader"
import AdvancesList from "../../components/AdvancesList"
import AssignmentData from "../../components/AssignmentData"
import PDFViewer from "../../components/PDFViewer"
import CommentSection from "../../components/CommentSection"
import { PrimaryButton } from "@/app/components/PrimaryButton"


export default function Home() {
  return (
    <div className="flex">
      <div className="hidden lg:flex lg:w-3/12 flex-col">
        <Drawer />
        <div className="mt-5">
          <AdvancesList />
        </div>
      </div>

      <div className="w-full lg:w-9/12">

        <AssignmentHeader titulo="Titulo de la asignación" descripcion="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." />

        <div className="flex flex-col">

          <div className="flex flex-col w-full m-2">
            <AssignmentData nombreTesis="Ejemplo de nombre de tesis" autor="Edwin Yankov Aguilar Montalvo" numAvance={2} fechaEntrega="19/10/2023" encargadoRevision="Juan Carlos Cuevas Tello" />
            <button className="mt-10 mb-10 primary__btn">
              Enviar PDF
            </button>
          </div>

          {/* <div className="flex flex-col w-3/5 m-2">
            <PDFViewer />
          </div> */}

        </div>
          
        <CommentSection />
        <AddComment id_asignacion={3} />

      </div>

    </div>
  )
}