import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import ProfileHeader from "../Components/Profile/ProfileHeader";
import ProfileDetailSection from "../Components/Profile/ProfileDetailSection";

let paths: string[] = [];
paths.push("Perfil público");

let links: string[] = [];
links.push("/profile");

export const ProfilePage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Perfil público"}/>
      <BreadcrumbContainer paths={paths} links={links}/>
      <ProfileHeader />
      <ProfileDetailSection />
    </div>
  );
};

export default ProfilePage
