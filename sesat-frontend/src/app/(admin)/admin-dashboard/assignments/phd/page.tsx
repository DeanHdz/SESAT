import AdminAssignmentCard from "@/app/components/AdminAssignmentCard";
import { fetchNumAlumnosDoctorado } from "../../../../../../utils/tesis.endpoint";
import { fetchNumAsignacionesPendientesDoctorado } from "../../../../../../utils/asignacion.endpoint";
import EmptyPage from "@/app/components/EmptyPage";

type AvanceProps = {
  t_ultimo_avance: number;
  count: string;
}

async function fetchStatus(alumnos: Array<AvanceProps>): Promise<number[] | undefined> {
  let statusArray = Array(6).fill(2);

  const promises = alumnos?.map(async (elem, i) => {
    if (elem.count != '0') {      //no disponible
      await fetchNumAsignacionesPendientesDoctorado(elem.t_ultimo_avance.toString(), "").then((result) => {
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

async function fetchAsignacionesData(): Promise<AvanceProps[]> {

  let alumnos: Array<AvanceProps> | undefined

  await fetchNumAlumnosDoctorado("").then((res) => {
    alumnos = res;

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

export default async function Home() {

  const statusArray = await fetchStatus(await fetchAsignacionesData());  

  return (
    <main>
      <div className="w-full flex flex-col mb-10">
        <label className="mb-3 block text-4xl font-bold">Alumnos de Doctorado</label>
        <label className=" block text-xl font-bold">Avances de tesis para este semestre</label>

        <div className="mt-1 p-2 border-t border-light-gray-22 border-solid w-full flex justify-start">
        </div> 

        {
          statusArray?.map((num, i) => (
            <AdminAssignmentCard title={`Seminario de Avance de Tesis ${i+1}`} avance={i} status={num} />
          ))
        }      

    </div>
    </main >
  )
}