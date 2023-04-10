const IsTypingView = () => {
  return (
    <div className='w-full flex items-start mt-3'>
      <p className='before:-left-0.5 before:bg-zinc-800 bg-zinc-800 before:content-[""] before:bottom-2 before:w-4 before:h-4 before:absolute before:rotate-45 before:-z-10
          flex items-end
          max-w-[85%] px-3 py-2 text text-gray-400 leading-7 rounded-xl relative z-10'>
        is Typing
        <div className="flex ml-1 pb-1 gap-1">
          <span className="w-2 h-2 bg-zinc-900 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-zinc-900 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-zinc-900 rounded-full animate-bounce"></span>
        </div>
      </p>
    </div>
  );
}

export default IsTypingView;