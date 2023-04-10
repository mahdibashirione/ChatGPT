import { useState, useRef, useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcomeview from './components/WelcomeView';
import Message from './components/message';
import IsTypingView from './components/isTypingView';
import MessageList from './components/MessageList';
import axios from 'axios';

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
      notifyError("Please enter your text")
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
      await axios.post("https://api.openai.com/v1/chat/completions",
        JSON.stringify(apiRequestBody),
        {
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
        }).then(res => {
          navigator.vibrate(200)
          setMessages([...chatMessages, {
            message: res.data.choices[0].message.content,
            direction: 'incoming',
            sendTime: getDateSendChat(),
            sender: "ChatGPT"
          }]);
          setIsTyping(false);
        });
    } catch (error) {
      notifyError("Connection failed")
      setIsTyping(false);
    }
  }

  const handleDeleteAllChats = () => {

    if (messages.length == 0) {
      notifyError("There is no chat")
      return
    }

    setMessages([])
    notifySuccess("Chats are deleted")
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
