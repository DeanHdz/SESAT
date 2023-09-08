import { useEffect, useState } from "react";

import { encode } from "base64-arraybuffer";
import { Asignacion } from "@/types/ISESAT";

const AssignmentInfoBlock = ({
  asignacion,
}: {
  asignacion: Asignacion;
}) => {
  const [fileSelected, setFileSelected] = useState<Blob | undefined>();
  const [idenfificador, setIdentificador] = useState("");

  //Nota: el archivo seleccionado requiere ser leido para obtener los datos binarios del contenido
  //El hecho de que esté seleccionado solo nos da los metadatos
  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      if (fileSelected) {
        //bytea
        var rdr = new FileReader();
        rdr.readAsArrayBuffer(fileSelected);
        //onload se ejecuta cuando el recurso termina de cargar
        rdr.onload = async () => {
          var uint8View = new Uint8Array(rdr.result as ArrayBuffer);
          //Codificar a base64 antes de enviar
          //const base64String = fromByteArray(uint8View);
          const base64String = encode(uint8View);
          console.log(base64String);
          /*
          const resp = await AsignacionEndpoint.putAsignacion(
            {
              id_asignacion: asignacion.id_asignacion,
              num_avance: asignacion.num_avance,
              titulo: asignacion.titulo,
              descripcion: asignacion.descripcion,
              apertura: asignacion.apertura,
              cierre: asignacion.cierre,
              calificacion: asignacion.calificacion,
              documento: base64String,
              estado_entrega: 1,
              retroalimentacion: asignacion.retroalimentacion,
              id_formato_evaluacion: asignacion.id_formato_evaluacion,
              id_acta_evaluacion: asignacion.id_acta_evaluacion,
            },
            ""
          );
          if (resp) {
            console.log("PDF guardado en la base de datos");
          }*/
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="">
      <article className="prose">
        <h1 className="font-SESAT mt-2">{asignacion.titulo}</h1>
        <h3 className="ml-4">{asignacion.descripcion}</h3>
      </article>
      <div className=" mt-4 w-full bg-[#f8f9fa] shadow-md px-6 py-6">
        <div className="pt-[7px]">
          <button className="btn bg-[#8c969f] border-transparent w-1/8 h-[30px]">
            Marcar como hecho
          </button>
        </div>
        <div className="divider mt-2 mb-2"></div>
        <div className="font-bold">
          Abierto:{" "}
          <span className="font-normal text-gray-500">
            {" "}
            {asignacion.apertura.toLocaleString()}{" "}
          </span>
        </div>
        <div className="font-bold mt-2">
          Pendiente:{" "}
          <span className="font-normal text-gray-500">
            {" "}
            {asignacion.cierre.toLocaleString()}{" "}
          </span>
        </div>
        <div className="divider mt-2 mb-2"></div>
        <button className="btn no-animation bg-[#f9c107] border-transparent w-1/8 h-[30px] hover:bg-[#f9c107] hover:border-transparent text-gray-700 hover:cursor-default">
          {asignacion?.estado_entrega}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          required
          className="file-input w-full mb-10 hover:border hover:border-[#003067]"
          onChange={(e) => {
            const uploadedFile = e.target.files?.[0];
            if (uploadedFile) {
              setFileSelected(uploadedFile);
            }
          }}
        />
        <div className="w-full flex justify-center items-center mb-8">
          <button type="submit" className="btn shadow rounded">
            Subir documento
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentInfoBlock;
