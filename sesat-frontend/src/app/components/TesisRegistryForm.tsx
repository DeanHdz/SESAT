import { useEffect, useState } from "react";


import SelectAsesores from "./SelectAsesores";
import SelectProgramas from "./SelectProgramas";


import { encode } from "base64-arraybuffer";
import { TbFileSpreadsheet } from "react-icons/tb";
import { useRouter } from "next/navigation";

/*
export const TesisRegistryForm = () => {
  const [user, setUser] = useState<LoggedUser>(
    JSON.parse(sessionStorage.getItem("loggedUser") || "{}")
  );
  const [tesis, setTesis] = useState<Tesis>();

  const GetTesis = async () => {
    /*
    if (user)
      setTesis(await TesisEndpoint.getTesisPerStudent(user.usuario.clave, ""));
    
  };

  useEffect(() => {
    GetTesis();
  }, []);

  const [nombre, setNombre] = useState("");
  const [asesor, setAsesor] = useState("");
  const [coAsesor, setCoAsesor] = useState("");

  const [fileSelected, setFileSelected] = useState<Blob | undefined>();
  const [idenfificador, setIdentificador] = useState("");

  const navigate = useRouter();

  const [Asesores, setAsesores] = useState<Usuario[] | undefined>(
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

  const [Programas, setProgramas] = useState<Programa[] | undefined>(
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

  {
    //Requisitos previos:
    //El administrador debe de dar de alta alumnos
    //El administrador debe crear la asignacion de registro
    //Para crear asignaciones:
    //Como seleccionar el grupo de alumnos al que va dirigida la asignacion?
    //La asignacion debe ir dirigida a una generacion?
    //Considerando:
    //La maestria de tiempo completo es de 2 años(4 semestres)
    //La maestria de medio tiempo es de 4 años(8 semestres)
    //El doctorado de tiempo completo es de 4 años(8 semestres) No hay de medio tiempo
    //Considerar: Puede un alumno cambiar de tiempo completo a medio tiempo o viceversa?
    //Alumnos de tiempo completo MAESTRIA
    //Semestre 1 -> Registro Avance 0
    //Semestre 2 -> Avance 1
    //Semestre 3 -> Avance 2
    //Semestre 4 -> Avance 3
    //Alumnos de medio tiempo MAESTRIA
    //Semestre 1 -> Registro
    //Semestre 2 -> Avance 1
    //Semestre 3 -> Avance 2 20% de tesis
    //Semestre 4 -> Avance 3
    //Semestre 5 -> Avance 4 50% de tesis
    //Semestre 6 -> Avance 5
    //Semestre 7 -> Avance 6 90% de tesis
    //Semestre 8 -> El alumno presenta su tesis()
    //Alumnos de DOCTORADO
    //Semestre 1 -> Registro(Inicio de sem) Avance 0 y Avance 1(fin de sem)
    //Semestre 2 -> Avance 2
    //Semestre 3 -> Avance 3
    //Semestre 4 -> Avance 4
    //Examen de medio termino
    //Semestres 5, 6 ,7 Avance 5 y Avance 6
    //Al crear una asignacion
    //Seleccionar entre Maestria/Doctorado
    //Maestria
    //Seleccionar entre Tiempo completo/medio tiempo
    //Tiempo completo
    //Seleccionar Numero de asignacion[Opciones]
    //Registro
    //Avance 20%
    //Avance 50%
    //Avance 90%
    /*La unica condicion para que deje crear la asignacion una vez seleccionando las propiedades
    es que al menos exista un alumno en ese segmento
    Entonces es necesario hacer una consulta a la base de datos y preguntar si existe un
    alumno al menos, usando las propiedades seleccionadas por el administrador


    Propiedades para la consulta: TABLA TESIS
    CASO MAESTRIA
    maestria
    modalidad
    num avance

    CASO DOCTORADO
    doctorado
    numAvance

    Para evitar asignaciones repetidas:
    1. Revisar que el id_tesis de la tabla tesis no esté en asignacion_tesis
    2. El estatus de la asignacion deberá ser cerrado

    como evitar una asignacion repetida?

    Posibles requisitos para esta logica:
    Mostrar una pantalla de tareas completadas es decir:
    La pantalla de administrar asignaciones te mostraria una lista con check-boxes:
    
   */
    //En el REGISTRO DE TESIS, se deberá obtener la primer asignacion
    //
    //Al registrar la tesis se debe:
    //En tabla asignacion Hacer UPDATE
    //Cambiar estado entrega a entregado
    //insertar pdf si el alumno subió alguno
    //En la tabla tesis insertar los datos
    //[tupla completa]
    //Revisar num_avance de tabla asignacion       ultimo_avance de la tabla tesis
    //Si es necesario tener el campo ultimo avance en alumno?
    /*
  }

  {
    /**
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
      }
      if (user && tesis) {
        /*
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
        const comite = await ComiteEndpoint.postComite(
          {
            clave_asesor: parseInt(asesor! ?? 0),
            id_tesis: resp?.id_tesis! ?? 0,
            id_funcion: 1,
          },
          ""
        );
        const last = await ComiteEndpoint.postComite(
          {
            clave_asesor: parseInt(coAsesor! ?? 0),
            id_tesis: resp?.id_tesis! ?? 0,
            id_funcion: 2,
          },
          ""
        );
        if (last) {
          navigate.push("/board");
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
          </div>
        </div>
        <div className="w-5/6 md:w-3/6">
          <div className="flex flex-col mt-10 ml-10">
            <div className="flex flex-row items-start align-middle">
              <div className="w-[200px]">
                <label className="inline-block pl-[0.15rem] hover:cursor-pointer text-lg font-bold">
                  Coasesor
                </label>
              </div>
              <button
                className="btn shadow rounded hover:border hover:border-[#003067]"
                type="button"
                onClick={() => {
                  navigate.push("/register-ext");
                }}
              >
                Cambiar Tipo
              </button>
            </div>

            <div className="w-5/6 mt-5">
              <div>
                <label className="mb-3 block text-lg font-bold">Nombre</label>
                <select
                  className="select h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10 border border-solid border-light-gray-22"
                  required
                  onChange={(e) => {
                    setCoAsesor(e.target.value);
                  }}
                >
                  <option disabled selected>
                    Nombre completo Asesor/a
                  </option>
                  {
                    renderSelectAsesores() //display las opciones de asesores de manera condicional
                  }
                </select>
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

export default TesisRegistryForm;

 */
