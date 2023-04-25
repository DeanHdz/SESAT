import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import TesisRegistryForm from "../Components/TesisRegistryForm/TesisRegistryForm";
import NewAssignment from "../Components/NewAssignment/NewAssignment";
import TesisView from "../Components/TesisView/TesisView";
import DocumentView from "../Components/TesisView/DocumentView";
import { useParams } from "react-router-dom";

let paths: string[] = [];
paths.push("Ver Documento");

let links: string[] = [];
links.push("/view_document");

let titulo: string = "Machine Learning Classification Algorithms";
let fecha: string = "12/02/2020";
let autor: string = "José Alfredo Ipiña Zarazúa ";


const DocumentViewPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />      
      <BreadcrumbContainer paths={paths} links={links} />      
      <DocumentView titulo={titulo} fecha={fecha} autor={autor} />            
    </div>
  );
};

export default DocumentViewPage;