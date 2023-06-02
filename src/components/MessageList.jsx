const MessageList = ({ children }) => {
  return (
    <section className="w-full h-full bg-transparent overflow-y-auto">
      <ul className="mx-auto w-full max-w-[700px] max-h-full scrollbar-none overflow-y-auto flex-col flex px-2 pt-4 pb-[70px]">
        {children}
      </ul>
    </section>
  );
};

export default MessageList;
