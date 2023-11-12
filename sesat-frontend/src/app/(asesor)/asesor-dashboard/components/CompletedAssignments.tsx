import React from 'react';
import AssignmentPath from '../../../components/AssignmentPath';
import { shortFormatDate } from '../../../../../utils/utils';

type AsignacionProps = {
  num_avance: number;
  id_asignacion: number,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  calificacion: number;
  id_acta_evaluacion: number;
  id_formato_evaluacion: number;
  titulo: string,
  fecha_entrega: string,
  grado: number;
}


const CompletedAssignments = ({ asignaciones }: { asignaciones: AsignacionProps[] }) => {

  return (
    <div className="bg-[#ffffff] gray__border w-full p-6 overflow-x-scroll lg:overflow-hidden">
      <div className="w-full flex py-2">
        <p className="text-xl font-SESAT">Avances de tesis completados</p>
      </div>

      <table className=" table table-zebra">
        <thead className=''>
          <tr className="text-dark-blue-20">
            <th>Alumno</th>
            <th>Título del avance</th>
            <th>Grado</th>
            <th>Avance</th>
            <th>Fecha de entrega</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {asignaciones?.map((alumno, i) => (
            <>
              <tr
                key={alumno.id_asignacion}
              >
                <td>{`${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`}</td>
                <td>{alumno.titulo}</td>
                <td>{alumno.grado === 1 ? 'Maestría' : 'Doctorado'}</td>
                <td>{alumno.num_avance}</td>
                <td>{shortFormatDate(alumno.fecha_entrega)}</td>
                <td>
                  <div>
                    <AssignmentPath baseUrl='asesor-dashboard/asesor-assignment' idAsignacion={alumno.id_asignacion} />
                  </div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
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