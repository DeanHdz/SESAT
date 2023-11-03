"use client";
import React, { useEffect } from "react";
import Comment from "./Comment";

type CommentProps = {
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    id_comentario: number;
    id_usuario: number;
    id_asignacion: number;
    texto: string;
    fecha_comentario: string;
    id_respuesta: number | null;
}

const CommentSection = ({ commentsArray, currentUserID }: { commentsArray: CommentProps[], currentUserID: number }) => {

    useEffect(() => {
        let element = document.getElementById('convDiv') as HTMLElement;
        element.scrollTop = element.scrollHeight;

    }, []);

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex flex-row items-center">
                <label className="flex text-2xl font-bold">Comentarios</label>
                <div className='tooltip tooltip-left w-[24px] h-[24px] ml-auto rounded-full flex items-center justify-center hover:bg-light-gray-22'
                    data-tip={'Los comentarios son visibles para el comité de evaluación'}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20px"
                        width="20px" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                            clipRule="evenodd"></path>
                        <path
                            d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z">
                        </path>
                        <circle cx="8" cy="4.5" r="1"></circle>
                    </svg>
                </div>
            </div>
            <div className='mt-1 mb-6 p-2 border-t border-light-gray-22 border-solid w-full flex justify-end'></div>
            <div id="convDiv" className="w-full gray__border min-h-[100px] bg-light-blue-10 p-6 max-h-[300px] overflow-y-scroll no-scrollbar">
                {commentsArray.length > 0 ? (
                    commentsArray.map((elem, i) => (
                        <Comment key={i} body={elem.texto} comment_id={elem.id_comentario} date={elem.fecha_comentario} left={currentUserID === elem.id_usuario ? false : true} userName={`${elem.nombre} ${elem.apellido_paterno} ${elem.apellido_materno} `} />
                    ))
                ) : (
                    <div className="font-SESAT text-lg text-black/40 flex items-center cursor-none pointer-events-none">
                        No hay comentarios
                    </div>
                )}
            </div>


        </div>
    )
}

export default CommentSection