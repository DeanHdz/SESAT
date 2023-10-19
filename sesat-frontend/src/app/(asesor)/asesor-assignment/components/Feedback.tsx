import React from "react";

export interface FeedbackProps{
    texto: string;
}

const Feedback = ({texto}: FeedbackProps) => {
    return(
    <div className="w-10/12 pt-5 block mt-10 bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit border border-light-gray-22 border-solid">
          <label className="mb-0 block text-base font-bold">
            Retroalimentación
          </label>
          <div className="mt-6 mb-6 block text-base text-dark-blue-10 font-light">
            {texto}
          </div>
          <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
            <div className="text-center text-[#ffffff]">
              Dar Retroalimentación
            </div>
          </button>
    </div>
    )
} 

export default Feedback