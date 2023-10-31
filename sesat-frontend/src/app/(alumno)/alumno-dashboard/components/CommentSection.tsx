import React from "react";
import Comment from "./Comment";

const CommentSection = () =>{
    return(
        <div className="w-full flex flex-col">
            <label className="flex text-2xl font-bold">Comentarios</label>
            <div className='mt-6 mb-6 p-2 w-full flex justify-end'></div>
            <Comment userName="Dean Joshua Hernandez" date="10/10/2023" body="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." comment_id={1}/>
        </div>
    )
}

export default CommentSection