"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginEndpoint } from "../../../../utils/login.endpoint";
import ProcessingAnim from "@/app/components/ProcessingAnim";

const LandingLogin = () => {
  {
    /** ReactSession.setStoreType("sessionStorage");*/
  }
  const [failed, setFailed] = useState(false);
  const [claveUnica, setClaveUnica] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const token = await LoginEndpoint.loginUser({
        username: claveUnica,
        password: contraseña,
      });      
      const role = await LoginEndpoint.getUserRole(token.token);
      console.log(role)
      setIsSubmitting(false);
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
      setIsSubmitting(false);
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
      <div className="mt-3 h-14 w-fit flex items-center justify-center">
        {isSubmitting && (
          <ProcessingAnim title=""/>
        )}
      </div>
      <button
        type="submit"
        className="mt-3 btn bg-[#8c969f] border-transparent w-2/6"
      >
        {" "}
        Iniciar Sesión (Ingresar){" "}
      </button>
      <div className="flex justify-center">
        {failed && (
          <div className="m-auto flex flex-row mt-10">
            <p className="text-xl font-SESAT text-red-400">Credenciales incorrectas</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default LandingLogin;
