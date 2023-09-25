"use client";
import ProcessingAnim from '@/app/components/ProcessingAnim';
import { fetchLatestPeriod } from '../../../../../utils/periodo.endpoint';
import AddPeriodoModal from './AddPeriodoModal';
import { useEffect, useState } from 'react';
import NotFound from '../not-found';


type PeriodoProps = {
    id_periodo: number;
    fecha_apertura: string;
    fecha_cierre: string;
}
/*
async function fetchStatusPeriodo(): Promise<boolean> {
    let result;
    await fetchLatestPeriod("").then((res) => {

        const periodo: PeriodoProps = res;

        if (periodo) {
            let fechaCierrePeriodo = new Date(periodo.fecha_cierre);
            let fechaActual = new Date();

            result = false;
            if (fechaActual > fechaCierrePeriodo) {

                result = true;
            }
        } else {
            result = true;
        }

    })
    return result!;
}
*/
export const AlertPeriod = () => {

    const [statusPeriodo, setStatusPeriodo] = useState<undefined | boolean>(undefined);
    const [error, setError] = useState(null);
    const [periodo, setPeriodo] = useState<undefined | PeriodoProps>(undefined)

    useEffect(() => {
        async function fetchDATA() {
            try {
                await fetchLatestPeriod("").then((res) => {
                    setPeriodo(res)

                    if (periodo) {
                        let fechaCierrePeriodo = new Date(periodo.fecha_cierre);
                        let fechaActual = new Date();

                        setStatusPeriodo(false);

                        if (fechaActual > fechaCierrePeriodo) {

                            setStatusPeriodo(true);
                        }
                    } else {
                        setStatusPeriodo(true);
                    }
                })
            } catch (error: any) {
                setError(error)
            }
        }

        fetchDATA();
    }, []);

    function formatDate(dateString: string): string {
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const date = new Date(dateString);
        const day = date.getUTCDate();
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear();
    
        return `${day.toString().padStart(2, '0')}/${month}/${year}`;
    }

    function showNewPeriodoModal(info: any) {
        //setClick(false);
        //setstartDate(info.start);
        //setendDate(info.end);
        (document.getElementById('new_periodo_modal') as HTMLDialogElement).showModal()
    }

    if (error) {
        return (
            <NotFound />
        )
    }

    if (!periodo || statusPeriodo === undefined) {
        return (
            <div className="flex w-full justify-center items-center">
                <ProcessingAnim title="" />
            </div>
        )
    }



    return (
        <>
            {!statusPeriodo ? (
                <>
                    {/**Periodo concluido */}
                    <div className="alert shadow-lg mb-6 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div>
                            <h3 className="font-bold">¡No hay un periodo definido!</h3>
                            <div className="text-xs">El periodo anterior ha concluido, debe establecer uno nuevo para este semestre</div>
                        </div>
                        <button className="btn btn-sm" onClick={showNewPeriodoModal}>Establecer Periodo</button>
                    </div>
                </>
            ) : (
                <>
                    {/**Periodo en curso */}
                    <div className="flex flex-col lg:flex-row gray__border p-4 mb-6 items-center bg-light-gray-10">
                        <div className="mr-4">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path></svg>
                        </div>
                        <div className="flex flex-row w-full my-6 lg:my-0">
                            <div>
                                <h3 className="font-bold">Inicio y fin de semestre</h3>
                                <div className="text-xs">Periodo de entregas de avance de tesis</div>
                            </div>
                            <div className="mx-auto flex items-center">
                                <h3 className="font-SESAT">{`${formatDate(periodo.fecha_apertura)}  -  ${formatDate(periodo.fecha_cierre)}`}</h3>
                            </div>
                        </div>
                        <button className="primary__btn ml-auto">Modificar</button>
                    </div>
                </>
            )}

            {/**Crear periodo 
            <AddPeriodoModal startDate={startDate as Date} endDate={endDate as Date} />
            */}
        </>
    )
}
