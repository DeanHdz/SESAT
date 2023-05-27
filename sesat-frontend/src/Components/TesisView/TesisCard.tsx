import SimplePDFViewer from "../PDFViewer/SimplePDFViewer";
import { useEffect, useState } from "react";
import { SESAT } from "../../Interfaces/ISESAT";
import { TesisEndpoint } from "../../api/tesis.endpoint";
import { useNavigate } from "react-router-dom";

const TesisCard = () => {
  const navigate = useNavigate();
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

  if (tesis) {
    return (
      <div className="bg-light-blue-10 lg:flex lg:flex-row p-6 h-fit rounded border border-light-gray-22 border-solid">
        {tesis?.registrada == false ? (
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
          <div>
            <div className="p-2 bg-light-blue-10 block lg:w-5/12 h-[180px] !overflow-hidden">
              <SimplePDFViewer />
            </div>
            <div className="block justify-center items-center w-7/12">
              <label className="m-3 block text-2xl font-bold">
                {" "}
                Nombre de la Tesis{" "}
              </label>
              <label className="m-3 mt-10 block text-sm font-normal">
                {" "}
                Modificado: dd/mm/yyyy{" "}
              </label>
              <label className="m-3 mt-10 block text-sm font-bold">
                {" "}
                Última versión realizada{" "}
              </label>
              <div className="w-full flex justify-end items-end">
                <button className="btn shadow rounded"> Ver Tesis </button>
              </div>
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
