import Comment from "./Comment"
import AddComment from "./AddComment";
import { IComment } from "../../Interfaces/IComment"
import { useState, useEffect } from "react";
import { SESAT } from "../../Interfaces/ISESAT";
import { ComentarioEndpoint } from "../../api/comentario.endpoint";
import { RespuestaEndpoint } from "../../api/respuesta.endpoint";

const CommentSection = ({id_asignacion}:{id_asignacion: number}) =>
{
  const [comentario, setComentario] = useState<SESAT.Comentario[] | undefined>();

  const getComentarios = async () => {
    setComentario(await ComentarioEndpoint.getPerAssignment(id_asignacion, ""));
  };

  useEffect(() => {
    getComentarios();
  }, [])

  let comments: IComment[] = [];

  for (let i = 0; comentario && i < comentario?.length; i++) {
    let comment: IComment;

    comment = {
      userName: "Benjamín Alba",
      date: "day: " + (i + 1) + " month: 3 year: 2023",
      body: comentario[i].texto, //::)
    };
    comments.push(comment);
  }

  let commentsToDisplay = [];
  for(let i=0;i<comments.length;i++)
  {
    if(comentario)
      commentsToDisplay.push(<><Comment key={i} userName={comments[i].userName} date={comments[i].date} body={comments[i].body} comment_id={comentario[i].id_comentario}/></>) 
  }
  commentsToDisplay.push(<AddComment key={comments.length} id_asignacion={id_asignacion}/>)

  return(
    <div>
      {commentsToDisplay}
    </div>
  )
}

export default CommentSection