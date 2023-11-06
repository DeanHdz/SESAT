import React from 'react';
import CommentCard from "./CommentCard";
import { cookies } from 'next/headers';
import { LoggedUser, Notificacion } from '../../../../../types/ISESAT';
import { LoginEndpoint } from '../../../../../utils/login.endpoint';
import { findNotificationsByUser } from '../../../../../utils/notification.endpoint';
import { shortFormatDate } from '../../../../../utils/utils';

const NotificacionSection = async () => {
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const user: LoggedUser = await LoginEndpoint.getUserInfo(token);
  const notifications: Notificacion[] = await findNotificationsByUser(user.id_usuario, token);

  return (
    <div className="w-full pb-5 justify-center">
          <div className="w-full pb-5 justify-center">
            <p className="text-2xl font-bold text-black/40">Notificaciones</p>
          </div>
          {notifications ? notifications.map((notification) => {
            return (<CommentCard title={`${notification.titulo} (${shortFormatDate(notification.fecha_expedicion)})`} webLink="#" texta={notification.descripcion} />)
          }) : null}
          {/*<CommentCard title="Avance #1" webLink="#" texta="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />
          <CommentCard title="Avance #2" webLink="#" texta="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />
          <CommentCard title="Avance #2" webLink="#" texta="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />
          <CommentCard title="Avance #2" webLink="#" texta="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />*/}
    </div>
  );
};

export default NotificacionSection;
