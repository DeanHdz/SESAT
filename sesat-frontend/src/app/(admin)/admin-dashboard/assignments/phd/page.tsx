import AdminAssignmentCard from "@/app/components/AdminAssignmentCard";
import { fetchNumAlumnosDoctorado } from "../../../../../../utils/tesis.endpoint";
import { fetchNumAsignacionesPendientesDoctorado } from "../../../../../../utils/asignacion.endpoint";
import EmptyPage from "@/app/components/EmptyPage";
import Alert from "../../components/Alert";
import { fetchLatestPeriod } from "../../../../../../utils/periodo.endpoint";


type AvanceProps = {
  t_ultimo_avance: number;
  count: string;
}

type PeriodoProps = {
  id_periodo: number;
  fecha_cierre: string;
}


//Cuantos alumnos de doctorado hay para cada numero de avance
async function fetchAsignacionesData(): Promise<AvanceProps[]> {

  let alumnos: Array<AvanceProps> | undefined

  await fetchNumAlumnosDoctorado("").then((res) => {
    alumnos = res;

    //la consulta devuelve solo los numeros de avance con alumnos>0, se debe completar con ceros los renglones faltantes
    if (alumnos && alumnos.length > 0) {

      // Crear un conjunto para rastrear los valores existentes de t_ultimo_avance
      let existentes = new Set(alumnos.map(item => item.t_ultimo_avance));

      for (let i = 1; i <= 6; i++) {
        // Si el valor de i no está en el conjunto, agregar un nuevo elemento al arreglo
        if (!existentes.has(i)) {
          alumnos.push({ t_ultimo_avance: i, count: '0' });
        }
      }
      alumnos.sort((a, b) => a.t_ultimo_avance - b.t_ultimo_avance)

    }

  })

  return alumnos!;

}

//Para cada numero de avance en el tablero, deducir estado actual
async function fetchStatus(alumnos: Array<AvanceProps>): Promise<number[] | undefined> {
  let statusArray = Array(8).fill(2);

  const promises = alumnos?.map(async (elem, i) => {
    //Si no hay alumnos para 'N' avance
    if (elem.count != '0') {      //no disponible

      //Devuelve cuantas asignaciones pendientes hay para 'N' avance, CERO si todas estan asignadas para esa categoria
      //falta implementar caso 4 doctorado
      await fetchNumAsignacionesPendientesDoctorado(elem.t_ultimo_avance.toString(), "1", "").then((result) => {

        let total = parseInt(result)

        if (total === 0) {

          statusArray[i] = 1    //activa

        } else if (total > 0) {

          statusArray[i] = 0    //pendiente

        }
      })
      //Es necesario revisar para 2 tipos de asignaciones en caso 4
      if (elem.t_ultimo_avance === 4 && statusArray[i] !== 0) {
        await fetchNumAsignacionesPendientesDoctorado(elem.t_ultimo_avance.toString(), "2", "").then((result) => {

          let total = parseInt(result)

          if (total === 0) {

            statusArray[i] = 1    //activa

          } else if (total > 0) {

            statusArray[i] = 0    //pendiente

          }
        })
      }
    }
  });

  await Promise.all(promises);

  return statusArray;
}

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
}



export default async function Home() {

  const statusArray = await fetchStatus(await fetchAsignacionesData());
  const statusPeriodo = await fetchStatusPeriodo();

  return (
    <main>
      {statusPeriodo && (
        <Alert />
      )
      }
      <div className="w-full flex flex-col mb-10">
        <label className="mb-3 block text-4xl font-bold">Grupos de Alumnos de Doctorado</label>
        <label className=" block text-xl font-bold">Avances de tesis para este semestre</label>

        <div className="mt-1 p-2 border-t border-light-gray-22 border-solid w-full flex justify-start">
        </div>

        {
          statusArray?.map((num, i) => (
            <AdminAssignmentCard title={`Seminario de Avance de Tesis ${i + 1}`} avance={i + 1} status={statusPeriodo ? 2 : num} tipo={1} />
          ))
        }

      </div>
    </main >
  )
}
