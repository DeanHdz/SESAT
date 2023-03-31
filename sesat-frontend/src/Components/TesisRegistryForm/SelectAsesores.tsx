import { SESAT } from "../../Interfaces/ISESAT"

const SelectAsesores = ({asesores} : {asesores: SESAT.Asesor[]}) =>
{
  return(
    <>
    {
      asesores.map((asesor,i) => <option key={`${i}${asesores[i].asesor_id}`} value={`${asesores[i].clave}`}> {asesores[i].nombre} </option>)
    }
    </>
  )
}

export default SelectAsesores