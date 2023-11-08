'use client'

import React, { useState } from "react";
import { formatAsISODate, shortFormatDate } from "../../../../../utils/utils";

const ThesisRegistrationForm = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [committeeMembers, setCommitteeMembers] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  let fechahoy = new Date();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Title:", title);
        console.log("Abstract:", abstract);
    console.log("Supervisor:", supervisor);
    console.log("Committee Members:", committeeMembers);
    console.log("Submission Date:", submissionDate);
  };

  return (
    <div>
      <p className="text-2xl font-bold pb-5">Registro de Tesis</p>
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="title">
              Titulo:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="submissionDate">
              Fecha:
            </label>
            <div>
              {
                shortFormatDate(formatAsISODate(fechahoy))
              }
            </div>
          </div>
          <p className="text-2xl font-bold pb-5">Registro de Comite</p>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="supervisor">
              Asesor:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="supervisor"
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="committeeMembers">
              Co-Asesor:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="committeeMembers"
              value={committeeMembers}
              onChange={(e) => setCommitteeMembers(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="abstract">
              Comite de Tesis:
            </label>
            <textarea
              className="border rounded p-2 w-full"
              id="abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
            />
          </div>
        </div>
        <div className="Flex">
          <div><button type="submit" className="mt-10 mb-10 primary__btn">Guardar</button></div>
          <div><button className="mb-10 primary__btn">Subir archivo PDF</button></div>
        </div>

      </form>
    </div>
  );
};

export default ThesisRegistrationForm;