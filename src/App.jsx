import { useState, useRef } from 'react'
import { toast, Toaster } from 'react-hot-toast';

const API_KEY = "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";

const systemMessage = {
  "role": "system",
  "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const input = useRef()

  const notifyError = (message) => toast.error(message, {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });

  const handleSend = async (message) => {

    if (input.current.value === "") {
      notifyError("لطفا متن خود را وارد کنید")
      return;
    }

    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        ...apiMessages
      ]
    }

    try {
      await fetch("https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        }).then((data) => {
          return data.json();
        }).then((data) => {
          console.log("data", data);
          setMessages([...chatMessages, {
            message: data.choices[0].message.content,
            direction: 'incoming',
            sender: "ChatGPT"
          }]);
          setIsTyping(false);
        });
    } catch (error) {
      console.log("error", error);
      notifyError("سرور جوابگو نیست")
      setIsTyping(false);
    }
  }

  return (
    <div className='w-full bg-zinc-800'>
      <div className="w-full h-screen mx-auto flex flex-col justify-between">
        {/* Header */}
        <header className='w-full bg-zinc-800'>
          <div className="mx-auto max-w-[700px] w-full text-white flex items-center justify-between py-3 px-4">
            <img className='w-10' src="/images/logoGPT.png" alt="logo-ChatGPT" />
            <h1 className="font-bold select-none text-xl">ChattyAi</h1>
          </div>
        </header>
        {/* Message List */}
        <section className='w-full h-full bg-zinc-900 overflow-y-auto'>
          <div className='mx-auto w-full max-w-[700px] max-h-full scrollbar-none overflow-y-auto flex-col flex px-3 py-4'>
            {messages.length ? messages.map((message, i) => {
              return (
                <div key={i} className={`w-full flex mt-2 ${message.direction === "outgoing" ? "justify-end" : "justify-start"}`}>
                  <p className={` ${message.direction === "outgoing" ? "bg-blue-500 before:bg-blue-500 before:-right-0.5 text-white" : "bg-zinc-800 text-gray-400 before:-left-0.5 before:bg-zinc-800"} 
                    before:content-[""] before:bottom-2 before:w-4 before:h-4 before:absolute before:rotate-45 before:-z-10
                    max-w-[85%] px-3 py-2 text leading-7 rounded-xl relative z-10`}>{message.message}</p>
                </div>
              )
            }) : <div className='select-none w-full h-full text-white flex flex-col items-center justify-center'>
              <img className='w-40 mt-8' src="/images/logoGPT.png" alt="logo-ChatGPT" />
              <h2 className='text-4xl'>خوش آمدید به</h2>
              <span className='text-4xl mt-4 text-blue-500 flex items-center gap-2'>
                ChattyAi
                <img className='w-[55px]' alt='icon-welcome' src='/images/Waving Hand.svg' />
              </span>
              <p className='mt-8 text-gray-400'>شما میتوانید به هر زبانی که خواستید سوال بپرسید</p>
            </div>}
            {isTyping && <div className='w-full flex items-start'>
              <p className='before:-left-0.5 before:bg-zinc-800 bg-zinc-800 before:content-[""] before:bottom-2 before:w-4 before:h-4 before:absolute before:rotate-45 before:-z-10
          max-w-[85%] px-3 py-2 text text-gray-400 leading-7 flex items-center rounded-xl relative z-10'>
                is typing
                <span className='block w-6 h-6 border-4 border-zinc-600 rounded-full border-l-transparent ml-2 animate-spin'></span>
              </p>
            </div>}
          </div >
        </section>
        {/* Footer */}
        <footer className='w-full bg-zinc-800'>
          <div className='mx-auto max-w-[700px] w-full flex items-center justify-between px-4 py-2'>
            <button className='w-12 h-12 flex items-center justify-center active:scale-95 duration-300 rounded-lg'>
              <svg width="20" height="29" viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7988 2.97767C17.7988 2.97767 18.7421 6.27537 16.6107 14.23C13.718 25.0257 10.684 27.2577 6.13846 26.0397C1.59295 24.8217 0.081379 21.3718 2.97406 10.5761C5.86675 -0.219513 11.8941 1.06938 13.3647 3.61651C15.0285 6.49827 12.3288 14.3007 12.3288 14.3007C12.3288 14.3007 10.56 20.5256 7.81318 19.7896C3.83582 18.7239 8.28083 8.95314 8.28083 8.95314" stroke="#ABAFD1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <input
              ref={input}
              className='px-4 text-white bg-transparent py-23 outline-none border-[#cbcbcb] flex-1 rounded-lg'
              placeholder='Message...' type={"text"} />
            <span onClick={e => {
              handleSend(input.current.value)
              input.current.value = ""
            }} className='cursor-pointer w-12 h-12 p-1 flex items-center justify-center active:scale-90 duration-200 rounded-lg'>
              <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.4885 22.688C43.477 24.1167 42.6869 25.3307 42.0394 26.1389C41.3166 27.0409 40.3538 27.9421 39.2925 28.8001C37.1585 30.5255 34.3386 32.3064 31.4291 33.8252C28.5232 35.3419 25.4077 36.66 22.6644 37.3986C21.2975 37.7666 19.9292 38.0167 18.6749 38.0389C17.4764 38.0602 16.0318 37.8809 14.8362 37.0303L14.8297 37.0257C14.6053 36.865 14.4105 36.6844 14.3419 36.6207L14.3288 36.6086C13.6336 35.9677 13.2923 35.1553 13.11 34.55C12.9151 33.9028 12.8186 33.2091 12.7793 32.5438C12.7005 31.2101 12.8356 29.6983 13.1344 28.2793C13.2981 27.5018 13.5228 26.6956 13.8187 25.9244C14.2575 24.7805 15.3719 24.0966 16.5886 23.9462L23.6357 23.3694C23.9965 23.3399 24.2736 23.0387 24.273 22.6767C24.2725 22.3146 23.9945 22.0126 23.6337 21.982L16.5848 21.3842C15.291 21.2205 14.1082 20.4757 13.6706 19.2463C13.3908 18.4602 13.1821 17.6413 13.0356 16.8491C12.7588 15.3532 12.6658 13.7478 12.8312 12.3367C12.9138 11.6327 13.0707 10.8886 13.3582 10.2013C13.6359 9.53715 14.1252 8.71413 15.0006 8.15391L15.002 8.15298C16.1975 7.38815 17.6188 7.25731 18.7956 7.3036C20.0348 7.35234 21.391 7.6156 22.7529 7.99252C25.4855 8.74882 28.5907 10.0618 31.4896 11.5684C34.3901 13.0758 37.2021 14.8384 39.3271 16.5502C40.3835 17.4011 41.3446 18.2988 42.0645 19.2025C42.711 20.0139 43.5002 21.2414 43.4885 22.688Z" fill="#0EA5E9" />
              </svg>
            </span>
          </div>
        </footer>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div >
    </div>
  )
}

export default App
