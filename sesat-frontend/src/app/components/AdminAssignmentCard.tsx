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
  tipo,
}: {
  title: string;
  avance: number;
  status: number;
  tipo: number;
}) => {



  const statusArray = ['Pendiente', 'Activa', 'Sin Alumnos'];
  const buttonActions = ['Crear', 'Ver', 'No disp...'];
  //Doctorado
  const urlsArray = [
    '/admin-dashboard/assignments/phd/' + avance,
    '/admin-dashboard/assignments/phd/' + avance,
    '#'
  ];
  //Maestria tiempo completo
  const urlsArray1 = [
    '/admin-dashboard/assignments/masters/full-time/create-assignment/' + avance,
    '/admin-dashboard/assignments/masters/full-time/details/' + avance,
    '#'
  ];
  //Maestria medio tiempo
  const urlsArray2 = [
    '/admin-dashboard/assignments/masters/part-time/create-assignment/' + avance,
    '/admin-dashboard/assignments/masters/part-time/details/' + avance,
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
    "No hay alumnos inscritos"
  ]


  const router = useRouter()


  function handleClick() {
    switch (tipo) {
      case 1://Doctorado
        router.push(urlsArray[status]);
        break;
      case 2://maestria tiempo comp
        router.push(urlsArray1[status]);
        break;

      default://maestria medio tiempo 
        router.push(urlsArray2[status]);
        break;
    }
  }


  return (
    <div className="flex flex-row mt-3 p-2 bg-light-blue-10 rounded border border-light-gray-22 border-solid">

      {/**ICON */}
      <div className="flex w-[30px] lg:w-[50px] text-dark-blue-10 justify-center items-center">
        <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
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