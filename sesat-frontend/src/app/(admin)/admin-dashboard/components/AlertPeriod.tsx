import { fetchLatestPeriod } from '../../../../../utils/periodo.endpoint';



import AddPeriodoModal from './AddPeriodoModal';
import { comparaFecha, getFormattedHours, shortFormatDate } from '../../../../../utils/utils';
import UpdatePeriodoModal from './UpdatePeriodoModal';
import NotFound from '../not-found';
import { cookies } from 'next/headers';

type PeriodoProps = {
    id_periodo: number;
    fecha_apertura: string;
    fecha_cierre: string;
    concluido: boolean;
}

async function fetchDATA(token: string): Promise<PeriodoProps> {
    let periodo: PeriodoProps;
    try {
        await fetchLatestPeriod(token).then((res) => {
            periodo = res;

            if (periodo) {
                let fechaCierrePeriodo = new Date(periodo.fecha_cierre);
                let fechaActual = new Date();

                periodo.concluido = false;

                if (fechaActual > fechaCierrePeriodo) {

                    periodo.concluido = true;
                }
            } else {
                throw new Error("No hay un periodo")
            }
        })
    } catch (error: any) {

    }
    return periodo!;
}

export default async function AlertPeriod() {
    const cookie = cookies().get("SESATsession")?.value;
    const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";

    const periodo = await fetchDATA(token);

    if(!periodo){
        return <NotFound />
    }

    return (
        <>
            {periodo && periodo.concluido ? (
                <>
                    {/**Si no han pasado mas de 7 dias desde que cerró, dar opcion de editar */}
                    {comparaFecha(new Date(periodo.fecha_cierre)) ? (
                        <div className="alert shadow-lg mb-6 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <div>
                                <h3 className="font-bold">El último periodo ha concluido el dia: {`${shortFormatDate(periodo.fecha_cierre)}`}</h3>
                                <div className="text-xs">En caso de ser necesario, cuenta con una semana a partir de la fecha de cierre para extenderlo</div>
                            </div>
                            <UpdatePeriodoModal idPeriodo={periodo.id_periodo} startDate={new Date(periodo.fecha_apertura)} endDate={new Date(periodo.fecha_cierre)} extender={true} />
                        </div>
                    ) : (
                        <div className="alert shadow-lg mb-6 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <div>
                                <h3 className="font-bold">¡No hay un periodo definido!</h3>
                                <div className="text-xs">El periodo anterior ha concluido, debe establecer uno nuevo para este semestre</div>
                            </div>
                            <AddPeriodoModal idPeriodo={periodo.id_periodo} previousEndDate={new Date(periodo.fecha_cierre)} startDate={new Date()} endDate={new Date()} />
                        </div>
                    )}

                </>
            ) : (
                <>
                    {/**Periodo en curso */}
                    <div className="flex flex-col lg:flex-row gray__border p-4 mb-6 items-center bg-white">

                        <div className="flex flex-col lg:flex-row w-full my-6 lg:my-0 text-center">
                            <div className='mx-auto mb-4 lg:mb-0 w-11/12 px-10 flex flex-col justify-center'>
                                <h3 className="font-bold text-xl">Periodo de entregas de avance</h3>
                                <div className="text-xs mb-3">Fecha de publicación de las asignaciones y fecha límite para que los alumnos entreguen su avance de tesis
                                </div>

                                {periodo && (
                                    <UpdatePeriodoModal idPeriodo={periodo.id_periodo} startDate={new Date(periodo.fecha_apertura)} endDate={new Date(periodo.fecha_cierre)} extender={false} />
                                )}
                            </div>
                            <div className="mx-auto flex items-center">

                                <div className='flex flex-row'>

                                    <div className="w-[130px] lg:w-[150px] h-fit p-2 bg-light-blue-10 border-l-8 border-dark-blue-10 flex flex-col justify-center items-center text-center rounded-lg">
                                        <div className="mb-2">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path></svg>
                                        </div>

                                        {periodo && (
                                            <>
                                                <p className="text-xs mt-1 font-semibold" >{`${shortFormatDate(periodo.fecha_apertura)}`}</p>
                                                <p className="text-[20px] font-extrabold" >{`${getFormattedHours(new Date(periodo.fecha_apertura))}`}</p>
                                            </>
                                        )}
                                        <p className="text-xs mt-1 " >Publicación de asignaciones</p>

                                    </div>
                                    <div className='w-[30px]'></div>

                                    <div className="w-[130px] lg:w-[150px] h-fit p-2 bg-light-blue-10 border-r-8 border-dark-blue-10 flex flex-col justify-center items-center text-center rounded-lg">

                                        <div className="mb-2">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path></svg>
                                        </div>

                                        {periodo && (
                                            <>
                                                <p className="text-xs mt-1 font-semibold" >{`${shortFormatDate(periodo.fecha_cierre)}`}</p>
                                                <p className="text-[20px] font-extrabold" >{`${getFormattedHours(new Date(periodo.fecha_cierre))}`}</p>
                                            </>
                                        )}
                                        <p className="text-xs mt-1 " >Límite de entrega de avances</p>



                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}
