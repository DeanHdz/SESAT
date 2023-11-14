import AddComment from "@/app/components/AddComment"
import Drawer from "../../components/Drawer"
import AdvancesList from "../../../../components/AdvancesList"

import { fetchConversationByIdAsignacion } from "../../../../../../utils/comentario.endpoint"
import { fetchOneTesis } from "../../../../../../utils/tesis.endpoint"
import { fetchLatestPeriod } from "../../../../../../utils/periodo.endpoint"
import { Asignacion, Avance, LoggedUser, TesisInfo } from "../../../../../../types/ISESAT"
import { fetchOneByIdAsignacion } from "../../../../../../utils/asignacion.endpoint"
import NotFound from "@/app/(admin)/admin-dashboard/not-found"
import { fetchHistoryByIdTesis, getFormattedHours, shortFormatDate } from "../../../../../../utils/utils"
import PDFUploadForm from "../../components/PDFUploadForm"
import CommentSection from "@/app/components/CommentSection"
import Results from "../../components/Results"
import { LoginEndpoint } from "../../../../../../utils/login.endpoint"
import { cookies } from "next/headers"

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
  let error = false;
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const user: LoggedUser = await LoginEndpoint.getUserInfo(token).catch(() => { error = true; });

  let { idAsignacion } = params;
  let periodo = await fetchLatestPeriod("").catch(() => { error = true; });
  let asignacion: Asignacion = await fetchOneByIdAsignacion(+idAsignacion, token).catch(() => { error = true; });
  let evaluacion_realizada = asignacion.calificacion && asignacion.id_acta_evaluacion && asignacion.id_formato_evaluacion;

  let tesisInfo: TesisInfo | undefined = undefined;
  let comments = undefined;
  let history: Avance[] | undefined = undefined;

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
    <div className="flex">

      <div className="hidden lg:flex lg:w-3/12 flex-col pr-10">
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
                    <div className="w-full flex flex-col lg:flex-row mb-10 px-8 lg:px-0">
                      <label className="text-3xl font-bold">
                        {asignacion.titulo}
                      </label>
                      <div className="ml-auto flex items-center mt-3 lg:mt-0">
                        {asignacion.estado_entrega === 0 ? (
                          <>
                            <div className="flex flex-row">
                              <span className="font-SESAT text-black/40"> No entregado</span>
                              <div className="w-[20px] ml-3 text-dark-blue-10">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5c-1.736 0-3.369 0.676-4.596 1.904s-1.904 2.86-1.904 4.596c0 1.736 0.676 3.369 1.904 4.596s2.86 1.904 4.596 1.904c1.736 0 3.369-0.676 4.596-1.904s1.904-2.86 1.904-4.596c0-1.736-0.676-3.369-1.904-4.596s-2.86-1.904-4.596-1.904zM8 0v0c4.418 0 8 3.582 8 8s-3.582 8-8 8c-4.418 0-8-3.582-8-8s3.582-8 8-8zM7 11h2v2h-2zM7 3h2v6h-2z"></path></svg>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-row">
                              {asignacion.estado_entrega === 1 && (
                                <>
                                  <span className="font-SESAT text-black/40">
                                    {evaluacion_realizada ? 'Revisado' : 'Entregado'}
                                  </span>
                                  <div className="w-[20px] ml-3 text-dark-blue-10">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"></path></svg>
                                  </div>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row">
                      <div className="w-full lg:w-1/2 flex flex-col px-8 lg:pr-16">
                        <span className="font-SESAT text-lg mb-6">Instrucciones</span>
                        <span className="mb-6 block">
                          {asignacion.descripcion}
                        </span>
                      </div>

                      <div className='w-full lg:w-1/2 flex flex-col pt-5 mb-5 bg-light-blue-10 rounded-xl px-8 py-4 h-fit'>

                        <label className="flex text-2xl font-bold">
                          Información general
                        </label>

                        <div className='w-full m-2 border border-solid border-gray-200'></div>

                        <div className='w-full flex flex-col'>

                          <label className="font-SESAT mb-2">
                            Título de la tesis:
                          </label>

                          <label className="mb-2">
                            {tesisInfo.titulo}
                          </label>

                          <label className="font-SESAT mb-2">
                            Avance:
                          </label>

                          <label className="mb-2">
                            {asignacion.num_avance}
                          </label>

                          <label className="font-SESAT mb-2">
                            Fecha límite de entrega:
                          </label>

                          <label className="mb-2">
                            {`${shortFormatDate(periodo.fecha_cierre)}    ${getFormattedHours(new Date(periodo.fecha_cierre))}`}
                          </label>

                          <label className="font-SESAT mb-2">
                            Fecha de presentación:
                          </label>

                          <label className="mb-2">
                            {asignacion.fecha_presentacion ? (
                              <span>{shortFormatDate(asignacion.fecha_presentacion)}</span>
                            ) : (
                              <span>{'Sin definir'}</span>
                            )}
                          </label>

                        </div>

                      </div>
                    </div>

                    {evaluacion_realizada && (
                      <Results calificacion={asignacion.calificacion} id_acta_evaluacion={asignacion.id_acta_evaluacion} id_formato_evaluacion={asignacion.id_formato_evaluacion} />
                    )}
                    <PDFUploadForm server_time={periodo.server_time} fecha_cierre={periodo.fecha_cierre} asignacion={asignacion} />


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