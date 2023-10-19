import React from 'react';
import AssignmentPath from './AssignmentPath';
import { shortFormatDate } from '../../../../../utils/utils';

type AsignacionProps = {
  id_tesis: number,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  titulo: string,
  fecha_entrega: string,
}


const CompletedAssignments = ({asignaciones}:{asignaciones: AsignacionProps[]}) => {
    
  return (
    <div className="w-full">
      <div className="w-full flex justify-center p-2">
        <p className="text-2xl font-bold">Asignaciones completadas</p>
      </div>
      <div className="bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full p-5">
        <table className="table table-zebra">
          <thead>
            <tr className="text-dark-blue-20">
              <th>Asesorado</th>
              <th>Título</th>
              <th>Fecha de entrega</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {asignaciones?.map((alumno, i) => (
              <>
                <tr
                  key={alumno.id_tesis}
                //onClick={() => setSelectedUser(user)}
                /** Visualizar la seleccion de un renglon*/
                /*className={
                  selectedUser?.clave === user.clave
                    ? "bg-dark-blue-10 rounded text-white cursor-pointer"
                    : "cursor-pointer"
                }*/
                >
                  <td>{`${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`}</td>
                  <td>{alumno.titulo}</td>
                  <td>{shortFormatDate(alumno.fecha_entrega)}</td>
                  <td>
                    <div>
                      <AssignmentPath />
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedAssignments;

/*

<div className="w-full p-2 items-start gap-[3px]">
      <div className="w-full flex justify-center pt-5 pb-5">
        <p className="text-3xl font-bold">Asignaciones completadas</p>
      </div>
      <div className="inline-flex flex-col items-start gap-[10px] relative flex-[0_0_auto]">
        <div className="border border-light-gray-22 border-solid w-full bg-[#ffffff] rounded-[15px]" />
        <div className="inline-flex flex-col items-start gap-[4px] absolute top-[9px] left-[32px]">
          <div className="inline-flex items-end gap-[197px] relative flex-[0_0_auto]">
            <div className="relative w-[90px] h-[35px] mt-[-1.00px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] text-center tracking-[0] leading-[normal]">
              Asesorado
            </div>
            <div className="relative w-[71px] h-[33px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] text-center tracking-[0] leading-[normal]">
              Título
            </div>
            <div className="relative w-[192px] h-[35px] mt-[-1.00px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] text-center tracking-[0] leading-[normal]">
              Fecha limite de entrega
            </div>
          </div>
          <div className="inline-flex items-center gap-[55px] relative flex-[0_0_auto]">
            <div className="relative w-[205px] h-[51px] mt-[-1.00px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] tracking-[0] leading-[normal]">
              Dean Joshua Hernandez
            </div>
            <div className="relative w-[207px] h-[19px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
              Avance 2024/2025 II
            </div>
            <div className="relative w-[231px] h-[19px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
              2025-05-15 23:59:59
            </div>
            <div className="flex w-[159px] h-[35px] items-center justify-center gap-[10px] px-[12px] py-px relative bg-blue rounded-[15px] overflow-hidden">
              <div className="relative w-[146px] ml-[-5.50px] mr-[-5.50px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#ffffff] text-[16px] text-center tracking-[0] leading-[normal]">
                Ver asignación
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-[55px] relative flex-[0_0_auto]">
            <div className="relative w-[205px] h-[51px] mt-[-1.00px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] tracking-[0] leading-[normal]">
              Dean Joshua Hernandez
            </div>
            <div className="relative w-[207px] h-[19px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
              Avance 2024/2025 II
            </div>
            <div className="relative w-[231px] h-[19px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
              2025-05-15 23:59:59
            </div>
            <div className="flex w-[159px] h-[35px] items-center justify-center gap-[10px] px-[12px] py-px relative bg-blue rounded-[15px] overflow-hidden">
              <div className="relative w-[146px] ml-[-5.50px] mr-[-5.50px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#ffffff] text-[16px] text-center tracking-[0] leading-[normal]">
                Ver asignación
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-[55px] relative flex-[0_0_auto]">
            <div className="relative w-[205px] h-[51px] mt-[-1.00px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] tracking-[0] leading-[normal]">
              Dean Joshua Hernandez
            </div>
            <div className="relative w-[207px] h-[19px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
              Avance 2024/2025 II
            </div>
            <div className="relative w-[231px] h-[19px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
              2025-05-15 23:59:59
            </div>
            <div className="flex w-[159px] h-[35px] items-center justify-center gap-[10px] px-[12px] py-px relative bg-blue rounded-[15px] overflow-hidden">
              <div className="relative w-[146px] ml-[-5.50px] mr-[-5.50px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#ffffff] text-[16px] text-center tracking-[0] leading-[normal]">
                Ver asignación
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-[55px] relative flex-[0_0_auto]">
            <div className="relative w-[205px] h-[51px] mt-[-1.00px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] tracking-[0] leading-[normal]">
              Dean Joshua Hernandez
            </div>
            <div className="relative w-[207px] h-[19px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
              Avance 2024/2025 II
            </div>
            <div className="relative w-[231px] h-[19px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#000000] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
              2025-05-15 23:59:59
            </div>
            <div className="primary_btn flex items-center justify-center rounded-[15px]">
              <div className="relative w-[146px] ml-[-5.50px] mr-[-5.50px] font-medium text-[#ffffff] text-[16px] text-center tracking-[0] leading-[normal]">
                Ver asignación
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>


*/