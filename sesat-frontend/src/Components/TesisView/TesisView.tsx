import PDFViewer from "../PDFViewer/SimplePDFViewer";
import { Modal } from "../Modal/Modal";
import { useEffect, useState } from "react";
import { IModalData } from "../../Interfaces/IModalData";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import SimplePDFViewer from "../PDFViewer/SimplePDFViewer";
import { SESAT } from "../../Interfaces/ISESAT";
import { ComiteEndpoint } from "../../api/comite.endpoint";
import ChangeTesisNameModal from "../Modal/ChangeTesisNameModal";
import { AsignacionEndpoint } from "../../api/asignacion.endpoint";
import TextAreaReziseable from "../TextAreaResizeable/TextAreaResizeable";


const modalData: IModalData = {
  title: "Modificar Nombre de la Tesis",
  message:
    "Atención: Considere que el cambio no se aplicará al documento debido a limitaciones del sistema. Actualize el archivo PDF para evitar incongruencias con los datos.",
};


const TesisView = ({tesis}:{tesis: SESAT.Tesis}) => {

  const navigate = useNavigate();
  const [asesorName, setAsesorName] = useState("");

  const [asignacion, setAsignacion] = useState<SESAT.Asignacion>();

  const [calificacion, setCalificacion] = useState<string>();
  const [comment, setComment] = useState<string>();

  useEffect(() => 
  {
    ComiteEndpoint.getPerTesis(tesis.id_tesis, "").then((comite) => {
      if (comite) {
        comite.forEach((c) => {
          if (c.funcion.nombre == "Asesor") {
            setAsesorName(
              c.asesor.nombre +
                " " +
                c.asesor.apellido_paterno +
                " " +
                c.asesor.apellido_materno
            );
          }
        });
      }
    });

    if (tesis && tesis.asignaciones_tesis.length > 0)
    {
      AsignacionEndpoint.getAsignacion(
        tesis.asignaciones_tesis[tesis.asignaciones_tesis.length - 1]
          .id_asignacion,
        ""
      ).then((assignment) => {
        if(assignment)
          setAsignacion(assignment);
      })
    };
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try 
    {

    } 
    catch (err) 
    {
      console.log(err);
    }
    //window.location.reload();
  }

  /*function viewPDFDocument() {
    navigate('/view_document/', {
      state: {
        id_assign: id_asignacion,
        pdfType: 2,
      },
    });
  }

  function viewPDFCertificate() {
    navigate('/view_document/', {
      state: {
        id_assign: id_asignacion,
        pdfType: 2,
      },
    });
  }
  function viewPDFFormat() {
    navigate('/view_document/', {
      state: {
        id_assign: id_asignacion,
        pdfType: 2,
      },
    });
  }*/

  return (
    <div className="block lg:flex lg:flex-row w-screen">
      <div className="block w-11/12 lg:flex lg:flex-col lg:w-5/12">
        <div className="block mt-10 ml-10 w-auto bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit border border-light-gray-22 border-solid">
          <label className="mb-0 block text-base font-light">Título</label>
          <label className="mb-4 block text-lg font-bold">{tesis.titulo}</label>

          <label className="mb-0 block text-base font-light">Autor</label>
          <label className="mb-5 block text-lg font-bold">{(tesis.alumno.nombre + " " + tesis.alumno.apellido_paterno + " " + tesis.alumno.apellido_materno)}</label>

          <label className="mb-0 block text-base font-light">
            Número de avance
          </label>
          <label className="mb-5 block text-lg font-bold">
            {tesis.ultimo_avance}
          </label>

          <label className="mb-0 block text-base font-light">
            Asesor
          </label>
          <label className="mb-5 block text-lg font-bold">
            {asesorName}
          </label>
        </div>

        <div className="block mt-0 ml-10 w-auto bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit border border-light-gray-22 border-solid">
          <label className="mb-0 block text-base font-bold">
            Formatos de revisión para el avance {tesis.ultimo_avance}
          </label>

          <label onClick={
            () => {
              navigate("/fill-report",{
                state:
                {
                  tesis: tesis,
                  asignacion: asignacion
                }
              });
            }
          } className="mt-6 mb-2 block text-base text-dark-blue-10 font-light cursor-pointer hover:text-dark-blue-20">
            Crear/Editar Acta de evaluación de avance de tesis
          </label>
          <label onClick={
            () => {
              navigate("/fill-report",{
                state:
                {
                  tesis: tesis,
                  asignacion: asignacion
                }
              });
            }
          } className="mt-6 mb-2 block text-base text-dark-blue-10 font-light cursor-pointer hover:text-dark-blue-20">
            Crear/Editar Formato para la evaluación de avance de tesis
          </label>
          
        </div>

        {/*
        <div className="block mt-0 ml-10 w-auto bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit border border-light-gray-22 border-solid">
          <label className="mb-0 block text-base font-bold">
            Versiones anteriores de la tesis
          </label>
          <label className="mt-6 mb-2 block text-base font-light">
            Historial de versiones
          </label>
          <select className="mt-0 select h-1/4 py-2 px-10 shadow appearance-none border-primary rounded w-full mb-10">
            <option disabled selected>
              Seleccione para previsualizar
            </option>
            <option>Avance 1</option>
            <option>Avance 2</option>
            <option>Avance 3</option>
          </select>
        </div>
        */}

        <div className="block mt-0 ml-10 w-auto bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit border border-light-gray-22 border-solid">
          <label className="mb-0 block text-base font-bold">
            Calificar Avance {tesis.ultimo_avance}
          </label>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="text-gray-600">Calificación</span>
              </label>
              <input
                type="text"
                required
                placeholder="0-10"
                maxLength={2}
                className="input rounded input-bordered w-full max-w-xs"
                value={calificacion}
                onChange={(e) => {
                  setCalificacion(e.target.value);
                }}
              />
              <div className="form-control w-full ">
                <TextAreaReziseable />
              </div>
            </div>
          </form>
        </div>

        <div className="block mt-0 ml-10 w-auto bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit border border-light-gray-22 border-solid">
          <label className="mb-0 block text-base font-bold">Propiedades</label>

          <label className="mb-0 mt-5 block text-base font-light">
            Fecha de registro de la tesis
          </label>
          <label className="mb-5 block text-lg font-bold">
            { tesis.fecharegistro ? 
              (tesis.fecharegistro.toString())
              :
              ("No hay fecha que mostrar")
            }
          </label>
          <ChangeTesisNameModal tesis={tesis}/>
        </div>
      </div>

      <div className="block w-11/12 pl-10 lg:pl-6 lg:flex lg:flex-col lg:items-center lg:w-7/12 lg:px-6 py-10">
        <div className="pt-0 pb-6 px-3 w-full h-fit lg:px-4 lg:w-full  bg-light-blue-10 rounded border border-light-gray-22 border-solid">
          <div className="flex flex-row mt-0 ml-10 w-5/6 justify-center rounded px-8 py-0 mb-0 h-fit">
            <label className="mb-0 block text-base font-light">
              Vista previa del documento
            </label>
          </div>
          <div className="h-[750px]">
            { 
            asignacion ? 
            ( <SimplePDFViewer asignacion={asignacion}/> )
            :
            ( "No hay documento para mostrar" )
            }
          </div>
        </div>
        {/*
        <div className="mt-6 flex flex-row justify-center w-full">
          <PrimaryButton onClick={viewPDFDocument} text="Ver PDF Completo" />
        </div>
          */}
      </div>
    </div>
  );
};
export default TesisView;
