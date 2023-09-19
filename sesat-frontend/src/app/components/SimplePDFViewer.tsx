"use client";

/*Documentation: https://stackoverflow.com/questions/75104923/react-pdf-displaying-text-found-inside-the-pdf-instead-of-the-pdf-itself*/

{/*Muestra el PDF sin herramientas de visualizacion */ }

{/*Errores generados y solucionados a partir del cambio de Vite a Next 

  El proyecto no compiló al intentar usar react-pdf-viewer con Next.js
  Mensaje de la consola:
  -------------------------------------------------------------------------------------------------------------------------------
  error ./node_modules/canvas/build/Release/canvas.node Module parse failed: 
  Unexpected character ' ' (1:2) 
  You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. 
  See https://webpack.js.org/concepts#loaders
  -------------------------------------------------------------------------------------------------------------------------------
  Solución
  https://stackoverflow.com/questions/75986060/getting-errorunexpected-character-12-while-working-fabric-js-in-next-js

  Resumen: 
  Reacf-PDF-Viewer se compila a traves de Webpack, Generalmente hay un archivo 'webpack.config.js' donde se define la
  configuracion, en el caso de Next.js lo oculta 'por simplicidad' y solo muestra el archivo 'next.config.js'
  Para solucionar el error, se agregó lo siguiente al archivo 'next.config.js':

  webpack: (config) => { 
        config.externals.push({ 
            sharp: 'commonjs sharp', 
            canvas: 'commonjs canvas' 
        }) 
        return config 
    }

*/}

{/**
  En caso de que aparezca el error:  The API version "2.6.347" does not match the Worker version "2.1.266"
  https://react-pdf-viewer.dev/examples/compile-and-set-the-worker-source-with-webpack/ 
  
  Solucion rapida: reemplazar el numero de la version en la variable workerUrl definida ABAJO
  debe coincidir con el de la API
  */
}





export default function SimplePDFViewer() {

  return (
    <>
    {/*
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
        <Viewer
          fileUrl="/pdf/sample.pdf"
          viewMode={ViewMode.SinglePage}
          defaultScale={SpecialZoomLevel.PageFit}></Viewer>
      </Worker>
    */}
    </>

  );
}