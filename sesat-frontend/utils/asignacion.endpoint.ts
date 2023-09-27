
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
    cache: 'no-store' as RequestCache,
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
    cache: 'no-store' as RequestCache,
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
    cache: 'no-store' as RequestCache,
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