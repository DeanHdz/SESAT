import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UsuarioEndpoint } from "../../../api/usuario.endpoint";
import { ReactSession } from "react-client-session";

const LandingLogin = () => {
  ReactSession.setStoreType("sessionStorage");
  const [failed, setFailed] = useState(false);
  const [claveUnica, setClaveUnica] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const resp = await UsuarioEndpoint.getUsuario(parseInt(claveUnica), "");
      console.log(resp);
      if (resp && resp.password === contraseña) {
        sessionStorage.setItem(
          "loggedUser",
          JSON.stringify({
            mensage: "Inicio de sesión correcto",
            usuario: resp,
            token: "",
          })
        );

        /*switch(resp.id_rol) //handle boards
        {
          case 1: //admin
            navigate("/admin-board");
            break;
          case 2: //asesor
          case 4: //asesor externo
            navigate("/asesor-board");
            break;
          case 3: //alumno
            navigate("/board");
            break;
        }*/
      } else {
        setFailed(true);
      }
    } catch (err) {
      setFailed(true);
      console.log(err);
    }
  }

  useEffect(() => {
    if (failed) {
      setTimeout(() => {
        setFailed(false);
      }, 2000);
    }
  }, [failed]);

  return (
    <form
      className="w-inherit h-inherit flex flex-col items-center"
      onSubmit={handleSubmit}
    >
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
            required
            maxLength={6}
            onChange={(e) => {
              setClaveUnica(e.target.value);
            }}
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
            value={contraseña}
            required
            onChange={(e) => {
              setContraseña(e.target.value);
            }}
            className="input input-bordered"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-16 btn bg-[#8c969f] border-transparent w-2/6"
      >
        {" "}
        Iniciar Sesión (Ingresar){" "}
      </button>
      <div className="flex justify-center">
        {failed && (
          <div className="m-auto flex flex-row mt-10">
            <p className="text-xl">Clave unica o contraseña incorrecta</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default LandingLogin;
