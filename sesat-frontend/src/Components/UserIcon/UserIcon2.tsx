import { useEffect, useState } from "react";
import { SESAT } from "../../Interfaces/ISESAT";

const UserIcon2 = ({initials}:{initials: string}) =>
{
  return(
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
      <div className="bg-[#31325c] text-neutral-content rounded-full w-[40px]">
        <span className="text-xl">{initials}</span>
      </div>
    </label>
  )
}

export default UserIcon2