import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import ReportForm from "../Components/ReportForm/ReportForm";

let paths: string[] = [];
paths.push("Llenar acta de evaluación");

let links: string[] = [];
links.push("/fill-report");

const FillReportPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Acta de evaluación de avance de tesis "} />
      <BreadcrumbContainer paths={paths} links={links} />
      <ReportForm />
    </div>
  );
};

export default FillReportPage;