import { useState } from "react";

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="w-45 h-40 bg-[#727272] flex flex-col justify-center items-start gap-8 p-4 cursor-pointer hover:bg-[#7a7a7a] transition-colors duration-200"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`w-30 h-2 bg-white rounded-full ml-5 transition-all duration-700 ease-out ${
          isOpen
            ? "transform origin-left rotate-45 translate-x-2 translate-y-1"
            : ""
        }`}
      ></div>
      <div
        className={`w-20 h-2 ml-5 bg-white rounded-full transition-all duration-700 ease-out ${
          isOpen ? "opacity-0 scale-75" : ""
        }`}
      ></div>
      <div
        className={`w-30 h-2 bg-white rounded-full ml-5 transition-all duration-700 ease-out ${
          isOpen
            ? "transform origin-left -rotate-45 translate-x-2 translate-y-1"
            : ""
        }`}
      ></div>
    </div>
  );
}

export default Hamburger;
