export namespace UsuarioEndpoint {

  export async function getUserById( idUser: number, token: string )
  {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/${idUser}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    if(!response.ok){
      throw(new Error('Error fetching the data'))
    }
    const result = await response.json();
    return result;
  }

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
    };
    const response = await fetch(url, options);
    if(!response.ok){
      throw(new Error('Error fetching the data'))
    }
    const result = await response.json();
    return result;
  }

  //revalidate tag when creating student user
  export async function getAlumnosPhd( token: string )
  {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-phd`;
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

  export async function getAlumnosPhdPaginated( token: string, page: number, limit: number)
  {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/paginated/alumnosPhd?page=${page}&limit=${limit}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },  
    };
    const response = await fetch(url, options);
    if(!response.ok){
      throw(new Error('Error fetching the data'))
    }
    const result = await response.json();
    return result;
  }

  export async function getAlumnosPhdById( token: string, query: number)
  {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-phd/id/${query}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },  
    };
    const response = await fetch(url, options);
    if(!response.ok){
      throw(new Error('Error fetching the data'))
    }
    const result = await response.json();
    return result;
  }

  export async function getAlumnosPhdByName( token: string, query: string)
  {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-phd/name/${query}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },  
    };
    const response = await fetch(url, options);
    if(!response.ok){
      throw(new Error('Error fetching the data'))
    }
    const result = await response.json();
    return result;
  }

  export async function getAlumnosAsesoradosArray( idAsesor: number, idGrado: number, token: string )
  {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-asesorados/${idAsesor}/${idGrado}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },  
      cache: 'no-store' as RequestCache, 
    };
    const response = await fetch(url, options);
    if(!response.ok){
      throw(new Error('Error fetching the data'))
    }
    const result = await response.json();
    return result;
  }

}
