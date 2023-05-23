import { useEffect, useState } from "react";
import { render } from "react-dom";
import { useNavigate } from "react-router";
import { AsesorEndpoint } from "../../api/asesor.endpoint";
import { ProgramaEndpoint } from "../../api/programa.endpoint";
import { TesisEndpoint } from "../../api/tesis.endpoint";
import { SESAT } from "../../Interfaces/ISESAT";
import SelectAsesores from "./SelectAsesores";
import SelectProgramas from "./SelectProgramas";
import { ReactSession } from "react-client-session";
import { UsuarioEndpoint } from "../../api/usuario.endpoint";

export const TesisRegistryForm = () => {
  const [user, setUser] = useState<SESAT.LoggedUser>(JSON.parse(sessionStorage.getItem("loggedUser") || '{}'));
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asesor, setAsesor] = useState("");
  const [coAsesor, setCoAsesor] = useState("");
  const [programa, setPrograma] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [generacion, setGeneracion] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      console.log(user);

      if (user) {
        const resp = await TesisEndpoint.postTesis(
          {
            clave_alumno: user.clave,
            clave_asesor: parseInt(asesor),
            id_programa: parseInt(programa),
            titulo: nombre,
            fecharegistro: new Date(),
            generacion: generacion,
            modalidad: modalidad,
          },
          ""
        );
        if (resp) {
          navigate("/view_tesis");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const [Asesores, setAsesores] = useState<SESAT.Usuario[] | undefined>(
    undefined
  );
  //custom Hook para sacar los datos de los asesores del backend
  const getAsesoresData = async () => {
    setAsesores(await UsuarioEndpoint.getAsesores(""));
  };

  useEffect(() => {
    getAsesoresData();
  }, []);

  const renderSelectAsesores = () => {
    if (Asesores != undefined) {
      return <SelectAsesores asesores={Asesores} />;
    }
  };

  const [Programas, setProgramas] = useState<SESAT.Programa[] | undefined>(
    undefined
  );
  //custom Hook para sacar los datos de los asesores del backend
  const getProgramasData = async () => {
    setProgramas(await ProgramaEndpoint.getProgramas(""));
  };

  useEffect(() => {
    getProgramasData();
  }, []);

  const renderSelectProgramas = () => {
    if (Programas != undefined) {
      return <SelectProgramas programas={Programas} />;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row w-screen">
        <div className="w-3/6">
          <div className="flex flex-col mt-10 ml-10">
            <label className="mb-3 block text-lg font-bold">
              Nombre de la Tesis
            </label>
            <input
              className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
              type="text"
              placeholder="Nombre/Tema completo de la tesis"
              required
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
            <label className="mb-3 block text-lg font-bold">Asesor</label>
            <select
              className="select h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
              required
              onChange={(e) => {
                setAsesor(e.target.value);
              }}
            >
              <option disabled selected>
                Nombre completo Asesor/a
              </option>
              {
                renderSelectAsesores() //display las opciones de asesores de manera condicional
              }
            </select>
            <div className="flex flex-row">
              <div className="w-5/6">
                <label className="mb-3 block text-lg font-bold">Coasesor</label>
                <input
                  className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
                  type="text"
                  placeholder="Nombre completo Coasesor/a"
                  required
                  onChange={(e) => {
                    setCoAsesor(e.target.value);
                  }}
                />
              </div>
              <div className="w-1/6">
                <label className="mb-3 block text-lg font-bold">Añadir</label>
                <button className="shadow rounded h-1/4 w-[60px] hover:border hover:border-[#003067]">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/6">
          <div className="flex flex-col mt-10 ml-10">
            <label className="mb-3 block text-lg font-bold">Modalidad</label>
            <select
              className="select h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
              required
              onChange={(e) => {
                setModalidad(e.target.value);
              }}
            >
              <option disabled selected>
                Tiempo Completo / Medio Tiempo
              </option>
              <option>Tiempo Completo</option>
              <option>Medio Tiempo</option>
            </select>
            <label className="mb-3 block text-lg font-bold">Programa</label>
            <select
              className="select h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
              required
              onChange={(e) => {
                console.log("texto" + e.target.value);
                setPrograma(e.target.value);
              }}
            >
              <option disabled selected>
                Programa al que pertenece
              </option>
              {renderSelectProgramas()}
            </select>
            <label className="mb-3 block text-lg font-bold">
              Generación del alumno
            </label>
            <input
              className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
              type="text"
              placeholder="AAAA"
              required
              onChange={(e) => {
                setGeneracion(e.target.value);
              }}
            />
            <div className="w-5/6">
              <label className="mb-3 block text-lg font-bold">
                Subir un archivo (opcional)
              </label>
              <input
                type="file"
                className="file-input w-5/6 mb-10 hover:border hover:border-[#003067]"
              />
            </div>
            <div className="w-2/6">
              <button className="shadow rounded h-2/4 w-[60px] hover:border hover:border-[#003067] bg-red">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TesisRegistryForm;
