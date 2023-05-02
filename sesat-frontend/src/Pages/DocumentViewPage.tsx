import Navbar from "../Components/Navbar/Navbar";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import DocumentView from "../Components/TesisView/DocumentView";
import { useLocation } from "react-router-dom";

let paths: string[] = [];
paths.push("Ver Documento");

let links: string[] = [];
links.push("/view_document");



const DocumentViewPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />      
      <BreadcrumbContainer paths={paths} links={links} />      
      <DocumentView />            
    </div>
  );
};

export default DocumentViewPage;