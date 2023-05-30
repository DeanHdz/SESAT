import Contact from "./Contact";
import { useEffect, useState } from "react";
import { SESAT } from "../../Interfaces/ISESAT";
import { TesisEndpoint } from "../../api/tesis.endpoint";
import { AsignacionEndpoint } from "../../api/asignacion.endpoint";
import { useNavigate } from "react-router-dom";
import { ComiteEndpoint } from "../../api/comite.endpoint";

const ContactContainer = () =>
{
  const navigate = useNavigate();
  const [user, setUser] = useState<SESAT.LoggedUser>(
    JSON.parse(sessionStorage.getItem("loggedUser") || "{}")
  );

  const [comite, setComite] = useState<SESAT.Comite[]>();

  useEffect(() => {
    TesisEndpoint.getTesisPerStudent(user.usuario.clave, "").then((tesis) => {
      if (tesis) {
        ComiteEndpoint.getPerTesis(tesis.id_tesis, "").then((comite) => {
          if (comite) {
            setComite(comite);
          }
        });
      }
    });
  }, []);

  if(comite)
  {
    const comitezzz = [];
    for (let i = 0; i < comite.length; i++)
    {
      comitezzz.push(<Contact key={i} asesor={comite[i].asesor} />);
    }
    return(
      <>
      {
        comitezzz
      }
      </>
    )
  }
  else
  {
    return(
      <div> No hay contactos por mostrar </div>
    )
  }
}


export default ContactContainer;