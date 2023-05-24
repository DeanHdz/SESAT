import { useState } from "react";
import { SESAT } from "../../Interfaces/ISESAT";
import { ComentarioEndpoint } from "../../api/comentario.endpoint";
import { NotificacionEndpoint } from "../../api/notification.endpoint";

const AddComment = ({ id_asignacion }: { id_asignacion: number }) => {
  const [comment, setComment] = useState("");
  const [addedComment, setAddedComment] = useState(false);
  const [user, setUser] = useState<SESAT.LoggedUser>(
    JSON.parse(sessionStorage.getItem("loggedUser") || "{}")
  );

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      ComentarioEndpoint.postComentario(
        {
          clave_usuario: user.clave,
          id_asignacion: id_asignacion,
          texto: comment,
        },
        ""
      );

      if (user.role === 3) {
        NotificacionEndpoint.postNotificacion(
          {
            clave_usuario: user.clave,
            titulo: "Nuevo Comentario",
            descripcion: user.name + " hizo un nuevo comentario",
            fecha_expedicion: new Date(),
          },
          ""
        );
      }
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  }

  return (
    <div className="w-full mt-5 mb-5 shadow-md">
      <form action="" className="w-full p-4" onSubmit={handleSubmit}>
        <label className="block mb-2">
          <span className="text-gray-600">Añade un comentario</span>
          <textarea
            className="block w-full mt-1 rounded"
            rows={3}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
        </label>
        <button className="px-3 py-2 text-sm btn text-blue-100 bg-primary rounded">
          Guardar Comentario
        </button>
      </form>
    </div>
  );
};

export default AddComment;
