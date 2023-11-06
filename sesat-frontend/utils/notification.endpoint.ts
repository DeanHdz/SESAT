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

/*
import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace NotificacionEndpoint {
  export const getNotificacion = async (
    id: number,
    token: string
  ): Promise<SESAT.Notificacion | undefined> => {
    return await axios
      .get<SESAT.Notificacion>(
        `${import.meta.env.VITE_API_HOSTNAME}/Notificacion/` + id,
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
  export const getNotificacions = async (
    token: string
  ): Promise<SESAT.Notificacion[] | undefined> => {
    return await axios
      .get<SESAT.Notificacion[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/Notificacion`,
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

  export const postNotificacion = async (
    createRespuesta: SESAT.CreateNotificacion,
    token: string
  ): Promise<SESAT.Notificacion | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/Notificacion`, createRespuesta, {
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

  export const putNotificacion = async (
    updateRespuesta: SESAT.UpdateNotificacion,
    token: string
  ): Promise<SESAT.Notificacion | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/Notificacion`, updateRespuesta, {
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

  export const deleteNotificacion = async (
    id: number,
    token: string
  ): Promise<SESAT.Notificacion | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/Notificacion/` + id, {
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
