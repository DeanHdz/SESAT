



export async function fetchAsesorByIDTesis(
  id: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comite/findasesor-by-id-tesis/${id}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store' as RequestCache    
  };
  const response = await fetch(url, options);

  if(!response.ok){
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();

  return result;

}

export async function fetchAvancesEntregadosByAsesor(
  idPeriodo: string,
  idAsesor: string,
  idFuncion: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comite/asesor/turned-in/${idPeriodo}/${idAsesor}/${idFuncion}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }, 
    cache: 'no-store' as RequestCache   
  };
  const response = await fetch(url, options);

  if(!response.ok){
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();

  return result;

}
/*
import { SESAT } from "@/types/ISESAT";


export namespace ComiteEndpoint {
  export const getComite = async (
    id: number,
    token: string
  ): Promise<SESAT.Comite | undefined> => {
    return await axios
      .get<SESAT.Comite>(`${import.meta.env.VITE_API_HOSTNAME}/comite/` + id, {
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

  export const getAllComites = async (
    token: string
  ): Promise<SESAT.Comite[] | undefined> => {
    return await axios
      .get<SESAT.Comite[]>(`${import.meta.env.VITE_API_HOSTNAME}/comite`, {
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

  export const getPerAsesor = async (
    id: number,
    token: string
  ): Promise<SESAT.Comite[] | undefined> => {
    return await axios
      .get<SESAT.Comite[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/comite/per-asesor/` + id,
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

  export const getPerTesis = async (
    id: number,
    token: string
  ): Promise<SESAT.Comite[] | undefined> => {
    return await axios
      .get<SESAT.Comite[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/comite/per-tesis/` + id,
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

  export const postComite = async (
    CreateComiteDto: SESAT.CreateComite,
    token: string
  ): Promise<SESAT.Comite | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/comite`, CreateComiteDto, {
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

  export const putComite = async (
    UpdateComiteDto: SESAT.UpdateComite,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/comite`, UpdateComiteDto, {
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

  export const deleteComite = async (
    id: number,
    token: string
  ): Promise<SESAT.Comite | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/comite/` + id, {
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
