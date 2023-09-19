import { Calendar } from "@/app/components/Calendar";
import HomeCard from "@/app/components/HomeCard";


export default function Home() {
  return (
    <main>
      <div className="flex flex-col w-full">

        <div className="flex flex-row w-full">
          <HomeCard title="Avances de tesis (Maestría)" webLink="/admin-dashboard/assignments/masters" />
          <div className="w-[30px] lg:w-[60px]"></div>
          <HomeCard title="Avances de tesis (Doctorado)" webLink="/admin-dashboard/assignments/phd" />
        </div>


        <div className="mt-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-start">
          <label className=" block text-xl font-light">
            Calendario de actividades
          </label>
        </div>

        <div className="mt-10 w-full">
          <Calendar />
        </div>
      </div>
    </main>

  );
}