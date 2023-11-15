import AddComment from "@/app/components/AddComment"
import AssignmentHeader from "../../../../components/AssignmentHeader"
import AssignmentData from "../../../../components/AssignmentData"
import ReviewFormats from "../../components/ReviewFormats"
import CommentSection from "../../../../components/CommentSection"
import { AsignacionReview, Avance, LoggedUser, TesisInfo } from "../../../../../../types/ISESAT"
import { fetchHistoryByIdTesis, shortFormatDate } from "../../../../../../utils/utils"
import { fetchOneToBeReviewed } from "../../../../../../utils/asignacion.endpoint";
import PDFPreview from "../../../../components/PDFPreview"
import { fetchOneTesis, fetchTesisHistory } from "../../../../../../utils/tesis.endpoint"
import { fetchConversationByIdAsignacion } from "../../../../../../utils/comentario.endpoint"
import { fetchLatestPeriod } from "../../../../../../utils/periodo.endpoint"
import NotFound from "@/app/(admin)/admin-dashboard/not-found"
import Drawer from "../../components/Drawer"
import { cookies } from "next/headers"
import { LoginEndpoint } from "../../../../../../utils/login.endpoint"
import AdvancesList from "@/app/components/AdvancesList"


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
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const user: LoggedUser = await LoginEndpoint.getUserInfo(token);

  let { idAsignacion } = params;
  let error = false;  
  let periodo = await fetchLatestPeriod(token).catch();
  let asignacion: AsignacionReview = await fetchOneToBeReviewed(user.id_usuario, parseInt(idAsignacion), token).catch(() => { return undefined });

  let tesisInfo: TesisInfo | undefined = undefined;
  let comments = undefined;
  let history = undefined;
  let enableEditMode = asignacion.id_funcion === 1 ? true : false; 

  if (periodo && asignacion && periodo.id_periodo === asignacion.id_periodo) {
    tesisInfo = await fetchOneTesis(asignacion.id_tesis.toString(), token).catch(() => { return undefined });
    comments = await fetchAndSortComments(asignacion.id_asignacion, token).catch(() => { return undefined });
    history = await fetchHistoryByIdTesis(asignacion.id_tesis, asignacion.id_modalidad, asignacion.num_avance, token).catch(() => { return undefined });
  } else {
    error = true;
  }




  //La asignacion corresponde a un comite
  //solo el asesor puede generar el reporte y acta
  //si la asignacion esta revisada no se puede volver a crear el acta

  return (
    <div className="flex w-full">
      <div className="hidden lg:flex lg:w-3/12 flex-col pr-10">
        <Drawer />
        {error === false && (
          <AdvancesList history={history} />
        )}
      </div>
      {error === false ? (
        <>
          <div className="w-full lg:w-9/12">

            <AssignmentHeader titulo={asignacion.titulo} descripcion={asignacion.descripcion} />

            <div className="flex flex-col lg:flex-row">

              <div className="flex flex-col w-full lg:w-2/5 lg:m-2">
                {typeof tesisInfo !== 'undefined' && (
                  <>
                    <AssignmentData idGradoEstudio={tesisInfo.id_grado_estudio} editMode={enableEditMode} idTesis={tesisInfo.id_tesis} nombreTesis={tesisInfo.titulo} autor={`${tesisInfo.nombre} ${tesisInfo.apellido_paterno} ${tesisInfo.apellido_materno} `} numAvance={asignacion.num_avance} fechaEntrega={shortFormatDate(asignacion.fecha_entrega)} fechaPresentacion={asignacion.fecha_presentacion} token={token}/>
                    {/*<AssignmentProperties fechaEntrega={shortFormatDate(asignacion.fecha_entrega)} calificacion={10}/> */} {/* (Dean) Calificacion era en base 10 o 100?*/}
                    <ReviewFormats tesisInfo={tesisInfo!} asignacion={asignacion} />                    
                  </>
                )}
              </div>

              <div className="flex flex-col w-full lg:w-3/5 mb-6 lg:mb-0 lg:m-2">
                <PDFPreview buffer={asignacion.documento.data} />
              </div>

            </div>            
            <div className="lg:hidden w-full">
              <AdvancesList history={history} />
            </div>
            <CommentSection commentsArray={comments} currentUserID={user.id_usuario} />
            <AddComment id_asignacion={asignacion.id_asignacion} idUsuario={user.id_usuario} />

          </div>
        </>
      ) : (
        <>
          <NotFound />
        </>
      )}


    </div>
  )

}