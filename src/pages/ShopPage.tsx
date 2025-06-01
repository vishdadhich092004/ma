import { BiChevronLeft } from "react-icons/bi";
import "../index.css";
import { FaGlobeAfrica, FaMapMarkerAlt } from "react-icons/fa";
import { MdWifiCalling3 } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
const ShopPage = () => {
  return (
    <div className="relative min-h-screen bg-white flex flex-col justify-between max-w-md mx-auto shadow-xl rounded-t-3xl overflow-hidden font-sans">
      {/* Status Bar & Background Section */}
      <div className="relative p-6">
        <div className="absolute inset-0 h-72 rounded-b-3xl overflow-hidden">
          <img
            src="https://thumbs.dreamstime.com/b/dublin-ireland-febuary-th-zara-store-entrance-zara-store-front-365080679.jpg"
            alt="Fashion Store"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Back & Logo */}
        <div className="flex px-4 items-center justify-between mt-3 relative z-10">
          <button className="bg-white/80 p-2 rounded-full shadow-lg h-9 w-9 flex items-center justify-center">
            <BiChevronLeft className="text-black" />
          </button>
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/131/336/non_2x/zara-brand-logo-symbol-clothes-black-design-icon-abstract-illustration-free-vector.jpg"
            alt="Zara Logo"
            className="w-16 h-16 object-contain bg-white rounded-full p-2 shadow-md"
          />
        </div>
        {/* Heading */}
        <div className="mt-8 px-4 relative z-10">
          <h1 className="text-xl text-white font-semibold">
            Men & women Fashion
          </h1>
          <div className="text-white text-sm mt-1">
            One of the largest international fashion companies and belongs to
            Inditex, one of the world's biggest distribution groups.
          </div>
        </div>
        {/* Open Now Bar */}
        <div className="flex items-center mt-5 px-4 relative z-10">
          <div className="bg-white/30 flex items-center justify-center px-4 py-1 rounded-full w-full text-white">
            <IoIosCheckmarkCircle className="text-green-500 rounded-full h-5 w-5 flex items-center justify-center mr-2" />
            <span className="whitespace-nowrap font-medium">Open Now</span>
            <span className="mx-2">|</span>
            <span className="opacity-90">11:00 AM to 10:00 PM</span>
          </div>
        </div>
      </div>
      {/* Main Section: Floor, tabs, offer card */}
      <main className="bg-white rounded-t-3xl flex flex-col flex-1 pt-3 px-2 pb-24 relative z-10">
        <div className="flex w-full items-center justify-between px-2 mb-2">
          <button className="flex items-center border border-black rounded-xl px-3 py-1 text-sm font-medium">
            <FaMapMarkerAlt className="mr-2" />
            Second Floor
          </button>
          <div className="flex gap-2">
            <button className="rounded-xl border p-2 border-black bg-white flex items-center">
              <MdWifiCalling3 className="text-black" />
            </button>
            <button className="rounded-xl border p-2 border-black bg-white flex items-center">
              <FaGlobeAfrica className="text-black" />
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex w-full px-1 mb-2 border-b border-black/30 relative">
          <button className="flex-1 pb-2 text-lg font-medium border-b-2 border-black">
            All Offers
          </button>
          <button className="flex-1 pb-2 text-lg font-medium opacity-70">
            Catalogue
          </button>
        </div>
        {/* Offer Card */}
        <div className="bg-white rounded-2xl shadow-md px-5 py-5 mb-4 mt-2 border border-gray-200 max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-1">
            <span className="text-green-600 text-xl font-semibold">
              15% Off
            </span>
            <span className="text-red-600 text-lg font-bold">3:32:43</span>
          </div>
          <div className="text-gray-600 text-base">
            Shop at the Ultimate Bazingaa Sale & get 2 leggings at 15 % off
          </div>
          <div className="text-red-500 mt-2 font-medium">
            Use code - LEGGINGS15
          </div>
        </div>
      </main>
      {/* Bottom Buttons */}
      <div className="flex items-center justify-between px-4 pb-24 pt-2 w-full max-w-md mx-auto z-30">
        <button className="flex-1 border border-black rounded-xl bg-yellow-100 px-2 py-3 mr-3 font-medium text-black">
          Give us a feedback
        </button>
        <button className="flex-1 rounded-xl bg-yellow-400 px-2 py-3 ml-3 font-medium text-black">
          View Catalog
        </button>
      </div>
    </div>
  );
};

export default ShopPage;
