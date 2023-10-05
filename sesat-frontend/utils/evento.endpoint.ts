export namespace EventoEndpoint {
  export async function getEventos(token: string) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/evento`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["eventos"],
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }
}
