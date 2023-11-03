'use client'

//Verificar PDF

import { useState } from "react";
import { encode } from "base64-arraybuffer";
import { Asignacion } from "../../../../../../types/ISESAT";
import { updateAsignacion } from "../../../../../../utils/asignacion.endpoint";
import { formatAsISODate } from "../../../../../../utils/utils";
import ProcessingAnim from "@/app/components/ProcessingAnim";

interface PDFUploadFormProps {
  asignacion: Asignacion,
  fecha_cierre: string
}

export const PDFUploadForm = (props: PDFUploadFormProps) => {
  const [fileSelected, setFileSelected] = useState<Blob | undefined>();
  const [idenfificador, setIdentificador] = useState("");
  const [isSubmiting, setIsSubmitting] = useState(false);

  let fecha_limite = new Date(props.fecha_cierre);

  function bytesToMegabytes(bytes: number): number {
    return bytes / 1024 / 1024;
  }

  //Nota: el archivo seleccionado requiere ser leido para obtener los datos binarios del contenido
  //El hecho de que esté seleccionado solo nos da los metadatos
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (fileSelected) {
        //Tamaño de archivo PDF
        const fileSize = fileSelected.size;
        const id = parseInt(idenfificador);
        //Extension del archivo (Debe ser PDF)
        const fileName = fileSelected.name;
        const fileExtension = fileName.split('.').pop();

        if (bytesToMegabytes(fileSize) > 30) {
          alert("Tamaño de archivo excede los 30MB.")
        }
        else if (fileExtension !== "pdf") {
          alert("Tipo de archivo no es admitido.")
        }
        else {

          //bytea
          var rdr = new FileReader();
          rdr.readAsArrayBuffer(fileSelected);
          //onload se ejecuta cuando el recurso termina de cargar          
          rdr.onload = async () => {
            var uint8View = new Uint8Array(rdr.result as ArrayBuffer);
            //Codificar a base64 antes de enviar        
            //const base64String = fromByteArray(uint8View);
            const base64String = encode(uint8View);
            //Proceso de actualizacion de asignacion
            setIsSubmitting(true);
            await updateAsignacion(
              {
                id_asignacion: props.asignacion.id_asignacion,
                id_formato_evaluacion: props.asignacion.id_formato_evaluacion,
                id_acta_evaluacion: props.asignacion.id_acta_evaluacion,
                id_tesis: props.asignacion.id_tesis,
                id_modalidad: props.asignacion.id_modalidad,
                id_periodo: props.asignacion.id_periodo,
                num_avance: props.asignacion.num_avance,
                titulo: props.asignacion.titulo,
                descripcion: props.asignacion.descripcion,
                fecha_entrega: new Date(props.asignacion.fecha_entrega),
                calificacion: props.asignacion.calificacion,
                documento: base64String,
                estado_entrega: 1, // Actualizar el estado de entrega a 1
                retroalimentacion: props.asignacion.retroalimentacion,
                tipo: props.asignacion.tipo,
                fecha_presentacion: new Date(props.asignacion.fecha_presentacion)
              }, "");
            setIsSubmitting(false);
            alert("El archivo PDF se ha subido.");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gray__border">
      <div>
         {props.asignacion.estado_entrega === 1 ? "Ya has entregado el avance" : "No has entregado el avance"}
      </div>

      {fecha_limite > new Date() ? (
        <>
          <input
            type="file"
            required
            className="file-input w-full mb-10 gray__border hover:border hover:border-[#003067]"
            onChange={(e) => {
              const uploadedFile = e.target.files?.[0];
              if (uploadedFile) {
                setFileSelected(uploadedFile);
              }
            }}
          />
          <button className="mt-10 mb-10 primary__btn" onClick={handleSubmit}>
            {isSubmiting ? (
              <ProcessingAnim title="" />
            ) : (
              "Enviar PDF"
            )
            }
          </button>
        </>
      ) : (
        <> </>
      )}

    </div>
  );
};

export default PDFUploadForm;
