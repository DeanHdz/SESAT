import SimplePDFViewer from "../PDFViewer/SimplePDFViewer";

const TesisCard = () => {
    return (
        <div className="bg-light-blue-10 lg:flex lg:flex-row p-6 h-fit rounded border border-light-gray-22 border-solid">
            <div className="p-2 bg-light-blue-10 block lg:w-5/12 h-[180px] !overflow-hidden">
                <div>
                    <SimplePDFViewer />                    
                </div>

            </div>
            <div className="block justify-center items-center w-7/12">
                <label className="m-3 block text-2xl font-bold">Nombre de la Tesis</label>
                <label className="m-3 mt-10 block text-sm font-normal">Modificado: dd/mm/yyyy</label>
                <label className="m-3 mt-10 block text-sm font-bold">Última versión realizada</label>
                <div className="w-full flex justify-end items-end">
                    <button className="btn shadow rounded">Ver Tesis</button>
                </div>
            </div>
        </div>
    );
};

export default TesisCard;