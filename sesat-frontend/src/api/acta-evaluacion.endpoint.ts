import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace ActaEvaluacionEndpoint {
  export const getActaEvaluacion = async (
    id: number,
    token: string
  ): Promise<SESAT.ActaEvaluacion | undefined> => {
    return await axios
      .get<SESAT.ActaEvaluacion>(
        `${import.meta.env.VITE_API_HOSTNAME}/acta-evaluacion/` + id,
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

  export const getAllActaEvaluacions = async (
    token: string
  ): Promise<SESAT.ActaEvaluacion[] | undefined> => {
    return await axios
      .get<SESAT.ActaEvaluacion[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/acta-evaluacion`,
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

  export const postActaEvaluacion = async (
    CreateActaEvaluacionDto: SESAT.CreateActaEvaluacion,
    token: string
  ): Promise<SESAT.ActaEvaluacion | undefined> => {
    return await axios
      .post(
        `${import.meta.env.VITE_API_HOSTNAME}/acta-evaluacion`,
        CreateActaEvaluacionDto,
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

  export const putActaEvaluacion = async (
    UpdateActaEvaluacionDto: SESAT.UpdateActaEvaluacion,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(
        `${import.meta.env.VITE_API_HOSTNAME}/acta-evaluacion`,
        UpdateActaEvaluacionDto,
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

  export const deleteActaEvaluacion = async (
    id: number,
    token: string
  ): Promise<SESAT.ActaEvaluacion | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/acta-evaluacion/` + id, {
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