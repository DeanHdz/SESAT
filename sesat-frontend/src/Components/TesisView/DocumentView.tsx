
import FullPDFViewer from "../PDFViewer/FullPDFViewer";
//import { ActaEvaluacion_Endpoint } from "../../api/acta-evaluacion.endpoint";
import { TesisEndpoint } from "../../api/tesis.endpoint";
import { decode } from "base64-arraybuffer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProcessingAnim from "../ProcessingAnim/ProcessingAnim";

//Solucion a error: Invalid root reference
//Causa: Falta endobj -> docfly esta generando mal el pdf con los campos de formulario
//Para react pdf el documento está corrupto
//https://github.com/Hopding/pdf-lib/issues/951

//Tablas objetivo de consulta:
//acta_evaluacion     -->acta
//formato_evaluacion  -->formato
//asignacion          -->tesis

const DocumentView = () => {

  /*
  const [pdfFile, setPdfFile] = useState<Uint8Array | null>(null);
  const location = useLocation();
  const id_assign: string =location.state.id_assign; //  "102"; //
  const pdfType: string = location.state.pdfType; //"2"; //
  */
  


  
    /*Esta funcion se ejecuta cada vez que el componente se renderiza */
  /*
  useEffect(() => {


    async function decodeBase64Async(jsonString: string) {

      var decodedBuffer: Uint8Array = await new Promise((resolve, reject) => {
        //Almacenar los atributos del objeto JSON en un arreglo
        var data = Object.values(jsonString);

        //Cargar el arreglo JSON a un ArrayBuffer
        const array = JSON.parse('[' + data[1] + ']');

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

    async function requestFormato() { }

    async function requestTesis() {
      if (id_assign) {
        try {
          //falta crear el endpoint de asignacion, [no es tesis]
          //falta crear dtos asignacion en backend
          const resp = await TesisEndpoint.getTesis(
            parseInt(id_assign),
            ""
          );
          if (resp) {
          }
        } catch (error) { }
      }
    }

    //Documentacion:
    {/**
        **Convertir string base 64 a PDF:
            https://www.ipvoid.com/base64-to-pdf/
        **[object, object] in JavaScript – Meaning in JS
            https://www.freecodecamp.org/news/object-object-in-javascript-meaning-in-js/
        **JSON Parse:
            https://www.w3schools.com/js/js_json_parse.asp

   }*/
   /*
    async function requestActa() {
      if (id_assign) {
        try {
          console.log('Datos:');
          console.log(parseInt(id_assign));
          console.log(pdfType);
          var resp = await ActaEvaluacion_Endpoint.getActa(parseInt(id_assign), "");
          if (resp) {
            //resp.documento_rellenado: {"type":"Buffer","data":[......]}            

            decodeBase64Async(resp.documento_rellenado)
              .then((decodedBuffer) => {                
                setPdfFile(decodedBuffer);
              })
          }

        } catch (error) {
          console.log(error);
        }
      }
    }

    if (pdfType) {      
      switch (pdfType.toString()) {
        case "1":
          //formato
          requestFormato();
          break;
        case "2":
          //acta          
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
    return (
      <div className="block lg:flex lg:flex-row w-screen justify-center" >
        <div className="block w-11/12 m-auto lg:px-6 py-10">
          <div className="pt-3 pb-3 px-3 m-auto w-11/12 h-fit lg:px-4 lg:py-4 bg-light-blue-10 rounded">
            <FullPDFViewer file={pdfFile} />
          </div>
        </div>
      </div>
    );

  } else {
    return (
      <ProcessingAnim title="Procesando..."/>
    );

  }*/
};
export default DocumentView;
