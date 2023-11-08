import { Usuario } from "../../../../../types/ISESAT"
import { DatosAlumnoEndpoint } from "../../../../../utils/datos-alumno.endpoint";
import { UsuarioEndpoint } from "../../../../../utils/usuario.endpoint"
import Drawer from "../components/Drawer"
import ThesisRegistrationForm from "../components/ThesisRegistrationForm"

export default async function Home() {

  const datos = await DatosAlumnoEndpoint.getUserDataById(230443, "").catch();

  // Fetch asesor
  let asesores: Usuario[] = await UsuarioEndpoint.getAsesores("").catch()
  /* fetch de usuario y pasarlo al componente, la verificacion si es alumno o no se hace dentro del ThesisRegistrationForm*/

  return (
    <div className="flex">
      <div className="hidden lg:flex lg:w-3/12 flex-col">
        <Drawer />
      </div>

      <div className="w-full lg:w-9/12">

        <ThesisRegistrationForm id_usuario={230443} asesores={asesores} datos={datos} />

      </div>

    </div>
  )
}