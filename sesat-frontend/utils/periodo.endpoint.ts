import { CreatePeriodo, UpdatePeriodo } from "../types/ISESAT";

export async function fetchLatestPeriod(
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/periodo/last/period`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store' as RequestCache,
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    throw (new Error('Error fetching the data'))
  }

  const result = await response.json();
  return result;
}

export async function postNewPeriod(
  createPeriodoDto: CreatePeriodo,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/periodo`;  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(createPeriodoDto),
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    throw (new Error('Error fetching the data'))
  }

  const result = await response.json();
  return result;
}

export async function putPeriod(
  UpdatePeriodoDto: UpdatePeriodo,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/periodo`;  
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(UpdatePeriodoDto),
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    throw (new Error('Error fetching the data'))
  }

  const result = await response.json();
  return result;
}