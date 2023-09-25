/*
import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace AsignacionEndpoint {
  export const getAsignacion = async (
    id: number,
    token: string
  ): Promise<SESAT.Asignacion | undefined> => {
    return await axios
      .get<SESAT.Asignacion>(
        `${import.meta.env.VITE_API_HOSTNAME}/asignacion/` + id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        if (data) {
          return data;
        }
      });
  };
  export const getAsignaciones = async (
    token: string
  ): Promise<SESAT.Asignacion[] | undefined> => {
    return await axios
      .get<SESAT.Asignacion[]>(`${import.meta.env.VITE_API_HOSTNAME}/asignacion`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data) {
          return data;
        }
      });
  };

  export const postAsignacion = async (
    createAsignacion: SESAT.CreateAsignacion,
    token: string
  ): Promise<SESAT.Asignacion | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/asignacion`, createAsignacion, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data) {
          return data;
        }
      });
  };

  export const putAsignacion = async (
    updateAsignacion: SESAT.UpdateAsignacion,
    token: string
  ): Promise<SESAT.Asignacion | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/asignacion`, updateAsignacion, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data) {
          return data;
        }
      });
  };

  export const deleteAsignacion = async (
    id: number,
    token: string
  ): Promise<SESAT.Asignacion | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/asignacion/` + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data) {
          return data;
        }
      });
  };
}
*/
/*
//devuelve el arreglo de asignaciones[id_tesis] ya no se usa
export async function fetchAsignacionesPendientesDoctorado(
  numAvance: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/pendientes/phd/${numAvance}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next:{
      revalidate: 20
    },
  };
  const response = await fetch(url, options);

  if(!response.ok){
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();


  return result;

}*/

import { CreateAsignacion } from "../types/ISESAT";

export async function fetchNumAsignacionesPendientesDoctorado( 
  numAvance: string, 
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/num-pendientes/phd/${numAvance}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next:{
      revalidate: 20
    },
  };
  const response = await fetch(url, options);

  if(!response.ok){
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();


  return result;

}

export async function fetchNumAsignacionesPendientesMaestriaMedioTiempo( 
  numAvance: string, 
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/num-pendientes/masters/mid-time/${numAvance}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next:{
      revalidate: 20
    },
  };
  const response = await fetch(url, options);

  if(!response.ok){
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();


  return result;

}

export async function fetchNumAsignacionesPendientesMaestriaTiempoComp( 
  numAvance: string, 
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/num-pendientes/masters/full-time/${numAvance}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next:{
      revalidate: 20
    },
  };
  const response = await fetch(url, options);

  if(!response.ok){
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();


  return result;

}


export async function postAsignacionesPhdByNumAv( 
  numAvance: string, 
  asignacionDto: CreateAsignacion,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/pendientes/phd/${numAvance}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(asignacionDto),
  };
  const response = await fetch(url, options);

  if(!response.ok){
    alert(response.statusText)
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();


  return result;

}