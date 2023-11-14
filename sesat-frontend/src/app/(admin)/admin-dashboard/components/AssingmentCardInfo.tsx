"use client";

import { useRouter } from "next/navigation";

const AssingmentCardInfo = ({ title, subtitle, tipo, pendientes, entregadas, avance, activa }: { title: string, subtitle: string, tipo: number, pendientes: number, entregadas: number, avance: string, activa: boolean }) => {
    const navigate = useRouter()
    const handleClick = () => {
        if(activa){
            navigate.push(`/admin-dashboard/assignments/phd/${avance}/details/${tipo}`)
        }else{
            navigate.push(`/admin-dashboard/assignments/phd/${avance}/create-assignment/${tipo}`)
        }        
    }

    return (
        <>
            <div className="gray__border mt-6 alert bg-light-blue-10 cursor-pointer" onClick={handleClick}>
                <div className="w-[40px]">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z"></path></g></svg>
                </div>

                <div className="flex flex-col ml-3">
                    <h3 className="font-SESAT">{title}</h3>

                    <p className="font-semibold text-sm text-black/60">{subtitle}</p>

                    <p className="font-thin text-sm">
                        {activa ? (
                            `(${entregadas}) alumnos han entregado su avance`
                        ) : (
                            `(${pendientes}) alumnos pendientes de asignar`                            
                        )}
                    </p>
                </div>
            </div>
        </>
    )
}

export default AssingmentCardInfo