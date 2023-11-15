import { cookies } from "next/headers";
import Drawer from "../components/Drawer";
import { LoginEndpoint } from "../../../../../utils/login.endpoint";
import { LoggedUser, Tesis, Usuario } from "../../../../../types/ISESAT";
import { findTesisPerStudent } from "../../../../../utils/tesis.endpoint";
import TesisRegistryForm from "../components/TesisRegistryForm";
import { UsuarioEndpoint } from "../../../../../utils/usuario.endpoint";
import { redirect } from "next/navigation";

export default async function TesisRegistry() {
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const loggedUser: LoggedUser = await LoginEndpoint.getUserInfo(token);
  const tesis: Tesis = await findTesisPerStudent(token, loggedUser.id_usuario);
  const user: Usuario[] = await UsuarioEndpoint.getUserById(loggedUser.id_usuario, token);

  if(tesis.fecha_registro)
  {
    redirect('/alumno-dashboard');
  }
  else{
    return (
      <div className="flex">
        <div className="hidden lg:flex lg:w-3/12 flex-col pr-10">
          <Drawer />
        </div>
        <div className="w-full lg:w-9/12">
          <label className="text-3xl font-bold">
            Registro de Tesis       
          </label>
          <TesisRegistryForm user={user[0]} tesis={tesis}/>
        </div>
      </div>
    )
  }
}
