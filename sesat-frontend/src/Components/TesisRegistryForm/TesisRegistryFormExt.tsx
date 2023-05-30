import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ProgramaEndpoint } from "../../api/programa.endpoint";
import { TesisEndpoint } from "../../api/tesis.endpoint";
import { SESAT } from "../../Interfaces/ISESAT";
import SelectAsesores from "./SelectAsesores";
import SelectProgramas from "./SelectProgramas";
import { UsuarioEndpoint } from "../../api/usuario.endpoint";
import { ComiteEndpoint } from "../../api/comite.endpoint";
import { DatosAsesorExternoEndpoint } from "../../api/datos-asesorexterno.endpoint";
import { VariablesSistemaEndpoint } from "../../api/variables-sistema.endpoint";

import { encode } from "base64-arraybuffer";
import { TbFileSpreadsheet } from "react-icons/tb";

export const TesisRegistryFormExt = () => {
  const [user, setUser] = useState<SESAT.LoggedUser>(
    JSON.parse(sessionStorage.getItem("loggedUser") || "{}")
  );
  const [tesis, setTesis] = useState<SESAT.Tesis>();

  const GetTesis = async () => {
    if (user)
      setTesis(await TesisEndpoint.getTesisPerStudent(user.usuario.clave, ""));
  };

  useEffect(() => {
    GetTesis();
  }, []);

  const [nombreExterno, setNombreExterno] = useState<string>();
  const [apPatExterno, setApPatExterno] = useState<string>();
  const [apMatExterno, setApMatExterno] = useState<string>();
  const [correo, setCorreo] = useState<string>();
  const [telefono, setTelefono] = useState<string>();
  const [institucion, setInstitucion] = useState<string>();

  const [nombre, setNombre] = useState("");
  const [asesor, setAsesor] = useState("");
  const [coAsesor, setCoAsesor] = useState("");

  const [fileSelected, setFileSelected] = useState<Blob | undefined>();
  const [idenfificador, setIdentificador] = useState("");

  const navigate = useNavigate();

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

  async function handleSubmit(e: any) {
    console.log("handleSubmit");
    e.preventDefault();
    try {
      /*if (fileSelected) {
        //bytea
        var rdr = new FileReader();
        rdr.readAsArrayBuffer(fileSelected);        
        //onload se ejecuta cuando el recurso termina de cargar          
        rdr.onload = async () => { 
          var uint8View = new Uint8Array(rdr.result as ArrayBuffer);  
          //Codificar a base64 antes de enviar        
          //const base64String = fromByteArray(uint8View);
          const base64String = encode(uint8View);
          console.log(base64String);
          const resp = await UploadPDF_Endpoint.postPDF(//Cambiar por Asignacion.Endpoint
            {
              id_formatos: parseInt(idenfificador),
              acta_evaluacion: base64String,
            },
            ""
          );
          if (resp) {
            console.log("PDF guardado en la base de datos");
          }          
        };
      }*/
      if (user && tesis) {
        const resp = await TesisEndpoint.putTesis(
          {
            id_tesis: tesis.id_tesis,
            clave_alumno: user.usuario.clave,
            titulo: nombre,
            fecharegistro: new Date(),
            generacion: user.usuario.datos_alumno?.generacion,
            registrada: true,
            ultimo_avance: 1,
            estado_activo: true,
          },
          ""
        );
        await ComiteEndpoint.postComite(
          {
            clave_asesor: parseInt(asesor! ?? 0),
            id_tesis: resp?.id_tesis! ?? 0,
            id_funcion: 1,
          },
          ""
        );
        const vars = await VariablesSistemaEndpoint.getVariablesSistema(
          1,
          ""
        );
        const id_datos =
          await DatosAsesorExternoEndpoint.postDatosAsesorExterno(
            {
              telefono: telefono! ?? "",
              institucion: institucion! ?? "",
            },
            ""
          );
        const externo = await UsuarioEndpoint.postUsuario(
          {
            clave: vars?.indice_clave_asesorexterno! ?? 0,
            nombre: nombreExterno! ?? "",
            apellido_paterno: apPatExterno! ?? "",
            apellido_materno: apMatExterno! ?? "",
            password: "pass1234", //always gonna be default
            id_rol: 4,
            id_datos_alumno: null,
            correo: correo! ?? "",
            id_datos_asesorexterno: id_datos?.id_datos_asesorexterno! ?? null,
          },
          ""
        );
        if (vars) {
          await VariablesSistemaEndpoint.putVariablesSistema(
            {
              id_variables_sistema: 1,
              indice_clave_asesorexterno:
                vars?.indice_clave_asesorexterno + 1,
            },
            ""
          );
        }
        const last = await ComiteEndpoint.postComite(
          {
            clave_asesor: externo?.clave! ?? 0,
            id_tesis: resp?.id_tesis! ?? 0,
            id_funcion: 2,
          },
          ""
        );
        if (last) {
          navigate("/board");
        }  
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row w-screen">
        <div className="w-5/6 md:w-3/6">
          <div className="flex flex-col mt-10 ml-10">
            <label className="mb-3 block text-lg font-bold">
              Título de la Tesis
            </label>
            <input
              className="py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
              type="text"
              placeholder="Nombre/Tema completo de la tesis"
              required
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />

            <label className="mb-3 block text-lg font-bold">Asesor</label>
            <select
              className="select h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10 border border-solid border-light-gray-22"
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

            <div className="w-5/6">
              <label className="mb-3 block text-lg font-bold">
                Subir un archivo (opcional)
              </label>
              <input
                type="file"
                className="file-input w-full mb-10 hover:border-[#003067] border border-solid border-light-gray-22"
                onChange={(e) => {
                  const uploadedFile = e.target.files?.[0];
                  if (uploadedFile) {
                    setFileSelected(uploadedFile);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-5/6 md:w-3/6">
          <div className="flex flex-col mt-10 ml-10">
            <div className="flex flex-row items-start align-middle">
              <div className="w-[200px]">
                <label className="inline-block pl-[0.15rem] hover:cursor-pointer text-lg font-bold">
                    Coasesor Externo
                </label>
              </div>
              <button
                className="btn shadow rounded hover:border hover:border-[#003067]"
                type="button"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Cambiar Tipo
              </button>
            </div>

            <div className="w-5/6 mt-5">
                <div className="flex flex-row">
                  <div className="w-3/6">
                    <label className="mb-3 block text-lg font-bold">
                      Nombre
                    </label>
                    <input
                      className="py-2 px-10 shadow appearance-none rounded w-5/6 mb-5"
                      type="text"
                      placeholder="Nombre"
                      required
                      onChange={(e) => {
                        setNombreExterno(e.target.value);
                      }}
                    />

                    <label className="mb-3 block text-lg font-bold">
                      Apellido Paterno
                    </label>
                    <input
                      className="py-2 px-10 shadow appearance-none rounded w-5/6 mb-5"
                      type="text"
                      placeholder="Apellido Paterno"
                      required
                      onChange={(e) => {
                        setApPatExterno(e.target.value);
                      }}
                    />

                    <label className="mb-3 block text-lg font-bold">
                      Apellido Materno
                    </label>
                    <input
                      className="py-2 px-10 shadow appearance-none rounded w-5/6 mb-5"
                      type="text"
                      placeholder="Apellido Materno"
                      required
                      onChange={(e) => {
                        setApMatExterno(e.target.value);
                      }}
                    />
                  </div>
                  <div className="w-3/6">
                    <label className="mb-3 block text-lg font-bold">
                      Correo
                    </label>
                    <input
                      className="py-2 px-10 shadow appearance-none rounded w-5/6 mb-5"
                      type="text"
                      placeholder="Correo"
                      required
                      onChange={(e) => {
                        setCorreo(e.target.value);
                      }}
                    />

                    <label className="mb-3 block text-lg font-bold">
                      Teléfono
                    </label>
                    <input
                      className="py-2 px-10 shadow appearance-none rounded w-5/6 mb-5"
                      type="text"
                      maxLength={10}
                      placeholder="Número de teléfono a 10 dígitos"
                      required
                      onChange={(e) => {
                        setTelefono(e.target.value);
                      }}
                    />

                    <label className="mb-3 block text-lg font-bold">
                      Institución
                    </label>
                    <input
                      className="py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
                      type="text"
                      placeholder="Institución"
                      required
                      onChange={(e) => {
                        setInstitucion(e.target.value);
                      }}
                    />
                  </div>
                </div>
            </div>
            <div className="w-5/6 flex justify-end items-center mt-10">
              <button
                type="submit"
                className="btn shadow rounded hover:border hover:border-[#003067]"
              >
                Registrar Tesis
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TesisRegistryFormExt;