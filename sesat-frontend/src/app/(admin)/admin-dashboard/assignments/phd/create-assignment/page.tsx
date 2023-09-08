import AdminBoard from "@/app/components/AdminBoard";
import NewAssignment from "@/app/components/NewAssignment";


export default function Home() {
  let title = "Title"
  let avance = "1"
  return (
    <main>      
      <NewAssignment title={title} avance={avance} action="Crear"/>     
    </main>
  )
}
