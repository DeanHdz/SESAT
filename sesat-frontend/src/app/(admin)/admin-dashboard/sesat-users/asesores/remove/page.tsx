"use client";



import React from 'react'
import { useEffect, useState, ChangeEvent } from "react";
import { Usuario } from '../../../../../../../types/ISESAT';

const RemoveAsesorForm = () => {

  const [cssTab0, setCssTab0] = useState("");
  const [cssTab1, setCssTab1] = useState("");
  const [cssTab2, setCssTab2] = useState("tab-active");

  const [hasShownUserInfo, setHasShownUserInfo] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<
    Usuario[] | undefined
  >();


  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  async function getUsuarios() {
    const token = "";
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuarios-prueba/`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);

    setUsers(
      await response.json()
    );
    setHasShownUserInfo(true);

  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  function setActiveTab(tab: number) {
    switch (tab) {
      case 1:
        setCssTab0("tab-active");
        setCssTab1("");
        setCssTab2("");
        break;
      case 2:
        setCssTab0("");
        setCssTab1("tab-active");
        setCssTab2("");
        break;

      default:
        setCssTab0("");
        setCssTab1("");
        setCssTab2("tab-active");
        break;
    }
  }
  return (
    <form className="w-full flex flex-col">


      <label className="mb-6 block text-4xl font-bold">Asesores</label>

      <div className="tabs">
        <a href="/admin-dashboard/sesat-users/asesores" className={`tab tab-lifted ${cssTab0}`} onClick={() => { setActiveTab(1) }}>Asesores registrados en SESAT</a>
        <a href="/admin-dashboard/sesat-users/asesores/register" className={`tab tab-lifted ${cssTab1}`} onClick={() => { setActiveTab(2) }}>Registrar asesor</a>
        <a href="/admin-dashboard/sesat-users/asesores/remove" className={`tab tab-lifted ${cssTab2}`} onClick={() => { setActiveTab(3) }}>Baja de asesor</a>
      </div>


      <div className="mt-6 mb-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-end">


        <input
          type="search"
          placeholder="Buscar asesores"
          className="rounded-full border-b border-light-gray-22 border-solid px-6"
          onChange={(e) => {
            onChangeSearch(e);
          }}
        />
        <div className="flex items-center ml-2">
          <svg stroke="#d5d3dd" fill="#d5d3dd" strokeWidth="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"></path></svg>
        </div>
      </div>

      <div className='mt-6 bg-light-blue-15 gray__border p-3'>
        <table className="table">
          {/*Table head */}
          <thead>
            <tr>
              <th>Clave Única</th>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <>
                {parseInt(search) == user.clave ||
                  (
                    user.nombre +
                    " " +
                    user.apellido_paterno +
                    " " +
                    user.apellido_materno
                  )
                    .toLowerCase()
                    .includes(search.toLowerCase()) ? (
                  /*<StudentProfile user={user} />*/
                  <tr
                    key={user.clave}
                    onClick={() => setSelectedUser(user)}
                    /** Visualizar la seleccion de un renglon*/
                    className={selectedUser?.clave === user.clave ? 'bg-dark-blue-10 rounded text-white cursor-pointer' : 'cursor-pointer'}
                  >
                    <td>{user.clave}</td>
                    <td>{`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</td>
                    <td>{user.correo}</td>
                  </tr>
                ) : (
                  <></>
                )}
              </>
            ))}

          </tbody>
        </table>
      </div>



      <div className="w-full mt-6 flex justify-end">
        <button type="submit" className="btn shadow rounded">
          Dar de baja del sistema SESAT
        </button>
      </div>
    </form>
  )
}

export default RemoveAsesorForm
