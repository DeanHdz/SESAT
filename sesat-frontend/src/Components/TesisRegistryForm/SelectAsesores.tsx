import { SESAT } from "../../Interfaces/ISESAT"

const SelectAsesores = ({asesores} : {asesores: SESAT.Usuario[]}) =>
{
  return(
    <>
    {
      asesores.map((asesor,i) => <option key={`${i}${asesores[i].clave}`} value={`${asesores[i].clave}`}> {asesores[i].name + " " + asesores[i].last_name + " " + asesores[i].family_name} </option>)
    }
    </>
  )
}

export default SelectAsesores