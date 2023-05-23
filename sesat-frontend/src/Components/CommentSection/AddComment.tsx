import { useState } from "react";
import { SESAT } from "../../Interfaces/ISESAT";
import { ComentarioEndpoint } from "../../api/comentario.endpoint";
import { NotificationEndpoint } from "../../api/notification.endpoint";

const AddComment = ({ id_asignacion }: { id_asignacion: number }) => {
  const [comment, setComment] = useState("");
  const [user, setUser] = useState<SESAT.LoggedUser>(
    JSON.parse(sessionStorage.getItem("loggedUser") || "{}")
  );

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      ComentarioEndpoint.postComentario(
        {
          clave: user.clave,
          id_asignacion: id_asignacion,
          texto: comment,
        },
        ""
      );

      if (user.role === 3) {
        NotificationEndpoint.postNotification(
          {
            user_id: user.clave,
            title: "Nuevo Comentario",
            description: user.name + " hizo un nuevo comentario",
            expediton_date: new Date(),
          },
          ""
        );
      }
    } catch (err) {
      console.log(err);
    }
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
