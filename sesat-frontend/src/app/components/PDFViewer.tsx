"use client";
import { decode } from 'base64-arraybuffer';
import React, { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import ProcessingAnim from './ProcessingAnim';

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

const PDFViewer = ({
    buffer,
}: {
    buffer: Uint8Array
}) => {

    try {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.js',
            import.meta.url,
        ).toString();

        const [pdf, setPdf] = useState<string | File>("")
        const [blobURL, setBlobURL] = useState<string>("")
        const [scale, setScale] = useState<number>(1.5);
        const [scaleText, setScaleText] = useState<string>("150%");

        const [numPages, setNumPages] = useState<number>(1);
        const [pageNumber, setPageNumber] = useState<number>(1);
        const pageRefs = useRef(new Array())


        const increaseZoom = () => {
            if (scale + 0.25 <= 3) {
                setScale(scale + 0.25)
            }
        };

        const decreaseZoom = () => {
            if (scale - 0.25 >= 0.5) {
                setScale(scale - 0.25)
            }
        };

        const navigateToPage = (index: number) => {
            if (pageRefs.current[index]) {
                pageRefs.current[index].scrollIntoView()
            }
        };

        const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
            setNumPages(numPages);
        };

        const handleKeyDown = (e: any) => {

            if (e.key === 'Enter' && pageNumber >= 0 && pageNumber < numPages) {
                navigateToPage(pageNumber);
            }
        };

        const handleOnChangeInput = (e: any) => {

            const pageIndex = parseInt(e.target.value) - 1

            if (pageIndex >= 0 && pageIndex < numPages) {
                setPageNumber(pageIndex);
            } else {
                setPageNumber(-1)
            }
        };

        {/**To update Zoom Label, executed on scale changes */ }
        useEffect(() => {
            setScaleText((scale * 100).toString() + '%')
        }, [scale])


        useEffect(() => {
            const decodeAndSetPDF = () => {
                //Decode to UTF-8 char set
                var base64 = new TextDecoder().decode(buffer);

                //Decode from base 64 to binary
                const doc = new Uint8Array(decode(base64))
                //Create a File Object using the binary data from the Uint8Array
                const file = new File([doc], "Documento-de-tesis.pdf", { type: "application/pdf" });

                setPdf(file)

                //Data ready to download pdf
                const blob = new Blob([doc], { type: "application/pdf" });

                //Local URL to save PDF file using an <a><a/> TAG
                setBlobURL(URL.createObjectURL(blob))
            }

            decodeAndSetPDF();

        }, [])


        return (
            <div className='w-full'>
                {/**Document Toolbar */}
                <div className='sticky__toolbar text-[#5f5f5f] px-3 flex items-center w-full border border-solid border-slate-300/80 h-[50px] bg-[#eeeeee]'>
                    {/**Zoom In */}
                    <div className='w-[22px] cursor-pointer' onClick={increaseZoom}>
                        <svg stroke="currentColor" fill="#5f5f5f" strokeWidth="0" viewBox="0 0 1024 1024" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg"><path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>
                    </div>
                    {/**Zoom Label */}
                    <span className='no-select cursor-default text-[14px] mx-3'>{scaleText}</span>

                    {/**Zoom Out */}
                    <div className='w-[22px] cursor-pointer' onClick={decreaseZoom}>
                        <svg stroke="currentColor" fill="#5f5f5f" strokeWidth="0" viewBox="0 0 1024 1024" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg"><path d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>
                    </div>

                    {/**Buscador de página */}
                    <input min={1} max={numPages} type="number" onChange={handleOnChangeInput} onKeyDown={handleKeyDown} placeholder='pág.' className='ml-auto w-[80px] rounded border-[#5f5f5f]/30 border border-solid px-3 text-center text-[14px] py-1' />
                    <span className='text-[14px] mx-3 mr-auto'>{`/ ${numPages}`}</span>

                    {/**Descargar */}
                    <a href={blobURL} download="filename.pdf">
                        <div className='ml-3 w-[22px] cursor-pointer'>
                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </div>
                    </a>

                </div>

                {/**Document Container */}
                <div className='w-full border-t-0 border border-solid border-slate-300/80 h-[750px] overflow-y-hidden'>
                    <center>

                        <div className="z-10 h-[750px] overflow-y-scroll px-3 bg-slate-100">

                            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess} loading={<ProcessingAnim title='Cargando documento...' />}>

                                <div className='h-fit overflow-y-hidden flex flex-col items-center justify-center bg-slate-100'>


                                    {Array.from(new Array(numPages), (el, index) => (
                                        <Page inputRef={(element) => pageRefs.current.push(element)} key={`page_${index + 1}`} pageNumber={index + 1} scale={scale} />
                                    ))}


                                </div>

                            </Document>

                        </div>



                    </center>


                </div>

            </div>
        )
    } catch (error) {
        alert("Ha ocurrido un error al cargar el documento, intente recargar la página")
    }
}

export default PDFViewer