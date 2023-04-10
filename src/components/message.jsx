const Message = ({ message }) => {
  return (
    <div className={`w-full flex flex-col ${message.direction === "outgoing" ? "items-end" : "items-start"}`}>
      <p className={` ${message.direction === "outgoing" ? "bg-blue-500 before:bg-blue-500 before:-right-0.5 text-white" : "bg-zinc-800 text-gray-400 before:-left-0.5 before:bg-zinc-800"} 
    before:content-[""] before:bottom-2 before:w-4 before:h-4 before:absolute before:rotate-45 before:-z-10
    max-w-[85%] px-3 py-2 text leading-7 rounded-xl relative z-10`}>{message.message}</p>
      <span className="text-gray-600 text-[12px]">{message.sendTime}</span>
    </div>
  );
}

export default Message;