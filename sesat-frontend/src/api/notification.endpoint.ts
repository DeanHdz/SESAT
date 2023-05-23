import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace NotificationEndpoint {
  export const getNotification = async (
    id: number,
    token: string
  ): Promise<SESAT.Notification | undefined> => {
    return await axios
      .get<SESAT.Notification>(
        `${import.meta.env.VITE_API_HOSTNAME}/notification/` + id,
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
  export const getNotifications = async (
    token: string
  ): Promise<SESAT.Notification[] | undefined> => {
    return await axios
      .get<SESAT.Notification[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/notification`,
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

  export const postNotification = async (
    createRespuesta: SESAT.CreateNotification,
    token: string
  ): Promise<SESAT.Notification | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/notification`, createRespuesta, {
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

  export const putNotification = async (
    updateRespuesta: SESAT.UpdateNotification,
    token: string
  ): Promise<SESAT.Notification | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/notification`, updateRespuesta, {
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

  export const deleteNotification = async (
    id: number,
    token: string
  ): Promise<SESAT.Notification | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/notification/` + id, {
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
