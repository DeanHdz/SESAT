'use client'

import AssignmentPage from "@/app/components/AssignmentPage"
import AssignmentCard from "@/app/components/AssignmentCard"
import TesisView from "@/app/components/TesisView"
import AddComment from "@/app/components/AddComment"
import Reply from "@/app/components/Reply"
import Contact from "@/app/components/Contact"

export default function Home() {
  return (
    <main className="">
      {/* <AssignmentCard /> */}

      <TesisView titulo="La importancia del agua" fecha="10/10/2023" autor="Edwin Aguilar"/>

      <Reply userName="Yo" date="Hoy" body="Hola" />
      <AddComment id_asignacion={3}/>
    </main>
  )
}