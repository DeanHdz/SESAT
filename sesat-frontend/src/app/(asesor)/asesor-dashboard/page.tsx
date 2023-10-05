import Calendar from "./components/Calendar";
import CommentCard from "./components/CommentCard";
import CompletedAssignments from './components/CompletedAssignments'
import NotificacionSection from "./components/NotificationSection";

export default function Home() {
  return (
    <main className="w-full">

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

/*
<div className="w-full flex">
        <div className="w-full">
          <div className="w-full flex justify-center pt-5 pr-100">
            <p className="text-3xl font-bold">Tablero</p>
          </div>

          <div className="w-full flex justify-center pt-10 pr-100">
            <p className="text-2xl font-bold">Calendario de Actividades</p>
          </div>

          <div className="flex flex-row w-full">
            <div className="mt-10 w-full">
              <Calendar />
            </div>
          </div> 

          <div className="lg:w-1/3 pl-20 lg:h-1/3">
            <div className="w-full pt-5 pr-100 pb-5">
              <p className="text-2xl font-bold">Notificaciones</p>
            </div>
            <CommentCard title="Avance #1" webLink="#" texta="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />
            <div className="w-[30px] lg:w-[60px]"></div>
            <CommentCard title="Avance #2" webLink="#" texta="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />
            </div>
        </div>
        <div className="w-full flex justify-center pt-5 pr-100">
          <AsignacionCompleta />
        </div>
      </div>
*/