
import { ViewMode, Worker } from "@react-pdf-viewer/core";
import { Viewer, SpecialZoomLevel} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

/*Documentation: https://stackoverflow.com/questions/75104923/react-pdf-displaying-text-found-inside-the-pdf-instead-of-the-pdf-itself*/


{/*Muestra el PDF sin herramientas de visualizacion */}

export default function SimplePDFViewer() {        
  const testFile = "/pdf/descargaA.pdf";
  return (          
    <div className="h-[750px]">               
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl="/pdf/sample.pdf" viewMode={ViewMode.SinglePage} defaultScale={SpecialZoomLevel.PageFit}></Viewer>
      </Worker>
      
    </div>    
  );
}
