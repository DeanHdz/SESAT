import Drawer from "../Components/Drawer/Drawer";
import AdminBoard from "../Components/Board/AdminBoard";

const AdminBoardPage = () => {
  return (
    <div className="flex flex-row">
      <div className="w-3/12">
        <Drawer />
      </div>
      <div className="w-9/12">
        <AdminBoard />
      </div>
    </div>
  )
}

export default AdminBoardPage;