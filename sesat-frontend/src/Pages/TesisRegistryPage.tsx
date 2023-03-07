import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumbs";
import TesisRegistryForm from "../Components/TesisRegistryForm/TesisRegistryForm";

let paths: string[] = [];
paths.push("Registro de Tésis");

export const TesisRegistryPage = () => {
  return (
    <>
      <Navbar />
      <InsiteBaner topic={"Registro"}/>
      <Breadcrumbs paths={paths}/>
      <TesisRegistryForm />
    </>
  );
};
