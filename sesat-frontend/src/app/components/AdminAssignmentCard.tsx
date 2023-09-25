"use client";
import { useRouter } from 'next/navigation'

{/**
Estados de una asignacion:
  1 -> Pendiente de crear
        Es el estado por default por lo que el administrador deberá crearla para que sea visible
        para los alumnos una vez cumplido el plazo de publicacion que defina
  2 -> Activa
        Es el estado que adquiere una vez que el administrador la creó y ademas de que se
        ha cumplido la fecha de publicacion
  3 -> No hay alumnos activos para esa asignacion
        Existe la posibilidad de que algunos semestres no existan alumnos activos para determinado
        avance de tesis, en este caso no se debe crear ninguna asignación por lo que se desactivará el
        botón de crear asignación
  4 ->  Que sucede cuando se cierra la asignacion?

  Al final de semestre como se va a realizar el proceso para restablecer el panel de asignaciones?
  Es decir que todas se archiven y se muestre nuevamente disponible para crear
  las nuevas, idealmente esto sería al iniciar el semestre



 */}

 


const AdminAssignmentCard = ({
  title,
  avance,
  status,
}: {
  title: string;
  avance: number;
  status: number;
}) => {    

  

  const statusArray = ['Pendiente', 'Activa', 'Sin Alumnos'];
  const buttonActions = ['Crear', 'Ver', 'No disp...'];
  const urlsArray = [
    '/admin-dashboard/assignments/phd/create-assignment/'+avance,
    '/admin-dashboard/assignments/phd/details/'+avance,
    '#'
  ];

  const cssButtonArray = [
    "",
    "",
    "opacity-50 pointer-events-none cursor-not-allowed"
  ]

  const subtitleArray = [
    "Pendiente de asignar",
    "Asignación de avace de tesis activa",
    "No hay alumnos para esta categoría"
  ]


  const router = useRouter()


  function handleClick() {
    router.push(urlsArray[status]);
  }


  return (
    <div className="flex flex-row mt-3 p-2 bg-light-blue-10 rounded border border-light-gray-22 border-solid">
      
      {/**ICON */}
      <div className="flex w-[30px] lg:w-[50px] text-dark-blue-10 justify-center items-center">
          <svg
            style={{ color: "blue" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path
              d="M80,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H80Z"
              opacity="0.2"
              fill="blue"
            ></path>
            <line
              x1="112"
              y1="112"
              x2="176"
              y2="112"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <line
              x1="112"
              y1="144"
              x2="176"
              y2="144"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <rect
              x="40"
              y="40"
              width="176"
              height="176"
              rx="8"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></rect>
            <line
              x1="80"
              y1="40"
              x2="80"
              y2="216"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
          </svg>
      </div>
      
      <div className="w-1/2 flex">
      
        <div className="ml-6 w-auto">
          <p style={{ fontWeight: "bold" }}>{title}</p>
          <p className="mt-1 text-[12px] text-dark-blue-20/50">{subtitleArray[status]}</p>
        </div>
      </div>

      <div className="mx-auto flex items-center text-sm justify-center">
        <p>{statusArray[status]}</p>
      </div>

      <div className="ml-auto flex justify-end items-center">
        <button className={`${cssButtonArray[status]} text-[12px] shadow rounded-full w-[70px] py-[6px] bg-dark-blue-10 text-white`} onClick={handleClick}>
          {buttonActions[status]}
        </button>
      </div>
    </div>
  );
};

export default AdminAssignmentCard;