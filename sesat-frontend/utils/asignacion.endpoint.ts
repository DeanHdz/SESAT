

import { CreateAsignacion, UpdateAsignacion } from "../types/ISESAT";

export async function fetchNumAsignacionesPendientesDoctorado( 
  numAvance: string, 
  tipo: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/num-pendientes/phd/${numAvance}/${tipo}`;

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
    console.log(response)
    console.log('Tipo Asignacion:' + tipo)
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();


  return result;

}

export async function fetchNumAsignacionesEntregadasDoctorado( 
  numAvance: string, 
  tipo: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/num-entregadas/phd/${numAvance}/${tipo}`;

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

//Obtiene una asignacion de un grupo de doctorado en especifico
//Nota Todas las asignaciones de un grupo son 'iguales' --> (titulo, desc, fechas)
export async function fetchOneInGroupAsignacionDoctorado( 
  numAvance: string, 
  tipo: string,
  id_periodo: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/phd/one-in-group/${numAvance}/${tipo}/${id_periodo}`;

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

  console.log(result)
  return result;

}

export async function updateAsignacionesPhdByNumAv(   
  asignacionDto: UpdateAsignacion,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/phd/update_group/`;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(asignacionDto),
  };
  const response = await fetch(url, options);

  if(!response.ok){    
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();


  return result;

}