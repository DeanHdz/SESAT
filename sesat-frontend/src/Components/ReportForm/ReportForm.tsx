import CustomCalendar from "../CustomCalendar/CustomCalendar";
import { SecondaryButton } from "../../Components/Buttons/SecondaryButton";
import { useState } from "react";
import autosize from 'autosize';
import { ActaEvaluacion_Endpoint } from "../../api/acta-evaluacion.endpoint";
import { useNavigate } from "react-router-dom";


const ReportForm = () => {


  const [apPat, setApPat] = useState("Ramirez");
  const [apMat, setApMat] = useState("Gamez");
  const [nombre, setNombre] = useState("Cesar Augusto");
  const [programa, setPrograma] = useState("Doctorado en ciencias de la computación");
  const [numAvance, setNumAvance] = useState("01");
  const [nombreTesis, setNombreTesis] = useState("Reconocimiento de masas y sus características en mamografias para su clasificación de acuerdo con el sitema BI-RADS");

  const [fechaEval, setFechaEval] = useState("");
  const [porcentajeAv, setPrcAvance] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [documentoAvance, setDocAvance] = useState("");
  const [exposicion, setExposicion] = useState("");
  const [dominioTema, setDominioTema] = useState("");
  const [gradoAvance, setGradoAvance] = useState("");
  const [promedio, setPromedio] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [id_asignacion, setIdAsignacion] = useState("102");
  
  const navigate = useNavigate();
  


  async function handleSubmit (e:any) {
    e.preventDefault();
    try {
      //Crear dto y enviar via POST
      //El dto contiene todos los datos del reporte, el servidor solo debe rellenar el formulario
      //devolver el pdf?
      const resp = await ActaEvaluacion_Endpoint.postActaForm(
        parseInt(id_asignacion),
        {          
          num_evaluacion: parseInt(numAvance),
          ap_pat: apPat,
          ap_mat: apMat,
          nombre: nombre, 
          //Modificar endpoint e interfaz despues
        },
        ""
      );
      if(resp){
        
        console.log("Acta guardada");        
        //navigate("/view_document/");
        navigate('/view_document/', { 
            state: { 
              id_assign: id_asignacion, 
              pdfType: 2, 
            }, 
          }
        );

        
      }else{
        console.log('No hubo respuesta del servidor');
      }
    }            
    catch(err) {
      console.log(err);
    }
  }


  return (
    <div className="lg:flex flex-col w-screen">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row  w-5/6 m-auto mt-6 mb-0 h-fit p-0">
          <div className="flex flex-row w-full justify-end items-center sm:mb-10">
            <label className="block mr-4 text-lg font-bold">
              Fecha de evaluación:
            </label>
            <CustomCalendar />
          </div>
        </div>
        <div className="flex flex-row  w-5/6 m-auto mb-0 h-fit p-0">
          <label className="mb-3 block text-lg font-bold">
            Datos del alumno
          </label>
        </div>
        <div className="flex flex-col  w-5/6 m-auto bg-light-blue-10 rounded py-6 px-6">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3">
              <label className="mb-3 block text-lg font-bold">
                Apellido Paterno
              </label>
              <input
                className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10 pointer-events-none"
                type="text"
                placeholder="Apellido paterno"
                value={apPat}  
                onChange={
                  (e) => {
                    setApPat(e.target.value);
                  }
                }              
              />
            </div>
            <div className="lg:w-1/3">
              <label className="mb-3 block text-lg font-bold">
                Apellido Materno
              </label>
              <input
                className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10 pointer-events-none"
                type="text"
                placeholder="Apellido materno"
                value={apMat}
                onChange={
                  (e) => {
                    setApMat(e.target.value);
                  }
                } 
              />
            </div>
            <div className="lg:w-1/3">
              <label className="mb-3 block text-lg font-bold">Nombre</label>
              <input
                className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10 pointer-events-none"
                type="text"
                placeholder="Nombre del alumno"
                value={nombre}
                onChange={
                  (e) => {
                    setNombre(e.target.value);
                  }
                } 
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col lg:w-1/2">
              <label className="mb-3 block text-lg font-bold">
                Estudiante del programa:
              </label>
              <input
                className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10 pointer-events-none"
                type="text"
                placeholder="Programa"
                value={programa}
                onChange={
                  (e) => {
                    setPrograma(e.target.value);
                  }
                } 
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-3 block text-lg font-bold">Avance No.</label>
              <input
                className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10 pointer-events-none"
                type="number"
                placeholder="No."
                value={numAvance}
                onChange={
                  (e) => {
                    setNumAvance(e.target.value);
                  }
                } 
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-5/6 m-auto mt-10">
          <label className="mb-3 block text-lg font-bold">
            Título de la tesis
          </label>
          <textarea
            className="textarea h-32 w-full px-10  border-primary rounded text-base mb-10 pointer-events-none"
            placeholder="Nombre de la tesis"            
            onChange={
              (e) => {                
                setNombreTesis(e.target.value);
                autosize(e.currentTarget);
              }
            } 
            value={nombreTesis}
            
          ></textarea>
          <div className="flex flex-col ">
            <label className="mb-3 block text-lg font-bold">
              Porcentaje de avance en el desarrollo del proyecto de tesis
            </label>
            <input
              className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
              type="number"
              placeholder="0%"              
              pattern="^(100|[1-9][0-9]?|0)$"
              value={porcentajeAv}
              onChange={
                (e) => {
                  setPrcAvance(e.target.value);
                }
              } 
            />
            <label className="mb-3 block text-lg font-bold">
              Comentarios y sugerencias
            </label>
            <textarea
              className="textarea h-48 w-full px-10  border-primary rounded text-base mb-10"
              placeholder="Escriba sus sugerencias o comentarios"
              value={comentarios}
              
              onChange={
                (e) => {
                  autosize(e.currentTarget);
                  setComentarios(e.target.value);
                }
              } 
            ></textarea>
            <label className="mb-3 block text-lg font-bold">Evaluación</label>
            <div className="flex flex-col  w-full m-auto bg-light-blue-10 rounded py-6 px-6">
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex flex-col">
                  <label className="mb-3 block text-lg font-bold">
                    Documento de avance
                  </label>
                  <input
                    className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                    type="number"
                    placeholder="00"
                    pattern="^(100|[1-9][0-9]?|0)$"
                    value={documentoAvance}
                    
                    onChange={
                      (e) => {
                        setDocAvance(e.target.value);
                      }
                    } 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-3 block text-lg font-bold">
                    Exposición
                  </label>
                  <input
                    className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                    type="number"
                    placeholder="00"
                    pattern="^(100|[1-9][0-9]?|0)$"
                    value={exposicion}
                    
                    onChange={
                      (e) => {
                        setExposicion(e.target.value);
                      }
                    } 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-3 block text-lg font-bold">
                    Dominio del tema
                  </label>
                  <input
                    className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                    type="number"
                    placeholder="00"
                    pattern="^(100|[1-9][0-9]?|0)$"
                    value={dominioTema}
                    
                    onChange={
                      (e) => {
                        setDominioTema(e.target.value);
                      }
                    } 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-3 block text-lg font-bold">
                    Grado de avance en el periodo
                  </label>
                  <input
                    className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                    type="number"
                    placeholder="00"
                    pattern="^(100|[1-9][0-9]?|0)$"
                    value={gradoAvance}
                    
                    onChange={
                      (e) => {
                        setGradoAvance(e.target.value);
                      }
                    } 
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <label className="mb-3 block text-lg font-bold">
                    Promedio de la evaluación
                  </label>
                  <input
                    className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                    type="number"
                    placeholder="00"
                    pattern="^(100|[1-9][0-9]?|0)$"
                    value={promedio}
                    onChange={
                      (e) => {
                        setPromedio(e.target.value);
                      }
                    } 
                  />
                </div>
              </div>
            </div>

            <label className="mb-3 mt-10 block text-lg font-bold">
              Observaciones y compromisos
            </label>
            <textarea
              className="textarea h-48 w-full px-10 border-primary rounded text-base mb-10"
              placeholder="Escriba sus observaciones y compromisos para el alumno"
              value={observaciones}
              
              onChange={
                (e) => {
                  autosize(e.currentTarget);
                  setObservaciones(e.target.value);
                }
              } 
            ></textarea>

            <div className="flex justify-end w-full mb-10 mt-10">
              <div className="mr-6">
                <SecondaryButton text="Descartar" />
              </div>
              <button type="submit" className="btn">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
