import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import TesisRegistryForm from "../Components/TesisRegistryForm/TesisRegistryForm";
import NewAssignment from "../Components/NewAssignment/NewAssignment";
import TesisView from "../Components/TesisView/TesisView";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SESAT } from "../Interfaces/ISESAT";
import { AsignacionEndpoint } from "../api/asignacion.endpoint";
import { useNavigate } from "react-router-dom";

let paths: string[] = [];
paths.push("Ver Tesis");

let links: string[] = [];
links.push("/view_tesis");



const TesisViewPage = () => {
  const location = useLocation();
  const tesis = location.state.tesis;

  return (
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Ver Tesis "} />
      <BreadcrumbContainer paths={paths} links={links} />      
      <TesisView tesis={tesis} />
    </div>
  );
};

export default TesisViewPage;