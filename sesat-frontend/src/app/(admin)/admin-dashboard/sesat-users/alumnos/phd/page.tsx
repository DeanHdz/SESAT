import StudentsProfileList from "@/app/components/UsersProfileList";
import { TitleBarSimple } from "@/app/components/TitleBarSimple";

export default function Home() {
    return (
      <main>
        <TitleBarSimple title="Alumnos de Doctorado Registrados en SESAT" />
        {/*<StudentsProfileList title="Alumnos de Doctorado"/>*/}
      </main>
    )
  }