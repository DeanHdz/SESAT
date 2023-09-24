import { UsuarioEndpoint } from "../../../../../../../utils/usuario.endpoint";
import { Usuario } from "../../../../../../../types/ISESAT";
import Search from "./components/Search";

export default async function SearchMastersStudents() {
  const usuariosData: Promise<Usuario[]> = UsuarioEndpoint.getAlumnosMaestria("[token]");
  const usuarios = await usuariosData;
  
  return (
    <Search usuarios={usuarios} />
  );
}
