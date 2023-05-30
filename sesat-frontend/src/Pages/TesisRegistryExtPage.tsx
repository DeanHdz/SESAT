import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import TesisRegistryFormExt from "../Components/TesisRegistryForm/TesisRegistryFormExt";

let paths: string[] = [];
paths.push("Registro de Tesis");

let links: string[] = [];
links.push("/register-ext");

export const TesisRegistryExtPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Registro"}/>
      <BreadcrumbContainer paths={paths} links={links}/>
      <TesisRegistryFormExt />
    </div>
  );
};

export default TesisRegistryExtPage