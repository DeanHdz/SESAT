import AdminAssignmentCard from "@/app/components/AdminAssignmentCard";
import { fetchNumAsignacionesPendientesMaestriaMedioTiempo, fetchNumAsignacionesPendientesMaestriaTiempoComp } from "../../../../../../utils/asignacion.endpoint";
import { fetchNumAlumnosMaestriaMedTiempo, fetchNumAlumnosMaestriaTiempoComp } from "../../../../../../utils/tesis.endpoint";
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


//Hay alumnos de maestria de tiempo completo para cada numero de avance?
async function fetchAsignacionesDataFullTime(): Promise<AvanceProps[]> {

  let alumnos: Array<AvanceProps> | undefined

  await fetchNumAlumnosMaestriaTiempoComp("").then((res) => {
    alumnos = res;

    //la consulta devuelve solo los numeros de avance con alumnos>0, se debe completar con ceros los renglones faltantes
    if (alumnos && alumnos.length > 0) {

      // Crear un conjunto para rastrear los valores existentes de t_ultimo_avance
      let existentes = new Set(alumnos.map(item => item.t_ultimo_avance));

      for (let i = 1; i <= 3; i++) {
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
//Para cada numero de avance de TIEMPO COMP. en el tablero, deducir estado actual
async function fetchStatusFullTime(alumnos: Array<AvanceProps>): Promise<number[] | undefined> {
  let statusArray = Array(3).fill(2);

  const promises = alumnos?.map(async (elem, i) => {
    if (elem.count != '0') {      //no disponible

      //Devuelve cuantas asignaciones pendientes hay para 'N' avance, CERO si todas estan asignadas para esa categoria
      await fetchNumAsignacionesPendientesMaestriaTiempoComp(elem.t_ultimo_avance.toString(), "").then((result) => {
        let total = parseInt(result)
        if (total === 0) {
          statusArray[i] = 1    //activa
        } else if (total > 0) {
          statusArray[i] = 0    //pendiente
        }
      })
    }
  });

  await Promise.all(promises);

  return statusArray;
}



//cuantos alumnos de maestria de medio tiempo hay para cada numero de avance
async function fetchAsignacionesDataMidTime(): Promise<AvanceProps[]> {

  let alumnos: Array<AvanceProps> | undefined

  await fetchNumAlumnosMaestriaMedTiempo("").then((res) => {
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
//Para cada numero de avance de MEDIO TIEMPO en el tablero, deducir estado actual
async function fetchStatusMidTime(alumnos: Array<AvanceProps>): Promise<number[] | undefined> {
  let statusArray = Array(6).fill(2);

  const promises = alumnos?.map(async (elem, i) => {
    if (elem.count != '0') {      //no disponible

      //Devuelve cuantas asignaciones pendientes hay para 'N' avance, CERO si todas estan asignadas para esa categoria
      await fetchNumAsignacionesPendientesMaestriaMedioTiempo(elem.t_ultimo_avance.toString(), "").then((result) => {
        let total = parseInt(result)
        if (total === 0) {
          statusArray[i] = 1    //activa
        } else if (total > 0) {
          statusArray[i] = 0    //pendiente
        }
      })
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
    }else{
      result = true;
    }

  })
  return result!;
}




export default async function Home() {

  const fullTimetitleArray = [
    "Seminario de Tesis I (20% de avance)",
    "Seminario de Tesis II (50% de avance)",
    "Seminario de Tesis III (90% de avance)"
  ]

  const midTimetitleArray = [
    "Avance 1",
    "Seminario de Tesis I (20% de avance)",
    "Avance 3",
    "Seminario de Tesis II (50% de avance)",
    "Avance 5",
    "Seminario de Tesis III (90% de avance)"
  ]

  //fetch de la tabla periodo, revisar que exista al menos un periodo y si es el caso
  //obtener el ultimo creado, comparar la fecha de ciere con la actual para revisar que no este concluido
  const statusFullTime = await fetchStatusFullTime(await fetchAsignacionesDataFullTime());
  const statusMidTime = await fetchStatusMidTime(await fetchAsignacionesDataMidTime());
  const statusPeriodo = await fetchStatusPeriodo();

  return (
    <main>
      {statusPeriodo && (        
        <Alert />
      )
      }
      <div className="w-full flex flex-col mb-10">
        <label className="mb-3 block text-4xl font-bold">
          Alumnos de Maestría
        </label>
        <label className=" block text-xl font-bold">Avances de tesis para este semestre</label>
        <div className="mt-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-start">
          <label className=" block text-xl font-light">
            Alumnos de tiempo completo
          </label>
        </div>

        {//Si statusPeriodo=true, significa que el periodo ha concluido, se asignan todos los estados a no Disp.
          statusFullTime?.map((num, i) => (
            <AdminAssignmentCard title={fullTimetitleArray[i]} avance={i} status={statusPeriodo ? 2 : num} />
          ))
        }


        <div className="mt-14 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-start">
          <label className=" block text-xl font-light">
            Alumnos de medio tiempo
          </label>
        </div>

        {//Si statusPeriodo=true, significa que el periodo ha concluido, se asignan todos los estados a no Disp.
          statusMidTime?.map((num, i) => (            
            <AdminAssignmentCard title={midTimetitleArray[i]} avance={i} status={statusPeriodo ? 2 : num} />
          ))
        }

      </div>
    </main>
  )
}
