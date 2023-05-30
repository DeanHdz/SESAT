import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace FormatoEvaluacion {
  export const getFormatoEvaluacion = async (
    id: number,
    token: string
  ): Promise<SESAT.FormatoEvaluacion | undefined> => {
    return await axios
      .get<SESAT.FormatoEvaluacion>(
        `${import.meta.env.VITE_API_HOSTNAME}/formato-evaluacion/` + id,
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

  export const getAllFormatoEvaluacions = async (
    token: string
  ): Promise<SESAT.FormatoEvaluacion[] | undefined> => {
    return await axios
      .get<SESAT.FormatoEvaluacion[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/formato-evaluacion`,
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

  export const postFormatoEvaluacion = async (
    CreateformatoEvaluacionDto: SESAT.CreateFormatoEvaluacion,
    token: string
  ): Promise<SESAT.FormatoEvaluacion | undefined> => {
    return await axios
      .post(
        `${import.meta.env.VITE_API_HOSTNAME}/formato-evaluacion`,
        CreateformatoEvaluacionDto,
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

  export const putFormatoEvaluacion = async (
    UpdateformatoEvaluacionDto: SESAT.UpdateFormatoEvaluacion,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(
        `${import.meta.env.VITE_API_HOSTNAME}/formato-evaluacion`,
        UpdateformatoEvaluacionDto,
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

  export const deleteFormatoEvaluacion = async (
    id: number,
    token: string
  ): Promise<SESAT.FormatoEvaluacion | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/formato-evaluacion/` + id, {
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