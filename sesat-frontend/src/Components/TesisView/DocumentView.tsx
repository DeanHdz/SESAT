import PDFViewer from "../PDFViewer/PDFViewer";
import React from "react";
import { Modal } from "../Modal/Modal";
import { IModalData } from "../../Interfaces/IModalData";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import FullPDFViewer from "../PDFViewer/FullPDFViewer";


const modalData: IModalData = {
  title: "Imprimir documento",
  message:
    "Atención: Considere que el cambio no se aplicará al documento debido a limitaciones del sistema. Actualize el archivo PDF para evitar incongruencias con los datos.",
};

/*const [isModalOpen, setModalState] = React.useState(false);
const toggleModal = () => setModalState(!isModalOpen);*/

const DocumentView = ({
  titulo,
  fecha,
  autor,
}: {
  titulo: string;
  fecha: string;
  autor: string;
}) => {
  return (
    <div className="block lg:flex lg:flex-row w-screen justify-center">
      <div className="block w-11/12 pl-10 lg:pl-6 lg:flex lg:flex-col lg:items-center lg:w-11/12 lg:px-6 py-10">
        
        <div className="pt-0 pb-6 px-3 w-5/6 h-fit lg:px-4 lg:py-4 lg:w-11/12 bg-slate-200 rounded">
          
          <FullPDFViewer filename="/pdf/sample.pdf" />
        </div>
      </div>
    </div>
  );
};
export default DocumentView;
