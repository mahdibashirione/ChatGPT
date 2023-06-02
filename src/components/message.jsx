import { motion } from "framer-motion";
import { useState } from "react";
import { FiCheck, FiCopy, FiEdit, FiEdit3, FiTrash } from "react-icons/fi";
import Typewriter from "typewriter-effect";
import useToast from "../hooks/useToast";
import PopUpDelete from "./PopUpDelete";

const Message = ({ message, deleteMessage }) => {
  const hr = new Date().getHours();
  const min = new Date().getMinutes();
  const time = hr + ":" + min;
  const { success, error } = useToast();

  const [isPopUpDelete, setIsPopUpDelete] = useState(false);
  const [isOptions, setIsOptions] = useState(false);

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    success("The text was copied");
  };
  const handleDeletePopUp = () => {
    deleteMessage(message.message);
    setIsPopUpDelete(false);
    success("Your message has been deleted");
  };
  const handleCancelPopUp = () => {
    setIsPopUpDelete(false);
  };

  return (
    <li
      className={`w-full flex flex-col select-none ${
        message.direction === "outgoing"
          ? "items-end mt-1.5"
          : "items-start flex-col-reverse mb-1.5"
      }`}
    >
      <div
        onClick={() => setIsOptions(!isOptions)}
        className={` ${
          message.direction === "outgoing"
            ? "bg-blue-500 rounded-br-none text-white"
            : "bg-white text-slate-800 rounded-tl-none"
        } cursor-pointer duration-200 active:scale-95 relative max-w-[70%] px-3 shadow shadow-zinc-400/60 py-2.5 text leading-7 rounded-xl  
    ${isOptions ? "z-30" : "z-0"}`}
      >
        {message.sender === "ChatGPT" && message.sendTime == time ? (
          <Typewriter
            options={{
              strings: message.message,
              autoStart: true,
              cursor: "",
              loop: false,
            }}
          />
        ) : (
          message.message
        )}
        <motion.ul
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: isOptions ? 1 : 0, opacity: isOptions ? 1 : 0.5 }}
          className={`absolute divide-y overflow-hidden rounded-lg shadow top-0 text-slate-800 text-sm ${
            message.direction === "outgoing"
              ? "right-[calc(100%+8px)]"
              : "left-[calc(100%+8px)]"
          }`}
        >
          <li>
            <button
              onClick={(e) => handleCopyText(message.message)}
              className="bg-white py-2.5 flex pl-4 pr-6  w-full items-center gap-2 hover:bg-gray-200 duration-200"
            >
              <FiCopy className="text-lg" />
              Copy
            </button>
          </li>
          {/* {message.direction === "outgoing" && (
            <li>
              <button className="bg-white py-2.5 flex pl-4 pr-6  w-full items-center gap-2 hover:bg-gray-200 duration-200">
                <FiEdit3 className="text-lg" />
                Edite
              </button>
            </li>
          )} */}
          <li>
            <button
              onClick={(e) => setIsPopUpDelete(true)}
              className="bg-white text-red-500 py-2.5 flex pl-4 pr-6 w-full  items-center gap-2 hover:bg-red-100 duration-200"
            >
              <FiTrash className="text-lg" />
              Delete
            </button>
          </li>
        </motion.ul>
      </div>
      <span className="text-gray-600 text-[12px] select-none flex items-center">
        {message.sendTime}
        {message.direction === "outgoing" && (
          <>
            <FiCheck className="text-sm text-green-500 -mr-2.5 ml-0.5" />
            <FiCheck className="text-sm text-green-500 " />
          </>
        )}
      </span>
      {/* backdrop */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: isOptions ? 1 : 0,
        }}
        onClick={() => setIsOptions(false)}
        className={`fixed bg-gray-900/70 top-0 left-0 w-screen h-screen z-20 ${
          isOptions ? "block" : "hidden"
        }`}
      ></motion.span>
      {/* popup delete */}
      <PopUpDelete
        show={isPopUpDelete}
        handleCancel={handleCancelPopUp}
        handleDelete={handleDeletePopUp}
      />
    </li>
  );
};

export default Message;
