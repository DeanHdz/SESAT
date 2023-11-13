import Link from "next/link";
const cssMenu = "navbar rounded-xl duration-200 px-6 hover:bg-slate-500 py-8 flex-col";

export default function Drawer() {
  return (
    <div className="w-full bg-dark-blue-10 h-fit gray__border p-2">
      <ul className="menu p-0  text-white font-light">
        <Link href="/alumno-dashboard" className={`${cssMenu}`}>
          <div className="w-[20px]">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path>
            </svg>
          </div>
          <span className="mt-3">Inicio</span>
        </Link>

        <Link
          href="/alumno-dashboard/profile-history"
          className={`${cssMenu}`}
        >
          <div className="w-[20px]">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20px" 
              height="20px" 
              viewBox="0 0 1024 1024"
            >
              <path fill="currentColor" d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm144 452H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm445.7 51.5l-93.3-93.3C814.7 780.7 828 743.9 828 704c0-97.2-78.8-176-176-176s-176 78.8-176 176s78.8 176 176 176c35.8 0 69-10.7 96.8-29l94.7 94.7c1.6 1.6 3.6 2.3 5.6 2.3s4.1-.8 5.6-2.3l31-31a7.9 7.9 0 0 0 0-11.2zM652 816c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1 112-112 112z"/>
            </svg>
          </div>

          <span className="mt-3">Mi Historial de tesis</span>
        </Link>

      </ul>
    </div>
  );
}
