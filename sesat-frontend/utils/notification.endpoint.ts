import { CreateNotificacion } from "../types/ISESAT";

export async function postNotificacion(
  data: CreateNotificacion,
  token: string
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/notification`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["eventos"],
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching the data");
  }
}

export async function findNotificationsByUser(
  id: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/notification/user/${id}`;

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