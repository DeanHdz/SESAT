'use client'
import React, { useState } from 'react';
import PDFViewer from './PDFViewer';
import ReportForm, {ReportFormProps} from './ReportForm';
import ActForm, {ActFormProps} from './ActForm';

export interface ReviewFormatsProps {
    acta_pdf: Uint8Array;
    reporte_pdf: Uint8Array;
    acta_form: ActFormProps,
    reporte_form: ReportFormProps
}

const PDFViewerModal = ({
    pdf,
    isOpen,
    onClose,
}: {
    pdf: Uint8Array;
    isOpen: boolean;
    onClose: () => void;
}) => {

    return (
        isOpen && (
            <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50">

                <div className='max-w-[1000px] bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full p-5 flex flex-col mb-2'>
                    <div className='w-full flex flex-col'>
                        <PDFViewer buffer={pdf}/>
                    </div>
                    <div className='flex flex-row justify-evenly mt-4'>
                        <button onClick={onClose} className='secondary__btn'>
                            Cerrar
                        </button>
                    </div>
                 </div>
            </div>
        )
    );
};

const ReportFormModal = ({
    isOpen,
    onClose,
    onSave,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (value: string) => void;
  }) => {
    const [updatedValue, setUpdatedValue] = useState('');
  
    const saveChanges = () => {
      onSave(updatedValue);
      onClose();
    };

    const [titulo, setTitulo] = useState("");
    const [programa, setPrograma] = useState("");
    const [estudiante, setEstudiante] = useState("");
    const [asesor, setAsesor] = useState("");
    const [coasesor, setCoasesor] = useState("");
    const [comiteTesis, setComiteTesis] = useState("");
    const [tituloTesis, setTituloTesis] = useState("");
    const [fechaComienzo, setFechaComienzo] = useState("");
    const [fechaLimite, setFechaLimite] = useState("");

    function formatDate(dateValue: Date) {
        let day = dateValue.getDate();
        let month = dateValue.getMonth() + 1; //(Esta indexado desde 0)
        let year = dateValue.getFullYear();
        let date = day + "/" + month + "/" + year;
    return date;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Titulo:", titulo);
        console.log("Programa:", programa);
        console.log("Estudiante:", estudiante);
        console.log("Asesor:", asesor);
        console.log("Coasesor:", coasesor);
        console.log("ComiteTesis:", comiteTesis);
        console.log("Titulo Tesis:", tituloTesis);
        console.log("Fecha Comienzo:", fechaComienzo);
        console.log("Fecha Limite:", fechaLimite);
    };

    return (
        isOpen && (
            <div>
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="titulo">
              Titulo:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="programa">
              Programa:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="programa"
              value={programa}
              onChange={(e) => setPrograma(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="estudiante">
              Estudiante:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="estudiante"
              value={estudiante}
              onChange={(e) => setEstudiante(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="asesor">
              Asesor:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="asesor"
              value={asesor}
              onChange={(e) => setAsesor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="coasesor">
              Co-asesor:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="coasesor"
              value={coasesor}
              onChange={(e) => setCoasesor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="comiteTesis">
              Comite de Tesis:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="comiteTesis"
              value={comiteTesis}
              onChange={(e) => setComiteTesis(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="tituloTesis">
              Titulo de Tesis:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="tituloTesis"
              value={tituloTesis}
              onChange={(e) => setTituloTesis(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="fechaComienzo">
              Fecha de comienzo:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="fechaComienzo"
              value={fechaComienzo}
              onChange={(e) => setFechaComienzo(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="fechaLimite">
              Fecha limite para examen de grado:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="fechaLimite"
              value={fechaLimite}
              onChange={(e) => setFechaLimite(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
        )
    );
};

const ActFormModal = ({
    isOpen,
    onClose,
    onSave,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (value: string) => void;
}) => {
    const [updatedValue, setUpdatedValue] = useState('');

    const saveChanges = () => {
    onSave(updatedValue);
    onClose();
  };

  return (
    isOpen && (
        <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50">
            <div className='max-w-[1000px] bg-[#ffffff] rounded-[15px] border border-light-gray-22 border-solid w-full p-5 flex flex-col mb-2' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <div className='w-full flex flex-col'>
                    {/*<ActForm />*/}
                    <form /*onSubmit={handleSubmit}*/>
                        <div className="flex flex-row  w-5/6 m-auto mt-6 mb-0 h-fit p-0">
                            <div className="flex flex-row w-full justify-end items-center sm:mb-10">
                                <label className="block mr-4 text-lg font-bold">
                                    Fecha de evaluación:
                                </label>
                                {/* <CustomCalendar setSelectedDate={setFechaEval} />*/}
                            </div>
                        </div>
                        <div className="flex flex-row  w-5/6 m-auto mb-0 h-fit p-0">
                            <label className="mb-3 block text-lg font-bold">
                                Datos del alumno
                            </label>
                        </div>
                        <div className="flex flex-col  w-5/6 m-auto bg-light-blue-10 rounded py-6 px-6 border border-light-gray-22 border-solid">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/3">
                                    <label className="mb-3 block text-lg font-bold">
                                        Apellido Paterno:
                                    </label>
                                    <label className="mb-3 block text-lg font-sans">
                                        {/*alumno?.last_name*/}
                                    </label>
                                </div>
                                <div className="lg:w-1/3">
                                    <label className="mb-3 block text-lg font-bold">
                                        Apellido Materno:
                                    </label>
                                    <label className="mb-3 block text-lg font-sans">
                                        {/*alumno?.family_name*/}
                                    </label>
                                </div>
                                <div className="lg:w-1/3">
                                    <label className="mb-3 block text-lg font-bold">Nombre:</label>
                                    <label className="mb-3 block text-lg font-sans">
                                        {/*alumno?.name*/}
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row">
                                <div className="flex flex-col lg:w-1/2">
                                    <label className="mb-3 block text-lg font-bold">
                                        Estudiante del programa:
                                    </label>
                                    <label className="mb-3 block text-lg font-sans">
                                        {/*programa?.nombreprograma*/}
                                    </label>
                                </div>
                                <div className="flex flex-row w-1/2">
                                    <div className="flex flex-col w-1/2">
                                        <label className="mb-3 block text-lg font-bold">
                                            Clave Única:
                                        </label>
                                        <label className="mb-3 block text-lg font-sans">
                                            {/*claveUnica*/}
                                        </label>
                                    </div>
                                    <div className="flex flex-col w-1/2">
                                        <label className="mb-3 block text-lg font-bold">Avance No.:</label>
                                        <label className="mb-3 block text-lg font-sans">
                                            {/*tesis?.ultimo_avance*/}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row  w-5/6 m-auto mb-0 h-fit p-0 mt-10">
                            <label className="mb-3 block text-lg font-bold">
                                Datos de la Tesis
                            </label>
                        </div>
                        <div className="flex flex-col w-5/6 m-auto ">
                            <div className="flex flex-col py-6 px-6 bg-light-blue-10 rounded border border-solid border-light-gray-22 mb-10">
                                <label className="mb-3 block text-lg font-bold">
                                    Título de la tesis
                                </label>
                                <label className="mb-3 block text-lg">
                                    {/*tesis?.titulo*/}
                                </label>
                            </div>
                            <div className="flex flex-col ">
                                <label className="mb-3 block text-lg font-bold">
                                    Porcentaje de avance en el desarrollo del proyecto de tesis
                                </label>
                                <input
                                className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                                type="number"
                                placeholder="%"
                                pattern="^(100|[1-9][0-9]?|0)$"
                                value={ 1 /*porcentajeAv*/}
                                required
                                onChange={
                                (e) => {
                                    //setPrcAvance(e.target.value);
                                }
                                }
                                />
                                <label className="mb-3 block text-lg font-bold">
                                    Comentarios y sugerencias
                                </label>
                                <textarea
                                className="textarea h-48 w-full px-10  border-primary rounded text-base mb-10 "
                                placeholder="Escriba sus sugerencias o comentarios"
                                value={ 1 /*comentarios*/}
                                required
                                onChange={
                                (e) => {
                                    //autosize(e.currentTarget);
                                    //setComentarios(e.target.value);
                                }
                                }
                                ></textarea>
                                <label className="mb-3 block text-lg font-bold">Evaluación</label>
                                <div className="flex flex-col  w-full m-auto bg-light-blue-10 rounded py-6 px-6 border border-light-gray-22 border-solid">
                                    <div className="flex flex-col lg:flex-row justify-between">
                                        <div className="flex flex-col">
                                            <label className="mb-3 block text-lg font-bold">
                                                Documento de avance
                                            </label>
                                            <input
                                            className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                                            type="number"
                                            placeholder="%"
                                            pattern="^(100|[1-9][0-9]?|0)$"
                                            value={ 1 /*documentoAvance*/}
                                            required
                                            onChange={
                                            (e) => {
                                                //setDocAvance(e.target.value);
                                            }
                                            }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-3 block text-lg font-bold">
                                                Exposición
                                            </label>
                                            <input
                                            className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                                            type="number"
                                            placeholder="%"
                                            pattern="^(100|[1-9][0-9]?|0)$"
                                            value={ 1 /*exposicion*/}
                                            required
                                            onChange={
                                            (e) => {
                                                //setExposicion(e.target.value);
                                            }
                                            }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-3 block text-lg font-bold">
                                                Dominio del tema
                                            </label>
                                            <input
                                            className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                                            type="number"
                                            placeholder="%"
                                            pattern="^(100|[1-9][0-9]?|0)$"
                                            value={ 1 /*dominioTema*/}
                                            required
                                            onChange={
                                            (e) => {
                                                //setDominioTema(e.target.value);
                                                 }
                                            }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-3 block text-lg font-bold">
                                                Grado de avance en el periodo
                                            </label>
                                            <input
                                            className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                                            type="number"
                                            placeholder="%"
                                            pattern="^(100|[1-9][0-9]?|0)$"
                                            value={ 1 /*gradoAvance*/}
                                            required
                                            onChange={
                                            (e) => {
                                                //setGradoAvance(e.target.value);
                                                }
                                            }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="flex flex-col">
                                            <label className="mb-3 block text-lg font-bold">
                                                Promedio de la evaluación
                                            </label>
                                            <label className="mb-3 block text-lg">
                                                { 1 /*promedio*/} %
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <label className="mt-10 mb-3 block text-lg font-bold">Acerca del examen TOEFL</label>
                                <div className="flex flex-col  w-full m-auto bg-light-blue-10 rounded py-6 px-6 border border-light-gray-22 border-solid">
                                    <div className="flex flex-col lg:flex-row justify-normal">
                                        <div className="flex flex-col mr-20">
                                            <label className="mb-3 block text-lg font-bold">
                                                Fecha de presentación del examen
                                            </label>
                                            {/*<CustomCalendar setSelectedDate={setFechaToefl} />*/}
                                        </div>
                                        <div className="flex flex-col mt-10">
                                            <label className="mb-3 block text-lg font-bold">
                                                Puntaje obtenido
                                            </label>
                                            <input
                                            className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                                            type="number"
                                            placeholder="pts"
                                            pattern="^(100|[1-9][0-9]?|0)$"
                                            value={ 1 /*puntajeToefl*/}
                                            required
                                            onChange={
                                            (e) => {
                                                //setPuntajeToefl(e.target.value);
                                            }
                                            }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="flex flex-col">
                                            <label className="mb-3 block text-lg font-bold">
                                                Próxima fecha para presentar el examen TOEFL
                                            </label>
                                            {/*<CustomCalendar setSelectedDate={setProxToefl} />*/}
                                        </div>
                                    </div>
                                </div>
                                <label className="mb-3 mt-10 block text-lg font-bold">
                                    Observaciones y compromisos
                                </label>
                                <textarea
                                className="textarea h-12 w-full px-10 border-primary rounded text-base mb-10"
                                placeholder="Escriba sus observaciones y compromisos para el alumno"
                                value={ 1 /*observaciones*/}
                                required
                                onChange={
                                (e) => {
                                    //autosize(e.currentTarget);
                                    //setObservaciones(e.target.value);
                                }
                                }
                                ></textarea>
                                <div className='flex flex-row justify-evenly mt-4'>
                                    <button type="submit" onClick={saveChanges} className="primary__btn">
                                        Guardar acta de evaluación
                                    </button>
                                    <button onClick={onClose} className='secondary__btn'>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    );
};

const ReviewFormats = (props: ReviewFormatsProps) => {
    const [isPDFViewerModalOpen, setIsPDFViewerModalOpen] = useState(false);
    const [isReportFormModalOpen, setIsReportFormModalOpen] = useState(false);
    const [isActFormModalOpen, setIsActFormModalOpen] = useState(false);

    const openPDFViewerModal = () => {
        setIsPDFViewerModalOpen(true);
    };

    const closePDFViewerModal = () => {
        setIsPDFViewerModalOpen(false);
    };

    const openReportFormModal = () => {
        setIsReportFormModalOpen(true);
    };

    const closeReportFormModal = () => {
        setIsReportFormModalOpen(false);
    };

    const handleReportFormSave = () => {
        //setModifiedReport(value);
    };

    const openActFormModal = () => {
        setIsActFormModalOpen(true);
    };

    const closeActFormModal = () => {
        setIsActFormModalOpen(false);
    };

    const handleActFormSave = () => {
        //setModifiedAct(value);
    };

    return (

        <div className='flex flex-col w-full pt-5 mt-5 mb-5 bg-light-blue-10 rounded px-8 py-4 h-fit'>

            <label className="flex text-2xl font-bold">
                Formatos de revisión
            </label>

            <div className='w-full m-2 border border-solid border-gray-200'></div>

            <div className='w-full flex flex-col'>
                <div className="bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full p-5 flex flex-col mb-2">
                    <p className="flex items-center text-2xl font-bold justify-center mb-2">
                        Acta de evaluación
                    </p>
                    <div className="flex flex-row justify-evenly">
                        <button onClick={openPDFViewerModal} className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
                            <div className="text-center text-[#ffffff]">
                                Ver PDF
                            </div>
                        </button>
                        <PDFViewerModal
                            pdf={props.acta_pdf}
                            isOpen={isPDFViewerModalOpen}
                            onClose={closePDFViewerModal}
                        />
                        <button onClick={openActFormModal} className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
                            <div className="text-center text-[#ffffff]">
                                Rellenar Acta
                            </div>
                        </button>
                        <ActFormModal 
                            isOpen={isActFormModalOpen}
                            onClose={closeActFormModal}
                            onSave={handleActFormSave}
                        />
                    </div>
                </div>
                <div className="bg-[#ffffff] rounded-[15px] border border-light-gray-22 border-solid w-full p-5 flex flex-col mb-2">
                    <p className="flex items-center text-2xl font-bold justify-center mb-2">
                        Reporte de evaluación
                    </p>
                    <div className="flex flex-row justify-evenly">
                        <button onClick={openPDFViewerModal} className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
                            <div className="text-center text-[#ffffff]">
                                Ver PDF
                            </div>
                        </button>
                        <PDFViewerModal
                            pdf={props.reporte_pdf}
                            isOpen={isPDFViewerModalOpen}
                            onClose={closePDFViewerModal}
                        />
                        <button onClick={openReportFormModal} className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
                            <div className="text-center text-[#ffffff]">
                                Rellenar Reporte
                            </div>
                        </button>
                        <ReportFormModal 
                            isOpen={isReportFormModalOpen}
                            onClose={closeReportFormModal}
                            onSave={handleActFormSave}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewFormats