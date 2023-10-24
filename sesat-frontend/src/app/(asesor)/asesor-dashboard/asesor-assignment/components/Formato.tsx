import React, { useState } from "react";

const AssignmentPath = () => {
  const [titulo, setTitulo] = useState("");
  const [programa, setPrograma] = useState("");
  const [estudiante, setEstudiante] = useState("");
  const [asesor, setAsesor] = useState("");
  const [coasesor, setCoasesor] = useState("");
  const [comiteTesis, setComiteTesis] = useState("");
  const [tituloTesis, setTituloTesis] = useState("");
  const [fechaComienzo, setFechaComienzo] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Titulo:", titulo);
    console.log("Programa:", programa);
    console.log("Estudiante:", estudiante);
    console.log("Asesor:", asesor);
    console.log("Coasesor:", coasesor);
    console.log("ComiteTesis:", comiteTesis);
    console.log("Titulo Tesis:", tituloTesis);
    console.log("Fecha Comienzo:", fechaComienzo);
    console.log("Fecha Limite:", fechaLimite);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="titulo">
              Titulo:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="programa">
              Programa:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="programa"
              value={programa}
              onChange={(e) => setPrograma(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="estudiante">
              Estudiante:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="estudiante"
              value={estudiante}
              onChange={(e) => setEstudiante(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="asesor">
              Asesor:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="asesor"
              value={asesor}
              onChange={(e) => setAsesor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="coasesor">
              Co-asesor:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="coasesor"
              value={coasesor}
              onChange={(e) => setCoasesor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="comiteTesis">
              Comite de Tesis:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="comiteTesis"
              value={comiteTesis}
              onChange={(e) => setComiteTesis(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="tituloTesis">
              Titulo de Tesis:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="tituloTesis"
              value={tituloTesis}
              onChange={(e) => setTituloTesis(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="fechaComienzo">
              Fecha de comienzo:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="fechaComienzo"
              value={fechaComienzo}
              onChange={(e) => setFechaComienzo(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="fechaLimite">
              Fecha limite para examen de grado:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="fechaLimite"
              value={fechaLimite}
              onChange={(e) => setFechaLimite(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AssignmentPath;

