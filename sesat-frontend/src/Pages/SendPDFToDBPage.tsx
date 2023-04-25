import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import TesisRegistryForm from "../Components/TesisRegistryForm/TesisRegistryForm";
import PDFUploadForm from "../Components/Utilities/PDFUploadForm";

let paths: string[] = [];
paths.push("Enviar PDF a BD");

let links: string[] = [];
links.push("/send-pdf");

export const SendPDFToDBPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Cargar PDF a base de datos"}/>
      <BreadcrumbContainer paths={paths} links={links}/>
      <PDFUploadForm />
    </div>
  );
};

export default SendPDFToDBPage