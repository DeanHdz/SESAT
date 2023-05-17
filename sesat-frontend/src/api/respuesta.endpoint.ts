import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace RespuestaEndpoint {
  export const getRespuesta = async (
    id: number,
    token: string
  ): Promise<SESAT.Respuesta | undefined> => {
    return await axios
      .get<SESAT.Respuesta>(
        `${import.meta.env.VITE_API_HOSTNAME}/respuesta/` + id,
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
  export const getRespuestas = async (
    token: string
  ): Promise<SESAT.Respuesta[] | undefined> => {
    return await axios
      .get<SESAT.Respuesta[]>(`${import.meta.env.VITE_API_HOSTNAME}/respuesta`, {
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

  export const getPerComment = async (
    id: number,
    token: string
  ): Promise<SESAT.Respuesta[] | undefined> => {
    return await axios
      .get<SESAT.Respuesta[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/respuesta/per-assignment/` + id,
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

  export const postRespuesta = async (
    createRespuesta: SESAT.CreateRespuesta,
    token: string
  ): Promise<SESAT.Respuesta | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/respuesta`, createRespuesta, {
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

  export const putRespuesta = async (
    updateRespuesta: SESAT.UpdateRespuesta,
    token: string
  ): Promise<SESAT.Respuesta | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/respuesta`, updateRespuesta, {
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

  export const deleteRespuesta = async (
    id: number,
    token: string
  ): Promise<SESAT.Respuesta | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/respuesta/` + id, {
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