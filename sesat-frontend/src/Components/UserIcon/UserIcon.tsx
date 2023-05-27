import { useEffect, useState } from "react";
import { SESAT } from "../../Interfaces/ISESAT";

const UserIcon = () =>
{
  const [user, setUser] = useState<SESAT.LoggedUser>(JSON.parse(sessionStorage.getItem("loggedUser") || '{}'));

  console.log(user.usuario);

  return(
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
      <div className="bg-[#31325c] text-neutral-content rounded-full w-[40px]">
        <span className="text-xl">{(user.usuario.nombre[0] + user.usuario.apellido_paterno[0])}</span>
      </div>
    </label>
  )
}

export default UserIcon