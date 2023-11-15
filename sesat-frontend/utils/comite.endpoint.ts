import { CreateRetrievedCommitteeDTO, TesisRegistryDTO } from "../types/ISESAT";

export async function postTesisRegistry(
  token: string,
  data: TesisRegistryDTO
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comite/tesisRegistry`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching the data");
  }
  try {
    const result = await response.json();
    return result;
  } catch (e) {
    return null;
  }
}

export async function getAsesorTesisList(token: string, id: number)
{
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comite/thesesList/${id}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 0 }    
  };
  const response = await fetch(url, options);

  if(!response.ok){
    throw(new Error('Error fetching data'))
  }
  try {
    const result = await response.json();
    return result;
  } catch (e) {
    return null;
  }
}

export async function postUpdateCommitteeWithRetrieved(
  token: string,
  data: CreateRetrievedCommitteeDTO
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comite/retrieve/update`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching the data");
  }
  try {
    const result = await response.json();
    return result;
  } catch (e) {
    return null;
  }
}

export async function retrieveCommittee(token: string, id: number) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comite/retrieve/${id}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 0 }    
  };
  const response = await fetch(url, options);

  if(!response.ok){
    throw(new Error('Error fetching data'))
  }
  try {
    const result = await response.json();
    return result;
  } catch (e) {
    return null;
  }
}

export async function fetchComiteByIDTesis(
  id: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comite/per-tesis/${id}`;

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
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();

  return result;

}

export async function fetchAsesorByIDTesis(
  id: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comite/findasesor-by-id-tesis/${id}`;

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
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();

  return result;

}

export async function fetchAvancesEntregados(
  idPeriodo: number,
  idAsesor: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comite/asesor/turned-in/${idPeriodo}/${idAsesor}`;

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
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();

  return result;

}

export async function fetchComiteMembers(  
  idTesis: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comite/members/${idTesis}`;

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
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();

  return result;

}

export async function findContactsByIdTesis(  
  idTesis: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comite/contacts/${idTesis}`;

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
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();

  return result;

}

export async function fetchValidateRole(  
  idAsesor: number,
  idAlumno: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comite/validate-role/${idAsesor}/${idAlumno}`;

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
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();

  return result;

}

