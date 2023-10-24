
import AddComment from "@/app/components/AddComment"
import Drawer from "../components/Drawer"
import AssignmentHeader from "../components/AssignmentHeader"
import Feedback from "../components/Feedback"
import AdvancesList from "../components/AdvancesList"
import AssignmentData from "../components/AssignmentData"
import ReviewFormats from "../components/ReviewFormats"
import CommentSection from "../components/CommentSection"
import { Asignacion } from "../../../../../../types/ISESAT"
import { shortFormatDate } from "../../../../../../utils/utils"
import { fetchOneByIdAsignacion } from "../../../../../../utils/asignacion.endpoint";
import PDFPreview from "../components/PDFPreview"
import { fetchOneTesis } from "../../../../../../utils/tesis.endpoint"
import { fetchConversationByIdAsignacion } from "../../../../../../utils/comentario.endpoint"

async function fetchAndSortComments(idAsignacion: number, token: string) {
  let comments = await fetchConversationByIdAsignacion(idAsignacion, token);
  comments.sort((a: any, b: any) => a.id_comentario - b.id_comentario);
  return comments;
}

export default async function Home({
  params,
}: {
  params: { idAsignacion: string }
}) {
  let { idAsignacion } = params;
  let asignacion: Asignacion = await fetchOneByIdAsignacion(parseInt(idAsignacion), "").catch(() => { return null });
  let tesisInfo = await fetchOneTesis(asignacion.id_tesis.toString(), "");
  let comments = await fetchAndSortComments(asignacion.id_asignacion, '');

  return (
    <div className="flex">
      <div className="hidden lg:flex lg:w-3/12 flex-col">
        <Drawer />
        {/*<Feedback texto={asignacion.retroalimentacion} />*/}
        <AdvancesList />
      </div>

      <div className="w-full lg:w-9/12">

        <AssignmentHeader titulo={asignacion.titulo} descripcion={asignacion.descripcion} />

        <div className="flex flex-col lg:flex-row">

          <div className="flex flex-col w-full lg:w-2/5 lg:m-2">
            <AssignmentData nombreTesis={tesisInfo.titulo} autor={`${tesisInfo.nombre} ${tesisInfo.apellido_paterno} ${tesisInfo.apellido_materno} `} numAvance={asignacion.num_avance} fechaEntrega={shortFormatDate(asignacion.fecha_entrega)} fechaPresentacion={asignacion.fecha_presentacion} />
            {/*<AssignmentProperties fechaEntrega={shortFormatDate(asignacion.fecha_entrega)} calificacion={10}/> */} {/* (Dean) Calificacion era en base 10 o 100?*/}  
            <ReviewFormats tesis={asignacion.documento.data} actaPDF="" evaluacionPDF="" />
          </div>

          <div className="flex flex-col w-full lg:w-3/5 mb-20 lg:mb-0 lg:m-2">
            <PDFPreview buffer={asignacion.documento.data} />
          </div>

        </div>
        {/**El id de usuario debe obtenerse de la cookie */}
        <CommentSection commentsArray={comments} currentUserID={333333}/>
        <AddComment id_asignacion={asignacion.id_asignacion} />

      </div>

    </div>
  )

}