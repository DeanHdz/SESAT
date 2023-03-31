import { SESAT } from "../../Interfaces/ISESAT"

const SelectProgramas = ({programas} : {programas: SESAT.Programa[]}) =>
{
  return(
    <>
    {    
      programas.map((programa,i) => <option key={`${i}${programas[i].id_programa}`} value={`${programas[i].id_programa}`}> {programas[i].nombreprograma} </option>)
    }
    </>
  )
}

export default SelectProgramas