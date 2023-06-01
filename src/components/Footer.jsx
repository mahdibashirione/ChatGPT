import { useRef, useState } from "react";
import { motion } from "framer-motion";

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
        <motion.button
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: value ? 1 : 0.5, opacity: value ? 1 : 0.5 }}
          type="submit"
          className={`${
            value ? "flex" : "hidden"
          } w-12 h-12 p-1 items-center justify-center active:scale-90 duration-200 rounded-lg overflow-hidden`}
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
        </motion.button>
        <motion.div
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: !value ? 1 : 0.5, opacity: !value ? 1 : 0.5 }}
          className={`gap-2 h-12 items-center ${value ? "hidden" : "flex"} `}
        >
          <svg
            width="17"
            height="24"
            viewBox="0 0 17 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.129 2.53102C15.129 2.53102 15.9308 5.33406 14.1191 12.0955C11.6603 21.2718 9.08139 23.169 5.21771 22.1337C1.35402 21.0985 0.0691843 18.166 2.52797 8.98971C4.98675 -0.186586 10.11 0.908974 11.36 3.07404C12.7742 5.52353 10.4795 12.1556 10.4795 12.1556C10.4795 12.1556 8.97602 17.4468 6.64121 16.8211C3.26046 15.9153 7.03872 7.61017 7.03872 7.61017"
              className="stroke-gray-500"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            width="16"
            height="22"
            viewBox="0 0 16 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 11C1 13.0721 1.6662 15.0155 3.5 16.5C4.93978 17.6655 6.5154 18 8 18M8 18L8 21L11 21L5 21M8 18C9.62678 18 11.0602 17.6655 12.5 16.5C14.3338 15.0155 15 12.9833 15 11"
              className="stroke-gray-500"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 1C7.05292 1 6.38701 1.23723 5.89889 1.58349C5.40324 1.93508 5.01959 2.45012 4.72866 3.1151C4.13114 4.48086 4 6.2973 4 8C4 9.7027 4.13114 11.5191 4.72866 12.8849C5.01959 13.5499 5.40324 14.0649 5.89889 14.4165C6.38701 14.7628 7.05292 15 8 15C8.94708 15 9.61299 14.7628 10.1011 14.4165C10.5968 14.0649 10.9804 13.5499 11.2713 12.8849C11.8689 11.5191 12 9.7027 12 8C12 6.2973 11.8689 4.48086 11.2713 3.1151C10.9804 2.45012 10.5968 1.93508 10.1011 1.58349C9.61299 1.23723 8.94708 1 8 1Z"
              className="stroke-gray-500"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </form>
    </footer>
  );
};

export default Footer;
