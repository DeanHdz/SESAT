import Link from "next/link";
import EndSessionIcon from "./EndSessionIcon";

export default function AsesorNavbar() {

  return (
    <div className="lg:w-full flex justify-center items-center p-2 bg-light-blue-15 gray__border mb-6 h-[70px]">
      <div className="w-6/12 flex">
        <img width={350} src="/images/uaslp_sesat.png" alt="Sesat logo" />
      </div>
      <div className="w-3/12 px-3 flex justify-end">
        <h1>Bienvenido user_name</h1>
      </div>
      <div className="w-3/12 px-3 flex justify-end">
        <EndSessionIcon />
      </div>
    </div>
  );
}
