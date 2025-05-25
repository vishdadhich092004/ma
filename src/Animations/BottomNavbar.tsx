import { useState } from "react";
import { BiDrink } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineFastfood } from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
function BottomNavbar() {
  const [selected, setSelected] = useState(1);

  // Calculate the position of the sliding indicator
  const getSliderPosition = () => {
    const baseOffset = -112;
    const stepBetweenIcons = 48 + 12 + 14.4;

    return baseOffset + (selected - 1) * stepBetweenIcons;
  };

  return (
    <div className="relative flex flex-row gap-3 items-center justify-evenly h-16   w-[300px]">
      {/* Sliding background indicator */}
      <div
        className="absolute bg-black rounded-lg h-12 w-12 transition-all duration-500 ease-cubic-bezier(0.36, -1.00, 0.32, 2.00)"
        style={{
          transform: `translateX(${getSliderPosition()}px)`,
          transitionDelay: "100ms",
        }}
      />

      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-300 ease-cubic-bezier(0.36, -1.00, 0.32, 2.00) cursor-pointer h-12 w-12 ${
          selected === 1
            ? "text-amber-500"
            : "text-gray-500 hover:text-gray-400"
        }`}
        onClick={() => setSelected(1)}
      >
        <IoFastFoodOutline size={25} />
      </div>
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-300 ease-cubic-bezier(0.36, -1.00, 0.32, 2.00) cursor-pointer h-12 w-12 ${
          selected === 2
            ? "text-amber-500"
            : "text-gray-500 hover:text-gray-400"
        }`}
        onClick={() => setSelected(2)}
      >
        <MdOutlineFastfood size={25} />
      </div>
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-300 ease-cubic-bezier(0.36, -1.00, 0.32, 2.00) cursor-pointer h-12 w-12 ${
          selected === 3
            ? "text-amber-500"
            : "text-gray-500 hover:text-gray-400"
        }`}
        onClick={() => setSelected(3)}
      >
        <PiBowlFood size={25} />
      </div>
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-300 ease-cubic-bezier(0.36, -1.00, 0.32, 2.00) cursor-pointer h-12 w-12 ${
          selected === 4
            ? "text-amber-500"
            : "text-gray-500 hover:text-gray-400"
        }`}
        onClick={() => setSelected(4)}
      >
        <BiDrink size={25} />
      </div>
    </div>
  );
}

export default BottomNavbar;
