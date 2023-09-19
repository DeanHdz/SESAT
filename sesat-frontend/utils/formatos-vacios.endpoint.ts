import { UpdateFormatoVacio } from "../types/ISESAT";





export namespace FormatosVaciosEndpoint {
  {/**
  export const putFormatosVacioss = async (
    UpdateFormatosVaciosDto: SESAT.UpdateFormatosVacios,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(
        `${import.meta.env.VITE_API_HOSTNAME}/formatos-vacios`,
        UpdateFormatosVaciosDto,
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

   */}

  


  export async function postDataTest(
    UpdateFormatoVacioDto:UpdateFormatoVacio,
    token: string
    ) {      
      const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/formato-vacio`;

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,          
        },
        body: JSON.stringify(UpdateFormatoVacioDto),
      };

    try {
      const response = await fetch(url, options);
      if(response.ok){        
        alert("PDF added successfully");      //for testing 
      }
    } catch (error) {
      alert(`${error}`);//for testing
    }

  }

{/**
  export const getFormatosVacios = async (
    id: number,
    token: string
  ): Promise<SESAT.FormatosVacios | undefined> => {
    return await axios
      .get<SESAT.FormatosVacios>(
        `${import.meta.env.VITE_API_HOSTNAME}/formatos-vacios/` + id,
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

  export const getAllFormatosVacioss = async (
    token: string
  ): Promise<SESAT.FormatosVacios[] | undefined> => {
    return await axios
      .get<SESAT.FormatosVacios[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/formatos-vacios`,
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

  export const postFormatosVacios = async (
    CreateFormatosVaciosDto: SESAT.CreateFormatosVacios,
    token: string
  ): Promise<SESAT.FormatosVacios | undefined> => {
    return await axios
      .post(
        `${import.meta.env.VITE_API_HOSTNAME}/formatos-vacios`,
        CreateFormatosVaciosDto,
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

  export const putFormatosVacios = async (
    UpdateFormatosVaciosDto: SESAT.UpdateFormatosVacios,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(
        `${import.meta.env.VITE_API_HOSTNAME}/formatos-vacios`,
        UpdateFormatosVaciosDto,
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

  export const deleteFormatosVacios = async (
    id: number,
    token: string
  ): Promise<SESAT.FormatosVacios | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/formatos-vacios/` + id, {
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

   */}
}