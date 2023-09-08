import BreadcrumbContainer from "@/app/components/BreadcrumbContainer";
import InsiteBaner from "@/app/components/InsiteBanner";



export default function Home() {


  let paths: string[] = [];
  paths.push("Llenar acta de evaluación");

  let links: string[] = [];
  links.push("/fill-report");


  const tesis = "";
  const asignacion = "";
  return (
    <main className="">
      <InsiteBaner topic={"Acta de evaluación de avance de tesis "} />
      <BreadcrumbContainer paths={paths} links={links} />
      {/**<ReportForm tesis={tesis} asignacion={asignacion}/> */}
    </main>
  )
}
