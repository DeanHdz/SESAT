import SimplePDFViewer from "../PDFViewer/SimplePDFViewer";
import { useEffect, useState } from "react";
import { SESAT } from "../../Interfaces/ISESAT";
import { TesisEndpoint } from "../../api/tesis.endpoint";
import { useNavigate } from "react-router-dom";
import { AsignacionTesisEndpoint } from "../../api/asignacion-tesis.endpoint";
import { AsignacionEndpoint } from "../../api/asignacion.endpoint";

const TesisCard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SESAT.LoggedUser>(
    JSON.parse(sessionStorage.getItem("loggedUser") || "{}")
  );

  const [tesis, setTesis] = useState<SESAT.Tesis>();
  const [asignacion, setAsignacion] = useState<SESAT.Asignacion>();

  const GetTesis = async () => {
    if (user)
      TesisEndpoint.getTesisPerStudent(user.usuario.clave, "").then((tesis) => {
        if (tesis) {
          setTesis(tesis);
          if (tesis.asignaciones_tesis.length > 0)
            AsignacionEndpoint.getAsignacion(
              tesis.asignaciones_tesis[tesis.asignaciones_tesis.length - 1]
                .id_asignacion,
              ""
            ).then((asignacion) => {
              if (asignacion) setAsignacion(asignacion);
            });
        }
      });
  };

  useEffect(() => {
    GetTesis();
  }, []);

  if (tesis) {
    return (
      <div className="bg-light-blue-10 lg:flex lg:flex-row p-6 h-fit rounded border border-light-gray-22 border-solid">
        {tesis?.registrada === false ? (
          <div>
            <div className="flex flex-row justify-center align-middle items-center">
              <div className="font-SESAT font-bold text-2xl ">
                Registra tu tésis para hacer uso completo del sistema
              </div>
              <div className="ml-10">
                <button
                  className="btn shadow rounded"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  {" "}
                  Registrar Tesis{" "}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className=" flex flex-row h-[200px]">
              <div className="p-2 bg-light-blue-10 block border border-black">
                {asignacion?.documento ? (
                  <SimplePDFViewer asignacion={asignacion} />
                ) : (
                  <div className="flex justify-center text-center w-full h-full align-middle items-center">
                    No hay documento por mostrar
                  </div>
                )}
              </div>
              <div className=" flex flex-col justify-center items-start align-middle  w-7/12">
                <label className="m-3 block text-2xl font-bold">
                  {" "}
                  {tesis.titulo}{" "}
                </label>
                <label className="m-3 mt-10 block text-sm font-bold">
                  {" "}
                  Última versión realizada: {tesis.ultimo_avance}{" "}
                </label>
              </div>
            </div>
            <div className="w-full flex justify-end items-end">
              <button className="btn shadow rounded"> Ver Tesis </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="bg-light-blue-10 lg:flex lg:flex-row p-6 h-fit rounded border border-light-gray-22 border-solid"></div>
    );
  }
};

export default TesisCard;
