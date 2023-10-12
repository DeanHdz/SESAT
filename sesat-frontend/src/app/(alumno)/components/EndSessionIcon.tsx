"use client";

import { useRouter } from "next/navigation";

export default function EndSessionIcon() {
  const navigate = useRouter();

  function endSession() {
    
    /* Logout logic */

    navigate.push("/");
  }

  return (
    <div className="tooltip" data-tip="Cerrar sesión" onClick={endSession}>
      <label tabIndex={0} className="cursor-pointer hover:border-dark-blue-10">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="20px"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"></path>
          </g>
        </svg>
      </label>
    </div>
  );
}
