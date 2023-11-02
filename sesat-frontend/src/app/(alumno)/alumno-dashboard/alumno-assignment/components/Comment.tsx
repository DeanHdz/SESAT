import Reply from "../../components/Reply"
import React from "react"

export interface CommentProps{
    userName: string, 
    date: string, 
    body: string, 
    comment_id: number
}

const Comment = (props : CommentProps) => {
return(
    <>
      <div className="flex-col w-full bg-white border-b-2 border-l-2 border-gray-200 mt-2">
        <div className="flex flex-row">
          
         <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 27a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm0-2a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"/><path d="M44 24c0 11.046-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4s20 8.954 20 20ZM33.63 39.21A17.915 17.915 0 0 1 24 42a17.916 17.916 0 0 1-9.832-2.92c-.24-.3-.483-.61-.73-.93A2.144 2.144 0 0 1 13 36.845c0-1.077.774-1.98 1.809-2.131c6.845-1 11.558-.914 18.412.035A2.077 2.077 0 0 1 35 36.818c0 .48-.165.946-.463 1.31c-.307.374-.61.735-.907 1.082Zm3.355-2.744c-.16-1.872-1.581-3.434-3.49-3.698c-7.016-.971-11.92-1.064-18.975-.033c-1.92.28-3.335 1.856-3.503 3.733A17.94 17.94 0 0 1 6 24c0-9.941 8.059-18 18-18s18 8.059 18 18a17.94 17.94 0 0 1-5.015 12.466Z"/></g></svg>
         </div>
          
          <div className="flex-col mt-1">
              
              <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                {props.userName}
                <span className="ml-2 text-xs font-normal text-gray-500">
                    {props.date}
                </span>
              </div>
              
              <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
              {props.body}
              <button className="inline-flex items-center flex-column text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5 ml-2 cursor-pointer fill-current"
                      viewBox="0 0 95 78" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                          fillRule="nonzero" />
                  </svg> 
              </button>
              </div>
              
              
          </div>
        </div>
        
        <>
          {/*repliesToDisplay*/}
          <Reply userName="Dean Joshua Hernandez" date="10/10/2023" body="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."/>
        </>
        
      </div>
    </>
  )
}

export default Comment