export async function fetchLatestPeriod(    
    token: string,
  ) {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/periodo/last/period`;
  
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
  
    if(!response.ok){
      throw(new Error('Error fetching the data'))
    }
  
    const result = await response.json();
    return result;
  }