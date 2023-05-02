import { ReactElement } from "react";

import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useNavigate } from "react-router";


export default function FullPDFViewer({ file }: { file: string | Uint8Array}) {
  const navigate = useNavigate();
  function closePDFDocument() {
    navigate("/view_tesis");
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
          ShowSearchPopover,
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
            <div className="px-0 py-[2px] ml-auto">
              <GoToPreviousPage />
            </div>
            <div className="px-0 py-[2px] w-10 md:w-14 lg:w-16">
              <CurrentPageInput />
            </div>
            <div className="px-0 py-[2px] ml-2">
              / <NumberOfPages />
            </div>
            <div className="px-0 py-[2px]">
              <GoToNextPage />
            </div>
            <div className="px-0 py-[2px] ml-auto">
              <ShowSearchPopover />
            </div>
            <div className="px-0 py-[2px]">
              <EnterFullScreen />
            </div>
            <div className="px-0 py-[2px]">
              <Download />
            </div>
            <div className="px-0 py-[2px]">
              <Print />
            </div>
            <div className="px-0 py-[2px]">
              <button
                onClick={closePDFDocument}
                className="bg-dark-blue-20 text-white text-[12px] mr-1 rounded border-none cursor-pointer p-1"
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
    
    <div className="h-[1200px]">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={file} plugins={[layoutPluginInstance]}></Viewer>
      </Worker>
    </div>    
  );
}
