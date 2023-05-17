import { IReply } from "../../Interfaces/IReply"
import { IComment } from "../../Interfaces/IComment"
import { SESAT } from "../../Interfaces/ISESAT";
import { RespuestaEndpoint } from "../../api/respuesta.endpoint";
import UserIcon from "../UserIcon/UserIcon"
import Reply from "./Reply"
import { useState, useEffect } from "react";

const Comment = ({userName, date, body, comment_id}:{userName: string, date: string, body: string, comment_id: number}) =>
{
  console.log("id del comentario: " + comment_id);
  const [respuesta, setRespuesta] = useState<SESAT.Respuesta[] | undefined>();

  const getRespuestas = async () => 
  {
    setRespuesta(await RespuestaEndpoint.getPerAssignment(comment_id, ""));
  }
  
  useEffect(() => {
    getRespuestas();
  }, []);

  let repplies: IReply[] = [];

  for (let i = 0; respuesta && i < respuesta.length; i++) {
    let repply: IReply;
    repply = {
      userName: "Jesús Alemán",
      date: "day: " + (i + 1) + " month: 3 year: 2023",
      body: respuesta[i].texto,
    };
    repplies.push(repply);
  }
  
  let repliesToDisplay = [];
  for(let i=0; i<repplies.length;i++)
  {
    repliesToDisplay.push(<Reply userName={repplies[i].userName} date={repplies[i].date} body={repplies[i].body} />);
  }
  
  return(
    <>
      <div className="flex-col w-full bg-white border-b-2 border-l-2 border-gray-200 mt-2">
        <div className="flex flex-row">
          {/*User Image*/}
          <UserIcon userName="BG"/>
          {/*User Image*/}
          <div className="flex-col mt-1">
              {/*User name and date of comment is here*/}
              <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                {userName}
                <span className="ml-2 text-xs font-normal text-gray-500">
                    {date}
                </span>
              </div>
              {/*User name and date of comment is here*/}
              <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
              {body}
              <button className="inline-flex items-center flex-column text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5 ml-2 cursor-pointer fill-current"
                      viewBox="0 0 95 78" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                          fill-rule="nonzero" />
                  </svg> 
              </button>
              </div>
              {/* Text is here*/}
              
          </div>
        </div>
        {/*here go replies*/}
        <>
          {repliesToDisplay}
        </>
        {/*here go replies*/}
      </div>
    </>
  )
}

export default Comment