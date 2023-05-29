import { useEffect, useState, ChangeEvent } from "react";
import StudentProfile from "./StudentProfile";
import { SESAT } from "../../Interfaces/ISESAT";
import { UsuarioEndpoint } from "../../api/usuario.endpoint";

const StudentsProfileList = ({ title }: { title: string }) => {
  const [users, setUsers] = useState<SESAT.Usuario[]>();
  const [search, setSearch] = useState("");

  let nombre = "";

  let usuarios = [];

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    UsuarioEndpoint.getAlumnos("").then((usuarios) => {
      if (usuarios) setUsers(usuarios);
    });
  }, [search]);

  if (users)
    for (let i = 0; i < users.length; i++) {
      nombre =
        users[i].nombre +
        " " +
        users[i].apellido_paterno +
        " " +
        users[i].apellido_materno;
      if (
        parseInt(search) == users[i].clave ||
        nombre.toLowerCase().includes(search.toLowerCase())
      )
        usuarios.push(<StudentProfile user={users[i]} />);
    }
  else return <></>;

  return (
    <div className="w-full p-6 flex flex-col">
      <label className="m-3 block text-2xl font-bold cursor-pointer">
        {title}
      </label>
      <div className="mt-6 mb-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-end">
        <input
          type="search"
          onChange={(e) => {
            onChangeSearch(e);
          }}
          placeholder="Buscar alumnos"
          className="rounded"
        />
      </div>
      {usuarios}
    </div>
  );
};

export default StudentsProfileList;
