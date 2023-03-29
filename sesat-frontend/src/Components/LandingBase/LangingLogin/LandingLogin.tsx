import { useState } from "react";
import { UsuarioEndpoint } from "../../../api/usuario.endpoint";
 
const LandingLogin = () => {
 
  const [claveUnica, setClaveUnica] = useState(""); //cum
  const [constraseña, setContraseña] = useState("");
 
  async function handleSubmit (e:any) {
    e.preventDefault();
    try {
      console.log(claveUnica, constraseña);
      const resp = UsuarioEndpoint.getUsuario(parseInt(claveUnica),"");
      console.log(resp + "I'm resp"); //por qué no se imprime?
    }            
    catch(err) {
      console.log(err);
    }
  }
 
  return (
    <form className="w-inherit h-inherit flex flex-col items-center" onSubmit={handleSubmit}>
      <div className="form-control mt-28 w-3/6">
        <label className="input-group input-group-vertical">
          <label className="label bg-transparent mb-6">
            <span className="label-text bg-transparent text-xl">
              Clave Única
            </span>
          </label>
          <input
            type="text"
            placeholder="Clave Única"
            value={claveUnica}
            onChange={
              (e) => {
                setClaveUnica(e.target.value);
              }
            }
            className="input input-bordered"
          />
        </label>
      </div>
      <div className="form-control mt-6 w-3/6">
        <label className="input-group input-group-vertical">
          <label className="label bg-transparent mb-6">
            <span className="label-text bg-transparent text-xl">
              Contraseña
            </span>
          </label>
          <input
            type="password"
            placeholder="Contraseña Institucional"
            value={constraseña}
            onChange={
              (e) => {
                setContraseña(e.target.value);
              }
            }
            className="input input-bordered"
          />
        </label>
      </div>
      <button type="submit" className="mt-16 btn bg-[#8c969f] border-transparent w-2/6">
        {" "}
        Iniciar Sesión (Ingresar){" "}
      </button>
    </form>
  );
};
 
export default LandingLogin;
