"use client";
import React, { useState } from 'react'
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";


const AddPeriodoModal = ({ startDate, endDate }: { startDate: Date, endDate: Date }) => {
        
    const [start, setStartDate] = useState<Date | undefined>(startDate)
    const [end, setEndDate] = useState<Date | undefined>(endDate)
    let info = '¿Cómo funciona? El inicio y fin del periodo marcan la apertura y cierre de los avances de tesis'

    return (
        <dialog id="new_periodo_modal" className="modal overflow-y-auto flex-grow">
            <div className="modal-box max-w-[600px]  no-scrollbar">
                <div className="w-full flex flex-row h-fit items-center">
                    <h3 className="font-bold text-lg">Establecer Periodo Semestral</h3>
                    <div className='tooltip tooltip-left w-[24px] h-[24px] ml-auto rounded-full flex items-center justify-center hover:bg-light-gray-22' data-tip={info}>

                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"></path><path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"></path><circle cx="8" cy="4.5" r="1"></circle></svg>
                    </div>
                </div>
                <div className="border-b gray__border mb-3"></div>

                <h3 className="font-thin text-[12px]">Presione ESC para cancelar</h3>

                <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <form method="submit" className="flex flex-col w-full">


                        {/**Fecha Inicio */}
                        <div className="h-fit flex flex-row w-full items-center mb-3">
                            <div className="w-[24px] mr-3">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path><path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path></svg>
                            </div>
                            <p>Inicio del semestre</p>
                            <Flatpickr
                                className="gray__border w-full ml-3"
                                options={{
                                    enableTime: true,
                                    noCalendar: false,
                                    static: true,
                                }}
                                //data-enable-time

                                placeholder="Inicio"
                                value={start}
                                onChange={([date]) => {
                                    setStartDate(date)
                                }}
                            />
                        </div>

                        {/**Fecha Fin */}
                        <div className="h-fit flex flex-row w-full items-center mb-3">
                            <div className="w-[24px] mr-3">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path><path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path></svg>

                            </div>
                            <p>Fin del semestre</p>
                            <Flatpickr
                                className="gray__border w-full ml-3"
                                options={{
                                    enableTime: true,
                                    noCalendar: false,
                                    static: true,
                                }}
                                placeholder="Fin"
                                value={end}
                                onChange={([date]) => {
                                    setEndDate(date)
                                }}
                            />
                        </div>

                        <div className="w-full flex justify-end mt-3">
                            <button className="primary__btn" type='submit'>Crear Periodo</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddPeriodoModal;