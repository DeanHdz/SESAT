import { fetchAvancesEntregados } from "../../../../utils/comite.endpoint";
import { fetchLatestPeriod } from "../../../../utils/periodo.endpoint";
import Calendar from "./components/Calendar";
import CompletedAssignments from './components/CompletedAssignments'
import NotificacionSection from "../../components/NotificationSection";
import Drawer from "./components/Drawer";
import { cookies } from "next/headers";
import { Evento, LoggedUser } from "../../../../types/ISESAT";
import { LoginEndpoint } from "../../../../utils/login.endpoint";
import { EventoEndpoint } from "../../../../utils/evento.endpoint";

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
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const user: LoggedUser = await LoginEndpoint.getUserInfo(token);

  const eventosData: Promise<Evento[]> = EventoEndpoint.getEventos(token, user.id_usuario);
  const eventos = await eventosData;


  let asesorID = user.id_usuario;
  let periodo = await fetchLatestPeriod(token).catch();
  let asignaciones: AsignacionProps[] = await fetchAvancesEntregados(periodo.id_periodo, asesorID, token);
  return (
    <main className="w-full flex flex-row mx-auto">

      <div className="hidden lg:flex lg:w-3/12 pr-10">
        <Drawer />
      </div>

      <div className="w-full lg:w-9/12 bg-light-blue-10 rounded-xl p-6">
        <div className="w-full flex justify-start mb-6">
          <p className="text-3xl font-bold">Inicio</p>
        </div>

        <div className="w-full flex justify-center mb-4">
          <CompletedAssignments asignaciones={asignaciones} />
        </div>

        <div className="flex flex-col lg:flex-row w-full justify-center">

          <div className="w-full pr-0 lg:pr-4 lg:w-2/3">
            <div className="w-full h-fit">
              <div className="bg-white gray__border p-6 h-fit">
                <div className="w-full flex mb-6">
                  <p className="text-xl font-SESAT">Calendario de Actividades</p>
                </div>
                <Calendar eventos={eventos} token={token} />
              </div>

            </div>
          </div>
          
          <div className="w-full mt-4 lg:w-1/3 lg:mt-0">
            <NotificacionSection />
          </div>
        </div>
      </div>

    </main>
  );
}