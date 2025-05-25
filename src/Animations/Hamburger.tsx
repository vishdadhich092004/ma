import { useState } from "react";

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="w-45 h-40 bg-[#727272] flex flex-col justify-center items-start gap-8 p-4"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`w-30 h-2 bg-white rounded-full ml-5 ${
          isOpen
            ? "transform origin-left rotate-45 translate-x-3 duration-700"
            : " duration-700"
        }`}
      ></div>
      <div
        className={`w-15 h-2 ml-5 bg-white rounded-full ${
          isOpen ? "opacity-0 duration-500" : " duration-500"
        }`}
      ></div>
      <div
        className={`w-30 h-2 bg-white rounded-full ml-5 ${
          isOpen
            ? "transform origin-left -rotate-45 translate-x-3 duration-700"
            : " duration-700"
        }`}
      ></div>
    </div>
  );
}

export default Hamburger;
