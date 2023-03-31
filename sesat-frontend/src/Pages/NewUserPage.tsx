import Navbar from "../Components/Navbar/Navbar"
import InsiteBaner from "../Components/Banner/InsiteBanner"

const NewUserPage = () =>
{
  return(
    <>
      <Navbar />
      <InsiteBaner topic="Bienvenido"/>
      <article className="text-3xl mt-4 ml-4">
        Te damos la bienvenida al <br />
        <span className="text-blue-950 font-SESAT text-6xl"> Sistema de Seguimiento de Avances de Tesis </span>
      </article>
    </>
  )
}

export default NewUserPage