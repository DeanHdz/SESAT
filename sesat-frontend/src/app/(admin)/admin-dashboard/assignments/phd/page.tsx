import AdminAssignmentCard from "@/app/components/AdminAssignmentCard";
import { fetchGroupStatusPHD } from "../../../../../../utils/asignacion.endpoint";
import Alert from "../../components/Alert";
import { fetchLatestPeriod } from "../../../../../../utils/periodo.endpoint";
import NotFound from "../../not-found";
import { isPeriodActive } from "../../../../../../utils/utils";


type AvanceProps = {
  num_avance: number,
  alumnos_inscritos: number,
  num_pendientes: number,
}

type PeriodoProps = {
  id_periodo: number;
  fecha_cierre: string;
}

//Cuantos alumnos de doctorado hay para cada numero de avance y cuantas asignaciones estan pendientes
async function fetchAsignacionesData(id_periodo: number): Promise<AvanceProps[]> {

  let alumnos: Array<AvanceProps>

  alumnos = await fetchGroupStatusPHD(id_periodo, "").catch(() => { return null })
  //la consulta devuelve solo los numeros de avance con alumnos>0, se debe completar con ceros los renglones faltantes
  if (alumnos && alumnos.length > 0) {

    // Crear un conjunto para rastrear los valores existentes de t_ultimo_avance
    let existentes = new Set(alumnos.map(item => item.num_avance));

    for (let i = 1; i <= 8; i++) {
      // Si el valor de i no está en el conjunto, agregar un nuevo elemento al arreglo
      if (!existentes.has(i)) {
        alumnos.push({ num_avance: i, alumnos_inscritos: 0, num_pendientes: -1 });
      }
    }
    alumnos.sort((a, b) => a.num_avance - b.num_avance)

  }
  return alumnos;

}

function getStatus(elem: AvanceProps): number { 

  if(elem.alumnos_inscritos === 0){ return 2; } //sin alumnos

  else if(elem.num_pendientes > 0){ return 0; } //pendiente

  return 1;                                     //activa

}
/*
async function fetchStatusPeriodo(): Promise<boolean> {
  let result;
  await fetchLatestPeriod("").then((res) => {

    const periodo: PeriodoProps = res;

    if (periodo) {
      let fechaCierrePeriodo = new Date(periodo.fecha_cierre);
      let fechaActual = new Date();

      result = false;
      if (fechaActual > fechaCierrePeriodo) {

        result = true;
      }
    } else {
      result = true;
    }

  })
  return result!;
}*/



export default async function Home() {
  const periodo: PeriodoProps = await fetchLatestPeriod("").catch(() => { return null })
  const statusArray = await fetchAsignacionesData(periodo?.id_periodo).catch(() => { return null }) 
  const periodoConcluido = isPeriodActive(periodo?.fecha_cierre)


  return (
    <main>

      {periodoConcluido && (
        <Alert />
      )}

      <div className="w-full flex flex-col mb-10">
        <label className="mb-3 block text-4xl font-bold">Grupos de Alumnos de Doctorado</label>
        <label className=" block text-xl font-bold">Avances de tesis para este semestre</label>

        <div className="mt-1 p-2 border-t border-light-gray-22 border-solid w-full flex justify-start">
        </div>

        {statusArray ? (
          statusArray?.map((elem, i) => (
            <AdminAssignmentCard title={`Seminario de Avance de Tesis ${i + 1}`} avance={i + 1} status={periodoConcluido ? 2 : getStatus(elem)} tipo={1} />
          ))
        ) : (
          <NotFound />
        )}

      </div>



    </main >
  )
}
