import { useEffect, useState } from "react";
import { UploadPDF_Endpoint } from "../../api/uploadpdf.enpoint";
import { encode } from "base64-arraybuffer";

export const PDFUploadForm = () => {
  const [fileSelected, setFileSelected] = useState<Blob | undefined>();
  const [idenfificador, setIdentificador] = useState("");

  //Nota: el archivo seleccionado requiere ser leido para obtener los datos binarios del contenido
  //El hecho de que esté seleccionado solo nos da los metadatos
  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      if (fileSelected) {

        var rdr = new FileReader();
        rdr.readAsArrayBuffer(fileSelected);        
        //onload se ejecuta cuando el recurso termina de cargar          
        rdr.onload = async () => { 
          var uint8View = new Uint8Array(rdr.result as ArrayBuffer);  
          //Codificar a base64 antes de enviar        
          const base64String = encode(uint8View);
          console.log(base64String);
          const resp = await UploadPDF_Endpoint.postPDF(
            {
              id_formatos: parseInt(idenfificador),
              acta_evaluacion: base64String,
            },
            ""
          );
          if (resp) {
            console.log("PDF guardado en la base de datos");
          }          
        };
      }
    } catch (error) {
      console.log(error);
    }    
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row w-screen">
        <div className="w-3/6 rounded m-auto mb-20 bg-light-blue-10">
          <div className="flex flex-col mt-10 ">
            <div className="w-5/6 m-auto">
              <label className="mb-3 block text-lg font-bold">
                Identificador
              </label>

              <input
                className="h-1/4 py-2 px-10 shadow appearance-none rounded w-full mb-10"
                type="text"
                placeholder="AAAA"
                required
                value={idenfificador}
                onChange={(e) => {
                  setIdentificador(e.target.value);
                }}
              />
              <label className="mb-3 block text-lg font-bold">
                Formato 1(Acta de evaluación)
              </label>
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
                <button className="btn shadow rounded">Subir documento</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PDFUploadForm;
