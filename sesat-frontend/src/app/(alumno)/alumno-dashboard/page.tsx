import Drawer from './components/Drawer';
import Calendar from './components/Calendar';
import CompletedAssignments from './components/CompletedAssignments'
import NotificacionSection from "./components/NotificationSection";
import ContactoAsesor from "./components/Contacts";

import { fetchLatestPeriod } from "../../../../utils/periodo.endpoint";
import {findAsignacionesByPeriodAndAlumno } from '../../../../utils/asignacion.endpoint';
import { Usuario } from '../../../../types/ISESAT';
import Contacts from './components/Contacts';
import { findContactsByIdTesis } from '../../../../utils/comite.endpoint';

type AsignacionProps = {
  id_asignacion: number,
  num_avance: number,
  titulo: string,
  fecha_entrega: string
}

export default async function Home() {

  let alumnoID = 230443;
  let periodo = await fetchLatestPeriod("").catch();
  let asignaciones: AsignacionProps[] = await findAsignacionesByPeriodAndAlumno(periodo.id_periodo, alumnoID, "");
  let contactos: Usuario[] = await findContactsByIdTesis(6,"");

  return (
    <main className="w-full flex">

    <div className="hidden lg:flex lg:w-3/12">
        <Drawer />
    </div>

    <div className="w-full lg:w-9/12">
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
            <Contacts contacts={contactos}/>
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
            <NotificacionSection />
            <Contacts contacts={contactos}/>
          </div>
        </div>
      </div>
    </div>
    
    </main>
  );
}
