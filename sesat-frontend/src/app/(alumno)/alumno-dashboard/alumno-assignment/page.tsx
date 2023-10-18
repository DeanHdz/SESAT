'use client'

import TesisView from "@/app/components/TesisView"
import AddComment from "@/app/components/AddComment"
import Reply from "@/app/components/Reply"
import Drawer from "../components/Drawer"

export default function Home() {
  return (
    <div className="flex">
      <div className="hidden lg:flex lg:w-3/12 flex-col">
        <Drawer />
      </div>

      <div className="w-full lg:w-9/12">
        <TesisView titulo="La importancia del agua" fecha="10/10/2023" autor="Edwin Aguilar"/>
        <Reply userName="Yo" date="Hoy" body="Hola" />
        <AddComment id_asignacion={3}/>
      </div>
    </div>
  )
}