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


let paths: string[] = [];
paths.push("Avance # de Tesis");

let links: string[] = [];
links.push("/board");
links.push("assignment");

const AssignmentPage = () => {

  const [comentario, setComentario] = useState<SESAT.Comentario | undefined>();

  const getComentario = async () => {
    setComentario(await ComentarioEndpoint.getComentario(1, ""));
  };

  useEffect(() => {
    getComentario();
  }, []);

  console.log(comentario);

  let comments: IComment[] = [];
  let repplies: IReply[] = [];

  for (let i = 0; i < 3; i++) {
    let repply: IReply;
    repply = {
      userName: "Jesús Alemán",
      date: "day: " + (i + 1) + " month: 3 year: 2023",
      body: "Soy una respuesta",
    };
    repplies.push(repply);
  }

  function isEmpty(str: string | undefined) 
  {
    return(!str || str.length === 0);
  }

  for (let i = 0; i < 3; i++) {
    let comment: IComment;

    comment = {
      userName: "Benjamín Alba",
      date: "day: " + (i + 1) + " month: 3 year: 2023",
      body: comentario?.texto! ?? "", //::)
      replies: repplies,
    };
    comments.push(comment);
  }

  const [asignacion, setAsignacion] = useState<SESAT.Asignacion | undefined>();

  const getAsignacion = async () => {
    setAsignacion(await AsignacionEndpoint.getAsignacion(1, ""));
  };

  useEffect(() => {
    getAsignacion();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <InsiteBaner topic={"Asignación"} />
      <BreadcrumbContainer paths={paths} links={links} />
      <div className="w-screen lg:h-[1400px] flex flex-col lg:flex-row space-x-4 mt-4">
        <div className=" w-full lg:w-4/6 flex flex-col px-4 space-y-4">
          <Assignment   UI-q InfoBlock asignacion={asignacion} />
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
