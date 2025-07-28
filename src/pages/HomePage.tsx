import BottomNavbar from "../Animations/BottomNavbar";
import CircularImages from "../Animations/CircularImages";
import GoogleSignIn from "../Animations/GoogleSignIn";
import Hamburger from "../Animations/Hamburger";
import ShopPage from "./ShopPage";
import ContactUs from "../components/ContactUs";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-30 mt-10">
      <div className="flex items-center justify-center gap-40 ">
        <Hamburger />
        <BottomNavbar />
        <GoogleSignIn />
      </div>
      <CircularImages />
      <div className="w-full h-full my-10">
        <ShopPage />
      </div>
      <ContactUs />
    </div>
  );
}

export default HomePage;
