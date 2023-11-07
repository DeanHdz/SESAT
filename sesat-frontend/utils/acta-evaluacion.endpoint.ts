import { ActaEvalForm } from "../types/ISESAT";

export async function postActaEvaluacion( 
  idAsignacion: number, 
  updateActaEvaluacionDto: ActaEvalForm,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/acta-evaluacion/review/${idAsignacion}`;

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

export async function fetchActaEvaluacion( 
  idActa: number,   
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/acta-evaluacion/${idActa}`;

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

export async function fetchDocumentData( 
  idActa: number,   
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/acta-evaluacion/document-data/${idActa}`;

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