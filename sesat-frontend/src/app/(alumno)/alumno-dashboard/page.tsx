import Drawer from "../components/Drawer";
import Calendar from "./components/Calendar";
import CompletedAssignments from './components/CompletedAssignments'
import NotificacionSection from "./components/NotificationSection";
import ContactoAsesor from "./components/ContactoAsesor";

export default function Home() {
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
        <CompletedAssignments />
      </div>

      <div className="hidden lg:flex w-full justify-center pt-2 pb-2">
        <div className="w-full p-2 lg:w-2/3">
          <div className="w-full flex justify-center">
            <p className="text-2xl font-bold">Calendario de Actividades</p>
          </div>
          <div className="mt-2 w-full">
            <Calendar />
            <ContactoAsesor />
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
            <ContactoAsesor />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <NotificacionSection />
        </div>
      </div>
    </div>
    
    </main>
  );
}