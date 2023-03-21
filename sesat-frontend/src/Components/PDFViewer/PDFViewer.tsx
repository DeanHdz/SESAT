import React from "react";
import { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";

/*Documentation: https://stackoverflow.com/questions/75104923/react-pdf-displaying-text-found-inside-the-pdf-instead-of-the-pdf-itself*/

/*pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`*/

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf/pdf.worker.js`;

export default function PDFViewer() {
  const [scale, setScale] = useState<number>(1);
  let finalScale;
  let scaleNumber = scale;
  if (Number.isNaN(scaleNumber)) scaleNumber = 1;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  function onSuccessLoadDoc(){
    let scalesm = 0.88;
    let scalemd = 1.1245;     

    if(windowWidth >= 1024) {
      setScale(1);   
    }else if(windowWidth >= 768){
      finalScale = (windowWidth*scalemd)/800;
      setScale(finalScale);
    }else if(windowWidth >= 640){
      finalScale = (windowWidth*scalesm)/640;
      setScale(finalScale);
    }  
  }

  return (
    <div className="justify-center">         
      <Document file="/pdf/sample.pdf">
        <Page pageNumber={1} scale={scaleNumber} onLoadSuccess={onSuccessLoadDoc}/>
      </Document>
    </div>
  );
}
