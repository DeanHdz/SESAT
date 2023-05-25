import { SESAT } from "../../Interfaces/ISESAT"

const SelectAsesores = ({asesores} : {asesores: SESAT.Usuario[]}) =>
{
  return(
    <>
    {
      asesores.map((asesor,i) => <option key={`${i}`} value={`${asesores[i].clave}`}> {asesores[i].nombre + " " + asesores[i].apellido_paterno + " " + asesores[i].apellido_materno} </option>)
    }
    </>
  )
}

export default SelectAsesores