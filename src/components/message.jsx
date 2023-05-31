import Typewriter from "typewriter-effect";

const Message = ({ message }) => {
  const hr = new Date().getHours();
  const min = new Date().getMinutes();
  const time = hr + ":" + min;

  return (
    <div
      className={`w-full flex flex-col ${
        message.direction === "outgoing" ? "items-end" : "items-start"
      }`}
    >
      <p
        className={` ${
          message.direction === "outgoing"
            ? "bg-blue-500 rounded-br-none text-white"
            : "bg-white shadow text-slate-800 rounded-tl-none"
        } 
    before:content-[""] before:bottom-1.5 before:w-4 before:h-4 before:absolute before:rotate-45 before:-z-10
    max-w-[85%] px-3 py-2 text leading-7 rounded-xl relative z-10`}
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
      </p>
      <span className="text-gray-600 text-[12px] select-none">
        {message.sendTime}
      </span>
    </div>
  );
};

export default Message;
