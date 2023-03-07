import LandingInfoBlock from "./LandingInfoBlock/LandingInfoBlock"

const lines:string[] = [
  "Universidad Autónoma de San Luis Potosí",
  "Álvaro Obregón #64, Col. Centro, C.P.",
  "78000",
  "San Luis Potosí, S.L.P., México",
  "Tel. +52 (444) 826 23 00"
];

const link:string = "https://www.uaslp.mx";

const lines2:string[] = [
  "Centro de Servicios Integrales",
  "Avenida Niño Artillero #150",
  "Zona Universitaria, C.P. 78290",
  "San Luis Potosí, S.L.P., México",
  "Tel. +52 (444) 834 25 80 al 85"
];

const link2:string = "https://academica.uaslp.mx/";

const LandingInfo = () =>
{
  return(
    <div className="bg-white mt-10 flex flex-row space-x-2 ">
      <LandingInfoBlock title={"UASLP"} body={lines} link={link}/>
      <LandingInfoBlock title={"SECRETARÍA ACADÉMICA"} body={lines2} link={link2}/>
    </div>
  )
}

export default LandingInfo