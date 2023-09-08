




/*
export const getTesis = async (
  id: number,
  token: string
): Promise<SESAT.Tesis | undefined> => {
  return await axios
    .get<SESAT.Tesis>(`${import.meta.env.VITE_API_HOSTNAME}/tesis/` + id, {
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
*/
/*
 export const getTesisPerStudent = async (
   id: number,
   token: string
 ): Promise<SESAT.Tesis | undefined> => {
   return await axios
     .get<SESAT.Tesis>(`${import.meta.env.VITE_API_HOSTNAME}/tesis/per-student/` + id, {
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

*/
/*
  export const getTesisActivas = async (
    token: string
  ): Promise<SESAT.Tesis[] | undefined> => {
    return await axios
      .get<SESAT.Tesis[]>(`${import.meta.env.VITE_API_HOSTNAME}/tesis/active`, {
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
*/
export async function fetchOneTesis(
  id: string,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/basic-info/${id}`;

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

export async function fetchTesisCompletadasPhd(
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/completed/phd`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },    
  };
  const response = await fetch(url, options );

  const result = await response.json();
  return result;
}


export async function fetchTesisCompletadasMaestriaMedTiempo(
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/completed/mdegree/half-time`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);

  const result = await response.json();
  return result;
}

export async function fetchTesisCompletadasMaestriaTiempoComp(
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/tesis/completed/mdegree/full-time`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);

  const result = await response.json();
  return result;
}
/*

  export const getTesisInactivas = async (
    token: string
  ): Promise<SESAT.Tesis[] | undefined> => {
    return await axios
      .get<SESAT.Tesis[]>(`${import.meta.env.VITE_API_HOSTNAME}/tesis/inactive`, {
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
*/
/*
  //plural de tesis en inglés, porque en español no hay
  export const getTheses = async (
    token: string
  ): Promise<SESAT.Tesis[] | undefined> => {
    return await axios
      .get<SESAT.Tesis[]>(`${import.meta.env.VITE_API_HOSTNAME}/tesis`, {
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
*/
/*
  export const postTesis = async (
    createTesisDto: SESAT.CreateTesis,
    token: string
  ): Promise<SESAT.Tesis | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/tesis`, createTesisDto, {
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
*/
/*
  export const putTesis = async (
    updateTesisDto: SESAT.UpdateTesis,
    token: string
  ): Promise<SESAT.Tesis | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/tesis`, updateTesisDto, {
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
*/
/*
  export const deleteTesis = async (
    id: number,
    token: string
  ): Promise<SESAT.Tesis | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/tesis/` + id, {
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
  */
