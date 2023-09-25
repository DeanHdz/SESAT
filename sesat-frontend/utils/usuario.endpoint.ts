export namespace UsuarioEndpoint {
  /*
  //old 
  export const getUsuario = async (
    id: number,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .get<SESAT.Usuario>(`${import.meta.env.VITE_API_HOSTNAME}/usuario/` + id,
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

  export const getUsuarios = async (
    token: string
  ): Promise<SESAT.Usuario[] | undefined> => {
    return await axios
      .get<SESAT.Usuario[]>(`${import.meta.env.VITE_API_HOSTNAME}/usuario`, {
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

  export const getAsesores = async (
    token: string
  ): Promise<SESAT.Usuario[] | undefined> => {
    return await axios
      .get<SESAT.Usuario[]>(`${import.meta.env.VITE_API_HOSTNAME}/usuario/asesores`, {
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
  ): Promise<SESAT.Usuario[] | undefined> => {
    return await axios
      .get<SESAT.Usuario[]>(`${import.meta.env.VITE_API_HOSTNAME}/usuario/alumnos`, {
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

  export const postUsuario = async (
    createUsuarioDto: SESAT.CreateUsuario,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/usuario`, createUsuarioDto, {
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

  export const putUsuario = async (
    updateUsuarioDto: SESAT.UpdateUsuario,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/usuario`, updateUsuarioDto, {
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

  export const deleteUsuario = async (
    id: number,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/usuario/` + id, {
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

  //revalidate tag when creating student user
  export async function getAlumnosMaestria( token: string )
  {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-maestria`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },  
      next:{
        tags: ['mastersStudents']
      },  
    };
    const response = await fetch(url, options);
    if(!response.ok){
      throw(new Error('Error fetching the data'))
    }
    const result = await response.json();
    return result;
  }

  export async function getAlumnosMaestriaPaginated( token: string, page: number, limit: number)
  {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/paginated/alumnosMasters?page=${page}&limit=${limit}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },  
      /* idk xd
      next:{
        tags: ['mastersStudents']
      },  
      */
    };
    const response = await fetch(url, options);
    if(!response.ok){
      throw(new Error('Error fetching the data'))
    }
    const result = await response.json();
    return result;
  }

  export async function getAlumnosMaestriaById( token: string, query: number)
  {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-maestria/id/${query}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },  
      /* idk xd
      next:{
        tags: ['mastersStudents']
      },  
      */
    };
    const response = await fetch(url, options);
    if(!response.ok){
      throw(new Error('Error fetching the data'))
    }
    const result = await response.json();
    return result;
  }

  export async function getAlumnosMaestriaByName( token: string, query: string)
  {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-maestria/name/${query}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },  
      /* idk xd
      next:{
        tags: ['mastersStudents']
      },  
      */
    };
    const response = await fetch(url, options);
    if(!response.ok){
      throw(new Error('Error fetching the data'))
    }
    const result = await response.json();
    return result;
  }

}
