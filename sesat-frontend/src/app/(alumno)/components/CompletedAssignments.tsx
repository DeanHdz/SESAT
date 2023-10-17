import React from 'react';
import AssignmentPath from './AssignmentPath';

const CompletedAssignments = () => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center p-2">
        <p className="text-2xl font-bold">Asignacion revisada</p>
      </div>
      <div className="bg-[#ffffff] rounded-[15px] border  border-light-gray-22 border-solid w-full p-5">
      <table className="table table-zebra">
          <thead>
            <tr className="text-dark-blue-20">
              <th>Asesor</th>
              <th>Titulo</th>
              <th>Fecha limite de entrega</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>Dean Joshua Hernandez</td>
                  <td>Avance 2024/2025 II</td>
                  <td>2025-05-15 23:59:59</td>
                  <td>
                    <div >
                      <AssignmentPath />
                    </div>
                  </td>
                </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedAssignments;