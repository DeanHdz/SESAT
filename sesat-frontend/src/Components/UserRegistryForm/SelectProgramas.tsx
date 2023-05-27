import { SESAT } from "../../Interfaces/ISESAT"

const SelectProgramas = ({programas} : {programas: SESAT.Programa[]}) =>
{
  return(
    <>
    {
      programas.map((programa,i) => <option key={`${i}`} value={ (programa.id_programa) }> {programa.nombreprograma} </option>)
    }
    </>
  )
}

export default SelectProgramas