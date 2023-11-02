import AddComment from "@/app/components/AddComment"
import Drawer from "../../components/Drawer"
import AssignmentHeader from "../components/AssignmentHeader"
import AdvancesList from "../components/AdvancesList"
import AssignmentData from "../components/AssignmentData"
import PDFViewer from "../components/PDFViewer"
import CommentSection from "../components/CommentSection"
import { PrimaryButton } from "@/app/components/PrimaryButton"
import { fetchConversationByIdAsignacion } from "../../../../../../utils/comentario.endpoint"
import { fetchOneTesis, fetchTesisHistory } from "../../../../../../utils/tesis.endpoint"
import { fetchLatestPeriod } from "../../../../../../utils/periodo.endpoint"
import { AsignacionReview } from "../../../../../../types/ISESAT"
import { fetchOneToBeReviewed } from "../../../../../../utils/asignacion.endpoint"
import NotFound from "@/app/(admin)/admin-dashboard/not-found"
import PDFPreview from "../components/PDFPreview"
import ReviewFormats from "../components/ReviewFormats"
import { shortFormatDate } from "../../../../../../utils/utils"

export type TesisInfo = {
  programa_nombre_programa: string;
  titulo: string;
  fecha_registro: string;
  id_tesis: number;
  id_usuario: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  id_grado_estudio: number;
};

export type Avance = {
  id_asignacion: number;
  grado_estudio: string;
  modalidad: string;
};

async function fetchAndSortComments(idAsignacion: number, token: string) {
  let comments = await fetchConversationByIdAsignacion(idAsignacion, token);
  comments.sort((a: any, b: any) => a.id_comentario - b.id_comentario);
  return comments;
}

async function fetchHistoryByIdTesis(idTesis: number): Promise<Array<number>> {
  let history: Avance[] = await fetchTesisHistory(idTesis, "");
  let avancesEntregados = new Array();
  if (history.length > 0) {
    history.sort((a, b) => a.id_asignacion - b.id_asignacion);
    let { grado_estudio, modalidad } = history[0];
    switch (grado_estudio) {
      case 'Doctorado':

        avancesEntregados = new Array(8).fill(0);
        history.map((item, i) => (
          avancesEntregados[i] = item.id_asignacion
        ))

        break;

      default://Maestria
        if (modalidad = 'Tiempo Completo') {
          avancesEntregados = new Array(4).fill(0);
          history.map((item, i) => (
            avancesEntregados[i] = item.id_asignacion
          ))
        } else {
          avancesEntregados = new Array(7).fill(0);
          history.map((item, i) => (
            avancesEntregados[i] = item.id_asignacion
          ))
        }
        break;
    }
  }  
  return avancesEntregados;
}

export default async function Home({
  params,
}: {
  params: { idAsignacion: string }
}) {
  let { idAsignacion } = params;
  let error = false;
  let periodo = await fetchLatestPeriod("").catch();
  let asignacion: AsignacionReview = await fetchOneToBeReviewed(333333, parseInt(idAsignacion), "").catch(() => { return undefined });

  let tesisInfo: TesisInfo | undefined = undefined;
  let comments = undefined;
  let history = undefined;

  if (periodo && asignacion && periodo.id_periodo === asignacion.id_periodo) {
    tesisInfo = await fetchOneTesis(asignacion.id_tesis.toString(), "").catch(() => { return undefined });
    comments = await fetchAndSortComments(asignacion.id_asignacion, '').catch(() => { return undefined });
    history = await fetchHistoryByIdTesis(asignacion.id_tesis).catch(() => { return undefined });
  } else {
    error = true;
  }




  //La asignacion corresponde a un comite
  //solo el asesor puede generar el reporte y acta
  //si la asignacion esta revisada no se puede volver a crear el acta
  return (
    <div className="flex">
      
      <div className="hidden lg:flex lg:w-3/12 flex-col">
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

              <div className="flex flex-col w-full m-2">
                {typeof tesisInfo !== 'undefined' && (
                  <>
                    <AssignmentData nombreTesis={tesisInfo.titulo} autor={`${tesisInfo.nombre} ${tesisInfo.apellido_paterno} ${tesisInfo.apellido_materno} `} numAvance={asignacion.num_avance} fechaEntrega={shortFormatDate(asignacion.fecha_entrega)} fechaPresentacion={asignacion.fecha_presentacion} />
                    <button className="mt-10 mb-10 primary__btn">
                      Enviar PDF
                    </button>
                  </>
                )}
              </div>

              {/*<div className="flex flex-col w-full lg:w-3/5 mb-6 lg:mb-0 lg:m-2">
                <PDFPreview buffer={asignacion.documento.data} />
              </div>*/}

              <ReviewFormats tesisInfo={tesisInfo!} asignacion={asignacion} />  

            </div>
            <div className="lg:hidden w-full">
              <AdvancesList history={history} />
            </div>
            {/**El id de usuario debe obtenerse de la cookie */}
            <CommentSection commentsArray={comments} currentUserID={333333} />
            <AddComment id_asignacion={asignacion.id_asignacion} />

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