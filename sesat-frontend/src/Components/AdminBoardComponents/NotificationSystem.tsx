const NotificationSystem = ({title}:{title: string}) => {
    return (
        <div className="w-full p-6 flex flex-col">
            <label className="m-3 block text-2xl font-bold cursor-pointer">{title}</label>  
            <div className="mt-6 mb-6 p-2 border-t  border-light-gray-22 border-solid w-full flex justify-end">
                
            </div>

            <div>
            <div className="form-control">
                
                <label className="label cursor-pointer">
                    <span className="label-text">Notificaciones</span>
                    <input type="checkbox" className="toggle" checked />
                </label>
                
            </div>
        </div>
        </div>        
    );
};

export default NotificationSystem;