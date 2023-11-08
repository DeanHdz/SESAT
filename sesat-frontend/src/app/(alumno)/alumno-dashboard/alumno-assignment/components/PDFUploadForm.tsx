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
import { fetchLatestPeriod } from "../../../../../../utils/periodo.endpoint";

interface PDFUploadFormProps {
  asignacion: Asignacion;
  fecha_cierre: string;
  server_time: string;
}

export const PDFUploadForm = (props: PDFUploadFormProps) => {
  const cookie = Cookies.get("SESATsession");
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const [fileSelected, setFileSelected] = useState<Blob | undefined>();
  const [buffer, setBuffer] = useState<Array<number> | undefined>(undefined);
  const [base64, setBase64] = useState<string>("");
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cssDisabled, setCSSDisabled] = useState("")
  const [cssError, setCssError] = useState("hidden")
  const [cssOk, setCssOk] = useState("hidden")
  const [msg, setmsg] = useState("")

  let fecha_limite = new Date(props.fecha_cierre);
  let fecha_actual = new Date(props.server_time);
  let evaluacion_realizada = props.asignacion.calificacion && props.asignacion.id_acta_evaluacion && props.asignacion.id_formato_evaluacion;
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
      }
      else if (fileExtension !== "pdf") {
        setmsg("Solo se permiten archivos en formato PDF");
        setCSSDisabled("opacity-50 pointer-events-none cursor-not-allowed")
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

  function setDefaultState() {
    if (editMode) {//se hizo click en cancelar
      setCssError("hidden");
    } else {//se hizo click en editar
      setCssOk("hidden");
      setBuffer(undefined);
      setCSSDisabled("opacity-50 pointer-events-none cursor-not-allowed");
    }
    setEditMode(!editMode)
  }

  //Nota: el archivo seleccionado requiere ser leido para obtener los datos binarios del contenido
  //El hecho de que esté seleccionado solo nos da los metadatos
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      let periodo = await fetchLatestPeriod(token).catch();
      if (periodo.fecha_cierre > periodo.server_time) {
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
              fecha_presentacion: props.asignacion.fecha_presentacion
            }, token).catch(() => {
              setIsSubmitting(false)
              setmsg("Algo salió mal")
              setCssError("")
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
          setEditMode(false)
          setIsSubmitting(false);
          setmsg("El documento se guardó correctamente")
          setCssOk("")
          setCssError("hidden")
        } else {
          setmsg("Selecciona un archivo para entregar")
          setCssError("")
        }
      } else {
        setmsg("La fecha de entrega ha vencido")
        setCssError("")
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

      <div className={`px-6 py-3 mb-3 flex ${editMode && 'flex-col'}  lg:flex-row lg:items-center text-xl font-semibold border-b`}>
        <span>
          {props.asignacion.estado_entrega === 0 ? 'Subir un documento' : 'Avance de tesis entregado'}
        </span>
        <>
          {!evaluacion_realizada ? (
            <div className="ml-auto w-fit">
              {
                props.asignacion.estado_entrega === 0 && fecha_limite > fecha_actual ? (
                  <button className={`btn btn-sm px-6 ${cssDisabled}`} onClick={handleSubmit}>
                    {isSubmiting ? (
                      <ProcessingAnim title="" />
                    ) : (
                      "Entregar"
                    )
                    }
                  </button>
                ) : (
                  <>
                    {fecha_limite > fecha_actual && (
                      <div className={`flex flex-row ${editMode && 'mt-3'} lg:mt-0`}>
                        <button className={`ml-auto btn btn-sm px-6`} onClick={setDefaultState}>
                          {editMode ? 'Cancelar' : 'Editar'}
                        </button>

                        <button className={`ml-3 btn btn-sm px-6 ${cssDisabled} ${editMode ? '' : 'hidden'}`} onClick={handleSubmit}>
                          {isSubmiting ? (
                            <ProcessingAnim title="" />
                          ) : (
                            "Actualizar documento"
                          )
                          }
                        </button>
                      </div>
                    )}
                  </>
                )
              }
            </div>
          ) : null}
        </>
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
            {props.asignacion.estado_entrega === 1 && (
              <div className="flex flex-row">
                <div className="flex flex-col mr-6">
                  <span className="font-SESAT">Fecha de entrega</span>
                  <p>{`${shortFormatDate(props.asignacion.fecha_entrega)} ${getFormattedHours(new Date(props.asignacion.fecha_entrega))}`}</p>
                </div>
                <PDFModal pdfdocument={props.asignacion.documento.data} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PDFUploadForm;
