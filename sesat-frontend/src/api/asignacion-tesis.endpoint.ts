import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace AsignacionTesisEndpoint {
  export const getAsignacionTesis = async (
    id: number,
    token: string
  ): Promise<SESAT.AsignacionTesis | undefined> => {
    return await axios
      .get<SESAT.AsignacionTesis>(
        `${import.meta.env.VITE_API_HOSTNAME}/asignacion-tesis/` + id,
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
  export const getAsignacionTesises = async (
    token: string
  ): Promise<SESAT.AsignacionTesis[] | undefined> => {
    return await axios
      .get<SESAT.AsignacionTesis[]>(`${import.meta.env.VITE_API_HOSTNAME}/asignacion-tesis`, {
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

  export const postAsignacionTesis = async (
    createAsignacionTesis: SESAT.CreateAsignacionTesis,
    token: string
  ): Promise<SESAT.AsignacionTesis | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/asignacion-tesis`, createAsignacionTesis, {
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

  export const putAsignacionTesis = async (
    updateAsignacionTesis: SESAT.UpdateAsignacionTesis,
    token: string
  ): Promise<SESAT.AsignacionTesis | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/asignacion-tesis`, updateAsignacionTesis, {
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

  export const deleteAsignacionTesis = async (
    id: number,
    token: string
  ): Promise<SESAT.AsignacionTesis | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/asignacion-tesis/` + id, {
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