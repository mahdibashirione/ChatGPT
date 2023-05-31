import { useRef, useState } from "react";

const Footer = ({ onSend }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(value);
    setValue("");
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <footer className="w-full px-4 pb-2 container flex items-center justify-center bg-transparent fixed bottom-0">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 overflow-hidden rounded-full max-w-[700px] w-full flex items-center justify-between px-4"
      >
        <input
          onChange={(e) => handleChange(e)}
          value={value}
          className="pl-4 text-slate-800 bg-transparent py-23 outline-none border-[#cbcbcb] flex-1 rounded-lg placeholder:text-gray-700 placeholder:text-lg"
          placeholder="Message"
          type="text"
        />
        <button
          disabled={value.length > 0 ? false : true}
          type="submit"
          className={`${
            value.length ? "opacity-100 scale-100" : "opacity-0 scale-50"
          } w-12 h-12 p-1 flex items-center justify-center active:scale-90 duration-200 rounded-lg overflow-hidden`}
        >
          <svg
            className="w-8 h-8 rotate-45 scale-150"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 4L3 11L10 14L13 21L20 4Z" className="fill-sky-500" />
            <path
              d="M20 4L3 11L10 14M20 4L13 21L10 14M20 4L10 14"
              className="stroke-gray-300"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </footer>
  );
};

export default Footer;
