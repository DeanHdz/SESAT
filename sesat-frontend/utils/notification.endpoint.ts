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