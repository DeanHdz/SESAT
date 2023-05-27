import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace GetDatosAlumnoEndpoint {
  export const getDatosAlumno = async (
    id: number,
    token: string
  ): Promise<SESAT.DatosAlumno | undefined> => {
    return await axios
      .get<SESAT.DatosAlumno>(`${import.meta.env.VITE_API_HOSTNAME}/datos-alumno/` + id, {
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

  export const getDatosAlumnos = async (
    token: string
  ): Promise<SESAT.DatosAlumno[] | undefined> => {
    return await axios
      .get<SESAT.getDATA[]>(`${import.meta.env.VITE_API_HOSTNAME}/datos-alumno`, {
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