import { useState, useRef, useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcomeview from './components/WelcomeView';
import Message from './components/message';
import IsTypingView from './components/isTypingView';
import MessageList from './components/MessageList';

const API_KEY = ""
const initialChats = JSON.parse(localStorage.getItem("Chats")) || []

function App() {
  const [messages, setMessages] = useState(initialChats);
  const [isTyping, setIsTyping] = useState(false);

  function getDateSendChat() {
    let today = new Date().toLocaleDateString('fa-IR');

    const hr = new Date().getHours()
    const min = new Date().getMinutes()
    const time = hr + ":" + min

    return time;
  }


  useEffect(() => {
    localStorage.setItem("Chats", JSON.stringify(messages))
  }, [messages])

  const notifyError = (message) => toast.error(message, {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });

  const notifySuccess = (message) => toast.success(message, {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });

  const handleSend = async (message) => {

    if (message === "") {
      notifyError("لطفا متن خود را وارد کنید")
      return;
    }

    const newMessage = {
      message,
      direction: 'outgoing',
      sendTime: getDateSendChat(),
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
          setMessages([...chatMessages, {
            message: data.choices[0].message.content,
            direction: 'incoming',
            sendTime: getDateSendChat(),
            sender: "ChatGPT"
          }]);
          setIsTyping(false);
        });
    } catch (error) {
      notifyError("سرور جوابگو نیست")
      setIsTyping(false);
    }
  }

  const handleDeleteAllChats = () => {

    if (messages.length == 0) {
      notifyError("مکالمه ای وجود ندارد")
      return
    }

    setMessages([])
    notifySuccess("همه مکالمه ها حذف شد")
  }

  return (
    <div className='w-full bg-zinc-800'>
      <div className="w-full h-screen mx-auto flex flex-col justify-between">
        <Header onDeleteChats={handleDeleteAllChats} />
        <MessageList>
          {/* Messages */}
          {messages.length ? messages.map((message, i) => {
            return (
              <Message key={i} message={message} />
            )
          }) : <Welcomeview />}
          {/* Loading */}
          {isTyping && <IsTypingView />}
        </MessageList>
        <Footer onSend={handleSend} />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div >
    </div>
  )
}

export default App
