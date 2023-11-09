import { CreateExternalAsesor, CreateExternalUser } from "../types/ISESAT";
import { CreateForeignAsesor } from "../types/ISESAT";

export namespace UsuarioEndpoint {

  export async function changeStatus(
    token: string,
    id: number,
  ) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/status/${id}`;
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
    try {
      const result = await response.json();
      return result;
    } catch (e) {
      return null;
    }
  }
  
  export async function postExternalAsesor(
    token: string,
    data: CreateExternalAsesor
  ) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/asesor/external`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    try {
      const result = await response.json();
      return result;
    } catch (e) {
      return null;
    }
  }
  
  export async function getAsesoresPaginated(
    token: string,
    page: number,
    limit: number
  ) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/paginated/asesores?page=${page}&limit=${limit}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["FetchedAsesorList"] }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }
  
  export async function getAsesoresById(token: string, query: number) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/asesor/id/${query}`;
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
  
  export async function getAsesoresByName(token: string, query: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/asesor/name/${query}`;
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

  export async function postForeignAsesor(
    token: string,
    data: CreateForeignAsesor
  ) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/asesor/foreign`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    try {
      const result = await response.json();
      return result;
    } catch (e) {
      return null;
    }
  }

  export async function findExternalAsesor(token: string, id: number) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/external/asesor/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["FetchedExternalAsesor"] },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }

    try {
      const result = await response.json();
      return result;
    } catch (e) {
      return null;
    }
  }

  export async function findExternalStudent(token: string, id: number) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/external/student/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["FetchedExternalUser"] },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }

    try {
      const result = await response.json();
      return result;
    } catch (e) {
      return null;
    }
  }

  export async function postExternalStudent(
    token: string,
    data: CreateExternalUser
  ) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/external/student`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    try {
      const result = await response.json();
      return result;
    } catch (e) {
      return null;
    }
  }

  export async function getUserById(idUser: number, token: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/id/${idUser}`;
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
    try {
      const result = await response.json();
      return result;
    } catch (e) {
      return null;
    }
  }

  export async function getUserByName(token: string, name: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/name/${name}`;
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
    try {
      const result = await response.json();
      return result;
    } catch (e) {
      return null;
    }
  }

  export async function getAlumnosMaestria(token: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-maestria`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["mastersStudents"],
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }

  export async function getAlumnosMaestriaPaginated(
    token: string,
    page: number,
    limit: number
  ) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/paginated/alumnosMasters?page=${page}&limit=${limit}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["PaginatedMastersList"] }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }

  export async function getAlumnosMaestriaById(token: string, query: number) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-maestria/id/${query}`;
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

  export async function getAlumnosMaestriaByName(token: string, query: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-maestria/name/${query}`;
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

  //revalidate tag when creating student user
  export async function getAlumnosPhd(token: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-phd`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["mastersStudents"],
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }

  export async function getAlumnosPhdPaginated(
    token: string,
    page: number,
    limit: number
  ) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/paginated/alumnosPhd?page=${page}&limit=${limit}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["PaginatedPhdList"] }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }

  export async function getAlumnosPhdById(token: string, query: number) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-phd/id/${query}`;
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

  export async function getAlumnosPhdByName(token: string, query: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-phd/name/${query}`;
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

  export async function getAlumnosAsesoradosArray(
    idAsesor: number,
    idGrado: number,
    token: string
  ) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/usuario/alumnos-asesorados/${idAsesor}/${idGrado}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store" as RequestCache,
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }
}
