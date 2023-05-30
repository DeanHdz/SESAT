import { ViewMode, Worker } from "@react-pdf-viewer/core";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { SESAT } from "../../Interfaces/ISESAT";

/*Documentation: https://stackoverflow.com/questions/75104923/react-pdf-displaying-text-found-inside-the-pdf-instead-of-the-pdf-itself*/

{
  /*Muestra el PDF sin herramientas de visualizacion */
}

export default function SimplePDFViewer({
  asignacion,
}: {
  asignacion: SESAT.Asignacion;
}) {

  useEffect(() => {
    async function decodeBase64Async(jsonString: string) {
      var decodedBuffer: Uint8Array = await new Promise((resolve, reject) => {
        //Almacenar los atributos del objeto JSON en un arreglo
        var data = Object.values(jsonString);

        //Cargar el arreglo JSON a un ArrayBuffer
        const array = JSON.parse("[" + data[1] + "]");

        //character set UTF-8
        var base64 = new TextDecoder().decode(Uint8Array.from(array));

        //decodificar de base 64 a binario
        var decoded = new Uint8Array(decode(base64));

        if (decoded) {
          resolve(decoded);
        } else {
          reject(new Error("Failed to decode base64 string"));
        }
      });

      return decodedBuffer;
    }

  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={asignacion.documento as Uint8Array}
          viewMode={ViewMode.SinglePage}
          defaultScale={SpecialZoomLevel.PageFit}
        ></Viewer>
      </Worker>
    </>
  );
}
