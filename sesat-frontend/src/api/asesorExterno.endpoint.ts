import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export const getAsesorExterno = async (
  id: number,
  token: string
): Promise<SESAT.AsesorExterno | undefined> => {
  return await axios
    .get<SESAT.AsesorExterno>(`${process.env.REACT_APP_API_HOSTNAME}/asesorExterno/` + id, {
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

export const getAsesoresExternos = async (
  token: string
): Promise<SESAT.AsesorExterno | undefined> => {
  return await axios
    .get<SESAT.AsesorExterno>(`${process.env.REACT_APP_API_HOSTNAME}/asesorExterno`, {
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

export const postAsesorExterno = async (
  createAsesorExternoDto: SESAT.CreateAsesorExterno,
  token: string
): Promise<SESAT.AsesorExterno | undefined> => {
  return await axios
    .post(`${process.env.REACT_APP_API_HOSTNAME}/asesorExterno`, createAsesorExternoDto, {
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

export const putAsesorExterno = async (
  updateAsesorExternoDto: SESAT.UpdateAsesorExterno,
  token: string
): Promise<SESAT.AsesorExterno | undefined> => {
  return await axios
    .put(`${process.env.REACT_APP_API_HOSTNAME}/asesorExterno`, updateAsesorExternoDto, {
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

export const deleteAsesorExterno = async (
  id: number,
  token: string
): Promise<SESAT.AsesorExterno | undefined> => {
  return await axios
    .delete(`${process.env.REACT_APP_API_HOSTNAME}/asesorExterno/` + id, {
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