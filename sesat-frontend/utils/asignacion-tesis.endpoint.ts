/*
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

*/

import { decode } from "base64-arraybuffer";

/*export async function decodeBase64Async(jsonString: string) {
  var decodedBuffer: Uint8Array = await new Promise((resolve, reject) => {
    //Almacenar los atributos del objeto JSON en un arreglo
    var data = Object.values(jsonString);

    //Cargar el arreglo JSON a un ArrayBuffer
    const array = JSON.parse("[" + data[1] + "]");

    //character set UTF-8
    var base64 = new TextDecoder().decode(Uint8Array.from(array));

    //decodificar de base 64 a binario
    var decoded = new Uint8Array(decode(base64));

    if (decoded) {
      resolve(decoded);
    } else {
      reject(new Error("Failed to decode base64 string"));
    }
  });

  return decodedBuffer;
}*/

export async function fetchDocumentByID(
  id: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/asignacion-tesis/final-document/${id}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next:{
      revalidate: 20
    },
  };
  const response = await fetch(url, options);

  const result = await response.json();


  return result;



}