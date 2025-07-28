import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-8 font-sans">
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </p>

        <form
          action="https://formsubmit.co/eb80c8bb0cf1f223a9c87175110f5866"
          method="POST"
          className="flex flex-col space-y-6"
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-gray-800 font-semibold mb-2 text-sm"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Your full name"
              className="px-3 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-800 font-semibold mb-2 text-sm"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@example.com"
              className="px-3 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-gray-800 font-semibold mb-2 text-sm"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Tell us what's on your mind..."
              rows={5}
              className="px-3 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 resize-y min-h-[120px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className={`
              bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none 
              py-3.5 px-8 rounded-lg text-base font-semibold cursor-pointer 
              transition-all duration-300 mt-4
              hover:from-blue-600 hover:to-blue-700 hover:-translate-y-0.5 hover:shadow-lg
            `}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
