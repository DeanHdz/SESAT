import { cookies } from "next/headers";
import { LoggedUser } from "../../../../../types/ISESAT";
import { LoginEndpoint } from "../../../../../utils/login.endpoint";
import { redirect } from "next/navigation";
import Drawer from "../components/Drawer";
import PasswordResetForm from "../components/PasswordResetForm";

export default async function Reset() {
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const user: LoggedUser = await LoginEndpoint.getUserInfo(token);
  
  if(user.id_usuario > 1000000)
  {
    return (
      <main className="w-full flex">
        <div className="hidden lg:flex lg:w-3/12 pr-10">
          <Drawer />
        </div>

        <div className="w-full lg:w-9/12 bg-light-blue-10 rounded-xl p-6">
          <div className="w-full flex justify-start mb-6">
            <p className="text-3xl font-bold">Cambiar Contraseña</p>
          </div>
          <PasswordResetForm user={user}/>
        </div>
      </main>
    )
  }
  else {
    redirect("/asesor-dashboard")
  }  
}
