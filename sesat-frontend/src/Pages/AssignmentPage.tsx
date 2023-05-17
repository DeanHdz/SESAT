import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import CommentSection from "../Components/CommentSection/CommentSection";
import AssignmentInfoBlock from "../Components/AssignmentBlock/AssignmentInfoBlock";
import AssingmentStatusBlock from "../Components/AssignmentBlock/AssignmentStatusBlock";
import { useEffect, useState } from "react";
import { SESAT } from "../Interfaces/ISESAT";
import { AsignacionEndpoint } from "../api/asignacion.endpoint";

import LoadingAnimation from "../Components/LoadingAnimation/LoadingAnimation";

let paths: string[] = [];
paths.push("Avance # de Tesis");

let links: string[] = [];
links.push("/board");
links.push("assignment");

const AssignmentPage = () => {
  const [asignacion, setAsignacion] = useState<SESAT.Asignacion | undefined>();

  const getAsignacion = async () => {
    setAsignacion(await AsignacionEndpoint.getAsignacion(1, ""));
  };

  useEffect(() => {
    getAsignacion();
  }, []);

  if (asignacion == null)
  {
    return <LoadingAnimation texto="Cargando..."/> 
  }
  else
    return (
      <div className="overflow-x-hidden">
        <Navbar />
        <InsiteBaner topic={"Asignación"} />
        <BreadcrumbContainer paths={paths} links={links} />
        <div className="w-screen lg:h-[1400px] flex flex-col lg:flex-row space-x-4 mt-4">
          <div className=" w-full lg:w-4/6 flex flex-col px-4 space-y-4">
            <AssignmentInfoBlock asignacion={asignacion} />
            <AssingmentStatusBlock asignacion={asignacion} />
          </div>
          <div className="w-full lg:w-2/6 overflow-auto hover:overflow-scroll">
            <div className="relative flex flex-col items-center justify-center antialiased bg-white w-full">
              <article className="prose">
                <h1 className="font-SESAT my-4">Comentarios</h1>
              </article>
              <div className="container px-0 mx-auto sm:px-5">
                <CommentSection id_asignacion={asignacion?.id_asignacion} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AssignmentPage;