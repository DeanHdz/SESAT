import { Asignacion } from "../../../types/ISESAT";
import { Itable } from "../../../types/ITable";
import Table from "./Table";


const AssingmentStatusBlock = ({
  asignacion,
}: {
  asignacion: Asignacion | undefined;
}) => {

  let status: string;

  switch(asignacion?.estado_entrega){
    case 0:
      status = "Aun no se ha hecho ninguna tarea";
      break;
    case 1:
      status = "Entregado";
      break;
    case 2:
      status = "Entregado con retraso";
      break;
    default:
      status = "Aun no se ha hecho ninguna tarea";
      break;
  }

  let calificacion: number = 0;

  if(asignacion != undefined)
    calificacion = asignacion.calificacion;


  let tableHead: string[] = [];
  let tableBody: string[][] = [
    ["Estatus de la entrega", status],
    ["Estatus de calificación", calificacion == undefined ? "" : calificacion.toString()],
    ["Tiempo restante", ""],
  ];

  let table: Itable = {
    head: tableHead,
    body: tableBody,
  };

  return (
    <div className="border border-light-gray-22 border-solid rounded p-6">
      <article className="prose">
        <h1 className="font-SESAT mt-2">Estatus de la entrega</h1>
      </article>
      <Table table={table} style={"table table-zebra w-full table-auto"} />
    </div>
  );
};

export default AssingmentStatusBlock;
