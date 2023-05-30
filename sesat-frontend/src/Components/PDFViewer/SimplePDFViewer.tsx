import { ViewMode, Worker } from "@react-pdf-viewer/core";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { SESAT } from "../../Interfaces/ISESAT";
import { useEffect, useState } from "react";
import { decode, encode } from "base64-arraybuffer";
import ProcessingAnim from "../ProcessingAnim/ProcessingAnim";
/*Documentation: https://stackoverflow.com/questions/75104923/react-pdf-displaying-text-found-inside-the-pdf-instead-of-the-pdf-itself*/

{
  /*Muestra el PDF sin herramientas de visualizacion */
}

export default function SimplePDFViewer({asignacion}: {asignacion: SESAT.Asignacion}) 
{
  const [pdfFile, setPdfFile] = useState<Uint8Array | null>(null);
 
  console.log(asignacion.documento);

  useEffect(() => 
  {
    async function decodeBase64Async(jsonString: string) {
      var decodedBuffer: Uint8Array = await new Promise((resolve, reject) => {
        
        const myBuffer = Buffer.from(asignacion.documento, 'base64');

        //character set UTF-8
        var base64 = new TextDecoder().decode(Uint8Array.from(myBuffer));

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

    decodeBase64Async(asignacion.documento).then(
      (decodedBuffer) => {
        setPdfFile(decodedBuffer);
      }
    );    
 
  }, []);

  if (pdfFile) {
  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={pdfFile} //pdffile
          viewMode={ViewMode.SinglePage}
          defaultScale={SpecialZoomLevel.PageFit}
        ></Viewer>
      </Worker>
    </>
  );
  }
  else{
    return <ProcessingAnim title="Procesando..." />
  }
  
}
