import AssignmentDetails from "@/app/components/AssignmentDetails";


export default function Home() {
  let title = "Title"
  let avance = "1"
  return (
    <main>      
      <AssignmentDetails title={title} avance={avance} />   
    </main>
  )
}
