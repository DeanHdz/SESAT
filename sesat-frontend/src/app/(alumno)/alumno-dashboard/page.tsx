import Drawer from './components/Drawer';
import Calendar from './components/Calendar';
import CompletedAssignments from './components/CompletedAssignments'

import { fetchLatestPeriod } from "../../../../utils/periodo.endpoint";
import { findAsignacionesByPeriodAndAlumno } from '../../../../utils/asignacion.endpoint';
import { Evento, LoggedUser, Tesis, Usuario } from '../../../../types/ISESAT';
import Contacts from './components/Contacts';
import { findContactsByIdTesis } from '../../../../utils/comite.endpoint';
import { LoginEndpoint } from '../../../../utils/login.endpoint';
import { cookies } from 'next/headers';
import { EventoEndpoint } from '../../../../utils/evento.endpoint';
import NotificacionSection from '@/app/components/NotificationSection';
import { findTesisPerStudent } from '../../../../utils/tesis.endpoint';
import Link from 'next/link';

type AsignacionProps = {
  id_asignacion: number,
  num_avance: number,
  titulo: string,
  fecha_entrega: string,
  fecha_cierre: string,
  fecha_cierre_opc: string,
  id_grado_estudio: number
}

export default async function Home() {
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const user: LoggedUser = await LoginEndpoint.getUserInfo(token);

  const eventosData: Promise<Evento[]> = EventoEndpoint.getEventos("", user.id_usuario);
  const eventos = await eventosData;

  let alumnoID = user.id_usuario;
  let periodo = await fetchLatestPeriod(token).catch();
  let asignaciones: AsignacionProps[] = await findAsignacionesByPeriodAndAlumno(periodo.id_periodo, alumnoID, token);
  let contactos: Usuario[] = await findContactsByIdTesis(6, token);

  const tesis: Tesis = await findTesisPerStudent(token, user.id_usuario);

  return (
    <main className="w-full flex">

      <div className="hidden lg:flex lg:w-3/12 pr-10">
        <Drawer />
      </div>

      <div className="w-full lg:w-9/12 bg-light-blue-10 rounded-xl p-6">
        <div className="w-full flex justify-start mb-6">
          <p className="text-3xl font-bold">Inicio</p>
        </div>

        <div className="w-full flex justify-center mb-4">
          {tesis.fecha_registro === null ? (
            <div className="bg-[#ffffff] gray__border w-full p-6 overflow-x-scroll lg:overflow-hidden">
              <div className="w-full py-2">
                <p className="text-xl font-SESAT">Realiza tu registro de Tesis para acceder a las asignaciones</p>
              </div>
              <div className="w-full py-2 flex gap-2 justify-end px-4">
                <div className="font-[14px] italic">
                  No te preocupes, el <span className="font-semibold text-dark-blue-10">título</span> y el <span className="font-semibold text-dark-blue-10">comité</span> pueden ser modificados posteriormente si es necesario.
                </div>
                <Link className="primary__btn text-center" href={"/alumno-dashboard/tesis-registry"}>
                  Realizar Registro
                </Link>
              </div>
            </div>
          ) : (
            <CompletedAssignments asignaciones={asignaciones} />
          )}
        </div>

        <div className="flex flex-col lg:flex-row w-full justify-center">

          <div className="w-full pr-0 lg:pr-4 lg:w-2/3">
            <div className="w-full h-fit">
              <div className='bg-white gray__border p-6 h-fit'>
                <div className="w-full flex mb-6">
                  <p className="text-xl font-SESAT">Calendario de Actividades</p>
                </div>
                <Calendar eventos={eventos} />
              </div>
              
              <Contacts contacts={contactos} />
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
