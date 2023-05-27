import { useEffect, useState, ChangeEvent } from "react";
import AdminTesisCard from "./AdminTesisCard";
import { SESAT } from "../../Interfaces/ISESAT";
import { TesisEndpoint } from "../../api/tesis.endpoint";

const AdminTesisCardList = ({
  title,
  grade,
}: {
  title: string;
  grade: string;
}) => {
  const [tesis, setTesis] = useState<SESAT.Tesis[]>();
  const [filter, setFilter] = useState("Todo");

  const onChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    switch (filter) {
      case "activo":
        TesisEndpoint.getTesisActivas("").then((theses) => {
          if (theses) {
            setTesis(theses);
          }
        });
        break;
      case "inactivo":
        TesisEndpoint.getTesisInactivas("").then((theses) => {
          if (theses) {
            setTesis(theses);
          }
        });
        break;
      default:
        TesisEndpoint.getTheses("").then((theses) => {
          if (theses) {
            setTesis(theses);
          }
        });
        break;
    }
  }, [filter]);

  const showTesis = () => {
    if (tesis)
      for (let i = 0; i < tesis.length; i++) {
        if (tesis[i].alumno.datos_alumno?.grado_estudio == grade)
          return <AdminTesisCard tesis={tesis[i]} />;
      }
    else return <></>;
  };

  return (
    <div className="w-full p-6 flex flex-col">
      <label className="m-3 block text-2xl font-bold cursor-pointer">
        {title}
      </label>
      <div className="mt-6 mb-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-end">
        <select
          onChange={(e) => {
            onChangeFilter(e);
          }}
          className="select shadow appearance-none rounded border border-solid border-light-gray-22"
        >
          <option key="0" value="Todo">
            Todo
          </option>
          <option key="1" value="inactivo">
            Tesis Completadas
          </option>
          <option key="2" value="activo">
            Tesis En progreso
          </option>
        </select>
        <input type="search" placeholder="Buscar alumnos" className="rounded" />
      </div>
      {showTesis()}
    </div>
  );
};

export default AdminTesisCardList;
