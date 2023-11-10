import { Asignacion } from '../../../../../types/ISESAT';
import AssignmentPath from './AssignmentPath';
import { shortFormatDate } from '../../../../../utils/utils';

type AsignacionProps = {
  id_asignacion: number,
  num_avance: number,
  titulo: string,
  fecha_entrega: string,
  fecha_cierre: string,
  fecha_cierre_opc: string,
  id_grado_estudio: number
}



const CompletedAssignments = ({ asignaciones }: { asignaciones: AsignacionProps[] }) => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center p-2">
        <p className="text-2xl font-bold">Asignaciones</p>
      </div>
      <div className="bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full p-5">
        <table className="table table-zebra">
          <thead>
            <tr className="text-dark-blue-20">
              <th>Num. de Avance</th>
              <th>Titulo</th>
              <th>Fecha límite de entrega</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {asignaciones?.map((alumno, i) => (
              <>
                <tr
                  key={alumno.id_asignacion}
                >
                  <td>{alumno.num_avance}</td>
                  <td>{alumno.titulo}</td>
                  <td>
                    {alumno.id_grado_estudio === 2 && alumno.num_avance === 5 ? (
                      <span>{shortFormatDate(alumno.fecha_cierre_opc)}</span>
                    ) : (
                      <>
                      { (
                        <span>{shortFormatDate(alumno.fecha_cierre)}</span>
                      )}
                      </>
                    )}
                  </td>
                  <td>
                    <div>
                      <AssignmentPath idAsignacion={alumno.id_asignacion} />
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