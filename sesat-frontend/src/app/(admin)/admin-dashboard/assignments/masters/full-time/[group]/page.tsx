
import { TitleBar } from "@/app/components/TitleBar";


import EmptyPage from "@/app/components/EmptyPage";
import { fetchLatestPeriod } from "../../../../../../../../utils/periodo.endpoint";
import NotFound from "@/app/(admin)/admin-dashboard/not-found";
import { fetchCountAlumnosMaestriaOfNumAv } from "../../../../../../../../utils/tesis.endpoint";
import { fetchNumAsignacionesEntregadasMaestria, fetchNumAsignacionesPendientesMaestriaTiempoComp } from "../../../../../../../../utils/asignacion.endpoint";
import MDAssingmentCardInfo from "../../components/MDAssingmentCardInfo";
import GenInfoMD from "../../components/GenInfoMD";





export default async function ViewGroup({
  params,
}: {
  params: { group: string }
}) {

  const { group } = params

  const names = [
    "Seminario de Investigación",    
    "Seminario de Tesis I (20% de avance)",    
    "Seminario de Tesis II (50% de avance)",    
    "Seminario de Tesis III (90% de avance)"
  ]

  let index = parseInt(group) - 1;
  let periodo;
  let alumnos;

  let totalPendientes;
  let totalEntregadas;

  let totalPendientes2;
  


  let hayActivas;
  let hayPendientes;

  try {
    periodo = await fetchLatestPeriod("");
    alumnos = await fetchCountAlumnosMaestriaOfNumAv(group,"1", "")

    totalPendientes = await fetchNumAsignacionesPendientesMaestriaTiempoComp(group, "").then((result) => {
      let total = parseInt(result)  //total=0 --> activa   || total>0 pendiente
      return total
    })

    //'1'  --> Tiempo completo
    totalEntregadas = await fetchNumAsignacionesEntregadasMaestria(group, "1", "").then((result) => {
      let total = parseInt(result)
      return total
    })


    
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
                <GenInfoMD endDateGlobal={periodo.fecha_cierre} count={alumnos.count} />
              )}

              {/**Activas ####################################################################### */}

              {typeof hayActivas === 'boolean' && hayActivas && (
                <label className=" block text-2xl font-bold text-black/40 mt-10">
                  Asignaciones Activas
                </label>
              )}              

              {typeof totalPendientes !== 'undefined' && totalPendientes === 0 && (
                <MDAssingmentCardInfo title={names[index]} subtitle="Fin de semestre" pendientes={totalPendientes} entregadas={totalEntregadas} avance={group} modalidad={"full-time"} activa={true} />
              )}


              {/**Pendientes ####################################################################### */}
              {typeof hayPendientes === 'boolean' && hayPendientes && (
                <label className=" block text-2xl font-bold text-black/40 mt-10">
                  Asignaciones Pendientes
                </label>
              )}

            

              {typeof totalPendientes !== 'undefined' && totalPendientes > 0 && (
                <MDAssingmentCardInfo title={names[index]} subtitle="Fin de semestre" pendientes={totalPendientes} entregadas={totalEntregadas} avance={group} modalidad={"full-time"} activa={false} />
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
