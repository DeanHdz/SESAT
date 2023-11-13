'use client'
import autosize from "autosize";
import { useState } from "react";
import { postComment } from "../../../utils/comentario.endpoint";
import { useRouter } from "next/navigation";
import { formatAsISODate } from "../../../utils/utils";
import { postNotificacion } from "../../../utils/notification.endpoint";
import { fetchOneByIdAsignacion } from "../../../utils/asignacion.endpoint";
import { Asignacion, Comite, Tesis } from "../../../types/ISESAT";
import { fetchTesisByID } from "../../../utils/tesis.endpoint";
import { fetchComiteByIDTesis } from "../../../utils/comite.endpoint";
import Cookies from "js-cookie";
import revalidator from "../(admin)/admin-dashboard/actions";

const AddComment = ({ id_asignacion, idUsuario }: { id_asignacion: number, idUsuario: number }) => {
  const cookie = Cookies.get("SESATsession");
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : ""

  const [comment, setComment] = useState("");
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const asignacion: Asignacion = await fetchOneByIdAsignacion(id_asignacion, token);
    const tesis: Tesis = await fetchTesisByID(asignacion.id_tesis, token)

    
    try {
      await postComment(
        {
          id_usuario: idUsuario,//obtener de la cookie
          id_asignacion: id_asignacion,
          texto: comment,
          fecha_comentario: formatAsISODate(new Date()),
        },
        ""
      );
      router.refresh();

      const comite: Comite[] = await fetchComiteByIDTesis(tesis.id_tesis, token);
      const comite_ids = comite.map((miembro) => miembro.id_usuario);
      const notificados = [...comite_ids, tesis.id_usuario];
      
      notificados.forEach(async (id) => {
        idUsuario != id && await postNotificacion({
          id_usuario: id,
          titulo: "Nuevo Comentario",
          descripcion: `Ha recibido un nuevo comentario en la asignacion ${asignacion.titulo}`,
          fecha_expedicion: formatAsISODate(new Date())
        }, token);
      });
      setComment("");
      revalidator("CommentList");
      

    } catch (err) {
      console.log(err);
    }
  }

  return (

    <form className="w-full h-fit flex flex-row mt-6 items-center p-0">
      <div className="w-full flex justify-center items-center">
        <textarea
          value={comment}
          required={true}
          maxLength={400}
          className="h-12 w-full px-3 gray__border !rounded-md text-base"
          placeholder="Escriba un comentario"
          onChange={(e) => {
            autosize(e.currentTarget);
            setComment(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="w-fit h-12 flex justify-center items-center">
        <button onClick={handleSubmit} className="ml-3 bg-dark-blue-10 hover:scale-105 active:bg-dark-blue-10/80 w-[45px] h-[45px] rounded-full flex items-center justify-center ">

          <svg stroke="#ffffff" fill="#ffffff" strokeWidth="0" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M21.426,11.095l-17-8c-0.35-0.163-0.763-0.112-1.061,0.133C3.066,3.473,2.937,3.868,3.03,4.242L4.969,12L3.03,19.758	c-0.094,0.374,0.036,0.77,0.335,1.015C3.548,20.923,3.772,21,4,21c0.145,0,0.29-0.031,0.426-0.095l17-8	C21.776,12.74,22,12.388,22,12S21.776,11.26,21.426,11.095z M5.481,18.197L6.32,14.84L12,12L6.32,9.16L5.481,5.803L18.651,12	L5.481,18.197z"></path></svg>

        </button>
      </div>
    </form>

  );

};

export default AddComment;
