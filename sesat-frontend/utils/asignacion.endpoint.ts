

import { CreateAsignacion, UpdateAsignacion } from "../types/ISESAT";


export async function fetchGroupStatusPHD( 
  idPeriodo: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/groups-status/phd/${idPeriodo}`;

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

export async function fetchGroupStatusMastersDegree( 
  id_periodo: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/groups-status/md/${id_periodo}`;

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

export async function fetchNumAsignacionesPendientesDoctorado( 
  idPeriodo: string,
  numAvance: string, 
  tipo: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/num-pendientes/phd/${idPeriodo}/${numAvance}/${tipo}`;

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



export async function fetchNumAsignacionesEntregadasDoctorado( 
  idPeriodo: number,
  numAvance: string, 
  tipo: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/num-entregadas/phd/${idPeriodo}/${numAvance}/${tipo}`;

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


export async function fetchNumAsignacionesEntregadasMaestria( 
  idPeriodo: number,
  numAvance: string, 
  modalidad: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/num-entregadas/md/${idPeriodo}/${numAvance}/${modalidad}`;

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
  id_periodo: string,
  numAvance: string, 
  tipo: string,  
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/phd/one-in-group/${id_periodo}/${numAvance}/${tipo}`;

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
export async function fetchOneInGroupAsignacionMaestria( 
  id_periodo: string,
  numAvance: string, 
  modalidad: string,  
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/md/one-in-group/${id_periodo}/${numAvance}/${modalidad}`;

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

export async function fetchNumAsignacionesPendientesMaestria( 
  idPeriodo: number,
  numAvance: string, 
  idModalidad: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/num-pendientes/masters/${idPeriodo}/${numAvance}/${idModalidad}`;

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

export async function updateAsignacionesMDByNumAv(   
  asignacionDto: UpdateAsignacion,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/md/update_group/`;

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


export async function postAsignacionesMastersDgByNumAv( 
  numAvance: string, 
  asignacionDto: CreateAsignacion,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion/pendientes/md/${numAvance}`;

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