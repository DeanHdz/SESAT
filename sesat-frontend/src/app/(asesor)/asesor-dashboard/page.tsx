import Calendar from "../components/Calendar";
import CommentCard from "../components/CommentCard";
import Drawer from '../components/Drawer'
import AsignacionCompleta from '../components/AsignacionCompleta'

export default function Home() {
  return (
    <main>
      <div className="flex">

        <div className="lg:w-1/3">
          <Drawer />
        </div>

        <div className="lg:w-2/3">
          <div className="w-full flex justify-center pt-5 pr-100">
            <p className="text-3xl font-bold">Tablero</p>
          </div>

          <div className="w-full flex justify-center pt-10 pr-100">
            <p className="text-2xl font-bold">Calendario de Actividades</p>
          </div>


          {/* <div className="flex flex-row w-full">
            <div className="mt-10 w-full">
              <Calendar />
            </div>
          </div> */}
          <Calendar />
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
        <p className="text-2xl font-bold">Asignaciones completas</p>
      </div>
      <AsignacionCompleta />
    </main>

  );
}
