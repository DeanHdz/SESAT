"use client";
import { decode } from 'base64-arraybuffer';
import React, { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import ProcessingAnim from '@/app/components/ProcessingAnim';

{/**
PDF VIEWER
Recibe un PDF en forma de buffer de datos codificados en base64
Permite ver y guardar localmente el PDF

Docs:
React-PDF
https://www.npmjs.com/package/react-pdf

Buscador de pagina
https://mattclaffey.medium.com/adding-react-refs-to-an-array-of-items-96e9a12ab40c

Cada pagina tiene asignado un indice del arreglo pageRefs para hacer scroll con scrollIntoView() a cada pagina con la referencia. Ver prop inputRef de react-pdf

Nota: react-pdf tiene dos props para implementar esta funcion canvasRef o inputRef, ambas hacen lo mismo solo que canvasRef no funciona a la par con la propiedad scale, cuando scale se modifica, se destruye el arreglo de referencias, lo que causa una excepcion

Zoom In/Out:
Ver documentacion de react pdf, prop scale


*/}

const PDFPreview = ({
    buffer,
}: {
    buffer: Array<number>
}) => {
    try {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.js',
            import.meta.url,
        ).toString();

        const [pdf, setPdf] = useState<string | File>("")                


        useEffect(() => {
            const decodeAndSetPDF = () => {
                try {
                    var base64 = new TextDecoder().decode(new Uint8Array(buffer));

                    //Decode from base 64 to binary
                    const doc = new Uint8Array(decode(base64))
                    //Create a File Object using the binary data from the Uint8Array
                    const file = new File([doc], "Documento-de-tesis.pdf", { type: "application/pdf" });

                    setPdf(file)                                                                                

                } catch (error) {
                    return null;
                }
            }

            decodeAndSetPDF();

        }, [])


        return (
            <div className='w-full flex flex-col h-fit'>

                <center>

                    <div className="z-10 w-fit h-fit gray__border shadow-lg shadow-black/30 overflow-x-hidden bg-slate-100 no-scrollbar">

                        <Document file={pdf}  loading={<ProcessingAnim title='Cargando documento...' />}>

                            <div className='h-fit overflow-hidden flex flex-col items-center justify-center bg-slate-100'>


                                <Page key={`page_1`} pageNumber={1} scale={0.8} />


                            </div>

                        </Document>

                    </div>

                </center>

            </div>
        )
    } catch (error) {
        alert("Ha ocurrido un error al cargar el documento, intente recargar la página")
    }
}

export default PDFPreview