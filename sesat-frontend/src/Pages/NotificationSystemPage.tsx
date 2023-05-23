import Drawer from "../Components/Drawer/Drawer";
import AdminBoard from "../Components/Board/AdminBoard";
import NotificationSystem from "../Components/AdminBoardComponents/NotificationSystem";

const NotificationSystemPage = () => {
  return (
    <div className="flex flex-row">
      <div className="w-3/12">
        <Drawer />
      </div>
      <div className="w-9/12">
        <NotificationSystem title="Sistema de Notificaciones" />
      </div>
    </div>
  )
}

export default NotificationSystemPage;