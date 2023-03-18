import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import TesisRegistryForm from "../Components/TesisRegistryForm/TesisRegistryForm";

let paths: string[] = [];
paths.push("Registro de Tésis");

let links: string[] = [];
links.push("/register");

export const TesisRegistryPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Registro"}/>
      <BreadcrumbContainer paths={paths} links={links}/>
      <TesisRegistryForm />
    </div>
  );
};

export default TesisRegistryPage
