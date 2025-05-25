import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

function GoogleSignIn() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="flex flex-row items-center gap-9 bg-blue-600 rounded-lg p-1 w-[300px] cursor-pointer font-medium"
      onClick={() => {
        setIsHovered(!isHovered);
      }}
    >
      <span
        className={`bg-white h-10 w-10 flex items-center justify-center rounded-l-lg transform transition-transform duration-800 ease-in-out ${
          isHovered
            ? "translate-x-[250px] rounded-r-lg rounded-l-none"
            : "translate-x-0"
        }`}
      >
        <FaGoogle size={20} />
      </span>
      <span className="text-white relative flex items-center h-10 w-[220px] overflow-hidden">
        <span
          className={`text-sm whitespace-nowrap transition-all duration-800 ease-in-out transform font-bold ${
            isHovered
              ? "opacity-0 -translate-x-[280px] absolute pointer-events-none"
              : "opacity-100 translate-x-0"
          }`}
        >
          Sign in with Google
        </span>
        <span
          className={`flex items-center gap-2 whitespace-nowrap transition-all duration-800 ease-in-out transform ${
            isHovered
              ? "opacity-100 "
              : "opacity-0 translate-x-full absolute pointer-events-none"
          }`}
        >
          <img
            src="https://avatars.githubusercontent.com/u/1?v=4"
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-xs">Hey Saudh</span>
            <span className="text-xs">admin@saudh.com</span>
          </div>
        </span>
      </span>
    </div>
  );
}

export default GoogleSignIn;
