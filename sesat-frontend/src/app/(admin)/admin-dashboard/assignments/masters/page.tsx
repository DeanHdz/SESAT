import AdminAssignmentCard from "@/app/components/AdminAssignmentCard";
import { fetchGroupStatusMastersDegree } from "../../../../../../utils/asignacion.endpoint";
import Alert from "../../components/Alert";
import { fetchLatestPeriod } from "../../../../../../utils/periodo.endpoint";



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


async function fetchAsignacionesDataMastersDegree(fullTimeArray: any[], partTimeArray: any[]) {

  let alumnos: Array<AvanceProps>

  alumnos = await fetchGroupStatusMastersDegree("").catch(() => { return null })
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

function getStatus(elem: AvanceProps): number {

  if (elem.alumnos_inscritos === 0) { return 2; } //sin alumnos

  else if (elem.num_pendientes > 0) { return 0; } //pendiente

  return 1;                                     //activa

}




export default async function Home() {

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
  let statusMidTime = new Array(), statusFullTime = new Array()
  await fetchAsignacionesDataMastersDegree(statusFullTime, statusMidTime)

  const periodoConcluido = await fetchStatusPeriodo();

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
