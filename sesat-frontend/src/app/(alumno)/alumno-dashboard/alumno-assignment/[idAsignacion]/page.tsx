import AddComment from "@/app/components/AddComment"
import Drawer from "../../components/Drawer"
import AssignmentHeader from "../components/AssignmentHeader"
import AdvancesList from "../components/AdvancesList"
import AssignmentData from "../components/AssignmentData"

import { fetchConversationByIdAsignacion } from "../../../../../../utils/comentario.endpoint"
import { fetchOneTesis, fetchTesisHistory } from "../../../../../../utils/tesis.endpoint"
import { fetchLatestPeriod } from "../../../../../../utils/periodo.endpoint"
import { Asignacion, LoggedUser } from "../../../../../../types/ISESAT"
import { fetchOneByIdAsignacion } from "../../../../../../utils/asignacion.endpoint"
import NotFound from "@/app/(admin)/admin-dashboard/not-found"
import { getFormattedHours, shortFormatDate } from "../../../../../../utils/utils"
import PDFUploadForm from "../components/PDFUploadForm"
import CommentSection from "@/app/(asesor)/asesor-dashboard/asesor-assignment/components/CommentSection"
import Results from "../components/Results"
import { LoginEndpoint } from "../../../../../../utils/login.endpoint"
import { cookies } from "next/headers"

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
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const user: LoggedUser = await LoginEndpoint.getUserInfo(token);

  let { idAsignacion } = params;
  let error = false;
  let periodo = await fetchLatestPeriod("").catch();
  let asignacion: Asignacion = await fetchOneByIdAsignacion(+idAsignacion, "").catch(() => { return undefined });

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

            <div className="flex flex-col lg:flex-row">

              <div className="flex flex-col w-full">
                {typeof tesisInfo !== 'undefined' && (
                  <>
                    <div className="w-full flex flex-row mb-10">
                      <label className="text-3xl font-bold">
                        {asignacion.titulo}
                      </label>
                      <div className="ml-auto flex items-center">
                        {asignacion.estado_entrega === 0 ? (
                          <>
                            <span className="font-SESAT text-black/40"> No entregado</span>
                          </>
                        ) : (
                          <>
                            <span className="font-SESAT text-black/40"> Entregado</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="w-full flex flex-row">
                      <div className="w-1/2 flex flex-col pr-16">
                        <span className="font-SESAT text-lg mb-6">Instrucciones</span>
                        <span className="mb-6 block">
                          {asignacion.descripcion}
                        </span>
                      </div>

                      <div className='flex flex-col w-1/2 pt-5 mb-5 bg-light-blue-10 rounded px-8 py-4 h-fit'>

                        <label className="flex text-2xl font-bold">
                          Información general
                        </label>

                        <div className='w-full m-2 border border-solid border-gray-200'></div>

                        <div className='w-full flex flex-col'>

                          <label className="font-SESAT mb-2">
                            Título de la tesis:
                          </label>

                          <label className="pl-4 mb-2">
                            {tesisInfo.titulo}
                          </label>

                          <label className="font-SESAT mb-2">
                            Avance:
                          </label>

                          <label className="pl-4 mb-2">
                            {asignacion.num_avance}
                          </label>

                          <label className="font-SESAT mb-2">
                            Fecha límite de entrega:
                          </label>

                          <label className="pl-4 mb-2">
                            {`${shortFormatDate(periodo.fecha_cierre)}    ${getFormattedHours(new Date(periodo.fecha_cierre))}`}
                          </label>

                          <label className="font-SESAT mb-2">
                            Fecha de presentación:
                          </label>

                          <label className="pl-4 mb-2">
                            {asignacion.fecha_presentacion ? (
                              <span>{shortFormatDate(asignacion.fecha_presentacion)}</span>
                            ) : (
                              <span>{'Sin definir'}</span>
                            )}
                          </label>

                        </div>

                      </div>
                    </div>

                    {asignacion.calificacion && (
                      <Results calificacion={asignacion.calificacion} id_acta_evaluacion={asignacion.id_acta_evaluacion} id_formato_evaluacion={asignacion.id_formato_evaluacion}/>
                    )}
                    <PDFUploadForm fecha_cierre={periodo.fecha_cierre} asignacion={asignacion} />
                                                        

                  </>
                )}
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