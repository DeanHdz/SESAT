import { fetchAvancesEntregadosByAsesor } from "../../../../utils/comite.endpoint";
import { fetchLatestPeriod } from "../../../../utils/periodo.endpoint";
import Calendar from "./components/Calendar";
import CommentCard from "./components/CommentCard";
import CompletedAssignments from './components/CompletedAssignments'
import NotificacionSection from "./components/NotificationSection";

type AsignacionProps = {
  id_tesis: number,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  titulo: string,
  fecha_entrega: string,
}

export default async function Home() {
  let asesorID = 333333;
  let idFuncion = 1;
  let periodo = await fetchLatestPeriod("");
  let asignaciones: AsignacionProps[] = await fetchAvancesEntregadosByAsesor(periodo.id_periodo, asesorID.toString(), idFuncion.toString(), "")
  return (
    <main className="w-full">

      <div className="w-full flex justify-center mt-6 mb-6 pt-2 p-2 border-b border-light-gray-22 border-solid ">
        <p className="text-3xl font-bold">Tablero</p>
      </div>

      <div className="w-full flex justify-center pt-2 pb-2">
        <CompletedAssignments asignaciones={asignaciones}/>
      </div>

      <div className="hidden lg:flex w-full justify-center pt-2 pb-2">
        <div className="w-full p-2 lg:w-2/3">
          <div className="w-full flex justify-center">
            <p className="text-2xl font-bold">Calendario de Actividades</p>
          </div>
          <div className="mt-2 w-full">
            <Calendar />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <NotificacionSection />
        </div>
      </div>

      <div className="lg:hidden w-full justify-center pt-2 pb-2">
        <div className="w-full p-2 lg:w-2/3">
          <div className="w-full flex justify-center pt-10">
            <p className="text-2xl font-bold">Calendario de Actividades</p>
          </div>
          <div className="mt-2 w-full">
            <Calendar />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <NotificacionSection />
        </div>
      </div>

    </main>
  );
}