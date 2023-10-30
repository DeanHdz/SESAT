
export async function fetchOneTesis(
  id: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/basic-info/${id}`;

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
    throw(new Error('Error fetching the data'))
  }

  const result = await response.json();
  return result;
}

export async function fetchTesisCompletadasPhd(
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/completed/phd`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },  
    cache: 'no-store' as RequestCache,  
  };
  const response = await fetch(url, options );

  if(!response.ok){
    throw(new Error('Error fetching the data'))
  }

  const result = await response.json();
  return result;
}


export async function fetchTesisCompletadasMaestriaMedTiempo(
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/completed/mdegree/half-time`;

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
    throw(new Error('Error fetching the data'))
  }

  const result = await response.json();
  return result;
}

export async function fetchTesisCompletadasMaestriaTiempoComp(
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/completed/mdegree/full-time`;

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
    throw(new Error('Error fetching the data'))
  }

  const result = await response.json();
  return result;
}
//Obtener el numero de estudiantes inscritos en X seminario
//el parametro numAvance, representa el seminario
export async function fetchCountAlumnosDoctoradoOfNumAv(  
  numAvance: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/students-count/phd/${numAvance}`;

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

//Obtener el numero de estudiantes inscritos en X seminario
//el parametro numAvance, representa el seminario
export async function fetchCountAlumnosMaestriaOfNumAv(  
  numAvance: string,
  modalidad: string,  // '1' --> tiempo comp, 2 --> medio t.
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/students-count/md/${numAvance}/${modalidad}`;

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

export async function updateNumAvanceForEvaluatedStudents(  
  id_periodo: number,
  token: string, 
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/update-num_avance/all/${id_periodo}`;
 
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },    
  };
  const response = await fetch(url, options);

  if(!response.ok){
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();


  return result;

}


//Numero de Alumnos activos de maestria con numero de Avance ':numAvance' y de tiempo completo
export async function fetchNumAlumnosMaestriaTiempoComp(  
  token: string, 
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/tesis-status/masters/full-time`;
 
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


//Numero de Alumnos activos de maestria con numero de Avance ':numAvance' y de tiempo completo
export async function fetchNumAlumnosMaestriaMedTiempo(  
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/tesis-status/masters/mid-time`;

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

export async function fetchTesisHistory(  
  idTesis: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/history/${idTesis}`;

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


export async function fetchFullTesisHistory(  
  idAlumno: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/full-history/${idAlumno}`;

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






