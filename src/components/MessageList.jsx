
const MessageList = ({ children }) => {
  return (
    <section className='w-full h-full bg-zinc-900 overflow-y-auto'>
      <div className='mx-auto w-full max-w-[700px] max-h-full scrollbar-none overflow-y-auto flex-col flex px-3 py-4'>
        {children}
      </div >
    </section>
  );
}

export default MessageList;