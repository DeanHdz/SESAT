import AdminTesisCardList from "../Components/AdminBoardComponents/AdminTesisCardList";
import Drawer from "../Components/Drawer/Drawer";

const StudentTesisMPage = () => {
  return (
    <div className="flex flex-row">
      <div className="w-3/12">
        <Drawer />
      </div>
      <div className="w-9/12">
        <AdminTesisCardList title="Tesis de Maestría" grade="Maestría"/>
      </div>
    </div>
  );
};

export default StudentTesisMPage;
