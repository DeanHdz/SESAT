const ReminderCard = ({ }: {}) => {

    return (

        <div className="flex mt-6">

            <a href="https://www.ejemplo.com">

                <div className="w-[300px] h-fit p-2 bg-light-blue-10 border-l-4 border-dark-blue-10 ml-5 flex justify-center items-center" style={{ borderRadius: "10px", borderLeftWidth: "8px" }}>

                    <div className="text-center">

                        <p className="text-sm" style={{ fontSize: "20px" }}>Entrega 1</p>

                        <p className="text-xs mt-3" >23 de abril de 2023</p>

                    </div>

                </div>

            </a>

        </div>

    );

};




export default ReminderCard;