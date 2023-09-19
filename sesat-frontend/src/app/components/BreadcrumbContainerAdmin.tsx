"use client";
import BreadcrumbLast from "./BreadcrumbLast"
import BreadcrumbElement from "./BreadcrumbElement"

const BreadcrumbContainerAdmin = () => {
  return (
    <div className="w-screen border-light shadow-card rounded-lg border bg-[#f7f8fa] py-3 px-3">
      <div className="w-5/6 m-auto flex flex-row justify-between">       
        <label className="pl-4 text-sm font-semibold text-dark-blue-10">
          SESAT
        </label>
        <div className="dropdown">
          <label tabIndex={0} className="rounded-box cursor-pointer hover:border hover:border-dark-blue-10 hover:border-solid">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"></path></g></svg>
          </label>
          <ul tabIndex={0} className="cursor-pointer dropdown-content z-[1] menu-sm p-2 shadow bg-base-100 rounded-box w-32">
            <li><a href="/">Cerrar sesión</a></li>            
          </ul>
        </div>
      </div>

    </div>
  )
}

export default BreadcrumbContainerAdmin;