import PDFViewer from "../PDFViewer/PDFViewer";
import { Modal } from "../Modal/Modal";
import { IModalData } from "../../Interfaces/IModalData";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

const modalData: IModalData = {
  title: "Modificar Nombre de la Tesis",
  message:
    "Atención: Considere que el cambio no se aplicará al documento debido a limitaciones del sistema. Actualize el archivo PDF para evitar incongruencias con los datos.",
};



const TesisView = ({
  titulo,
  fecha,
  autor,
}: {
  titulo: string;
  fecha: string;
  autor: string;
}) => {

  const avance:string = "04";
  const navigate = useNavigate();

  function viewPDFDocument() {
    navigate("/view_document");
  }

  function viewPDFCertificate(){
    navigate("/view_document");
  }
  function viewPDFFormat(){
    navigate("/view_document");
  }
  
  return (
    <div className="block lg:flex lg:flex-row w-screen">
      <div className="block w-11/12 lg:flex lg:flex-col lg:w-5/12">
        <div className="block mt-10 ml-10 w-auto bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit">
          <label className="mb-0 block text-base font-light">Título</label>
          <label className="mb-4 block text-lg font-bold">{titulo}</label>

          <label className="mb-0 block text-base font-light">Autor</label>
          <label className="mb-5 block text-lg font-bold">{autor}</label>

          <label className="mb-0 block text-base font-light">
            Fecha en la que se entregó
          </label>
          <label className="mb-5 block text-lg font-bold">{fecha}</label>

          <label className="mb-0 block text-base font-light">
            Número de avance
          </label>
          <label className="mb-5 block text-lg font-bold">04</label>

          <label className="mb-0 block text-base font-light">
            Revisada y aprobada por
          </label>
          <label className="mb-5 block text-lg font-bold">
            Dr. César Augusto Puente Montejano
          </label>
        </div>

        <div className="block mt-0 ml-10 w-auto bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit">
          <label className="mb-0 block text-base font-bold">
            Formatos de revisión para el avance {avance}
          </label>
          <label onClick={viewPDFCertificate} className="mt-6 mb-2 block text-base text-dark-blue-10 font-light cursor-pointer hover:text-dark-blue-20">
            Acta de evaluación de avance de tesis
          </label>
          <label onClick={viewPDFFormat} className="mt-6 mb-2 block text-base text-dark-blue-10 font-light cursor-pointer hover:text-dark-blue-20">
            Formato para la evaluación de avance de tesis
          </label>

        </div>

        <div className="block mt-0 ml-10 w-auto bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit">
          <label className="mb-0 block text-base font-bold">
            Versiones anteriores de la tesis
          </label>
          <label className="mt-6 mb-2 block text-base font-light">
            Historial de versiones
          </label>
          <select className="mt-0 select h-1/4 py-2 px-10 shadow appearance-none border-primary rounded w-full mb-10">
            <option disabled selected>
              Seleccione para previsualizar
            </option>
            <option>Avance 1</option>
            <option>Avance 2</option>
            <option>Avance 3</option>
          </select>


        </div>
        <div className="block mt-0 ml-10 w-auto bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit">
          <label className="mb-0 block text-base font-bold">Propiedades</label>

          
          <label className="mb-0 mt-5 block text-base font-light">
            Fecha de registro de la tesis
          </label>
          <label className="mb-5 block text-lg font-bold">{fecha}</label>


          <label htmlFor="my-modal-6" className="mb-0 mt-5 block text-dark-blue-10 text-base font-light cursor-pointer hover:text-dark-blue-20">
            Editar nombre de la tesis            
          </label>
          <Modal info={modalData} />

        </div>
      </div>

      <div className="block w-11/12 pl-10 lg:pl-6 lg:flex lg:flex-col lg:items-center lg:w-7/12 lg:px-6 py-10">
        <div className="pt-0 pb-6 px-3 w-full h-fit lg:px-4 lg:w-full  bg-light-blue-10 rounded">
          <div className="flex flex-row mt-0 ml-10 w-5/6 justify-center rounded px-8 py-0 mb-0 h-fit">
            <label className="mb-0 block text-base font-light">
              Vista previa del documento
            </label>
          </div>
          <PDFViewer />
        </div>
        <div className="mt-6 flex flex-row justify-center w-full">
          <PrimaryButton onClick={viewPDFDocument} text="Ver PDF Completo"/>          
        </div>
      </div>
    </div>
  );
};
export default TesisView;
