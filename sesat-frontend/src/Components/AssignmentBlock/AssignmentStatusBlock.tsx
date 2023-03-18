import Table from "../Table/Table"
import { Itable } from "../../Interfaces/ITable"

let tableHead: string[] = [];
let tableBody: string[][]= [
                              ["Estatus de la entrega", "Aun no se ha hecho ninguna tarea"],
                              ["Estatus de calificación", ""],
                              ["Tiempo restante", ""],
                              ["Última modificación", ""]
                            ]

let table: Itable =
{
  head: tableHead,
  body: tableBody
}

const AssingmentStatusBlock = () =>
{
  return(
    <div>
      <article className="prose">
        <h1 className="font-SESAT mt-2">
          Estatus de la entrega
        </h1>
      </article>
      <Table table={table} style={"table table-zebra w-full table-auto"}/>
    </div>
  )
}

export default AssingmentStatusBlock