import { fetchLatestPeriod } from "../../../../../../../../utils/periodo.endpoint";
import { fetchCountAlumnosDoctoradoOfNumAv } from "../../../../../../../../utils/tesis.endpoint";
import { getFormattedHours, shortFormatDate } from "../../../../../../../../utils/utils";



const GenInfoPhd = ({ endDate, count, numAvance }: { endDate: string, count: string, numAvance: string }) => {

    //const alumnos: CountProps= fetchCountAlumnosDoctoradoOfNumAv(numAvance, "");
    return (
        <div className="w-full h-fit mt-6 bg-light-blue-10 gray__border">
            <div className="px-6 py-3 mb-3 flex flex-row items-center text-xl font-semibold border-b">
                <span>Información General</span>

            </div>
            <div className="w-full flex flex-row h-fit px-6 pb-3">


                <div className="flex flex-col  ">
                    <label className="mb-3 block text-md font-semibold">
                        Alumnos Inscritos
                    </label>

                    <div className="flex flex-row">
                        <div className="flex flex-row justify-center items-center">
                            <div className="mr-2">
                                <svg className="opacity-70" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M12,13 C14.209139,13 16,11.209139 16,9 C16,6.790861 14.209139,5 12,5 C9.790861,5 8,6.790861 8,9 C8,11.209139 9.790861,13 12,13 Z M6,22 L6,19 C6,15.6862915 8.6862915,13 12,13 C15.3137085,13 18,15.6862915 18,19 L18,22 M13,5 C13.4037285,3.33566165 15.0151447,2 17,2 C19.172216,2 20.98052,3.790861 21,6 C20.98052,8.209139 19.172216,10 17,10 L16,10 L17,10 C20.287544,10 23,12.6862915 23,16 L23,18 M11,5 C10.5962715,3.33566165 8.98485529,2 7,2 C4.82778404,2 3.01948003,3.790861 3,6 C3.01948003,8.209139 4.82778404,10 7,10 L8,10 L7,10 C3.71245602,10 1,12.6862915 1,16 L1,18"></path></svg>
                            </div>
                            <p>{count}</p>
                        </div>

                    </div>

                </div>

                {/**Fecha limite de entrega para la 1er evaluacion (4to avance) */}
                {numAvance === '4' && (
                    <div className="flex flex-col ml-16 ">
                        <label className="mb-3 block text-md font-semibold">
                            Evaluación de Inicio
                        </label>

                        <div className="flex flex-row">
                            <div className="flex flex-row justify-center items-center">
                                <div className="mr-2">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path></svg>
                                </div>
                                <p>{shortFormatDate(endDate)}</p>
                            </div>
                            <div className="flex flex-row justify-center items-center ml-6">
                                <div className="mr-2">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
                                </div>
                                <p>{getFormattedHours(new Date(endDate))}</p>
                            </div>
                        </div>

                    </div>
                )}
                
                {/**General [Fecha de cierre] */}
                <div className="flex flex-col ml-16 ">
                    <label className="mb-3 block text-md font-semibold">
                        {numAvance === '4' ? (
                            <>
                                <span>Evaluación final</span>
                            </>
                        ) : (
                            <>
                                <span>Fecha Límite de Entrega de Avances</span>
                            </>
                        )}
                    </label>

                    <div className="flex flex-row">
                        <div className="flex flex-row justify-center items-center">
                            <div className="mr-2">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path></svg>
                            </div>
                            <p>{shortFormatDate(endDate)}</p>
                        </div>
                        <div className="flex flex-row justify-center items-center ml-6">
                            <div className="mr-2">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
                            </div>
                            <p>{getFormattedHours(new Date(endDate))}</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default GenInfoPhd