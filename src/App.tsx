import BottomNavbar from "./Animations/BottomNavbar";
import GoogleSignIn from "./Animations/GoogleSignIn";
import Hamburger from "./Animations/Hamburger";
function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <Hamburger />
      <BottomNavbar />
      <GoogleSignIn />
    </div>
  );
}

export default App;
