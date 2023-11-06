"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginEndpoint } from "../../../../utils/login.endpoint";

const LandingLogin = () => {
  {
    /** ReactSession.setStoreType("sessionStorage");*/
  }
  const [failed, setFailed] = useState(false);
  const [claveUnica, setClaveUnica] = useState("");
  const [contraseña, setContraseña] = useState("");
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const token = await LoginEndpoint.loginUser({
        username: claveUnica,
        password: contraseña,
      });
      const role = await LoginEndpoint.getUserRole(token.token);
      console.log(role)
      switch(role.rol)
      {
        case "Administrador":
          console.log("???")
          router.push("/admin-dashboard");
          break;
        case "Asesor":
          router.push("/asesor-dashboard");
          break;
        case "Alumno":
          router.push("/alumno-dashboard");
          break; 
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
            maxLength={7}
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
            <p className="text-xl">Credenciales incorrectas</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default LandingLogin;
