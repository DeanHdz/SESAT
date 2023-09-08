{/**

import { useEffect, useState, ChangeEvent } from "react";
import AdminTesisCard from "./AdminTesisCard";
import { SESAT } from "../../Interfaces/ISESAT";
import { TesisEndpoint } from "../../utils/tesis.endpoint";
import { ComiteEndpoint } from "../../utils/comite.endpoint";

const AdminTesisCardList = ({
  title,
  grade,
  role,
}: {
  title: string;
  grade: string;
  role: string;
}) => {
  const [user, setUser] = useState<SESAT.LoggedUser>(
    JSON.parse(sessionStorage.getItem("loggedUser") || "{}")
  );
  const [tesis, setTesis] = useState<SESAT.Tesis[]>();
  const [filter, setFilter] = useState("Todo");
  const [search, setSearch] = useState("");
  const [comite, setComite] = useState<SESAT.Comite[]>();

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  let tesisCards = [];

  useEffect(() => {
    //let tes: SESAT.Tesis[] | undefined;
    switch (filter) {
      case "activo":
        if (role == "Admin") {
          TesisEndpoint.getTesisActivas("").then((theses) => {
            if (theses) {
              setTesis(theses);
            }
          });
        } else {
          ComiteEndpoint.getPerAsesor(user.usuario.clave, "").then((comite) => {
            if (comite) {
              setTesis(comite.map((c) => c.tesis));
              console.log(comite.map((c) => c.tesis));
            }
          });
        }
        break;
      case "inactivo":
        if (role == "Admin") {
          TesisEndpoint.getTesisInactivas("").then((theses) => {
            if (theses) {
              setTesis(theses);
            }
          });
        } else {
          ComiteEndpoint.getPerAsesor(user.usuario.clave, "").then((comite) => {
            if (comite) {
              setTesis(comite.map((c) => c.tesis));
              console.log(comite.map((c) => c.tesis));
            }
          });
        }
        break;
      default:
        if (role == "Admin") {
          TesisEndpoint.getTheses("").then((theses) => {
            if (theses) {
              setTesis(theses);
            }
          });
        } else {
          ComiteEndpoint.getPerAsesor(user.usuario.clave, "").then((comite) => {
            if (comite) {
              setTesis(comite.map((c) => c.tesis));
              console.log(comite.map((c) => c.tesis));
            }
          });
        }
        break;
    }
  }, [filter]);

  let nombre = "";
  if (tesis)
    for (let i = 0; i < tesis.length; i++) {
      nombre =
        tesis[i].alumno.nombre +
        " " +
        tesis[i].alumno.apellido_paterno +
        " " +
        tesis[i].alumno.apellido_materno;
      if (tesis[i].alumno.datos_alumno?.grado_estudio == grade)
        if (
          parseInt(search) == tesis[i].clave_alumno ||
          nombre.toLowerCase().includes(search.toLowerCase())
        )
          tesisCards.push(<AdminTesisCard tesis={tesis[i]} />);
    }
  else return <></>;

  const showFilter = () => {
    if (role == "Admin") {
      return (
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
      );
    }
  };

  return (
    <div className="w-full p-6 flex flex-col">
      <label className="m-3 block text-2xl font-bold cursor-pointer">
        {title}
      </label>
      <div className="mt-6 mb-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-end">
        {showFilter()}
        <input
          type="search"
          onChange={(e) => {
            onChangeSearch(e);
          }}
          placeholder="Buscar alumnos"
          className="rounded"
        />
      </div>
      {tesisCards}
    </div>
  );
};

export default AdminTesisCardList;
 */}