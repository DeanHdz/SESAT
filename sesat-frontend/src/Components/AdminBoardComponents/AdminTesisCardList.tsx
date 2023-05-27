import { useEffect, useState } from "react";
import AdminTesisCard from "./AdminTesisCard";
import { SESAT } from "../../Interfaces/ISESAT";
import { TesisEndpoint } from "../../api/tesis.endpoint";

const AdminTesisCardList = ({ title }: { title: string }) => {
  const [tesis, setTesis] = useState<SESAT.Tesis[]>();

  useEffect(() => {
    TesisEndpoint.getTheses("").then((theses) => {
      if (theses) {
        setTesis(theses);
      }
    });
  }, []);

  const showTesis = () => {
    if (tesis)
      for (let i = 0; i < tesis.length; i++) {
        return <AdminTesisCard tesis={tesis[i]}/>;
      }
    else return <></>;
  };

  return (
    <div className="w-full p-6 flex flex-col">
      <label className="m-3 block text-2xl font-bold cursor-pointer">
        {title}
      </label>
      <div className="mt-6 mb-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-end">
        <select className="select shadow appearance-none rounded border border-solid border-light-gray-22">
          <option>Tesis Activas</option>
          <option>Tesis Inactivas</option>
        </select>
        <input type="search" placeholder="Buscar alumnos" className="rounded" />
      </div>
      {showTesis()}
    </div>
  );
};

export default AdminTesisCardList;
