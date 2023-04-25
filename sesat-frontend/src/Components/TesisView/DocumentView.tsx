
import { IModalData } from "../../Interfaces/IModalData";
import FullPDFViewer from "../PDFViewer/FullPDFViewer";
import { ActaEvaluacion_Endpoint } from "../../api/acta-evaluacion.endpoint";
import { TesisEndpoint } from "../../api/tesis.endpoint";
import { decode } from "base64-arraybuffer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const modalData: IModalData = {
  title: "Imprimir documento",
  message:
    "Atención: Considere que el cambio no se aplicará al documento debido a limitaciones del sistema. Actualize el archivo PDF para evitar incongruencias con los datos.",
};

/*const [isModalOpen, setModalState] = React.useState(false);
const toggleModal = () => setModalState(!isModalOpen);*/

const DocumentView = ({
  titulo,
  fecha,
  autor,
}: {
  titulo: string;
  fecha: string;
  autor: string;
}) => {
  //Son tres tablas el objetivo de consulta:
  //acta_evaluacion     -->acta
  //formato_evaluacion  -->formato
  //asignacion          -->tesis

  const location = useLocation();
  const id_asignacion: string = location.state.id_assign;
  const pdfType: string = location.state.pdfType;
  const [pdfFile, setPdfFile] = useState<Uint8Array | null>(null);

  {
    /*Esta funcion se ejecuta cada vez que el comp. se renderiza */
  }
  useEffect(() => {

    async function decodeBase64Async(encodedString: string) {
      console.log(encodedString);
      const decodedBuffer: ArrayBuffer = await new Promise((resolve, reject) => {
        const decoded = decode(encodedString);        
        if (decoded) {
          resolve(decoded);                    
        } else {
          reject(new Error("Failed to decode base64 string"));
        }
      });
      
      const uint8Array = new Uint8Array(decodedBuffer);
      return uint8Array;
    }

    async function requestFormato() {}

    async function requestTesis() {
      if (id_asignacion) {
        try {
          //falta crear el endpoint de asignacion, [no es tesis]
          //falta crear dtos asignacion en backend
          const resp = await TesisEndpoint.getTesis(
            parseInt(id_asignacion),
            ""
          );
          if (resp) {
          }
        } catch (error) {}
      }
    }

    async function requestActa() {
      if (id_asignacion) {
        try {
          const resp = await ActaEvaluacion_Endpoint.getActa(100, "");

          const base64str = "";

          //console.log(resp?.documento_rellenado);
          var base64string: string = resp?.documento_rellenado || "No pdf file";          
          
          decodeBase64Async(base64string)
            .then((decodedBuffer) => {
              // Use the decoded buffer
              //const uint8Array = new Uint8Array(decodedBuffer);
              console.log("Tamaño: " + decodedBuffer.byteLength);
              setPdfFile(decodedBuffer);
            })
            .catch((error) => {
              // Handle any errors
              console.error(error);
            });

        } catch (error) {
          console.log(error);
        }
      }
    }

    if (pdfType) {
      console.log("PDF:", pdfType);
      switch (pdfType.toString()) {
        case "1":
          //formato
          requestFormato();
          break;
        case "2":
          //acta
          console.log("PDFTYPE:", pdfType);
          requestActa();
          break;
        case "3":
          //tesis
          requestTesis();
          break;
      }
    }
  }, []);

  if (pdfFile) {
    console.log("PDF");
    return (
      <div className="block lg:flex lg:flex-row w-screen justify-center">
        <div className="block w-11/12 m-auto lg:px-6 py-10">
          <div className="pt-3 pb-3 px-3 m-auto w-11/12 h-fit lg:px-4 lg:py-4 bg-light-blue-10 rounded">
            <FullPDFViewer file={pdfFile} />
          </div>
        </div>
      </div>
    );
  } else {
    console.log("Spinner");
    return <div className="spinner" />;
  }
};
export default DocumentView;
