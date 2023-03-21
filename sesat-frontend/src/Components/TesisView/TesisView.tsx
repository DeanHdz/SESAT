import PDFViewer from "../PDFViewer/PDFViewer";
const TesisView = ({
  titulo,
  fecha,
  autor,
}: {
  titulo: string;
  fecha: string;
  autor: string;
}) => {
  return (
    <div className="block lg:flex lg:flex-row w-screen">
      <div className="block w-11/12 lg:flex lg:flex-col lg:w-5/12">
        <div className="block mt-10 ml-10 w-auto bg-slate-200 rounded px-8 py-4 mb-10 h-fit">
          <label className="mb-0 block text-base font-light">Título</label>
          <label className="mb-4 block text-lg font-bold">{titulo}</label>

          <label className="mb-0 block text-base font-light">Autor</label>
          <label className="mb-5 block text-lg font-bold">{autor}</label>

          <label className="mb-0 block text-base font-light">
            Fecha de registro
          </label>
          <label className="mb-5 block text-lg font-bold">{fecha}</label>
        </div>
        <div className="flex flex-row justify-end w-full">
          <button className="btn ml-6 ">Ver PDF Completo</button>
        </div>
      </div>

      <div className="block w-11/12 pl-10 lg:pl-6 lg:flex lg:flex-col lg:items-center lg:w-7/12 lg:px-6 py-10">
        <div className="pt-0 pb-6 px-3 w-fit h-fit lg:px-4 lg:w-auto  bg-slate-200 rounded">
          <div className="flex flex-row mt-6 ml-10 w-5/6 justify-center rounded px-8 py-0 mb-0 h-fit">
            <label className="mb-0 block text-base font-light">
              Vista previa del documento
            </label>
          </div>
          <PDFViewer />
        </div>
      </div>
    </div>
  );
};
export default TesisView;
