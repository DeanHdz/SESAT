import Calendar from "./components/Calendar";
import HomeCard from "./components/HomeCard";
import { Evento } from "../../../../types/ISESAT";
import { EventoEndpoint } from "../../../../utils/evento.endpoint";
import AlertPeriod from "./components/AlertPeriod";
import { cookies } from "next/headers";

export default async function Home() {
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const eventosData: Promise<Evento[]> = EventoEndpoint.getEventos(token, 100001); //hard admin id
  const eventos = await eventosData;
  return (
    <main className="flex flex-col w-full" >
      <div className="flex flex-col lg:flex-row w-full">
        <HomeCard
          title="Avances de tesis (Maestría)"
          webLink="/admin-dashboard/assignments/masters"
        />
        <div className="w-[30px] lg:w-[60px]"></div>
        <HomeCard
          title="Avances de tesis (Doctorado)"
          webLink="/admin-dashboard/assignments/phd"
        />
      </div>

      <div className="mt-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-start">
        <label className=" block text-xl font-light">
          Calendario de actividades
        </label>
      </div>

      <div className="mt-10 w-full hover:cursor-default">
        <AlertPeriod />
        <Calendar eventos={eventos} />
      </div>

    </main>
  );
}
