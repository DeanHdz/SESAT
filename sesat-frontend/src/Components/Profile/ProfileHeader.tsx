export const ProfileHeader = () => {
    
    //(Dean) Modificar función para recibir cadena de Nombre
    //1.- Funcion para rescatar 2 iniciales y mostrarlos dentro del circulo. Primer inicial de nombre y de apellido paterno
    //2.- Posible idea para determinar si un usuario se encuentra: "en linea/desconectado" (Descartable)
    
    return (
        <div className="flex flex-wrap gap-4 m-8 place-content-start">
            <div className="avatar online placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                    <span className="text-xl">DH</span>
                </div>
            </div> 
            <div className="self-center">
                <span className="text-3xl">Dean Joshua Hernandez</span>
            </div>
        </div>
    );
  };
  
  export default ProfileHeader;