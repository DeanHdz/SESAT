import React from 'react';
import CommentCard from "./CommentCard";

const NotificacionSection = () => {
  return (
    <div className="w-full pb-5 justify-center">
          <div className="w-full pb-5 justify-center">
            <p className="text-2xl font-bold">Notificaciones</p>
          </div>
          <CommentCard title="Respuesta #1" webLink="#" texta="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />
          <CommentCard title="Respuesta #2" webLink="#" texta="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />
    </div>
  );
};

export default NotificacionSection;
