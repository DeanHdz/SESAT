import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import UserRegistryForm from "../Components/UserRegistryForm/UserRegistryForm";

let paths: string[] = [];
paths.push("Registro de Usuario");

let links: string[] = [];
links.push("/user-register");

export const UserRegistryPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Registro de Usuario"}/>
      <BreadcrumbContainer paths={paths} links={links}/>
      <UserRegistryForm />
    </div>
  );
};

export default UserRegistryPage
