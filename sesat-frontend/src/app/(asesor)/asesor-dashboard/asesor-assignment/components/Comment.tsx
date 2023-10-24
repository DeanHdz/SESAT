import { useRouter } from "next/navigation";
import { deleteComment } from "../../../../../../utils/comentario.endpoint";
import { shortFormatDate } from "../../../../../../utils/utils"
import React from "react"

export interface CommentProps {
  userName: string,
  date: string,
  body: string,
  comment_id: number,
  left: boolean
}

const Comment = (props: CommentProps) => {  

  const router = useRouter();

  async function deleteMessage(e: any) {
    e.preventDefault();    
    var div = document.getElementById("button" + props.comment_id) as HTMLElement;
    div.blur();
    try {
      
      await deleteComment(props.comment_id, "");      
      router.refresh();

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={`chat ${props.left === true ? 'chat-start' : 'chat-end'}`}>

        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48"><g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M24 27a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm0-2a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z" /><path d="M44 24c0 11.046-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4s20 8.954 20 20ZM33.63 39.21A17.915 17.915 0 0 1 24 42a17.916 17.916 0 0 1-9.832-2.92c-.24-.3-.483-.61-.73-.93A2.144 2.144 0 0 1 13 36.845c0-1.077.774-1.98 1.809-2.131c6.845-1 11.558-.914 18.412.035A2.077 2.077 0 0 1 35 36.818c0 .48-.165.946-.463 1.31c-.307.374-.61.735-.907 1.082Zm3.355-2.744c-.16-1.872-1.581-3.434-3.49-3.698c-7.016-.971-11.92-1.064-18.975-.033c-1.92.28-3.335 1.856-3.503 3.733A17.94 17.94 0 0 1 6 24c0-9.941 8.059-18 18-18s18 8.059 18 18a17.94 17.94 0 0 1-5.015 12.466Z" /></g></svg>
          </div>
        </div>
        {props.left === true ? (
          <>
            <div className="chat-header">
              {props.userName}
              <time className="text-xs opacity-50 ml-3">{shortFormatDate(props.date)}</time>
            </div>
            <div className="chat-bubble bg-slate-300 text-black/50">
              {props.body}
            </div>
          </>
        ) : (
          <>
            <div className="chat-header">
              <time className="text-xs opacity-50 mr-3">{shortFormatDate(props.date)}</time>
              {props.userName}
            </div>
            {/**Div Oculto - Eliminar mensaje */}
            <div className="flex flex-row items-center">
              <div className="dropdown dropdown-left">
                <label tabIndex={0} className="">
                  <button className="mr-2 text-light-blue-10 hover:text-black w-[30px] h-[30px] flex items-center justify-center active:bg-slate-300 rounded-full">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                  </button>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu-sm shadow bg-base-100 w-fit rounded-full">
                  <li>
                    <button id={`button${props.comment_id}`} className="flex flex-row justify-center items-center px-4 py-2 rounded-full active:bg-red-300" onClick={deleteMessage}>

                      <div className="mr-2 w-[20px] h-[20px]">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                      </div>
                      <span>Eliminar</span>

                    </button>
                  </li>
                </ul>
              </div>

              <div className="chat-bubble bg-slate-300 text-black/50">
                {props.body}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Comment