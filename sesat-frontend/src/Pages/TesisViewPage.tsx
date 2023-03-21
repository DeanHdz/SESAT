import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import TesisRegistryForm from "../Components/TesisRegistryForm/TesisRegistryForm";
import NewAssignment from "../Components/NewAssignment/NewAssignment";
import TesisView from "../Components/TesisView/TesisView";

let paths: string[] = [];
paths.push("Ver Tesis");

let links: string[] = [];
links.push("/view_tesis");

let titulo: string = "Machine Learning Classification Algorithms";
let fecha: string = "12/02/2022";
let autor: string = "José Alfredo Ipiña Zarazúa ";

const TesisViewPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Ver Tesis "} />
      <BreadcrumbContainer paths={paths} links={links} />      
      <TesisView titulo={titulo} fecha={fecha} autor={autor}/>
      
      
    </div>
  );
};

export default TesisViewPage;