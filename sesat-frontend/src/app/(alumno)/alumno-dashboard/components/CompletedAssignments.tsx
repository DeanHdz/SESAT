import AssignmentPath from '@/app/components/AssignmentPath';
import { shortFormatDate } from '../../../../../utils/utils';

type AsignacionProps = {
  id_asignacion: number,
  num_avance: number,
  titulo: string,
  fecha_entrega: string,
  fecha_cierre: string,
  fecha_cierre_opc: string,
  tipo: number,
  id_grado_estudio: number
}

const CompletedAssignments = ({ asignaciones }: { asignaciones: AsignacionProps[] }) => {
  return (
    <div className="bg-[#ffffff] gray__border w-full p-6 overflow-x-scroll lg:overflow-hidden">
      <div className="w-full py-2">
        <p className="text-xl font-SESAT">Avances de tesis</p>
      </div>
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
                <td>{alumno.id_grado_estudio === 1 ? alumno.num_avance - 1 : alumno.num_avance}</td>
                <td>{alumno.titulo}</td>
                <td>
                  {alumno.tipo === 2 ? (
                    <span>{shortFormatDate(alumno.fecha_cierre_opc)}</span>
                  ) : (
                    <>
                      {(
                        <span>{shortFormatDate(alumno.fecha_cierre)}</span>
                      )}
                    </>
                  )}
                </td>
                <td>
                  <div>
                    <AssignmentPath baseUrl='alumno-dashboard/alumno-assignment' idAsignacion={alumno.id_asignacion} />
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