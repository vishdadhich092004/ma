import BottomNavbar from "./Animations/BottomNavbar";
import Hamburger from "./Animations/Hamburger";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <Hamburger />
      <BottomNavbar />
    </div>
  );
}

export default App;
