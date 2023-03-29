import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace TesisEndpoint {
  export const getTesis = async (
    id: number,
    token: string
  ): Promise<SESAT.Tesis | undefined> => {
    return await axios
      .get<SESAT.Tesis>(`${import.meta.env.VITE_API_HOSTNAME}/tesis/` + id, {
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

  //plural de tesis en inglés, porque en español no hay
  export const getTheses = async (
    token: string
  ): Promise<SESAT.Tesis | undefined> => {
    return await axios
      .get<SESAT.Tesis>(`${import.meta.env.VITE_API_HOSTNAME}/tesis`, {
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

  export const postTesis = async (
    createTesisDto: SESAT.CreateTesis,
    token: string
  ): Promise<SESAT.Tesis | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/tesis`, createTesisDto, {
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

  export const putTesis = async (
    updateTesisDto: SESAT.UpdateTesis,
    token: string
  ): Promise<SESAT.Tesis | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/tesis`, updateTesisDto, {
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

  export const deleteTesis = async (
    id: number,
    token: string
  ): Promise<SESAT.Tesis | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/tesis/` + id, {
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