import { Itable } from "../../../types/ITable";



const Table = ({table, style} : {table:Itable, style:string}) =>
{
  let tableHead = [];
  for(let i=0; i<table.head.length; i++)
  {
    tableHead.push(<th key={i}> {table.head[i]} </th>);
  }
  
  let tableBody = [];
  for(let i=0; i<table.body.length; i++)
  {
    let tableBodySection = [];
    for(let y=0; y<table.body[i].length; y++)
    {
      tableBodySection.push(<td key={i}>{table.body[i][y]}</td>);
    }
    tableBody.push(<tr> {tableBodySection} </tr>);
  }

  return(
    <div className="overflow-x-auto mt-4">
        <table className={`${style}`}>
          <thead>
            <tr>
              {tableHead}
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </div>
  )
}

export default Table