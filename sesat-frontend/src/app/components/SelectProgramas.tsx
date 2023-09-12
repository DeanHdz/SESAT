import { Programa } from "../../../types/ISESAT"



const SelectProgramas = ({programas} : {programas: Programa[]}) =>
{
  return(
    <>
    {    
      programas.map((programa,i) => <option key={`${i}`} value={`${programas[i].id_programa}`}> {programas[i].nombreprograma} </option>)
    }
    </>
  )
}

export default SelectProgramas