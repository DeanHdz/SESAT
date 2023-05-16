import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import CommentSection from "../Components/CommentSection/CommentSection";
import AssignmentInfoBlock from "../Components/AssignmentBlock/AssignmentInfoBlock";
import AssingmentStatusBlock from "../Components/AssignmentBlock/AssignmentStatusBlock";
import { IComment } from "../Interfaces/IComment";
import { IReply } from "../Interfaces/IReply";
import { useEffect, useState } from "react";
import { SESAT } from "../Interfaces/ISESAT";
import { AsignacionEndpoint } from "../api/asignacion.endpoint";
import { ComentarioEndpoint } from "../api/comentario.endpoint";
import { RespuestaEndpoint } from "../api/respuesta.endpoint";

let paths: string[] = [];
paths.push("Avance # de Tesis");

let links: string[] = [];
links.push("/board");
links.push("assignment");

const AssignmentPage = () => {
  const [comentario, setComentario] = useState<
    SESAT.Comentario[] | undefined
  >();
  const [respuesta, setRespuesta] = useState<SESAT.Respuesta[] | undefined>();

  const [asignacion, setAsignacion] = useState<SESAT.Asignacion | undefined>();

  const [isLoading, setLoad] = useState(true);

  const [isLoadingC, setLoadC] = useState(true);

  const getAsignacion = async () => {
    setAsignacion(await AsignacionEndpoint.getAsignacion(1, ""));
    setLoad(false);
  };

  useEffect(() => {
    getAsignacion();
  }, []);

  const getComentarios = async () => {
    if (asignacion) {
      setComentario(
        await ComentarioEndpoint.getPerAssignment(asignacion.id_asignacion, "")
      );
      setLoadC(false);
    }
  };

  let comments: IComment[] = [];
  let repplies: IReply[] = [];

  for (let i = 0; respuesta && i < respuesta.length; i++) {
    let repply: IReply;
    repply = {
      userName: "Jesús Alemán",
      date: "day: " + (i + 1) + " month: 3 year: 2023",
      body: respuesta[i].texto,
    };
    repplies.push(repply);
  }

  for (let i = 0; comentario && i < comentario?.length; i++) {
    let comment: IComment;

    console.log(repplies);

    comment = {
      userName: "Benjamín Alba",
      date: "day: " + (i + 1) + " month: 3 year: 2023",
      body: comentario[i].texto, //::)
      replies: repplies,
    };
    comments.push(comment);
  }

  function isEmpty(str: string | undefined) {
    return !str || str.length === 0;
  }

  if (isLoading) return <div>CARGANDO</div>;
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
                <CommentSection comments={comments} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AssignmentPage;
