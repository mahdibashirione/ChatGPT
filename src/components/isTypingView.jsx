const IsTypingView = () => {
  return (
    <div className="w-full flex items-start mt-3">
      <p
        className="before:-left-0.5 bg-white border
          flex items-end
          max-w-[85%] px-3 py-2 text text-gray-400 leading-7 rounded-xl relative shadow-zinc-300 rounded-tl-none"
      >
        is Typing
        <div className="flex ml-1 pb-1 gap-1">
          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
        </div>
      </p>
    </div>
  );
};

export default IsTypingView;
