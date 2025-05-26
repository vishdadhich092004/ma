import BottomNavbar from "./Animations/BottomNavbar";
import CircularImages from "./Animations/CircularImages";
import GoogleSignIn from "./Animations/GoogleSignIn";
import Hamburger from "./Animations/Hamburger";
function App() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-30 mt-10">
      <div className="flex items-center justify-center gap-40 ">
        <Hamburger />
        <BottomNavbar />
        <GoogleSignIn />
      </div>
      <CircularImages />
    </div>
  );
}

export default App;
