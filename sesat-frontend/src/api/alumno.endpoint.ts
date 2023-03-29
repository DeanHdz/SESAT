import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace AlumnoEndpoint {
  export const getAlumno = async (
    id: number,
    token: string
  ): Promise<SESAT.Alumno | undefined> => {
    return await axios
      .get<SESAT.Alumno>(`${import.meta.env.VITE_API_HOSTNAME}/alumno/` + id, {
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

  export const getAlumnos = async (
    token: string
  ): Promise<SESAT.Alumno | undefined> => {
    return await axios
      .get<SESAT.Alumno>(`${import.meta.env.VITE_API_HOSTNAME}/alumno`, {
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

  export const postAlumno = async (
    createAlumnoDto: SESAT.CreateAlumno,
    token: string
  ): Promise<SESAT.Alumno | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/alumno`, createAlumnoDto, {
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

  export const putAlumno = async (
    updateAlumnoDto: SESAT.UpdateAlumno,
    token: string
  ): Promise<SESAT.Alumno | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/alumno`, updateAlumnoDto, {
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

  export const deleteAlumno = async (
    id: number,
    token: string
  ): Promise<SESAT.Alumno | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/alumno/` + id, {
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