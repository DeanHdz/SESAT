import { useState } from "react";
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { TesisInfo } from "../asesor-assignment/[idAsignacion]/page";
import { Asignacion } from "../../../../../types/ISESAT";
import { dateStringToDate, formatAsISODate, shortFormatDate, shortFormatDateWithoutConversion } from "../../../../../utils/utils";
import { fetchComiteMembers } from "../../../../../utils/comite.endpoint";
import { fetchFormatData, fetchFormatoEvaluacion, postFormatoEvaluacion } from "../../../../../utils/formato-evaluacion.endpoint";
import ProcessingAnim from "@/app/components/ProcessingAnim";
import PDFViewer from "./PDFViewer";
import Cookies from "js-cookie";

type ComiteMember = {
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    nombre_funcion: string;
}

const ReportFormModal = ({
    tesisInfo, asignacion
}: {
    tesisInfo: TesisInfo, asignacion: Asignacion
}) => {
    const cookie = Cookies.get("SESATsession");
    const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fechaLimite, setFechaLimite] = useState(new Date());
    const [tituloReporte, settituloReporte] = useState("");
    const [comite, setComite] = useState<undefined | ComiteMember[]>(undefined)
    const [asesor, setasesor] = useState<undefined | ComiteMember>(undefined);
    const [coasesor, setcoasesor] = useState<undefined | ComiteMember>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [generatedPDF, setPDF] = useState<undefined | Array<number>>(undefined);
    const [msg, setMsg] = useState("");


    const openReportFormModal = () => {
        fetchComite();
        document.body.classList.add('modal-open');
        setIsOpen(true);
        if (asignacion.id_formato_evaluacion !== null) {
            setIsSubmitting(true);
            fetchReporteEvaluacion(asignacion.id_formato_evaluacion);
        }
    };

    async function fetchReporteEvaluacion(idReporte: number) {
        const res = await fetchFormatoEvaluacion(idReporte, token);
        setPDF(res.documento_rellenado.data);
        setIsSubmitting(false);
    }

    async function fetchComite() {
        const res: ComiteMember[] = await fetchComiteMembers(asignacion.id_tesis, token).catch(() => { return null });
        if (res) {
            setComite(res);
            setasesor(res.find(usuario => usuario.nombre_funcion === 'Asesor'));
            setcoasesor(res.find(usuario => usuario.nombre_funcion === 'Co-asesor'));
        }
    }

    const closeReportFormModal = () => {
        document.body.classList.remove('modal-open');
        setIsOpen(false);
    };

    async function fetchDocumentDataToEdit(idFormato: number) {
        const res = await fetchFormatData(idFormato, token);
        setFechaLimite(dateStringToDate(res.fecha_limite));
        settituloReporte(res.titulo_reporte);            
      }

    const editActForm = async () => {
        setMsg("Recuperando los datos del documento...");
        setIsSubmitting(true);          
        setPDF(undefined);
        await fetchDocumentDataToEdit(asignacion.id_formato_evaluacion);
        setIsSubmitting(false);
      };



    async function handleSubmit(e: any) {
        e.preventDefault();
        let gradoEstudio = tesisInfo.id_grado_estudio === 1 ? 'Maestría en Ingeniería de la Computación' : 'Doctorado en Ciencias de la Computación';
        //try {

        setIsSubmitting(true);
        const res = await postFormatoEvaluacion(
            asignacion.id_asignacion,
            {
                id_formato_evaluacion: asignacion.id_formato_evaluacion,
                titulo_reporte: tituloReporte,
                grado: gradoEstudio,
                estudiante: `${tesisInfo.nombre} ${tesisInfo.apellido_paterno} ${tesisInfo.apellido_materno}`,
                asesor: `${asesor?.nombre} ${asesor?.apellido_paterno} ${asesor?.apellido_materno}`,
                coasesor: `${coasesor?.nombre} ${coasesor?.apellido_paterno} ${coasesor?.apellido_materno}`,
                comite: comite!,
                titulo_tesis: tesisInfo.titulo,
                fecha_comienzo: tesisInfo.fecha_registro,
                fecha_limite: shortFormatDateWithoutConversion(formatAsISODate(fechaLimite)),
            },
            token
        );
        setPDF(res.documento_rellenado.data);
        asignacion.id_formato_evaluacion = res.id_formato_evaluacion;
        setIsSubmitting(false);

        /*}
        catch (err) {
            console.log(err);
        }*/
    }

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
            {isOpen && (
                <div className='w-screen h-screen bg-black/20 z-50 fixed top-0 right-0 flex justify-center pt-2 overflow-hidden'>
                    <div className={` w-full lg:w-11/12 lg:mx-auto p-2 pb-10 border-0 rounded-t-xl shadow-lg  flex flex-col bg-white outline-none focus:outline-none z-50 animate-slide-up lg:max-w-[1400px]`}>

                        {/**Close button */}
                        <div className="w-full flex flex-row h-fit items-center">
                            {generatedPDF && (
                                <button className={`w-[24px] flex flex-row active:opacity-40 text-black/60 hover:text-dark-blue-10`} onClick={editActForm}>
                                    <div className="w-[24px] flex items-center">
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M21 15.243v5.765a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V9h6a1 1 0 0 0 1-1V2h10.002c.551 0 .998.455.998.992v3.765l-8.999 9-.006 4.238 4.246.006L21 15.243zm.778-6.435l1.414 1.414L15.414 18l-1.416-.002.002-1.412 7.778-7.778zM3 7l5-4.997V7H3z"></path></g></svg>
                                    </div>
                                    <span className="ml-1">Editar</span>
                                </button>
                            )}
                            <button className={`ml-auto w-[24px] active:opacity-40`} onClick={closeReportFormModal}>
                                <svg stroke="#dd4d4d" fill="#dd4d4d" strokeWidth="0" viewBox="0 0 1024 1024" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                            </button>

                        </div>

                        {isSubmitting ? (
                            <div>
                                <ProcessingAnim title="Obteniendo Documento PDF..." />
                            </div>
                        ) : (
                            <>
                                {generatedPDF ? (
                                    <PDFViewer buffer={generatedPDF} />
                                ) : (
                                    <>
                                        <form action="submit" onSubmit={handleSubmit} className="w-full h-full overflow-y-scroll no-scrollbar">
                                            <div className='w-11/12 lg:w-5/6 mx-auto flex flex-col lg:flex-row mb-3'>
                                                <div className='mb-3 lg:mb-0 font-SESAT text-4xl mr-auto'>
                                                    Formato para la evaluación de avance de tesis
                                                </div>
                                                <button type="submit" className="primary__btn">
                                                    Generar reporte
                                                </button>
                                            </div>
                                            <div className="w-11/12 lg:w-5/6 mx-auto mb-3 lg:mb-10">
                                                <span>Verifique que los datos sean correctos</span>
                                            </div>
                                            <div className="w-full flex flex-col">
                                                <table className="w-11/12 lg:w-5/6 mx-auto table table-zebra text-base">
                                                    <thead>
                                                        <tr className="text-dark-blue-20">
                                                            <th className="w-1/3"></th>
                                                            <th className="w-2/3"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="font-SESAT">Reporte </td>
                                                            <td className="flex flex-row items-center">
                                                                <input
                                                                    className="py-2 px-3 appearance-none gray__border w-full"
                                                                    type="text"
                                                                    placeholder="Nombre del reporte"
                                                                    required
                                                                    maxLength={40}
                                                                    value={tituloReporte}
                                                                    onChange={
                                                                        (e) => {
                                                                            settituloReporte(e.target.value)
                                                                        }
                                                                    }
                                                                />
                                                                <p className="ml-3 text-black/30 font-SESAT">{tituloReporte.length}/40</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="font-SESAT">Fecha limite para examen de grado:</td>
                                                            <td><Flatpickr
                                                                className={`gray__border w-full`}
                                                                options={{
                                                                    enableTime: false,
                                                                    noCalendar: false,
                                                                    static: true,
                                                                }}
                                                                //data-enable-time
                                                                placeholder=""
                                                                value={fechaLimite}
                                                                onChange={([date]) => {
                                                                    setFechaLimite(date)
                                                                }}
                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="font-SESAT">Estudiante</td>
                                                            <td>{`${tesisInfo.nombre} ${tesisInfo.apellido_paterno} ${tesisInfo.apellido_materno}`}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="font-SESAT">Asesor</td>
                                                            <td>{`${asesor?.nombre} ${asesor?.apellido_paterno} ${asesor?.apellido_materno}`}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="font-SESAT">Coasesor</td>
                                                            <td>{`${coasesor?.nombre} ${coasesor?.apellido_paterno} ${coasesor?.apellido_materno}`}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="font-SESAT">Comité de tesis</td>
                                                            <td className="whitespace-normal">
                                                                {comite?.map((elem, index) => (
                                                                    <span key={index}>
                                                                        {`${elem.nombre} ${elem.apellido_paterno} ${elem.apellido_materno}`}<br />
                                                                    </span>
                                                                ))}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="font-SESAT">Titulo de tesis</td>
                                                            <td>{tesisInfo.titulo}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="font-SESAT">Fecha de comienzo</td>
                                                            <td>{shortFormatDate(tesisInfo.fecha_registro)}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                        </form>

                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ReportFormModal