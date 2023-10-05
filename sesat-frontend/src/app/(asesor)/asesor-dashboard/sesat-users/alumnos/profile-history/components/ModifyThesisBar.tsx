import React from "react";

const ModifyThesisBar = () => {
  return (
    <div className="w-full pb-4">
        <label className="mb-2 block text-2xl font-bold">
            Titulo de Tesis:
        </label>
        <div className="flex">
            <div className="w-9/12 rounded-[15px] bg-[#E8EDEF] input input-bordered ml-2 mr-2">
                <span className="font-semibold align-middle">Desarollo de sistemas utilizando PSP</span>
            </div>
            <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-2 outline-none focus:outline-none">
                <div className="text-center text-[#ffffff]">
                    Modificar titulo
                </div>
            </button>
        </div>
    </div>
  );
};

export default ModifyThesisBar;