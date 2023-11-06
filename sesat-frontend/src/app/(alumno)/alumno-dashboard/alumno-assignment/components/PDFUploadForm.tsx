"use client";
import { useEffect, useState } from "react";
import { encode } from "base64-arraybuffer";
import { Asignacion, Comite, LoggedUser } from "../../../../../../types/ISESAT";
import { updateAsignacion } from "../../../../../../utils/asignacion.endpoint";
import ProcessingAnim from "@/app/components/ProcessingAnim";
import PDFPreview from "@/app/(asesor)/asesor-dashboard/asesor-assignment/components/PDFPreview";
import PDFModal from "@/app/(asesor)/asesor-dashboard/asesor-assignment/components/PDFModal";
import {
  formatAsISODate,
  getFormattedHours,
  shortFormatDate,
} from "../../../../../../utils/utils";
import { useRouter } from "next/navigation";
import { postNotificacion } from "../../../../../../utils/notification.endpoint";
import { fetchComiteByIDTesis } from "../../../../../../utils/comite.endpoint";
import Cookies from "js-cookie";
import { LoginEndpoint } from "../../../../../../utils/login.endpoint";

interface PDFUploadFormProps {
  asignacion: Asignacion;
  fecha_cierre: string;
}

export const PDFUploadForm = (props: PDFUploadFormProps) => {
  const cookie = Cookies.get("SESATsession");
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const [fileSelected, setFileSelected] = useState<Blob | undefined>();
  const [buffer, setBuffer] = useState<Array<number> | undefined>(undefined);
  const [base64, setBase64] = useState<string>("");
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [hideEditBtn, setHideEditBtn] = useState(false);
  const [cssDisabled, setCSSDisabled] = useState("");
  const [cssError, setCssError] = useState("hidden");
  const [cssOk, setCssOk] = useState("hidden");
  const [msg, setmsg] = useState("");

  let fecha_limite = new Date(props.fecha_cierre);
  const router = useRouter();

  function bytesToMegabytes(bytes: number): number {
    return bytes / 1024 / 1024;
  }

  function readLocalDocument() {
    if (fileSelected) {
      setCssError("hidden");
      setCSSDisabled("");
      setBuffer(undefined);
      //Tamaño de archivo PDF
      const fileSize = fileSelected.size;

      //Extension del archivo (Debe ser PDF)
      const fileName = fileSelected.name;
      const fileExtension = fileName.split(".").pop();

      if (bytesToMegabytes(fileSize) > 30) {
        setmsg("Tamaño de archivo excede el límite permitido (30MB)");
        setCSSDisabled("opacity-50 pointer-events-none cursor-not-allowed");
        setCssError("");
      } else if (fileExtension !== "pdf") {
        setmsg("Solo puedes subir documentos PDF");
        setCSSDisabled("opacity-50 pointer-events-none cursor-not-allowed");
        setCssError("");
      } else {
        var rdr = new FileReader();
        rdr.readAsArrayBuffer(fileSelected);

        rdr.onload = async () => {
          var uint8View = new Uint8Array(rdr.result as ArrayBuffer);
          const base64String = encode(uint8View);
          let buf = await Buffer.from(base64String);
          await setBase64(base64String);
          await setBuffer(Array.from(buf));
        };
      }
    }
  }

  //Nota: el archivo seleccionado requiere ser leido para obtener los datos binarios del contenido
  //El hecho de que esté seleccionado solo nos da los metadatos
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (fileSelected) {
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
            fecha_entrega: formatAsISODate(new Date()),
            calificacion: props.asignacion.calificacion,
            documento: base64,
            estado_entrega: 1, // Actualizar el estado de entrega a 1
            retroalimentacion: props.asignacion.retroalimentacion,
            tipo: props.asignacion.tipo,
            fecha_presentacion: props.asignacion.fecha_presentacion,
          },
          token
        ).catch(() => {
          setIsSubmitting(false);
          setmsg("Algo salió mal");
          setCssError("");
        });
        let comite: Comite[] = await fetchComiteByIDTesis(
          props.asignacion.id_tesis,
          token
        );
        let user: LoggedUser = await LoginEndpoint.getUserInfo(token);
        console.log(user);
        comite.forEach(async (member) => {
          await postNotificacion(
            {
              id_usuario: member.id_usuario,
              titulo: "Asignacion entregada",
              descripcion: `El alumno ${user.nombre} ${user.apellido_paterno} ${user.apellido_materno} ha entregado la asignación ${props.asignacion.titulo}`,
              fecha_expedicion: formatAsISODate(new Date()),
            },
            token
          );
        });
        router.refresh();
        setEditMode(false);
        setIsSubmitting(false);
        setmsg("El documento se guardó correctamente");
        setCssOk("");
        setCssError("hidden");
      } else {
        setmsg("Selecciona un documento");
        setCssError("");
      }
      //alert("El archivo PDF se ha subido.");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    readLocalDocument();
  }, [fileSelected]);

  return (
    <div className="w-full h-fit mt-6 mb-10 gray__border">
      <div className="px-6 py-3 mb-3 flex flex-col lg:flex-row items-center text-xl font-semibold border-b">
        <span>
          {props.asignacion.estado_entrega === 0
            ? "Subir un documento"
            : "Avance de tesis entregado"}
        </span>
        {props.asignacion.estado_entrega === 0 ? (
          <button
            className={`ml-auto primary__btn_sm ${cssDisabled}`}
            onClick={handleSubmit}
          >
            {isSubmiting ? <ProcessingAnim title="" /> : "Entregar"}
          </button>
        ) : (
          <button
            className={`ml-auto btn btn-sm px-6`}
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            {editMode ? "Cancelar" : "Editar"}
          </button>
        )}
      </div>
      <div className="w-full flex flex-col h-fit px-6 pb-10">
        <div
          className={`font-SESAT rounded-md w-full p-3 my-3 bg-red-100 ${cssError}`}
        >
          {msg}
        </div>
        <div
          className={`font-SESAT rounded-md w-full p-3 my-3 bg-blue-100 ${cssOk}`}
        >
          {msg}
        </div>
        {props.asignacion.estado_entrega === 0 || editMode ? (
          <>
            <div className={`w-full mb-3`}>
              <input
                type="file"
                required
                className="file-input bg-light-blue-15 w-full mb-10 gray__border hover:border hover:border-[#003067]"
                onChange={async (e) => {
                  const uploadedFile = e.target.files?.[0];
                  if (uploadedFile) {
                    await setFileSelected(uploadedFile);
                  }
                }}
              />
            </div>
            <div className="w-full flex items-center justify-center">
              {buffer && <PDFPreview buffer={buffer} />}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row">
              <div className="flex flex-col mr-6">
                <span className="font-SESAT">Fecha de entrega</span>
                <p>{`${shortFormatDate(
                  props.asignacion.fecha_entrega
                )} ${getFormattedHours(
                  new Date(props.asignacion.fecha_entrega)
                )}`}</p>
              </div>
              <PDFModal pdfdocument={props.asignacion.documento.data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PDFUploadForm;
