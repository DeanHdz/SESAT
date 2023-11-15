import AdminAssignmentCard from "@/app/components/AdminAssignmentCard";
import { fetchGroupStatusMastersDegree } from "../../../../../../utils/asignacion.endpoint";
import Alert from "../../components/Alert";
import { fetchLatestPeriod } from "../../../../../../utils/periodo.endpoint";
import { isPeriodActive } from "../../../../../../utils/utils";
import { cookies } from "next/headers";

type AvanceProps = {
  num_avance: number;
  alumnos_inscritos: number,
  modalidad: string;
  num_pendientes: number;
}

type PeriodoProps = {
  id_periodo: number;
  fecha_cierre: string;
}


async function fetchAsignacionesDataMastersDegree(id_periodo: number, fullTimeArray: any[], partTimeArray: any[], token: string) {

  let alumnos: Array<AvanceProps>

  alumnos = await fetchGroupStatusMastersDegree(id_periodo, token).catch(() => { return null })
  //la consulta devuelve solo los numeros de avance con alumnos>0, se debe completar con ceros los renglones faltantes
  if (alumnos && alumnos.length > 0) {

    alumnos.forEach(obj => {
      if (obj.modalidad === 'Tiempo Completo') {
        fullTimeArray.push(obj)
      } else {
        partTimeArray.push(obj)
      }
    });
    // Crear un conjunto para rastrear los valores existentes de t_ultimo_avance
    let existentesA = new Set(fullTimeArray.map(item => item.num_avance));
    let existentesB = new Set(partTimeArray.map(item => item.num_avance));

    for (let i = 1; i <= 4; i++) {
      // Si el valor de i no está en el conjunto, agregar un nuevo elemento al arreglo
      if (!existentesA.has(i)) {
        fullTimeArray.push({ num_avance: i, alumnos_inscritos: 0, num_pendientes: -1, modalidad: '' });
      }
    }
    fullTimeArray.sort((a, b) => a.num_avance - b.num_avance)


    for (let i = 1; i <= 7; i++) {
      // Si el valor de i no está en el conjunto, agregar un nuevo elemento al arreglo
      if (!existentesB.has(i)) {
        partTimeArray.push({ num_avance: i, alumnos_inscritos: 0, num_pendientes: -1, modalidad: '' });
      }
    }
    partTimeArray.sort((a, b) => a.num_avance - b.num_avance)

  }

}

function getStatus(elem: AvanceProps): number {

  if (elem.alumnos_inscritos === 0) { return 2; } //sin alumnos

  else if (elem.num_pendientes > 0) { return 0; } //pendiente

  return 1;                                     //activa

}




export default async function Home() {

  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";

  const fullTimetitleArray = [
    "Seminario de Investigación",
    "Seminario de Tesis I (20% de avance)",
    "Seminario de Tesis II (50% de avance)",
    "Seminario de Tesis III (90% de avance)"
  ]

  const midTimetitleArray = [
    "Seminario de Investigación",
    "Avance 1",
    "Seminario de Tesis I (20% de avance)",
    "Avance 3",
    "Seminario de Tesis II (50% de avance)",
    "Avance 5",
    "Seminario de Tesis III (90% de avance)"
  ]

  //fetch de la tabla periodo, revisar que exista al menos un periodo y si es el caso
  //obtener el ultimo creado, comparar la fecha de ciere con la actual para revisar que no este concluido
  let periodo: PeriodoProps = await fetchLatestPeriod(token).catch(() => {return null})
  const periodoConcluido = isPeriodActive(periodo?.fecha_cierre);

  let statusMidTime = new Array(), statusFullTime = new Array()
  if (!periodoConcluido) {
    await fetchAsignacionesDataMastersDegree(periodo?.id_periodo, statusFullTime, statusMidTime, token)
  }


  return (
    <main>
      {periodoConcluido && (
        <Alert />
      )
      }
      <div className="w-full flex flex-col mb-10">
        <label className="mb-3 block text-4xl font-bold">
          Grupos de Alumnos de Maestría
        </label>
        <label className=" block text-xl font-bold">Avances de tesis para este semestre</label>
        <div className="mt-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-start">
          <label className=" block text-xl font-light">
            Alumnos de tiempo completo
          </label>
        </div>

        {//Si statusPeriodo=true, significa que el periodo ha concluido, se asignan todos los estados a no Disp.
          statusFullTime?.map((elem, i) => (
            <AdminAssignmentCard title={fullTimetitleArray[i]} avance={i + 1} status={periodoConcluido ? 2 : getStatus(elem)} tipo={2} />
          ))
        }


        <div className="mt-14 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-start">
          <label className=" block text-xl font-light">
            Alumnos de medio tiempo
          </label>
        </div>

        {//Si statusPeriodo=true, significa que el periodo ha concluido, se asignan todos los estados a no Disp.
          statusMidTime?.map((elem, i) => (
            <AdminAssignmentCard title={midTimetitleArray[i]} avance={i + 1} status={periodoConcluido ? 2 : getStatus(elem)} tipo={3} />
          ))
        }

      </div>
    </main>
  )
}
