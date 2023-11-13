import AddComment from "@/app/components/AddComment"
import AssignmentHeader from "../../../../components/AssignmentHeader"
import AssignmentData from "../../../../components/AssignmentData"
import ReviewFormats from "../../components/ReviewFormats"
import CommentSection from "../../../../components/CommentSection"
import { AsignacionReview, Avance, LoggedUser } from "../../../../../../types/ISESAT"
import { shortFormatDate } from "../../../../../../utils/utils"
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


async function fetchHistoryByIdTesis(idTesis: number, idModalidadActual: number, numAvanceActual: number, token: string): Promise<Array<Avance>> {
  let modalidadActual = idModalidadActual === 1 ? 'Tiempo Completo' : 'Medio Tiempo';
  let totalMaestria1 = 4, totalMaestria2 = 7, totalDoctorado = 9;

  //obtener total del array, ordenar, luego obtener el ultimo elemento
  let history: Avance[] = await fetchTesisHistory(idTesis, token);

  let avancesEntregados = new Array<Avance>();
  if (history.length > 0) {
    history.sort((a, b) => a.id_asignacion - b.id_asignacion);

    let lastElement = history[history.length - 1];

    switch (lastElement.grado_estudio) {
      case 'Doctorado':

        avancesEntregados = new Array<Avance>(totalDoctorado).fill({ num_avance: 0, grado_estudio: "", id_asignacion: 0, modalidad: '' });

        history.map((item, i) => (
          avancesEntregados[i] = item
        ))

        break;

      default://Maestria
        let assignmentsLeft = 0;

        if (modalidadActual === 'Tiempo Completo') {
          assignmentsLeft = totalMaestria1 - numAvanceActual + 1;//el avance actual tambien esta en el conjunto de los faltantes, por eso es + 1
        }else{
          assignmentsLeft = totalMaestria2 - numAvanceActual + 1;
        }

        //Revisar cambios de modalidad previos
        let modalidad = history[0].modalidad;

        for (let index = 0; index < history.length; index++) {

          const element = history[index];

          if (element.modalidad !== modalidad) {
            modalidad = element.modalidad;
            //Avance vacio, se usa como separador entre una modalidad y otra
            avancesEntregados.push({ num_avance: -1, grado_estudio: element.grado_estudio, id_asignacion: -1, modalidad: element.modalidad });
          }

          avancesEntregados.push(element);
        }

        if (lastElement.modalidad !== modalidadActual) {          
          //Avance vacio, se usa como separador entre una modalidad y otra
          avancesEntregados.push({ num_avance: -1, grado_estudio: lastElement.grado_estudio, id_asignacion: -1, modalidad: modalidadActual });
        }
        //avances restantes del alumno
        for (let index = numAvanceActual ; index < numAvanceActual + assignmentsLeft; index++) {
          avancesEntregados.push({ num_avance: index, grado_estudio: '', id_asignacion: 0, modalidad: '' });
        }
        break;
    }
  }
  console.log(idModalidadActual)
  console.log(modalidadActual)
  console.log(avancesEntregados);
  return avancesEntregados;
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
                    <AssignmentData nombreTesis={tesisInfo.titulo} autor={`${tesisInfo.nombre} ${tesisInfo.apellido_paterno} ${tesisInfo.apellido_materno} `} numAvance={asignacion.num_avance} fechaEntrega={shortFormatDate(asignacion.fecha_entrega)} fechaPresentacion={asignacion.fecha_presentacion} />
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