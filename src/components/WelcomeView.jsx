const Welcomeview = () => {
  return (
    <div className='select-none w-full h-full text-white flex flex-col items-center justify-center'>
      <img className='w-40 mt-8' src="/images/logoGPT.png" alt="logo-ChatGPT" />
      <h2 className='text-4xl font-bold'>Welcome To</h2>
      <span className='text-4xl mt-2 text-blue-500 flex items-center gap-2'>
        ChattyAi
        <img className='w-[55px]' alt='icon-welcome' src='/images/Waving Hand.svg' />
      </span>
      <p className='mt-8 text-gray-400'>Ask your question in any language you want</p>
    </div>
  );
}

export default Welcomeview;