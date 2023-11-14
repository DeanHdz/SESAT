import { AsesorEventDto, CreateEventByType, CreateEvento } from "../types/ISESAT";

export namespace EventoEndpoint {

  export async function postAsesorEvent(token: string, data: AsesorEventDto )
  {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/evento/asesorEvent`;
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

  export async function getParticipants(token: string, title: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/evento/participants/${title}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      /*next: {
        tags: [`EventosByTitle${title}`],
      },*/
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }

  export async function deleteEventosByTitle(token: string, title: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/evento/deleteByTitle/${title}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      /*next: {
        tags: [`EventosByTitle${title}`],
      },*/
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }


  export async function getEventosByTitle(token: string, title: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/evento/byTitle/${title}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      /*next: {
        tags: [`EventosByTitle${title}`],
      },*/
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }

  export async function postEventByType(createEvento: CreateEventByType, token: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/evento/typed`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createEvento),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }

  export async function getEventos(token: string, id: number) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/evento/user/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["Eventos"],
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Error fetching the data");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return undefined;
    }
  }

  export async function postEvento(createEvento: CreateEvento, token: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/evento`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createEvento),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }


}
