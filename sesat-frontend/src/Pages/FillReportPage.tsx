import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import ReportForm from "../Components/ReportForm/ReportForm";
import { useLocation } from "react-router-dom";


let paths: string[] = [];
paths.push("Llenar acta de evaluación");

let links: string[] = [];
links.push("/fill-report");

const FillReportPage = () => {
  const location = useLocation();
  const tesis = location.state.tesis
  const asignacion = location.state.asignacion

  return (
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Acta de evaluación de avance de tesis "} />
      <BreadcrumbContainer paths={paths} links={links} />
      {/*<ReportForm tesis={tesis} asignacion={asignacion}/>*/}
    </div>
  );
};

export default FillReportPage;