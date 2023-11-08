import { CreateComentario } from "../types/ISESAT";

export async function fetchConversationByIdAsignacion(
  idAsignacion: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comentario/conversation/${idAsignacion}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["CommentList"] }
  };
  const response = await fetch(url, options);

  if(!response.ok){    
    throw(new Error('Error fetching data'))
  }

  const result = await response.json();


  return result;

}

export async function postComment(  
  createCommentDto: CreateComentario,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comentario`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(createCommentDto),
  };
  const response = await fetch(url, options);

  if(!response.ok){    
    throw(new Error('Error posting data'))
  }

  const result = await response.json();


  return result;

}

export async function deleteComment(  
  idComment: number,
  token: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/comentario/${idComment}`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },    
  };
  const response = await fetch(url, options);

  if(!response.ok){    
    throw(new Error('Error posting data'))
  }

  const result = await response.json();


  return result;

}