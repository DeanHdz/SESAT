import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace DatosAlumnoEndpoint {
  export const getDatosAlumno = async (
    id: number,
    token: string
  ): Promise<SESAT.DatosAlumno | undefined> => {
    return await axios
      .get<SESAT.DatosAlumno>(
        `${import.meta.env.VITE_API_HOSTNAME}/datos-alumno/` + id,
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

  export const getAllDatosAlumnos = async (
    token: string
  ): Promise<SESAT.DatosAlumno[] | undefined> => {
    return await axios
      .get<SESAT.DatosAlumno[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/datos-alumno`,
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

  export const postDatosAlumno = async (
    CreateDatosAlumnoDto: SESAT.CreateDatosAlumno,
    token: string
  ): Promise<SESAT.DatosAlumno | undefined> => {
    return await axios
      .post(
        `${import.meta.env.VITE_API_HOSTNAME}/datos-alumno`,
        CreateDatosAlumnoDto,
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

  export const putDatosAlumno = async (
    UpdateDatosAlumnoDto: SESAT.UpdateDatosAlumno,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(
        `${import.meta.env.VITE_API_HOSTNAME}/datos-alumno`,
        UpdateDatosAlumnoDto,
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

  export const deleteDatosAlumno = async (
    id: number,
    token: string
  ): Promise<SESAT.DatosAlumno | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/datos-alumno/` + id, {
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