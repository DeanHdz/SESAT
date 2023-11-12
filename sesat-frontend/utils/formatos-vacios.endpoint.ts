import { UpdateFormatoVacio } from "../types/ISESAT";





export namespace FormatosVaciosEndpoint {

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
}