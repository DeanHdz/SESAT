/*const LandingLogin = () =>
{
  return(
    <div className="w-inherit h-inherit flex flex-col items-center">
      <div className="form-control mt-28 w-3/6">
        <label className="input-group input-group-vertical">
        <label className="label bg-transparent mb-6">
          <span className="label-text bg-transparent text-xl">Clave Única</span>
        </label>
          <input type="text" placeholder="Clave Única" className="input input-bordered" />
        </label>
      </div>
      <div className="form-control mt-6 w-3/6">
        <label className="input-group input-group-vertical">
            <label className="label bg-transparent mb-6">
              <span className="label-text bg-transparent text-xl">Contraseña</span>
            </label>
          <input type="text" placeholder="Contraseña Institucional" className="input input-bordered" />
        </label>
      </div>
      <button className="mt-16 btn bg-[#8c969f] border-transparent w-2/6"> Iniciar Sesión (Ingresar) </button>
    </div>
  )
}*/

export default LandingLogin

import { useState } from "react";
import axios from "axios";
import { SESAT } from "../../../Interfaces/ISESAT";
 
const LandingLogin = () => {
 
  const [claveUnica, setClaveUnica] = useState("");
  const [constraseña, setContraseña] = useState("");
 
  async function handleSubmit (e:any) {
    e.preventDefault();
    try {
      console.log(claveUnica, constraseña);
      const resp = await axios.post<User>('http://localhost:8000',{
      claveUnica: claveUnica,
      contraseña: constraseña      
      });
      
      const user: User = resp.data as User;
      console.log(user.nombre);      
      
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
