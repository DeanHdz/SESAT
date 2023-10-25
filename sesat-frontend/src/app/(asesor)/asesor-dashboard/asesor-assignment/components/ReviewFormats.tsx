'use client'
import React, { useState } from 'react';
import PDFModal from './PDFModal';

import ReportForm, { ReportFormProps } from './ReportForm';
import ActForm, { ActFormProps } from './ActForm';

export interface ReviewFormatsProps {
    acta_pdf: Array<number>;
    reporte_pdf: Array<number>;
    acta_form: ActFormProps,
    reporte_form: ReportFormProps
}//nueva

export interface ReviewFormatsProps {
    tesis: Array<number>;
    actaPDF: string;
    evaluacionPDF: string;
}



const ReviewFormats = (props: ReviewFormatsProps) => {    
    const [isReportFormModalOpen, setIsReportFormModalOpen] = useState(false);
    const [isActFormModalOpen, setIsActFormModalOpen] = useState(false);

    const openReportFormModal = () => {
        document.body.classList.add('modal-open');
        setIsReportFormModalOpen(true);
    };

    const closeReportFormModal = () => {
        document.body.classList.remove('modal-open');
        setIsReportFormModalOpen(false);
    };

    const openActFormModal = () => {
        document.body.classList.add('modal-open');
        setIsActFormModalOpen(true);
    };

    const closeActFormModal = () => {
        document.body.classList.remove('modal-open');
        setIsActFormModalOpen(false);
    };

    const handleActFormSave = () => {
        //setModifiedAct(value);
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
            <>
                <button onClick={openReportFormModal} className="bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full px-5 flex flex-row items-center mb-2">
                    <div className='w-[20px] h-[20px] opacity-40 my-3'>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M4.99787498,8.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L4,23 M18,1 L18,6 L23,6 M3,12 L3.24999995,12 L4.49999995,12 C6.5,12 6.75,13.25 6.75,14 C6.75,14.75 6.5,16 4.49999995,16 L3.24999995,16 L3.24999995,18 L3,17.9999999 L3,12 Z M9.5,18 L9.5,12 C9.5,12 10.4473684,12 11.2052633,12 C12.3421053,12 13.5,12.5 13.5,15 C13.5,17.5 12.3421053,18 11.2052633,18 C10.4473684,18 9.5,18 9.5,18 Z M16.5,19 L16.5,12 L20.5,12 M16.5,15.5 L19.5,15.5"></path></svg>
                    </div>
                    <p className="flex items-center font-SESAT font-bold justify-center ml-3">
                        Reporte de evaluación
                    </p>
                </button>
                { isOpen && (
                <div className='w-screen h-screen bg-black/20 z-50 fixed top-0 right-0 flex justify-center pt-2 overflow-hidden'>
                    <div className={` w-11/12 lg:w-11/12 lg:mx-auto p-2 border-0 rounded-xl shadow-lg  flex flex-col bg-white outline-none focus:outline-none z-50 animate-slide-up `}>

                        <div className="w-full flex flex-row h-fit items-center">

                            <button className={`ml-auto w-[24px] active:opacity-40`} onClick={closeReportFormModal}>
                                <svg stroke="#dd4d4d" fill="#dd4d4d" stroke-width="0" viewBox="0 0 1024 1024" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                            </button>

                        </div>
                        <div className='w-full flex flex-col overflow-y-scroll'>
                            <form onSubmit={handleSubmit} className=''>
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

                            </form>
                        </div>
                    </div>
                </div>


                )}
            </>
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
            <>
                <button onClick={openActFormModal} className="bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full px-5 flex flex-row items-center mb-2">
                    <div className='w-[20px] h-[20px] opacity-40 my-3'>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M4.99787498,8.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L4,23 M18,1 L18,6 L23,6 M3,12 L3.24999995,12 L4.49999995,12 C6.5,12 6.75,13.25 6.75,14 C6.75,14.75 6.5,16 4.49999995,16 L3.24999995,16 L3.24999995,18 L3,17.9999999 L3,12 Z M9.5,18 L9.5,12 C9.5,12 10.4473684,12 11.2052633,12 C12.3421053,12 13.5,12.5 13.5,15 C13.5,17.5 12.3421053,18 11.2052633,18 C10.4473684,18 9.5,18 9.5,18 Z M16.5,19 L16.5,12 L20.5,12 M16.5,15.5 L19.5,15.5"></path></svg>
                    </div>
                    <p className="flex items-center font-SESAT font-bold justify-center ml-3">
                        Acta de evaluación
                    </p>

                </button>
                {
                    isOpen && (
                        <>

                            <div className='w-screen h-screen bg-black/20 z-50 fixed top-0 right-0 flex justify-center pt-2 overflow-hidden'>
                                <div className={` w-11/12 lg:w-11/12 lg:mx-auto p-2 border-0 rounded-xl shadow-lg  flex flex-col bg-white outline-none focus:outline-none z-50 animate-slide-up `}>

                                    <div className="w-full flex flex-row h-fit items-center">

                                        <button className={`ml-auto w-[24px] active:opacity-40`} onClick={closeActFormModal}>
                                            <svg stroke="#dd4d4d" fill="#dd4d4d" stroke-width="0" viewBox="0 0 1024 1024" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                                        </button>

                                    </div>
                                    <div className='w-full flex flex-col overflow-y-scroll'>
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
                                                        value={1 /*porcentajeAv*/}
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
                                                        value={1 /*comentarios*/}
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
                                                                    value={1 /*documentoAvance*/}
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
                                                                    value={1 /*exposicion*/}
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
                                                                    value={1 /*dominioTema*/}
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
                                                                    value={1 /*gradoAvance*/}
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
                                                                    {1 /*promedio*/} %
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
                                                                    value={1 /*puntajeToefl*/}
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
                                                        value={1 /*observaciones*/}
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
                            </div >
                        </>
                    )
                }
            </>
        );
    };

    return (

        <div className='flex flex-col w-full pt-5 mt-5 mb-5 bg-light-blue-10 rounded px-8 py-4 h-fit'>

            <label className="flex text-2xl font-bold">
                Evaluación
            </label>

            <div className='w-full my-2 mx-auto border border-solid border-gray-200'></div>

            <div className='w-full flex flex-col'>
                <ActFormModal
                    isOpen={isActFormModalOpen}
                    onClose={closeActFormModal}
                    onSave={handleActFormSave}
                />

                <ReportFormModal
                    isOpen={isReportFormModalOpen}
                    onClose={closeReportFormModal}
                    onSave={handleActFormSave}
                />

            </div>
            <PDFModal document={props.tesis} />
        </div>
    )
}

export default ReviewFormats