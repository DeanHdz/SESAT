import { FormatoEvaluacionFilled } from "../types/ISESAT";

export async function postFormatoEvaluacion( 
  idAsignacion: number, 
  updateActaEvaluacionDto: FormatoEvaluacionFilled,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/formato-evaluacion/review/${idAsignacion}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateActaEvaluacionDto),
  };
  const response = await fetch(url, options);

  if(!response.ok){    
    throw(new Error('Error posting data'))
  }

  const result = await response.json();


  return result;

}

export async function fetchFormatoEvaluacion( 
  idFormato: number,   
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/formato-evaluacion/${idFormato}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store' as RequestCache
  };
  const response = await fetch(url, options);

  if(!response.ok){    
    throw(new Error('Error posting data'))
  }

  const result = await response.json();


  return result;

}