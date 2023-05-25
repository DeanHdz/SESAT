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
import { encode } from "base64-arraybuffer";

export const TesisRegistryForm = () => {
  const [user, setUser] = useState<SESAT.LoggedUser>(JSON.parse(sessionStorage.getItem("loggedUser") || '{}'));
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asesor, setAsesor] = useState("");
  const [coAsesor, setCoAsesor] = useState("");
  const [programa, setPrograma] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [generacion, setGeneracion] = useState("");
  const [fileSelected, setFileSelected] = useState<Blob | undefined>();
  const [idenfificador, setIdentificador] = useState("");

  const navigate = useNavigate();


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

  async function handleSubmit(e: any) {
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
            <div className="flex flex-row">
              <div className="w-5/6">
                <label className="mb-3 block text-lg font-bold">Coasesor</label>
                <input
                  className=" py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
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
                <button className="shadow rounded h-1/3 w-[60px] hover:border hover:border-[#003067] border border-solid border-light-gray-22">
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
              className="select py-2 px-10 shadow appearance-none rounded w-5/6 mb-10 border border-solid border-light-gray-22"
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
              className="select h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10 border border-solid border-light-gray-22"
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
              className="py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
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
                className="file-input w-full mb-10 hover:border-[#003067] border border-solid border-light-gray-22"                
                onChange={(e) => {
                  const uploadedFile = e.target.files?.[0];
                  if (uploadedFile) {
                    setFileSelected(uploadedFile);
                  }
                }}
              />
            </div>
            <div className="w-5/6 flex justify-end items-center mb-10">
              <button type="submit" className="btn shadow rounded hover:border hover:border-[#003067]">
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
