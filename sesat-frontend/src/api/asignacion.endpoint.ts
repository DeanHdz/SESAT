import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace AsignacionEndpoint {
  export const getAsignacion = async (
    id: number,
    token: string
  ): Promise<SESAT.Asignacion | undefined> => {
    return await axios
      .get<SESAT.Asignacion>(
        `${import.meta.env.VITE_API_HOSTNAME}/asignacion/` + id,
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
  export const getAsignaciones = async (
    token: string
  ): Promise<SESAT.Asignacion[] | undefined> => {
    return await axios
      .get<SESAT.Asignacion[]>(`${import.meta.env.VITE_API_HOSTNAME}/asignacion`, {
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

  export const postAsignacion = async (
    createAsignacion: SESAT.CreateAsignacion,
    token: string
  ): Promise<SESAT.Asignacion | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/asignacion`, createAsignacion, {
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

  export const putAsignacion = async (
    updateAsignacion: SESAT.UpdateAsignacion,
    token: string
  ): Promise<SESAT.Asignacion | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/asignacion`, updateAsignacion, {
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

  export const deleteAsignacion = async (
    id: number,
    token: string
  ): Promise<SESAT.Asignacion | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/asignacion/` + id, {
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