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
            <p className="text-2xl font-bold">Notificaciones</p>
          </div>
          {notifications ? notifications.map((notification) => {
            return (<CommentCard title={`${notification.titulo} (${shortFormatDate(notification.fecha_expedicion)})`} webLink="#" texta={notification.descripcion} />)
          }) : null}
    </div>
  );
};

export default NotificacionSection;
