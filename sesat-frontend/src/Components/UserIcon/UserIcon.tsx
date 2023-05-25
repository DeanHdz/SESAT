import { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";

const UserIcon = () =>
{
  ReactSession.setStoreType("sessionStorage");
  const[usuario,setUsuario] = useState(sessionStorage.get("loggedUser"));




  return(
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
      <div className="bg-[#31325c] text-neutral-content rounded-full w-[40px]">
        <span className="text-xl">{usuario.nombre}</span>
      </div>
    </label>
  )
}

export default UserIcon