import React from "react";
import ThesisHistoryItem from "./ThesisHistoryItem";

const ThesisHistory = () => {
  return (
    <div className="w-full">
      
      <div className="hidden lg:flex lg:w-10/12 rounded-[15px] p-3 mt-4 mb-4 bg-white gray__border flex-col items-center">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1024"><path fill="currentColor" fill-opacity=".15" d="M232 888h560V680H232v208zm448-140c22.1 0 40 17.9 40 40s-17.9 40-40 40s-40-17.9-40-40s17.9-40 40-40zM232 616h560V408H232v208zm72-128c0-4.4 3.6-8 8-8h184c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H312c-4.4 0-8-3.6-8-8v-48zm-72-144h560V136H232v208zm72-128c0-4.4 3.6-8 8-8h184c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H312c-4.4 0-8-3.6-8-8v-48z"/><path fill="currentColor" d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-40 824H232V680h560v208zm0-272H232V408h560v208zm0-272H232V136h560v208z"/><path fill="currentColor" d="M312 544h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H312c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0-272h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H312c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm328 516a40 40 0 1 0 80 0a40 40 0 1 0-80 0z"/></svg>
        </div>
        <span className="align-baseline">Archivo de tesis</span>
        <ThesisHistoryItem id_tesis = {1} grado="Maestría" titulo="Desarrollo de sistemas utilizando PSP"/>
        <ThesisHistoryItem id_tesis = {2} grado="Doctorado" titulo="Bubblesort es god, explicado en 5 min."/>
      </div>
        
      <div className="flex w-full lg:hidden rounded-[15px] p-3 mt-4 mb-4 bg-white gray__border flex-row items-center justify-evenly">
        <div className="flex flex-col items-center">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1024"><path fill="currentColor" fill-opacity=".15" d="M232 888h560V680H232v208zm448-140c22.1 0 40 17.9 40 40s-17.9 40-40 40s-40-17.9-40-40s17.9-40 40-40zM232 616h560V408H232v208zm72-128c0-4.4 3.6-8 8-8h184c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H312c-4.4 0-8-3.6-8-8v-48zm-72-144h560V136H232v208zm72-128c0-4.4 3.6-8 8-8h184c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H312c-4.4 0-8-3.6-8-8v-48z"/><path fill="currentColor" d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-40 824H232V680h560v208zm0-272H232V408h560v208zm0-272H232V136h560v208z"/><path fill="currentColor" d="M312 544h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H312c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0-272h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H312c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm328 516a40 40 0 1 0 80 0a40 40 0 1 0-80 0z"/></svg>
        </div>
        <span className="align-baseline">Archivo de tesis</span>
        </div>
        
        <div className="flex flex-col items-center align-middle">
        <ThesisHistoryItem id_tesis = {1} grado="Maestría" titulo="Desarrollo de sistemas utilizando PSP"/>
        <ThesisHistoryItem id_tesis = {2} grado="Doctorado" titulo="Bubblesort es god, explicado en 5 min."/>
        </div>
        

      </div>

    </div>
  );
};

export default ThesisHistory;
