
"use client";
import React, { useState } from "react";
import { fetchHistoryByIdTesis, shortFormatDate } from "../../../utils/utils";
import PrevAdvance from "@/app/components/PrevAdvance";
import ProcessingAnim from "@/app/components/ProcessingAnim";
import Cookies from "js-cookie";
import { Avance, ThesisFullHistory } from "../../../types/ISESAT";

type TesisProps = {
    tesis: ThesisFullHistory;
}

const ThesisInfo = (props: TesisProps) => {
    const cookie = Cookies.get("SESATsession");
    const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : ""
    const [history, setHistory] = useState<undefined | Array<Avance>>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [modalidad, setModalidad] = useState<undefined | string>(undefined)
    const [gradoEstudio, setgradoEstudio] = useState<undefined | string>(undefined)

    async function fetchThesisHistoryByIdTesis() {
        setIsLoading(true);
        setIsOpen(!isOpen);

        const res = await fetchHistoryByIdTesis(props.tesis.id_tesis, props.tesis.id_modalidad, props.tesis.avance, token);
        setHistory(res);

        setIsLoading(false);
    }


    return (
        <div className={`collapse ${isOpen ? 'collapse-open' : ''} bg-transparent gray__border py-0`} >
            <div onClick={fetchThesisHistoryByIdTesis} className={`collapse-title text-xl font-medium px-0 py-0`}>
                <div className="w-full flex flex-row p-2 bg-light-blue-10 rounded ">

                    <div className="flex w-[50px] text-dark-blue-10 justify-center items-center">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M14 2v13h-10.5c-0.829 0-1.5-0.672-1.5-1.5s0.671-1.5 1.5-1.5h9.5v-12h-10c-1.1 0-2 0.9-2 2v12c0 1.1 0.9 2 2 2h12v-14h-1z"></path><path d="M3.501 13v0c-0 0-0.001 0-0.001 0-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5c0 0 0.001-0 0.001-0v0h9.498v-1h-9.498z"></path></svg>
                    </div>
                    <div className="ml-6 block w-auto">
                        <p className="mt-1 text-[16px] font-SESAT">{props.tesis.titulo}</p>
                        <p className="mt-1 text-sm font-sans text-black/40">{props.tesis.grado === 1 ? 'Maestría en Ingeniería de la Computación' : 'Doctorado en Ciencias de la Computación'}</p>
                    </div>
                    <div className="flex w-[50px] ml-auto text-dark-blue-10 justify-center items-center">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className={`collapse-content py-0 `}>
                    {/**Datos generales */}
                    <div className="w-full h-fit mt-6 bg-light-blue-10 gray__border">
                        <div className="px-6 py-3 mb-3 flex flex-col lg:flex-row items-center text-xl font-semibold border-b">
                            <span>Acerca de la tesis</span>

                        </div>
                        <div className="w-full flex flex-col lg:flex-row h-fit px-6 pb-3">


                            <div className="flex flex-col  ">
                                <label className="mb-3 block text-md font-semibold">
                                    Estado
                                </label>

                                <div className="flex flex-row">
                                    <div className="flex flex-row justify-center items-center">
                                        <div className="mr-2">
                                            <svg className="opacity-70" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M12,13 C14.209139,13 16,11.209139 16,9 C16,6.790861 14.209139,5 12,5 C9.790861,5 8,6.790861 8,9 C8,11.209139 9.790861,13 12,13 Z M6,22 L6,19 C6,15.6862915 8.6862915,13 12,13 C15.3137085,13 18,15.6862915 18,19 L18,22 M13,5 C13.4037285,3.33566165 15.0151447,2 17,2 C19.172216,2 20.98052,3.790861 21,6 C20.98052,8.209139 19.172216,10 17,10 L16,10 L17,10 C20.287544,10 23,12.6862915 23,16 L23,18 M11,5 C10.5962715,3.33566165 8.98485529,2 7,2 C4.82778404,2 3.01948003,3.790861 3,6 C3.01948003,8.209139 4.82778404,10 7,10 L8,10 L7,10 C3.71245602,10 1,12.6862915 1,16 L1,18"></path></svg>
                                        </div>
                                        <p>{props.tesis.estado_finalizacion === true ? 'Concluida' : 'En proceso'}</p>
                                    </div>

                                </div>

                            </div>

                            <div className="flex flex-col mt-3 lg:mt-0 lg:ml-16 ">
                                <label className="mb-3 block text-md font-semibold">
                                    <span>Fecha de registro</span>
                                </label>

                                <div className="flex flex-row">
                                    <div className="flex flex-row justify-center items-center">
                                        <div className="mr-2">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path></svg>
                                        </div>
                                        <p>{shortFormatDate(props.tesis.fecha_registro)}</p>
                                    </div>
                                </div>

                            </div>

                            {gradoEstudio === 'Maestría' && (
                                <div className="flex flex-col mt-3 lg:mt-0 lg:ml-16 ">
                                    <label className="mb-3 block text-md font-semibold">
                                        <span>Modalidad de estudio</span>
                                    </label>

                                    <div className="flex flex-row">
                                        <div className="flex flex-row justify-center items-center">
                                            <div className="mr-2">
                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M21,8c-0.202,0-4.85,0.029-9,2.008C7.85,8.029,3.202,8,3,8C2.447,8,2,8.447,2,9v9.883c0,0.271,0.11,0.53,0.305,0.719 c0.195,0.188,0.48,0.305,0.729,0.28l0.127-0.001c0.683,0,4.296,0.098,8.416,2.025c0.016,0.008,0.034,0.005,0.05,0.011 C11.746,21.966,11.871,22,12,22s0.254-0.034,0.374-0.083c0.016-0.006,0.034-0.003,0.05-0.011c4.12-1.928,7.733-2.025,8.416-2.025 l0.127,0.001c0.238,0.025,0.533-0.092,0.729-0.28C21.89,19.413,22,19.153,22,18.883V9C22,8.447,21.553,8,21,8z M4,10.049 c1.485,0.111,4.381,0.48,7,1.692v7.742c-3-1.175-5.59-1.494-7-1.576V10.049z M20,17.907c-1.41,0.082-4,0.401-7,1.576v-7.742 c2.619-1.212,5.515-1.581,7-1.692V17.907z"></path><circle cx="12" cy="5" r="3"></circle></svg>
                                            </div>
                                            <p>
                                                {modalidad}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            )}

                            <div className="flex flex-col mt-3 lg:mt-0 lg:ml-16 ">
                                <label className="mb-3 block text-md font-semibold">
                                    <span>Programa</span>
                                </label>

                                <div className="flex flex-row">
                                    <div className="flex flex-row justify-center items-center">
                                        <div className="mr-2">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z"></path></g></svg>
                                        </div>
                                        <p>{props.tesis.nombre_programa}</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <label className="my-6 block text-2xl font-bold">
                        Entregas de avance
                    </label>

                    <div className="my-6 bg-white gray__border p-3">
                        <ul className=" w-full overflow-x-scroll no-scrollbar steps steps-horizontal">
                            {isLoading === true ? (
                                <ProcessingAnim title="Obteniendo historial..." />
                            ) : (
                                <>
                                    {history && (
                                        history.map((elem, i) => (
                                            elem.id_asignacion > 0 ? (
                                                <>
                                                    {elem.tipo === 2 ? (
                                                        <li data-content={''} className="step step-primary hidden">
                                                            <PrevAdvance idAsignacion={elem.id_asignacion} avance={elem.num_avance} tipo={elem.tipo} />
                                                        </li>
                                                    ) : (
                                                        <li data-content={elem.num_avance > 0 ? elem.num_avance : ''} className="step step-primary hidden">
                                                            <PrevAdvance idAsignacion={elem.id_asignacion} avance={elem.num_avance} tipo={elem.tipo} />
                                                        </li>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {elem.id_asignacion === -1 ? (
                                                        <li data-content={''} className="step text-black/40">
                                                            {`Cambio de modalidad a ${elem.modalidad}`}
                                                        </li>
                                                    ) : (
                                                        <>
                                                            {elem.tipo !== 2 ? (
                                                                <li data-content={elem.num_avance > 0 ? elem.num_avance : ''} className="step">
                                                                    {elem.num_avance > 0 ? `Avance ${elem.num_avance}` : 'Seminario de investigación'}
                                                                </li>
                                                            ) : (
                                                                <li data-content={''} className="step">
                                                                    {`Avance de medio término`}
                                                                </li>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )
                                        ))
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThesisInfo;


