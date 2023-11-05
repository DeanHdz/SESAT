//import { SESAT } from "@/types/ISESAT";
import { DatosAlumno } from "../types/ISESAT";


export namespace DatosAlumnoEndpoint {

  export async function getUserDataById(idUser: number, token: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/datos-alumno/${idUser}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }

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

