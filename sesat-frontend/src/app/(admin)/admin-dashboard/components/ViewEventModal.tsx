import React from 'react'




const ViewEventModal = ({eventTitle, startDate}:{eventTitle: string; startDate: Date;}) => {

    let days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

    function getFormattedHours(date: any): string {
        let hours = date?.getHours();
        let minutes = date?.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // La hora '0' debe ser '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return hours + ':' + minutes + ' ' + ampm;
    }

    return (
        <dialog id="view_event_modal" className="modal">
            <div className="modal-box h-[300px] w-[300px]">
                <div className="w-full">
                    <div className="font-bold text-3xl">{startDate?.getDate().toLocaleString()}</div>
                    <div className="font-light text-sm">{days[startDate?.getDay()!]}</div>
                </div>
                <div className="border-b gray__border mb-3"></div>
                <h3 className="font-bold text-lg">{eventTitle}</h3>
                <p>{getFormattedHours(startDate)}</p>

                <div className="modal-action mt-[90px]">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="secondary__btn">Cerrar</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default ViewEventModal;
