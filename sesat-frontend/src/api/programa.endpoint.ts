import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace ProgramaEndpoint {
  export const getPrograma = async (
    id: number,
    token: string
  ): Promise<SESAT.Programa | undefined> => {
    return await axios
      .get<SESAT.Programa>(`${import.meta.env.VITE_API_HOSTNAME}/programa/` + id, {
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

  export const getProgramas = async (
    token: string
  ): Promise<SESAT.Programa[] | undefined> => {
    return await axios
      .get<SESAT.Programa[]>(`${import.meta.env.VITE_API_HOSTNAME}/programa`, {
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

  export const postPrograma = async (
    createProgramaDto: SESAT.CreatePrograma,
    token: string
  ): Promise<SESAT.Programa | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/programa`, createProgramaDto, {
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

  export const putPrograma = async (
    updateProgramaDto: SESAT.UpdatePrograma,
    token: string
  ): Promise<SESAT.Programa | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/programa`, updateProgramaDto, {
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

  export const deletePrograma = async (
    id: number,
    token: string
  ): Promise<SESAT.Programa | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/programa/` + id, {
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