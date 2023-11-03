import { fetchAvancesEntregados } from "../../../../utils/comite.endpoint";
import { fetchLatestPeriod } from "../../../../utils/periodo.endpoint";
import Calendar from "./components/Calendar";
import CommentCard from "./components/CommentCard";
import CompletedAssignments from './components/CompletedAssignments'
import NotificacionSection from "./components/NotificationSection";
import Drawer from "./components/Drawer";

type AsignacionProps = {
  num_avance: number;
  id_asignacion: number,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  titulo: string,
  calificacion: number;
  id_acta_evaluacion: number;
  id_formato_evaluacion: number;
  fecha_entrega: string,
  grado: number;
}

export default async function Home() {
  let asesorID = 333333;
  let idFuncion = 1;
  let periodo = await fetchLatestPeriod("").catch();
  let asignaciones: AsignacionProps[] = await fetchAvancesEntregados(periodo.id_periodo, asesorID.toString(), idFuncion.toString(), "")
  return (
    <main className="w-full flex flex-row max-w-[1600px] mx-auto">

      <div className="hidden lg:flex lg:w-3/12">
        <Drawer />
      </div>

      <div className="w-full lg:w-9/12">
        <div className="w-full flex justify-center mt-6 mb-6 pt-2 p-2 border-b border-light-gray-22 border-solid ">
          <p className="text-3xl font-bold">Tablero</p>
        </div>

        <div className="w-full flex justify-center pt-2 pb-2 mb-10">
          <CompletedAssignments asignaciones={asignaciones} />
        </div>

        <div className="flex  flex-col lg:flex-row  w-full justify-center pt-2 pb-2">
          <div className="w-full p-2 lg:w-2/3">
            <div className="w-full flex justify-center">
              <p className="text-2xl font-bold text-black/40">Calendario de Actividades</p>
            </div>
            <div className="mt-2 w-full">
              <Calendar />
            </div>
          </div>
          <div className="w-full p-2 lg:w-1/3 mt-10 lg:mt-0">
            <NotificacionSection />
          </div>
        </div>
        
      </div>

    </main>
  );
}