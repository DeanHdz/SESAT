/*
"use client";

import { ReactElement } from "react";

import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useRouter } from "next/navigation";




export default function FullPDFViewer({ file }: { file: string | Uint8Array}) {
  const navigate = useRouter();
  function closePDFDocument() {
    navigate.back();
  }
  
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          CurrentPageInput,
          Download,
          EnterFullScreen,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          Print,          
          Zoom,
          ZoomIn,
          ZoomOut,
        } = slots;
        return (
          <div className="flex items-center w-full">
            
            <div className="px-0 py-[2px]">
              <ZoomOut />
            </div>
            <div className="px-0 py-[2px]">
              <Zoom />
            </div>
            <div className="px-0 py-[2px]">
              <ZoomIn />
            </div>
            <div className="px-0 py-[2px] ml-auto hidden lg:flex">
              <GoToPreviousPage />
            </div>
            <div className="px-0 py-[2px] w-10 hidden lg:flex md:w-14 lg:w-16">
              <CurrentPageInput />
            </div>
            <div className="px-0 py-[2px] ml-2 hidden lg:flex">
              / <NumberOfPages />
            </div>
            <div className="px-0 py-[2px] hidden lg:flex">
              <GoToNextPage />
            </div>
            <div className="px-0 py-[2px] ml-auto">
              <EnterFullScreen />
            </div>
            <div className="px-0 py-[2px]">
              <Download />
            </div>
            <div className="px-0 py-[2px] hidden lg:flex">
              <Print />
            </div>
            <div className="px-0 py-[2px]">
              <button
                onClick={closePDFDocument}
                className="bg-dark-blue-20 text-white text-[12px] mr-1 rounded border-none cursor-pointer 
                p-1"
              >
                Cerrar
              </button>
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  const layoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
  });

  return (
    
    <div className=" h-[550px] lg:h-[900px]">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
        <Viewer fileUrl={file} plugins={[layoutPluginInstance]}></Viewer>
      </Worker>
    </div>    
  );
}

*/
