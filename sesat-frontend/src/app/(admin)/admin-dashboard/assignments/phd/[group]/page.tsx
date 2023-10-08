
import { TitleBar } from "@/app/components/TitleBar";
import { fetchLatestPeriod } from "../../../../../../../utils/periodo.endpoint";
import GenInfoPhd from "./components/GenInfoPhd";
import { fetchCountAlumnosDoctoradoOfNumAv } from "../../../../../../../utils/tesis.endpoint";
import AssingmentCardInfo from "./components/AssingmentCardInfo";
import { fetchNumAsignacionesEntregadasDoctorado, fetchNumAsignacionesPendientesDoctorado } from "../../../../../../../utils/asignacion.endpoint";
import EmptyPage from "@/app/components/EmptyPage";
import NotFound from "../../../not-found";




export default async function ViewGroup({
  params,
}: {
  params: { group: string }
}) {

  const { group } = params

  const names = [
    'Seminario de Avance de Tesis 1',
    'Seminario de Avance de Tesis 2',
    'Seminario de Avance de Tesis 3',
    'Seminario de Avance de Tesis 4',
    'Seminario de Avance de Tesis 5',
    'Seminario de Avance de Tesis 6',
    'Seminario de Avance de Tesis 7',
    'Seminario de Avance de Tesis 8',
  ]

  let index = parseInt(group) - 1;
  let periodo;
  let alumnos;

  let totalPendientes;
  let totalEntregadas;

  let totalPendientes2;
  let totalEntregadas2;

  let captionA = group === '4' ? ' - Evaluación Inicial' : '';
  let captionB = group === '4' ? ' - Evaluación Final' : '';

  let hayActivas;
  let hayPendientes;

  try {
    periodo = await fetchLatestPeriod("");
    alumnos = await fetchCountAlumnosDoctoradoOfNumAv(group, "")

    totalPendientes = await fetchNumAsignacionesPendientesDoctorado(group, "1", "").then((result) => {
      let total = parseInt(result)  //total=0 --> activa   || total>0 pendiente
      return total
    })

    totalEntregadas = await fetchNumAsignacionesEntregadasDoctorado(group, "1", "").then((result) => {
      let total = parseInt(result)
      return total
    })


    if (group === '4') { //Caso 4to semestre, 2 avances
      totalPendientes2 = await fetchNumAsignacionesPendientesDoctorado(group, "2", "").then((result) => {
        let total = parseInt(result)
        return total
      })

      totalEntregadas2 = await fetchNumAsignacionesEntregadasDoctorado(group, "2", "").then((result) => {
        let total = parseInt(result)
        return total
      })
    }
    hayActivas = typeof totalPendientes !== 'undefined' && totalPendientes === 0 || typeof totalPendientes2 !== 'undefined' && totalPendientes2 === 0;

    hayPendientes = typeof totalPendientes !== 'undefined' && totalPendientes > 0 || typeof totalPendientes2 !== 'undefined' && totalPendientes2 > 0;

  } catch (error) {
    return <NotFound />
  }


  return (
    <main>
      {typeof alumnos != 'undefined' && alumnos.count > 0 ? (
        <>
          <div>
            <TitleBar title={names[index]} />
            <div className="w-full">
              {group === '4' && (
                <div className="mt-6 px-3 py-2 rounded-md bg-gradient-to-r from-[#03396c] from-100% lg:from-45%  w-full flex flex-col justify-start">
                  <label className="text-white block text-xl font-light">
                    Evaluación de Medio Término
                  </label>
                  <label className="text-white/60 block text-sm font-normal">
                    Los alumnos presentan avance de tesis al inicio y final del semestre
                  </label>
                </div>
              )}

              {periodo && alumnos && (
                <GenInfoPhd endDateGlobal={periodo.fecha_cierre} endDateOpc={periodo.fecha_cierre_opc} count={alumnos.count} numAvance={group} />
              )}

              {/**Activas ####################################################################### */}

              {typeof hayActivas === 'boolean' && hayActivas && (
                <label className=" block text-2xl font-bold text-black/40 mt-10">
                  Asignaciones Activas
                </label>
              )}

              {typeof totalPendientes2 !== 'undefined' && totalPendientes2 === 0 && (
                <AssingmentCardInfo title={names[index] + captionA} subtitle="Inicio de semestre" pendientes={totalPendientes} entregadas={totalEntregadas} avance={group} tipo={2} activa={true} />
              )}

              {typeof totalPendientes !== 'undefined' && totalPendientes === 0 && (
                <AssingmentCardInfo title={names[index] + captionB} subtitle="Fin de semestre" pendientes={totalPendientes} entregadas={totalEntregadas} avance={group} tipo={1} activa={true} />
              )}


              {/**Pendientes ####################################################################### */}
              {typeof hayPendientes === 'boolean' && hayPendientes && (
                <label className=" block text-2xl font-bold text-black/40 mt-10">
                  Asignaciones Pendientes
                </label>
              )}

              {typeof totalPendientes2 !== 'undefined' && totalPendientes2 > 0 && (
                <AssingmentCardInfo title={names[index] + captionA} subtitle="Inicio de semestre" pendientes={totalPendientes} entregadas={totalEntregadas} avance={group} tipo={2} activa={false} />
              )}

              {typeof totalPendientes !== 'undefined' && totalPendientes > 0 && (
                <AssingmentCardInfo title={names[index] + captionB} subtitle="Fin de semestre" pendientes={totalPendientes} entregadas={totalEntregadas} avance={group} tipo={1} activa={false} />
              )}



            </div>
          </div >
        </>
      ) : (
        <EmptyPage />
      )}
    </main >
  )
}
