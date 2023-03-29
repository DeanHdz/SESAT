import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace AsesorEndpoint {
  export const getAsesor = async (
    id: number,
    token: string
  ): Promise<SESAT.Asesor | undefined> => {
    return await axios
      .get<SESAT.Asesor>(`${import.meta.env.VITE_API_HOSTNAME}/asesor/` + id, {
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

  export const getAsesores = async (
    token: string
  ): Promise<SESAT.Asesor | undefined> => {
    return await axios
      .get<SESAT.Asesor>(`${import.meta.env.VITE_API_HOSTNAME}/asesor`, {
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

  export const postAsesor = async (
    createAsesorDto: SESAT.CreateAsesor,
    token: string
  ): Promise<SESAT.Asesor | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/asesor`, createAsesorDto, {
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

  export const putAsesor = async (
    updateAsesorDto: SESAT.UpdateAsesor,
    token: string
  ): Promise<SESAT.Asesor | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/asesor`, updateAsesorDto, {
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

  export const deleteAsesor = async (
    id: number,
    token: string
  ): Promise<SESAT.Asesor | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/asesor/` + id, {
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