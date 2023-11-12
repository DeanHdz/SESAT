import React from 'react';
import { cookies } from 'next/headers';
import { LoggedUser, Notificacion } from '../../../../../types/ISESAT';
import { LoginEndpoint } from '../../../../../utils/login.endpoint';
import { findNotificationsByUser } from '../../../../../utils/notification.endpoint';
import { shortFormatDate } from '../../../../../utils/utils';
import CommentCard from '@/app/(asesor)/asesor-dashboard/components/CommentCard';

const NotificacionSection = async () => {
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const user: LoggedUser = await LoginEndpoint.getUserInfo(token);
  const notifications: Notificacion[] = await findNotificationsByUser(user.id_usuario, token);
  let renderNotifArray = notifications && notifications.length > 0 && Array.isArray(notifications);

  return (
    <div className="w-full p-6 justify-center bg-white gray__border">
      <div className="w-full pb-5 justify-center">
        <p className="text-xl font-SESAT">Notificaciones</p>
      </div>
      {renderNotifArray ? notifications.map((notification) => {
        return (<CommentCard title={`${notification.titulo} (${shortFormatDate(notification.fecha_expedicion)})`} webLink="#" texta={notification.descripcion} />)
      }) : (
        <div className="font-SESAT text-lg text-black/40 flex items-center cursor-none pointer-events-none">
          No hay notificaciones
        </div>
      )}
    </div>
  );
};

export default NotificacionSection;
