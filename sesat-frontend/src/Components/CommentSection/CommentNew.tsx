const CommentNew = () => {

    return (

        <div className="flex mt-6">

            <a href="https://www.ejemplo.com">

                <div className="w-[300px] h-fit p-2 bg-light-blue-10 border-l-4 border-dark-blue-10 ml-5 flex justify-start items-center" style={{ borderRadius: "10px", borderLeftWidth: "8px" }}>

                    <div className="ml-6">

                        <p className="text-sm ">Nombre</p>

                        <p className="text-xs mt-2" >Texto del comentario</p>

                    </div>

                </div>

            </a>

        </div>

    );

};
export default CommentNew;